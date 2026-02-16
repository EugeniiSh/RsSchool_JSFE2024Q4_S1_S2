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

export interface IButtonContainerExternalMethods
{
  collectSentenceInRightOrder: () => void;
  goToNextSentence: () => void;
  toggleWordValidationHighligh: (isHighligh: boolean) => void;
  showRoundResults: () => void;
}

export interface IButtonContainerOptions
{
  className: string[],
  text: string,
  style: IButtonContainerStyleList,
  parentMethods?: IButtonContainerExternalMethods,
  effectSpark?: (arg: Component) => void
}

export class ButtonContainer extends Component
{
  protected className: string[];

  protected style: IButtonContainerStyleList;

  protected parentMethods?: IButtonContainerExternalMethods;

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

  protected supportButtonState: 'help' | 'results';

  protected autoCompleteButtonOption: ICommonButtonOptions;

  protected autoCompleteButton: CommonButton;

  protected resultsButtonOption: ICommonButtonOptions;

  protected resultsButton: CommonButton;

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

    this.resultsButtonOption =
    {
      className: 
      [
        this.style.buttonSentence,
        this.style.buttonSentenceHidden,
      ],
      text: "results",
      items: [],
      clickListener: () => { this.handleClickResultsButton() },
    }

    this.motivationButtonState = 'check';
    this.supportButtonState = 'help';

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
    this.resultsButton = new CommonButton(this.resultsButtonOption);
    this.supportButtonWraper = new Component
    (
      this.supportWrapperButtonOption,
      this.autoCompleteButton,
      this.resultsButton
    )
    

    this.appendChildren([this.supportButtonWraper, this.motivationButtonWrapper]);
  }

  protected handleClickCheckButton(): void
  {
    if(this.parentMethods)
    {
      this.parentMethods.toggleWordValidationHighligh(true);
    }
  }

  protected handleClickNextButton(): void
  {
    if(this.parentMethods)
    {
      this.parentMethods.goToNextSentence();
    }
  }

  protected handleClickAutoComleteButton()
  {
    if(this.parentMethods)
    {
      this.parentMethods.collectSentenceInRightOrder();
    }
  }

  protected handleClickResultsButton()
  {
    if(this.parentMethods)
    {
      this.parentMethods.showRoundResults();
    }
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

  public toggleVisibleSupportButton(visibleButton: 'help' | 'results')
  {
    if(visibleButton === 'help')
    {
      this.resultsButton.toggleClass(this.style.buttonSentenceHidden, true);
      this.autoCompleteButton.toggleClass(this.style.buttonSentenceHidden, false);
      if(this.sparkEffect) this.sparkEffect(this.autoCompleteButton);

      this.supportButtonState = visibleButton;

      return;
    }

    this.autoCompleteButton.toggleClass(this.style.buttonSentenceHidden, true);
    this.resultsButton.toggleClass(this.style.buttonSentenceHidden, false);
    if(this.sparkEffect && this.supportButtonState === 'help')
    {
      this.sparkEffect(this.resultsButton);
    } 

    this.supportButtonState = visibleButton;
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

  public setParentMethods(methods: IButtonContainerExternalMethods): void
  {
    this.parentMethods = methods;
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

