import { Component } from '../../common/component';

export interface ICoverTopOption
{
  className: string[];
  text: string;
  coverFront: Component;
  coverBack: Component;
}

export class CoverTop extends Component
{
  constructor
  (
    {
      className,
      text,
      coverFront,
      coverBack,
    }: ICoverTopOption
  )
  {
    super({ tag: 'div',className, text });
    this.appendChildren([coverBack, coverFront]);
  }
}