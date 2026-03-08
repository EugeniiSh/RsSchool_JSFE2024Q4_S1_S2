import { Component } from '../../common/component';
import { CommonButton } from '../../button/common-button';

export interface IStartCardStyleList
{
  startCardContainer: string;
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

    const closeButton = new CommonButton
    (
      {
        className: [style.closeButton],
        text: 'close',
        items: [],
        clickListener:  this.closeButtonListener,
      }
    );

    this.append(closeButton);
  }

  public setCloseHandler(func: () => void): void
  {
    this.closeHandler = func;
  }
}