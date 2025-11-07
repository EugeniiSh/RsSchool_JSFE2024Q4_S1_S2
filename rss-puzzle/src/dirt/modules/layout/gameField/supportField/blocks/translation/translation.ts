import { Component } from '../../../../common/component';
import { AbleTranslation } from './able';

export interface ITranslationBlockStyleList
{
  translationBlock: string;
  header: string;
  content: string;
}

export interface ITranslationBlockOption
{
  className: string[];
  text: string;
  style: ITranslationBlockStyleList;
  ableTranslation: AbleTranslation;
}

export class TranslationBlock extends Component
{
  protected className: string[];

  protected style: ITranslationBlockStyleList;

  protected content: Component;

  protected ableTranslation: AbleTranslation;

  constructor
  (
    {
      className,
      text,
      style,
      ableTranslation
    }: ITranslationBlockOption
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.ableTranslation = ableTranslation;

    const header = new Component
    (
      {
        tag: 'div',
        className: [this.style.header],
        text: 'translation / перевод'
      }
    );

    this.content = new Component
    (
      {
        tag: 'div',
        className: [this.style.content],
        text: ''
      },

      this.ableTranslation.getAbleTranslation('')
    );

    this.append(header);
    this.append(this.content);
  }

  public updateTranslation(newTranslationText: string): void
  {
    this.content.destroyChildren();
    this.content.append(this.ableTranslation.getAbleTranslation(newTranslationText));
  }

  public getTranslationBlock(): TranslationBlock
  {
    return new TranslationBlock
    (
      {
        className: this.className,
        text: '',
        style: this.style,
        ableTranslation: this.ableTranslation,
      }
    )
  }
}