import { Component } from '../../../common/component';
import { PageSide } from './page-side';

export interface IPageOption
{
  className: string[], 
  text: string,
  pageFront: PageSide,
  pageBack: PageSide 
}

export class Page extends Component
{
  private pageFront: PageSide;

  private pageBack: PageSide;

  constructor
  (
    {
      className, 
      text,
      pageFront,
      pageBack 
    }: IPageOption
  )
  {
    super({ tag: 'div', className, text });
    this.appendChildren([pageBack, pageFront]);
    this.pageFront = pageFront;
    this.pageBack = pageBack;
  }

  public getPageFront()
  {
    return this.pageFront;
  }

  public getPageBack()
  {
    return this.pageBack;
  }
}