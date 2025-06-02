import { Component } from '../../../common/component';

export interface IResultContainerOptions
{
  className: string[],
  text: string,
}

export class ResultContainer extends Component
{
  protected className: string[];
  
  constructor
  (
    {
      className,
      text,
    }: IResultContainerOptions
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
  }

  public getResultContainer()
  {
    return new ResultContainer
    (
      {
        className: this.className,
        text: '',
      }
    )
  }
}