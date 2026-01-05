import { Component } from '../../../../common/component';

export interface IDifficultyRoundsStyleList
{
  roundsContainer: string;
}

export interface IDifficultyRoundsOption
{
  className: string[];
  text: string;
  style: IDifficultyRoundsStyleList;
}

export class DifficultyRounds extends Component
{
  protected className: string[];
  
  protected style: IDifficultyRoundsStyleList;

  constructor
  (
    {
      className,
      text,
      style,
    }: IDifficultyRoundsOption
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
  }

  public getDifficultyRounds(): DifficultyRounds
  {
    return new DifficultyRounds
    (
      {
        className: this.className,
        text: '',
        style: this.style,
      }
    )
  }
}