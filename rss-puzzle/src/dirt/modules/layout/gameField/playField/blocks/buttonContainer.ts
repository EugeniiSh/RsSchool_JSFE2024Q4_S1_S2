import { Component, IComponentOptions } from '../../../common/component';
import { CommonButton, ICommonButtonOptions } from '../../../button/common-button';



export interface IButtonContainerStyleList
{
  motivationButtonWrapper: string;
  buttonSentence: string,
  buttonSentenceDisabled: string,
  buttonSentenceHidden: string,
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

  protected motivationWrapperButtonOption: IComponentOptions;

  protected checkButtonOption: ICommonButtonOptions;

  protected nextButtonOption: ICommonButtonOptions;

  protected checkButton: CommonButton;

  protected nextButton: CommonButton;

  protected motivationButtonWrapper: Component;

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
      className: 
      [
        this.style.buttonSentence, 
        this.style.buttonSentenceDisabled,
        this.style.buttonSentenceHidden,
      ],
      text: 'next',
      items: [],
      clickListener: () => { this.handleClickNextButton() },
      changeStatus(this: CommonButton, status)
      {
        this.toggleClass(style.buttonSentenceDisabled, !status);
      }
    }

    this.motivationWrapperButtonOption =
    {
      tag: 'div',
      className: [this.style.motivationButtonWrapper],
      text: '',
    }

    this.checkButton = new CommonButton(this.checkButtonOption);
    this.nextButton = new CommonButton(this.nextButtonOption);
    this.motivationButtonWrapper = new Component
    (
      this.motivationWrapperButtonOption,
      this.checkButton,
      this.nextButton
    )

    this.appendChildren([this.motivationButtonWrapper]);
  }

  protected handleClickCheckButton(): void
  {
    this.refToParentToggleWordValidationHighligh(true);
  }

  protected handleClickNextButton(): void
  {
    this.refToParentGoToNextSentence();
  }

  public toggleVisibleMotivationButton(visibleButton: 'next' | 'check')
  {
    if(visibleButton === 'next')
    {
      this.nextButton.toggleClass(this.style.buttonSentenceHidden, false);
      this.checkButton.toggleClass(this.style.buttonSentenceHidden, true);
      return;
    }

    this.nextButton.toggleClass(this.style.buttonSentenceHidden, true);
    this.checkButton.toggleClass(this.style.buttonSentenceHidden, false);
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

