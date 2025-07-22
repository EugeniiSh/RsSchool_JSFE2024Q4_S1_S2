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

  protected refToParentToggleWordValidationHighligh: (isHighligh: boolean) => void;

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
    this.refToParentToggleWordValidationHighligh = () => {};
    this.refToParentGoToNextSentence = () => {};

    this.checkButtonOption =
    {
      className: [this.style.buttonSentence, this.style.buttonSentenceDisabled],
      text: 'check',
      items: [],
      clickListener: () => { this.handleClickCheckButton() },
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

  protected handleClickCheckButton(): void
  {
    this.refToParentToggleWordValidationHighligh(true);
  }

  protected handleClickNextButton(): void
  {
    this.refToParentGoToNextSentence();
  }

  public setFuncToggleWordValidationHighligh(func: (arg: boolean) => void): void
  {
    this.refToParentToggleWordValidationHighligh = func;
  }

  public setFuncGoToNextSentence(func: () => void): void
  {
    this.refToParentGoToNextSentence = func;
  }

  public changeStatusCheckButton(status: boolean): void
  {
    if(this.checkButton.changeStatus)
    {
      this.checkButton.changeStatus(status);
    }
  }

  public changeStatusNextButton(status: boolean): void
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

