import { Component } from '../../../../common/component';
import { CommonButton } from '../../../../button/common-button';

export interface ISwitchTranslationStyleList
{
  switchTranslation: string;
  button: string;
  buttonAble: string;
  buttonDisable: string;
}

export interface ISwitchTranslationOption
{
  className: string[];
  text: string;
  style: ISwitchTranslationStyleList;
}

export class SwitchTranslation extends Component
{
  protected className: string[];

  protected style: ISwitchTranslationStyleList;

  protected textButton: CommonButton;

  protected handlerClickTextButton: () => void;

  constructor
  (
    {
      className,
      text,
      style,
    }: ISwitchTranslationOption
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.handlerClickTextButton = () => {};

    this.textButton = new CommonButton
    (
      {
        className: [this.style.button, this.style.buttonAble],
        text: 'Aa',
        items: [],
        clickListener: () => {this.handlerClickTextButton()}
      }
    )

    this.append(this.textButton);
  }

  public setHandlerClickTextButton(func: () => void): void
  {
    this.handlerClickTextButton = func;
  }

  public toggleStatusTextButton(status: boolean): void
  {
    if(!status)
    {
      this.textButton.toggleClass(this.style.buttonAble, false);
      this.textButton.toggleClass(this.style.buttonDisable, true);
      return;
    }

    this.textButton.toggleClass(this.style.buttonAble, true);
    this.textButton.toggleClass(this.style.buttonDisable, false);
  }

  public getSwitchTranslation(): SwitchTranslation
  {
    return new SwitchTranslation
    (
      {
        className: this.className,
        text: '',
        style: this.style,
      }
    )
  }
}