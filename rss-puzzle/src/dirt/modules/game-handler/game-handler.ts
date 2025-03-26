import * as comp from '../layout/common/component';
import { TCustomEventNames } from '../events/custom';
import { Book } from '../layout/book/book';

export type TCustomEventListeners = Record<TCustomEventNames, EventListener>;

export interface IGameHandlerOptions
{
  className: string[];
  text: string;
  items: comp.Component[];
  book: Book;
  customEventListeners: TCustomEventListeners;
}

export class GameHandler extends comp.Component
{
  private forCustomEventListeners: { [key: string]: EventListener } = {};

  protected disableUICount = 0;

  protected book: Book

  constructor
  (
    { 
      className, 
      text, 
      items,
      book,
      customEventListeners
    }: IGameHandlerOptions
  )
  {
    super({ tag: 'div', className, text });
    this.appendChildren(items);
    this.book = book;

    const keys = Object.keys(customEventListeners) as TCustomEventNames[]
    keys.forEach((key) =>
    {
      const handlerName = `on${key[0].toUpperCase()}${key.slice(1)}`;
      this.forCustomEventListeners[handlerName] = customEventListeners[key].bind(this);
      this.addListener(key, this.forCustomEventListeners[handlerName]);
    })
  }

  static disableEvent(event: Event)
  {
    event.preventDefault();
    event.stopPropagation();
  }

  destroy()
  {
    const keys = Object.keys(this.forCustomEventListeners);
    keys.forEach((key) =>
    {
      const handlerName = `${key[2].toLowerCase()}${key.slice(3)}`;
      this.removeListener(handlerName, this.forCustomEventListeners[key]);
    });

    super.destroy();
  }
}