import { Component } from '../common/component';
import { CoverTop } from './cover/cover-top';
import { PagesBlock } from './pages/pages-block';
import { TCustomEventUI } from '../../events/custom';
import { AccompanySound } from '../../accompanySound/accompanySound';

export interface IBook
{
  className: string[], 
  text: string,
  items: [CoverTop, PagesBlock, Component],
  coverTop: CoverTop,
  pagesBlock: PagesBlock,
  customEventsUI: TCustomEventUI,
  accompanySound: AccompanySound,
}

export class Book extends Component
{
  private coverTop: CoverTop;

  private pagesBlock: PagesBlock;

  protected customEventsUI: TCustomEventUI;

  protected accompanySound: AccompanySound;

  constructor
  (
    {
      className, 
      text,
      items,
      coverTop,
      pagesBlock,
      customEventsUI,
      accompanySound,
    }: IBook
  )
  {
    super({ tag: 'div', className, text });
    this.prependChildren(items);
    this.coverTop = coverTop;
    this.pagesBlock = pagesBlock;
    this.customEventsUI = customEventsUI;
    this.accompanySound = accompanySound;
  }

  protected actionCoverEnd = () =>
  {
    this.coverTop.removeListener('transitionend', this.actionCoverEnd);
    this.coverTop.dispatchSomeEvent(this.customEventsUI.anableUI());
  }

  public openCover(turnOverClass: string): void
  {
    this.coverTop.dispatchSomeEvent(this.customEventsUI.disableUI());
    this.coverTop.scullLaugh();
    setTimeout(() => this.accompanySound.asyncStartEffect('./static/assets/sound/turn-cover.mp3', 5000), 10);

    setTimeout(() =>
    {
      this.coverTop.toggleClass(turnOverClass, true);
      this.coverTop.addListener('transitionend', this.actionCoverEnd);

      this.pagesBlock.firstTurnOverPages(turnOverClass, 400);
    }, 5000);
  }

  public closeCover(turnOverClass: string): void
  {
    this.coverTop.dispatchSomeEvent(this.customEventsUI.disableUI());
    this.pagesBlock.backTurnOverPages(turnOverClass, 600);

    this.accompanySound.startEffect('./static/assets/sound/turn-cover.mp3');

    setTimeout(() =>
    {
      this.coverTop.toggleClass(turnOverClass, false);
      this.coverTop.addListener('transitionend', this.actionCoverEnd);
    }, 1200);
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
    );

    this.accompanySound.startEffect('./static/assets/sound/turn-page.mp3');
  }
}