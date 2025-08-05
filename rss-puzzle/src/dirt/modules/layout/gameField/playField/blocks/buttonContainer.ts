import { Component, IComponentOptions } from '../../../common/component';
import { CommonButton, ICommonButtonOptions } from '../../../button/common-button';



export interface IButtonContainerStyleList
{
  buttonWrapper: string;
  supportButtonWrapper: string;
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
  effectSpark?: (arg: Component) => void
}

export class ButtonContainer extends Component
{
  protected className: string[];

  protected style: IButtonContainerStyleList;

  protected sparkEffect?: (arg: Component) => void;

  protected motivationWrapperButtonOption: IComponentOptions;

  protected motivationButtonWrapper: Component;

  protected motivationButtonState: 'next' | 'check';

  protected checkButtonOption: ICommonButtonOptions;

  protected checkButton: CommonButton;

  protected nextButtonOption: ICommonButtonOptions;

  protected nextButton: CommonButton;

  protected supportWrapperButtonOption: IComponentOptions;

  protected supportButtonWraper: Component;

  protected autoCompleteButtonOption: ICommonButtonOptions;

  protected autoCompleteButton: CommonButton;


  protected refToParentToggleWordValidationHighligh: (isHighligh: boolean) => void;

  protected refToParentGoToNextSentence: () => void;

  protected refToParentCollectSentenceInRightOrder: () => void;

  constructor
  (
    {
      className,
      text,
      style,
      effectSpark
    }: IButtonContainerOptions
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.refToParentToggleWordValidationHighligh = () => {};
    this.refToParentGoToNextSentence = () => {};
    this.refToParentCollectSentenceInRightOrder = () => {};
    if(effectSpark) this.sparkEffect = effectSpark;

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

    this.autoCompleteButtonOption = 
    {
      className: [this.style.buttonSentence],
      text: "help!",
      items: [],
      clickListener: () => { this.handleClickAutoComleteButton() },
    }

    this.motivationButtonState = 'check';

    this.motivationWrapperButtonOption =
    {
      tag: 'div',
      className: [this.style.buttonWrapper, this.style.motivationButtonWrapper],
      text: '',
    }

    this.supportWrapperButtonOption =
    {
      tag: 'div',
      className: [this.style.buttonWrapper, this.style.supportButtonWrapper],
      text: '',
    }

    this.checkButton = new CommonButton(this.checkButtonOption);
    this.nextButton = new CommonButton(this.nextButtonOption);
    this.motivationButtonWrapper = new Component
    (
      this.motivationWrapperButtonOption,
      this.checkButton,
      this.nextButton
    );

    this.autoCompleteButton = new CommonButton(this.autoCompleteButtonOption);
    this.supportButtonWraper = new Component
    (
      this.supportWrapperButtonOption,
      this.autoCompleteButton
    )
    

    this.appendChildren([this.supportButtonWraper, this.motivationButtonWrapper]);
  }

  protected handleClickCheckButton(): void
  {
    this.refToParentToggleWordValidationHighligh(true);
  }

  protected handleClickNextButton(): void
  {
    this.refToParentGoToNextSentence();
  }

  protected handleClickAutoComleteButton()
  {
    this.refToParentCollectSentenceInRightOrder();
  }

  public toggleVisibleMotivationButton(visibleButton: 'next' | 'check')
  {
    if(visibleButton === 'next')
    {
      this.checkButton.toggleClass(this.style.buttonSentenceHidden, true);
      this.nextButton.toggleClass(this.style.buttonSentenceHidden, false);
      if(this.sparkEffect) this.sparkEffect(this.nextButton);

      this.motivationButtonState = visibleButton;

      return;
    }

    this.nextButton.toggleClass(this.style.buttonSentenceHidden, true);
    this.checkButton.toggleClass(this.style.buttonSentenceHidden, false);
    if(this.sparkEffect && this.motivationButtonState === 'next')
    {
      this.sparkEffect(this.checkButton);
    } 

    this.motivationButtonState = visibleButton;
  }

  public setFuncToggleWordValidationHighligh(func: (arg: boolean) => void): void
  {
    this.refToParentToggleWordValidationHighligh = func;
  }

  public setFuncGoToNextSentence(func: () => void): void
  {
    this.refToParentGoToNextSentence = func;
  }

  public setFuncCollectSentenceInRightOrder(func: () => void): void
  {
    this.refToParentCollectSentenceInRightOrder = func;
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
        effectSpark: this.sparkEffect,
      }
    )
  }
}

