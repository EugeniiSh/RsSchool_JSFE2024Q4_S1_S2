export interface IPuzzleWordsData {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
}

export interface IPuzzleLevelData {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
}

export interface IPuzzleLevel {
  levelData: IPuzzleLevelData;
  words: IPuzzleWordsData[];
}

export interface IPuzzleGameData {
  rounds: IPuzzleLevel[];
  roundsCount: number;
}

export type TNumberOfLevel = 1 | 2 | 3 | 4 | 5 | 6;

export class PuzzleGameExternalStorage {
  private initialPath = 'https://raw.githubusercontent.com/';

  private userPath: string;

  protected cache: Map<TNumberOfLevel, IPuzzleGameData>;

  constructor(user: string) {
    this.userPath = `${this.initialPath}${user.toLowerCase()}/`;
    this.cache = new Map<TNumberOfLevel, IPuzzleGameData>();
  }

  public async getData(level: TNumberOfLevel): Promise<IPuzzleGameData> {
    if (this.cache.has(level)) {
      const result = this.cache.get(level);

      if (result) return result;
    }

    const respons = fetch(
      `${this.userPath}rss-puzzle-data/main/data/wordCollectionLevel${level}.json`,
    );
    const gameData = (await respons.then((res) =>
      res.json(),
    )) as IPuzzleGameData;
    this.cache.set(level, gameData);

    return gameData;
  }

  public getImagePath(levelData: IPuzzleLevelData): string {
    return `${this.userPath}rss-puzzle-data/main/images/${levelData.imageSrc}`;
  }

  public getAudioPath(wordData: IPuzzleWordsData): string {
    return `${this.userPath}rss-puzzle-data/main/${wordData.audioExample}`;
  }
}
