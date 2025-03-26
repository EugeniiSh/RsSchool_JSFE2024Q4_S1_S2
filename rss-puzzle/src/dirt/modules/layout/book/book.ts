import { Component } from '../common/component';
import { CoverTop } from './cover/cover-top';
import { PagesBlock } from './pages/pages-block';
import { TCustomEventsUI } from '../../events/custom';

export interface IBook
{
  className: string[], 
  text: string,
  items: [CoverTop, PagesBlock, Component],
  coverTop: CoverTop,
  pagesBlock: PagesBlock,
  customEventsUI: TCustomEventsUI
}

export class Book extends Component
{
  private coverTop: CoverTop;

  private pagesBlock: PagesBlock

  protected customEventsUI: TCustomEventsUI

  constructor
  (
    {
      className, 
      text,
      items,
      coverTop,
      pagesBlock,
      customEventsUI
    }: IBook
  )
  {
    super({ tag: 'div', className, text });
    this.prependChildren(items);
    this.coverTop = coverTop;
    this.pagesBlock = pagesBlock;
    this.customEventsUI = customEventsUI;
  }

  protected openCoverEnd = () =>
  {
    this.coverTop.removeListener('transitionend', this.openCoverEnd);
    this.coverTop.dispatchSomeEvent(this.customEventsUI.anableUI);
  }

  public openCover(turnOverClass: string): void
  {
    this.coverTop.dispatchSomeEvent(this.customEventsUI.disableUI);

    // this.coverTop.toggleClass(turnOverClass, true);
    // this.coverTop.addListener('transitionend', this.openCoverEnd);

    // this.pagesBlock.firstTurnOverPages(turnOverClass, 200);

    this.coverTop.scullLaugh();

    setTimeout(() =>
    {
      this.coverTop.toggleClass(turnOverClass, true);
      this.coverTop.addListener('transitionend', this.openCoverEnd);

      this.pagesBlock.firstTurnOverPages(turnOverClass, 400);
    }, 5000);
  }

  public turnPage
  (
    turnOverClass: string, 
    leftPageContent: Component, 
    rightPageContent: Component
  )
  {
    this.pagesBlock.turnPage
    (
      turnOverClass, 
      leftPageContent, 
      rightPageContent
    )
  }
}