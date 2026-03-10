import { Component } from '../../common/component';
import { CommonButton } from '../../button/common-button';

export interface IStartCardStyleList
{
  startCardContainer: string;
  cardText: string;
  closeButton: string;
}

export interface IStartCardOption
{
  className: string[];
  text: string;
  style: IStartCardStyleList;
}

export class StartCard extends Component
{
  protected className: string[];

  protected style: IStartCardStyleList;

  protected closeHandler: () => void;

  protected closeButtonListener: () => void;

  constructor
  (
    {
      className,
      text,
      style,
    }: IStartCardOption
  )
  {
    super({tag: 'div', className, text});
    this.className = className;
    this.style = style;
    this.closeHandler = () => {};
    this.closeButtonListener = () => this.closeHandler();

    const textContent: [string, string[]][] =
    [
      ['please keep this card in book pocket', [this.style.cardText]],
      ['bl 23154 631', [this.style.cardText]],
      ['free magic library', [this.style.cardText]],
      ['28.6', [this.style.cardText]],
      ['valerydluski, EugeniiSh', [this.style.cardText]],
      ['c47', [this.style.cardText]],
      ['rolling scopes school puzzle - game', [this.style.cardText]],
      ['educational project. stage 2. mar 5 2024 - ?', [this.style.cardText]],
      ["A magical world of the new and unknown awaits you. Immerse yourself in a captivating journey through the world of English. You'll learn new words, phrases, and pronunciation through play. And as a reward, you'll see beautiful works of art. Learn and be inspired.", [this.style.cardText]],
      ['28.6', [this.style.cardText]],
    ]

    const textComponents = textContent
    .map(([textPart, stylePart]) => 
    new Component({tag: 'div', className: [...stylePart], text: textPart}));
    
    const closeButton = new CommonButton
    (
      {
        className: [style.closeButton],
        text: 'close',
        items: [],
        clickListener:  this.closeButtonListener,
      }
    );

    this.appendChildren([...textComponents, closeButton]);
  }

  public setCloseHandler(func: () => void): void
  {
    this.closeHandler = func;
  }
}