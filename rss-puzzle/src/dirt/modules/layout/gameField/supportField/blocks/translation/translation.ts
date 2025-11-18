import { Component } from '../../../../common/component';
import { TextTranslation } from './textTranslation';
import { SwitchTranslation } from './switchTranslation';

export interface ITranslationBlockStyleList
{
  translationBlock: string;
  header: string;
  content: string;
  disableBlock: string;
}

export interface ITranslationBlockOption
{
  className: string[];
  text: string;
  style: ITranslationBlockStyleList;
  textTranslation: TextTranslation;
  switchTranslation: SwitchTranslation;
}

export class TranslationBlock extends Component
{
  protected className: string[];

  protected style: ITranslationBlockStyleList;

  protected content: Component;

  protected textTranslation: TextTranslation;

  protected switchTranslation: SwitchTranslation;

  protected isTextVisible: boolean;

  constructor
  (
    {
      className,
      text,
      style,
      textTranslation,
      switchTranslation,
    }: ITranslationBlockOption
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.textTranslation = textTranslation.getTextTranslation();
    this.switchTranslation = switchTranslation.getSwitchTranslation();
    this.switchTranslation.setHandlerClickTextButton(this.toggleTextTranslationVisibility);
    this.isTextVisible = true;

    const header = new Component
    (
      {
        tag: 'div',
        className: [],
        text: ''
      },

      new Component
      (
        {
          tag: 'div',
          className: [this.style.header],
          text: 'translation / перевод'
        },
      ),

      this.switchTranslation
    );

    this.content = new Component
    (
      {
        tag: 'div',
        className: [this.style.content],
        text: ''
      },

      this.textTranslation
    );

    this.append(header);
    this.append(this.content);
  }

  protected setCurrentVisibilityTextTranslation()
  {
    if(this.isTextVisible)
    {
      this.textTranslation.toggleClass(this.style.disableBlock, false);
      return;
    }

    this.textTranslation.toggleClass(this.style.disableBlock, true);
  }


  public toggleTextTranslationVisibility = (forceVisible: boolean = false) =>
  {
    if(forceVisible)
    {
      this.textTranslation.toggleClass(this.style.disableBlock, false);
      return;
    }

    if(this.isTextVisible)
    {
      this.textTranslation.toggleClass(this.style.disableBlock, true);
      this.switchTranslation.toggleStatusTextButton(false);
      this.isTextVisible = false;
      return;
    }

    this.textTranslation.toggleClass(this.style.disableBlock, false);
    this.switchTranslation.toggleStatusTextButton(true);
    this.isTextVisible = true;
  }

  public updateTranslation(newTranslationText: string): void
  {
    this.textTranslation.updateTextTranslation(newTranslationText);
    this.setCurrentVisibilityTextTranslation();
  }

  public getTranslationBlock(): TranslationBlock
  {
    return new TranslationBlock
    (
      {
        className: this.className,
        text: '',
        style: this.style,
        textTranslation: this.textTranslation.getTextTranslation(),
        switchTranslation: this.switchTranslation.getSwitchTranslation(),
      }
    )
  }
}