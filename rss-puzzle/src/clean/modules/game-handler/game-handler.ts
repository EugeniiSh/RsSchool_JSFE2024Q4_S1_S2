import * as comp from '../layout/common/component';
import { TCustomEventNames } from '../events/custom';
import { Book } from '../layout/book/book';
import { ModalWindow } from '../layout/modal-window/modal-window';
import { WrapperForm } from '../layout/login-form/wrapper-form';
import { GameFieldHandler } from '../layout/gameField/gameFieldHandler';
import { PuzzleGameStorage } from '../storage/local';

export type TCustomEventListeners = Record<TCustomEventNames, EventListener>;
export type TElementStatusUI = 'disable' | 'anable';

export interface IGameHandlerOptions {
  className: string[];
  text: string;
  items: comp.Component[];
  wrapperForm: WrapperForm;
  book: Book;
  modalWindow: ModalWindow;
  gameFieldHandler: GameFieldHandler;
  customEventListeners: TCustomEventListeners;
  localStorage: PuzzleGameStorage;
  loadListener: EventListener;
}

export class GameHandler extends comp.Component {
  private forCustomEventListeners: { [key: string]: EventListener } = {};

  protected itemStatusUI: Map<comp.Component, TElementStatusUI>;

  protected disableUICount = 0;

  protected wrapperForm: WrapperForm;

  protected book: Book;

  protected modalWindow: ModalWindow;

  protected gameFieldHandler: GameFieldHandler;

  protected localStorage: PuzzleGameStorage;

  protected onLoad: EventListener;

  constructor({
    className,
    text,
    items,
    wrapperForm,
    book,
    modalWindow,
    gameFieldHandler,
    customEventListeners,
    localStorage,
    loadListener,
  }: IGameHandlerOptions) {
    super({ tag: 'div', className, text });
    this.appendChildren(items);
    this.wrapperForm = wrapperForm;
    this.book = book;
    this.modalWindow = modalWindow;
    this.gameFieldHandler = gameFieldHandler;
    this.localStorage = localStorage;
    this.onLoad = loadListener.bind(this);
    window.addEventListener('load', this.onLoad);

    const keys = Object.keys(customEventListeners) as TCustomEventNames[];
    keys.forEach((key) => {
      const handlerName = `on${key[0].toUpperCase()}${key.slice(1)}`;
      this.forCustomEventListeners[handlerName] =
        customEventListeners[key].bind(this);
      this.addListener(key, this.forCustomEventListeners[handlerName]);
    });

    this.itemStatusUI = new Map();

    this.getChildren().forEach((child) => {
      this.itemStatusUI.set(child, 'anable');
    });
  }

  static disableEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  destroy() {
    const keys = Object.keys(this.forCustomEventListeners);
    keys.forEach((key) => {
      const handlerName = `${key[2].toLowerCase()}${key.slice(3)}`;
      this.removeListener(handlerName, this.forCustomEventListeners[key]);
    });

    window.removeEventListener('load', this.onLoad);

    super.destroy();
  }
}
