import { TFieldsValue } from '../layout/login-form/form';
import { TNumberOfLevel } from './external';

export interface IStorageRoundProgress {
  isComplete: boolean;
  completeSentence: number[];
}

export interface IStorageLevelProgress {
  isComplete: boolean;
  roundProgress: Record<number, IStorageRoundProgress>;
  completeRoundCount: number;
}

export interface ILastlevelData {
  level: TNumberOfLevel;
  round: number;
  sentense: number;
}

export interface ITranslationHintsStatus {
  textHint: boolean;
  audioHint: boolean;
  imageHint: boolean;
}

export type TProgressData = Record<TNumberOfLevel, IStorageLevelProgress>;

export interface IStorageGameProgress {
  last: ILastlevelData;
  translateHints: ITranslationHintsStatus;
  progress: TProgressData;
}

export type TStorageValue = TFieldsValue & {
  isNew: boolean;
  game: IStorageGameProgress;
};
export type TLastLevelAndRound = Omit<ILastlevelData, 'sentense'>;

export class PuzzleGameStorage {
  private key = 'PGLSEvSh';

  private startValue: TStorageValue;

  protected startArray: number[];

  constructor() {
    this.startArray = [];
    this.startValue = {
      fname: 'new',
      lname: 'user',
      isNew: true,
      game: this.getStartGameValue(),
    };
  }

  public getStartGameValue(): IStorageGameProgress {
    const gameLevelCount: TNumberOfLevel[] = [1, 2, 3, 4, 5, 6];
    const progressData: TProgressData = gameLevelCount.reduce((acc, num) => {
      const levelProgress: IStorageLevelProgress = this.getStartLevelProgress();

      acc[num] = levelProgress;
      return acc;
    }, {} as TProgressData);

    return {
      last: {
        level: 1,
        round: 0,
        sentense: 0,
      },

      translateHints: {
        textHint: true,
        audioHint: true,
        imageHint: true,
      },

      progress: progressData,
    };
  }

  public getStartRoundProgress(): IStorageRoundProgress {
    const emptyArray = this.startArray.slice();

    return {
      isComplete: false,
      completeSentence: emptyArray,
    };
  }

  public getStartLevelProgress(): IStorageLevelProgress {
    const roundProgress = this.getStartRoundProgress();

    return {
      isComplete: false,
      roundProgress: { 0: roundProgress },
      completeRoundCount: 0,
    };
  }

  public getValue(): TStorageValue {
    const value = localStorage.getItem(this.key);
    if (value) {
      return JSON.parse(value) as TStorageValue;
    }

    return this.startValue;
  }

  public setValue(value: TStorageValue): void {
    const string = JSON.stringify(value);
    localStorage.setItem(this.key, string);
  }

  public resetValue(): void {
    this.setValue(this.startValue);
  }
}
