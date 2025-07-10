import { Component } from '../../../common/component';
import { CommonButton, ICommonButtonOptions } from '../../../button/common-button';



export interface IButtonContainerStyleList
{
  buttonSentence: string,
  buttonSentenceDisabled: string,
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

  protected checkButtonOption: ICommonButtonOptions;

  protected nextButtonOption: ICommonButtonOptions;

  protected checkButton: CommonButton;

  protected nextButton: CommonButton;

  protected refToParentGoToNextSentence: () => void;

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
    this.refToParentGoToNextSentence = () => {};

    this.checkButtonOption =
    {
      className: [this.style.buttonSentence, this.style.buttonSentenceDisabled],
      text: 'check',
      items: [],
      clickListener: () => { },
      changeStatus(this: CommonButton, status)
      {
        this.toggleClass(style.buttonSentenceDisabled, !status);
      }
    }

    this.nextButtonOption =
    {
      className: [this.style.buttonSentence, this.style.buttonSentenceDisabled],
      text: 'next',
      items: [],
      clickListener: () => { this.handleClickNextButton() },
      changeStatus(this: CommonButton, status)
      {
        this.toggleClass(style.buttonSentenceDisabled, !status);
      }
    }

    this.checkButton = new CommonButton(this.checkButtonOption);
    this.nextButton = new CommonButton(this.nextButtonOption);

    this.appendChildren([this.checkButton, this.nextButton]);
  }

  protected handleClickNextButton()
  {
    this.refToParentGoToNextSentence();
  }

  public setFuncGoToNextSentence(func: () => void)
  {
    this.refToParentGoToNextSentence = func;
  }

  public changeStatusCheckButton(status: boolean)
  {
    if(this.checkButton.changeStatus)
    {
      this.checkButton.changeStatus(status);
    }
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

