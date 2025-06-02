import { Component } from '../../../common/component';

export interface IResultLineOptions
{
  className: string[],
  text: string,
}

export class ResultLine extends Component
{
  protected className: string[];

  constructor
  (
    {
      className,
      text,
    }: IResultLineOptions
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
  }

  public getResultLine(): ResultLine
  {
    return new ResultLine
    (
      {
        className: this.className,
        text: '',
      }
    )
  }
}