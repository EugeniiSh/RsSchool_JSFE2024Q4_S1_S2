import { Component } from '../../../../common/component';

export interface IAbleTranslationStyleList
{
  ableTranslation: string;
}

export interface IAbleTranslationOption
{
  className: string[];
  text: string;
  style: IAbleTranslationStyleList;
}

export class AbleTranslation extends Component
{
  protected className: string[];

  protected style: IAbleTranslationStyleList;

  constructor
  (
    {
      className,
      text,
      style,
    }: IAbleTranslationOption
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
  }

  public getAbleTranslation(translationText: string): AbleTranslation
  {
    return new AbleTranslation
    (
      {
        className: this.className,
        text: translationText,
        style: this.style,
      }
    )
  }
}