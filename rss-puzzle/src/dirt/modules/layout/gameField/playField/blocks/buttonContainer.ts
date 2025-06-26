import { Component } from '../../../common/component';
import { CommonButton, ICommonButtonOptions } from '../../../button/common-button';



export interface IButtonContainerStyleList
{
  buttonNext: string,
  buttonNextDisabled: string,
}

export interface IButtonContainerOptions
{
  className: string[],
  text: string,
  style: IButtonContainerStyleList,
}

export class ButtonContainer extends Component
{
  protected className: string[];

  protected style: IButtonContainerStyleList;

  protected nextButtonOption: ICommonButtonOptions;

  protected nextButton: CommonButton;

  constructor
  (
    {
      className,
      text,
      style,
    }: IButtonContainerOptions
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;

    this.nextButtonOption =
    {
      className: [this.style.buttonNext, this.style.buttonNextDisabled],
      text: 'next',
      items: [],
      clickListener: () => { console.log('click next') },
      changeStatus(this: CommonButton, status)
      {
        this.toggleClass(style.buttonNextDisabled, !status);
      }
    }

    this.nextButton = new CommonButton(this.nextButtonOption);

    this.appendChildren([this.nextButton]);
  }

  public changeStatusNextButton(status: boolean)
  {
    if(this.nextButton.changeStatus)
    {
      this.nextButton.changeStatus(status);
    }
  }

  public getButtonContainer(): ButtonContainer
  {
    return new ButtonContainer
    (
      {
        className: this.className,
        text: '',
        style: this.style,
      }
    )
  }
}