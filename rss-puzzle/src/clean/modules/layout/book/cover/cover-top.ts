import { Component } from '../../common/component';
import { CoverTopFront } from './cover-top-front';

export interface ICoverTopOption
{
  className: string[];
  text: string;
  coverFront: CoverTopFront;
  coverBack: Component;
}

export class CoverTop extends Component
{
  protected coverFront: CoverTopFront;

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
    this.coverFront = coverFront;
  }

  public scullLaugh()
  {
    this.coverFront.scullLaugh();
  }
}