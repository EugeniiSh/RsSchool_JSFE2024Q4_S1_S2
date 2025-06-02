import { Component } from '../../../common/component';

export interface IWordBlockOptions
{
  className: string[],
  text: string,
  pieceClassName: string[],
}

export class WordBlock extends Component
{
  protected className: string[];

  protected word: string;

  protected pieceClassName: string[];

  constructor
  (
    {
      className,
      text,
      pieceClassName,
    }: IWordBlockOptions
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.word = text;
    this.pieceClassName = pieceClassName;

    const piece = new Component
    (
      { 
        tag: 'div', 
        className: this.pieceClassName, 
        text: '',
      }
    );

    this.append(piece);
  }

  public getBlockWithWord(word: string): WordBlock
  {
    return new WordBlock
    (
      { 
        className: this.className, 
        text: word,
        pieceClassName: this.pieceClassName,
      }
    )
  }
}