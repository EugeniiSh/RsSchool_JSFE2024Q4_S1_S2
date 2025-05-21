import { Component } from '../../../common/component';

export interface IWordContainerOptions
{
  className: string[],
  text: string,
}

export class WordContainer extends Component
{
  protected className: string[];

  constructor
  (
    {
      className,
      text,
    }: IWordContainerOptions
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
  }

  public getWordContainerArr(count: number = 1): WordContainer[]
  {
    const corrCount = count < 1 ? 1 : count;
    const result: WordContainer[] = [];

    for(let i = 0; i < corrCount; i += 1)
    {
      result.push
      (
        new WordContainer
        (
          {
            className: this.className,
            text: '',
          }
        )
      );
    }

    return result;
  }
}