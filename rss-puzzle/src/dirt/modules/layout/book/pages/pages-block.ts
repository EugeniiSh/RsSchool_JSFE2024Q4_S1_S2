import { Component } from '../../common/component';
import { Page } from './page/page';
import { TCustomEventList,  } from '../../../events/custom';

interface ISimpleTurn
{
  type: 'simple-turn',
  turnPage: Page,
}

interface ITurnAndCreate
{
  type: 'turn-and-create',
  turnPage: Page,
  destroyPage: Page,
}

interface IBackTurn
{
  type: 'back-turn',
  turnPage: Page,
  isLastPage: boolean,
}

export type TTurnPageOption = ISimpleTurn | ITurnAndCreate | IBackTurn;

export interface IPagesBlockOption
{
  className: string[], 
  text: string,
  items: Page[],
  pageCreator: (count: number) => Page[],
  customEventList: TCustomEventList
}

export class PagesBlock extends Component
{
  private zIndex = 1;

  protected createPage: (count: number) => Page[];

  protected customEventList: TCustomEventList;

  constructor
  (
    {
      className, 
      text,
      items,
      pageCreator,
      customEventList
    }: IPagesBlockOption
  )
  {
    super({ tag: 'div', className, text });
    this.prependChildren(items); // Реверс элементов для правильного отображения (наложения друг на друга)
    this.createPage = pageCreator;
    this.customEventList = customEventList;
  }

  protected getAndUpZindex(): number
  {
    const current = this.zIndex;
    this.zIndex += 1;

    return current;
  }

  protected getTurnOffFunc(option: TTurnPageOption)
  {
    const zIndexPage = this.getAndUpZindex().toString();
    const page = option.turnPage;

    if(option.type === 'simple-turn')
    {
      const func = () =>
      {
        page.getNode().style.zIndex = zIndexPage;
        page.removeListener('transitionend', func);
        page.dispatchSomeEvent(this.customEventList.anableUI());
      }

      return func;
    }

    if(option.type === 'back-turn')
    {
      const func = () =>
      {
        page.getNode().style.zIndex = '';
        page.removeListener('transitionend', func);
        page.dispatchSomeEvent(this.customEventList.anableUI());

        if(option.isLastPage)
        {
          this.zIndex = 1;
          page.dispatchSomeEvent(this.customEventList.bookClose());
        }
      }

      return func;
    }

    const { destroyPage } = option;
    const func = () =>
    {
      page.getNode().style.zIndex = zIndexPage;
      page.removeListener('transitionend', func);

      destroyPage.destroy();
      this.prepend(this.createPage(1)[0]);
      page.dispatchSomeEvent(this.customEventList.anableUI());
    }

    return func;
  }

  public firstTurnOverPages(turnOverClass: string, turnOverDelay: number): void
  {
    const pages = this.getChildren() as Page[];
    const zIndexBlock = this.getAndUpZindex().toString();

    setTimeout(() =>
    {
      this.getNode().style.zIndex = zIndexBlock;
    }, 10);

    for(let i = 1; i < 3; i += 1)
    {
      const upperPage = pages[pages.length - i];

      setTimeout(() =>
      {
        const turnOffFunc = this.getTurnOffFunc({ type: 'simple-turn', turnPage: upperPage });

        upperPage.dispatchSomeEvent(this.customEventList.disableUI());
        upperPage.toggleClass(turnOverClass, true);
        upperPage.addListener('transitionend', turnOffFunc);
      }, turnOverDelay * (i * i));
    }
  }

  public backTurnOverPages(turnOverClass: string, turnOverDelay: number): void
  {
    const pages = this.getChildren() as Page[];

    setTimeout(() =>
    {
      this.getNode().style.zIndex = '';
    }, 1000);
    
    for(let i = 0; i < 2; i += 1)
    {
      const upperPage = pages[pages.length - 2 + i];
      const isLast = i === 1;

      setTimeout(() =>
      {
        const turnOffFunc = this.getTurnOffFunc({ type: 'back-turn', turnPage: upperPage, isLastPage: isLast });

        upperPage.dispatchSomeEvent(this.customEventList.disableUI());
        upperPage.toggleClass(turnOverClass, false);
        upperPage.addListener('transitionend', turnOffFunc);
      }, turnOverDelay * i);
    }
  }

  public turnPage
  (
    turnOverClass: string, 
    leftPageContent: Component, 
    rightPageContent: Component,
  )
  {

    const pages = this.getChildren() as Page[];
    const lastPage = pages[0];
    const preLastPage = pages[1];
    const secondPage = pages[2];
    const turnOffFunc = this.getTurnOffFunc
    (
      { 
        type: 'turn-and-create', 
        turnPage: preLastPage,
        destroyPage: secondPage
      }
    ); 

    preLastPage.dispatchSomeEvent(this.customEventList.disableUI());

    lastPage.getPageFront().append(rightPageContent);
    preLastPage.getPageBack().append(leftPageContent);

    preLastPage.toggleClass(turnOverClass);
    preLastPage.addListener('transitionend', turnOffFunc);
  }
}