import { Component } from '../../../common/component';

export interface IWordBlockOptions
{
  className: string[],
  text: string,
  pieceClassName: string[],
  pieceLeftClassName: string[],
}

export class WordBlock extends Component
{
  protected className: string[];

  protected word: string;

  protected pieceClassName: string[];

  protected pieceLeftClassName: string[];

  protected isWidthSet: boolean;

  protected pieceRight: Component;

  protected pieceLeft: Component;

  constructor
  (
    {
      className,
      text,
      pieceClassName,
      pieceLeftClassName,
    }: IWordBlockOptions
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.word = text;
    this.pieceClassName = pieceClassName;
    this.pieceLeftClassName = pieceLeftClassName;
    this.isWidthSet = false;

    const piece = new Component
    (
      { 
        tag: 'div', 
        className: this.pieceClassName, 
        text: '',
      }
    );

    const pieceLeft = new Component
    (
      { 
        tag: 'div', 
        className: this.pieceLeftClassName, 
        text: '',
      }
    );

    this.pieceRight = piece;
    this.pieceLeft = pieceLeft;

    this.append(piece);
    this.append(pieceLeft);
  }

  public getPieceRight(): Component
  {
    return this.pieceRight;
  }

  public getPieceLeft(): Component
  {
    return this.pieceLeft;
  }

  public setIsWidthSet(flag: boolean): void
  {
    this.isWidthSet = flag;
  }

  public getIsWidthSet(): boolean
  {
    return this.isWidthSet;
  }

  public getBlockWithWord(word: string): WordBlock
  {
    return new WordBlock
    (
      { 
        className: this.className, 
        text: word,
        pieceClassName: this.pieceClassName,
        pieceLeftClassName: this.pieceLeftClassName,
      }
    )
  }
}