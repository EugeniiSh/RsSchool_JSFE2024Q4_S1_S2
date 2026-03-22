import { Component } from '../../common/component';
import { Scull } from '../../scull/scull';

export interface ICoverTopFrontOptoin
{
  className: string[];
  text: string;
  items: Component[];
  scull: Scull;
}

export class CoverTopFront extends Component
{
  protected scull: Scull;

  constructor
  (
    {
      className,
      text,
      items,
      scull,
    }: ICoverTopFrontOptoin
  )
  {
    super({ tag: 'div', className, text });
    this.appendChildren(items);
    this.scull = scull;
  }

  public scullLaugh()
  {
    this.scull.scullLaugh();
  }
}