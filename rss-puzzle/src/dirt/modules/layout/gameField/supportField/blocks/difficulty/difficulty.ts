import { Component } from '../../../../common/component';

export interface IDifficultyBlockStyleList
{
  levelSelection: string;
}

export interface IDifficultyBlockOption
{
  className: string[];
  text: string;
  style: IDifficultyBlockStyleList;
}

export class DifficultyBlock extends Component
{
  protected className: string[];

  protected style: IDifficultyBlockStyleList;

  constructor
  (
    {
      className,
      text,
      style,
    }: IDifficultyBlockOption
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
  }

  public getDifficultyBlock(): DifficultyBlock
  {
    return new DifficultyBlock
    (
      {
        className: this.className,
        text: '',
        style: this.style
      }
    )
  }
}