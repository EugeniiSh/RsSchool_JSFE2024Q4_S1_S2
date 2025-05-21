import { Component } from '../../common/component';
import { InitialContainer } from './blocks/initialContainer';
import { ResultContainer } from './blocks/resultContainer';
import { ResultLine } from './blocks/resultLine';
import { WordContainer } from './blocks/wordContainer';
import { WordBlock } from './blocks/wordBlock';

export interface IPlayFieldStyleList
{
  page: string,
  pazzleWrapper: string,
  resultContainer: string,
  guessBlock: string,
  wordContainer: string,
  wordBlock: string,
  wordBlockPiece: string,
}

export interface IPlayField
{
  className: string[], 
  text: string,
  // style: IPlayFieldStyleList,
  initialContainer: InitialContainer,
  resultContainer: ResultContainer,
  resultLine: ResultLine,
  wordContainer: WordContainer,
  wordBlock: WordBlock,
}

export class PlayField extends Component
{
  protected className: string[];

  protected initialContainer: InitialContainer;

  protected resultContainer: ResultContainer;

  protected resultLine: ResultLine;

  protected wordContainer: WordContainer;

  protected wordBlock: WordBlock;

  constructor
  (
    {
      className,
      text,
      initialContainer,
      resultContainer,
      resultLine,
      wordContainer,
      wordBlock,
    }: IPlayField
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.initialContainer = initialContainer;
    this.resultContainer = resultContainer;
    this.resultLine = resultLine;
    this.wordContainer = wordContainer;
    this.wordBlock = wordBlock;
  }

  public getPlayField(): PlayField
  {
    return new PlayField
    (
      {
        className: this.className,
        text: '',
        initialContainer: this.initialContainer.getInitialContainer(),
        resultContainer: this.resultContainer.getResultContainer(),
        resultLine: this.resultLine.getResultLine(),
        wordContainer: this.wordContainer.getWordContainerArr()[0],
        wordBlock: this.wordBlock.getBlockWithWord(''),
      }
    )
  }

  public getPlayFieldInterface(): PlayField
  {
    const playField = this.getPlayField();
    const resultContainer = this.resultContainer.getResultContainer();
    const resultLine = this.resultLine.getResultLine();
    const initialContainer = this.initialContainer.getInitialContainer();
    const wordContainer = this.wordContainer.getWordContainerArr()[0];
    const wordBlock = this.wordBlock.getBlockWithWord('new Word');

    wordContainer.append(wordBlock);
    initialContainer.append(wordContainer);
    resultContainer.append(resultLine);
    playField.appendChildren([resultContainer, initialContainer]);

    return playField;
  }
}