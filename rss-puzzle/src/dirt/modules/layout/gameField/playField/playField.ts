import { Component } from '../../common/component';
import { InitialContainer } from './blocks/initialContainer';
import { ResultContainer } from './blocks/resultContainer';
import { ResultLine } from './blocks/resultLine';
import { WordContainer } from './blocks/wordContainer';
import { WordBlock } from './blocks/wordBlock';

import { PuzzleGameExternalStorage, TNumberOfLevel } from '../../../storage/external';
import { IStorageGameProgress } from '../../../storage/local';
 
export interface IPlayFieldStyleList
{
  pazzleWrapper: string,
  resultContainer: string,
  initialContainer: string,
  resultGuess: string,
  initialGuess: string,
  guessBlock: string,
  wordContainer: string,
  wordBlock: string,
  wordBlockPiece: string,
}

export interface IFetchDataOptions
{
  level: TNumberOfLevel
}

export interface IPlayField
{
  className: string[], 
  text: string,
  style: IPlayFieldStyleList,
  initialContainer: InitialContainer,
  resultContainer: ResultContainer,
  resultLine: ResultLine,
  wordContainer: WordContainer,
  wordBlock: WordBlock,
  externalStorage: PuzzleGameExternalStorage,
}

export interface IRenderContentInfo
{
  playerProgress: IStorageGameProgress,
  result: ResultContainer,
  initial: InitialContainer
}

export class PlayField extends Component
{
  protected className: string[];

  protected style: IPlayFieldStyleList;

  protected initialContainer: InitialContainer;

  protected resultContainer: ResultContainer;

  protected resultLine: ResultLine;

  protected wordContainer: WordContainer;

  protected wordBlock: WordBlock;

  protected externalStorage: PuzzleGameExternalStorage;

  protected wordCount: number;

  protected resultGuessFill: number[];

  protected initialGuessFill: number[];

  protected currentLine: { result: ResultLine, initial: InitialContainer };

  constructor
  (
    {
      className,
      text,
      style,
      initialContainer,
      resultContainer,
      resultLine,
      wordContainer,
      wordBlock,
      externalStorage,
    }: IPlayField
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.initialContainer = initialContainer;
    this.resultContainer = resultContainer;
    this.resultLine = resultLine;
    this.wordContainer = wordContainer;
    this.wordBlock = wordBlock;
    this.externalStorage = externalStorage;

    this.wordCount = 0;
    this.resultGuessFill = [];
    this.initialGuessFill = [];
    this.currentLine =
    {
      result: this.resultLine.getResultLine(),
      initial: this.initialContainer.getInitialContainer()
    }
    
    this.addListener('click', this.handlerClickWordBlock);
  }

  static honestRandom(min: number, max: number): number
  {
    const range = max - min + 1;
    const result = Math.round((Math.random() * range) + min - 0.5);

    return result;
  }

  static getShuffleElementArr(elementArr: WordContainer[]): WordContainer[]
  {
    const result: WordContainer[] = [];
    const randomNumSet: Set<number> = new Set();

    while(randomNumSet.size < elementArr.length)
    {
      randomNumSet.add(PlayField.honestRandom(0, elementArr.length - 1));
    }

    randomNumSet.forEach((num) =>
    {
      result.push(elementArr[num]);
    })

    return result;
  }



  public async renderGameFieldContent(contentInfo: IRenderContentInfo): Promise<void>
  {
    const contentData = await this.externalStorage.getData(contentInfo.playerProgress.last.level);
    const words = contentData.rounds[0].words[0].textExample;
    let wordsElementArr = words.split(' ')
    .map((word) => 
    {
      const wordContainer = this.wordContainer.getWordContainerArr()[0];
      wordContainer.append(this.wordBlock.getBlockWithWord(word));
      return wordContainer;
    });

    this.wordCount = wordsElementArr.length;
    this.resultGuessFill = new Array(this.wordCount).fill(0);
    this.initialGuessFill = new Array(this.wordCount).fill(1);
    wordsElementArr = PlayField.getShuffleElementArr(wordsElementArr);

    const resultLine = this.resultLine.getResultLine();
    resultLine.appendChildren(this.wordContainer.getWordContainerArr(wordsElementArr.length));

    this.currentLine.result = resultLine;
    this.currentLine.initial = contentInfo.initial;

    contentInfo.initial.appendChildren(wordsElementArr);
    contentInfo.result.append(resultLine);

    // === Get width rezult line ===
    const resultWidth = resultLine.getNode().offsetWidth;
    // === Set the size of the word cards ===
    wordsElementArr.forEach((elem) =>
    {
      // === Take the size '.word-container' ... ===
      const wordElem = elem.getNode();
      const elemWidth = wordElem.offsetWidth;

      // === and set it to '.word-block' ===
      const wordElemChild = elem.getChildren()[0].getNode();
      wordElemChild.style.width = 'calc(var(--size-width-result) * var(--size-width-ratio))';

      // === add a variable for adaptability ===
      const  wordElemWidthRatio = elemWidth / resultWidth;
      wordElemChild.style.setProperty('--size-width-ratio', wordElemWidthRatio.toString());
    })
  }

  protected handlerClickWordBlock = (event: Event) =>
  {
    if(event.target === null) return;
    if(!(event.target instanceof HTMLElement)) return;
   
    const parent = event.target.closest(`.${this.style.wordBlock}`);
    if(parent === null) return;

    if(parent.closest(`.${this.style.initialGuess}`))
    {
      let position = 0;
      
      this.currentLine.initial.getChildren().find((wordContainer, index) =>
      {
        const wordBlock = wordContainer.getChildren()[0];
        if(wordBlock && wordBlock.getNode() === parent) 
        {
          position = index;
          return true;
        }

        return false;
      })

      const wordBlockComponent = 
      this.currentLine.initial
      .getChildren()[position]
      .getChildren()[0];

      this.currentLine.initial
      .getChildren()[position]
      .cleanInnerHTML();

      this.initialGuessFill[position] = 0;

      const resultNewPosition = this.resultGuessFill.indexOf(0);
      this.resultGuessFill[resultNewPosition] = 1;

      this.currentLine.result.replaceChildren(resultNewPosition, wordBlockComponent);
    }
    else
    {
      const resultGuess = parent.closest(`.${this.style.resultGuess}`);
      if(resultGuess !== this.currentLine.result.getNode()) return;

      let position = 0;
      
      this.currentLine.result.getChildren().find((wordContainer, index) =>
      {
        if(wordContainer && wordContainer.getNode() === parent) 
        {
          position = index;
          return true;
        }

        return false;
      })

      const wordBlockComponent = 
      this.currentLine.result
      .getChildren()[position];

      this.currentLine.result
      .replaceChildren(position, this.wordContainer.getWordContainerArr()[0]);

      this.resultGuessFill[position] = 0;

      const initialNewPosition = this.initialGuessFill.indexOf(0);
      this.initialGuessFill[initialNewPosition] = 1;

      this.currentLine.initial.getChildren()[initialNewPosition].append(wordBlockComponent);
    }
  }

  public getWordCount(): number
  {
    return this.wordCount;
  }

  public getPlayField(): PlayField
  {
    return new PlayField
    (
      {
        className: this.className,
        text: '',
        style: this.style,
        initialContainer: this.initialContainer.getInitialContainer(),
        resultContainer: this.resultContainer.getResultContainer(),
        resultLine: this.resultLine.getResultLine(),
        wordContainer: this.wordContainer.getWordContainerArr()[0],
        wordBlock: this.wordBlock.getBlockWithWord(''),
        externalStorage: this.externalStorage,
      }
    )
  }

  public getPlayFieldInterface(progressPlayer: IStorageGameProgress): { playField: PlayField, renderInfo: IRenderContentInfo }
  {
    const playField = this.getPlayField();
    const resultContainer = this.resultContainer.getResultContainer();
    const initialContainer = this.initialContainer.getInitialContainer();
    
    const renderInfo: IRenderContentInfo =
    {
      playerProgress: progressPlayer,
      initial: initialContainer,
      result: resultContainer
    }

    playField.appendChildren([resultContainer, initialContainer]);

    return {playField, renderInfo};
  }
}