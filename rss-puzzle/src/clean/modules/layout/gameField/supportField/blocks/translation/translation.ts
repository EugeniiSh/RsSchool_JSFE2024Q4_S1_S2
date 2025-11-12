import { Component } from '../../../../common/component';
import { TextTranslation } from './textTranslation';

export interface ITranslationBlockStyleList {
  translationBlock: string;
  header: string;
  content: string;
}

export interface ITranslationBlockOption {
  className: string[];
  text: string;
  style: ITranslationBlockStyleList;
  textTranslation: TextTranslation;
}

export class TranslationBlock extends Component {
  protected className: string[];

  protected style: ITranslationBlockStyleList;

  protected content: Component;

  protected textTranslation: TextTranslation;

  constructor({
    className,
    text,
    style,
    textTranslation,
  }: ITranslationBlockOption) {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.textTranslation = textTranslation.getTextTranslation();

    const header = new Component({
      tag: 'div',
      className: [this.style.header],
      text: 'translation / перевод',
    });

    this.content = new Component(
      {
        tag: 'div',
        className: [this.style.content],
        text: '',
      },

      this.textTranslation,
    );

    this.append(header);
    this.append(this.content);
  }

  public updateTranslation(newTranslationText: string): void {
    this.textTranslation.updateTextTranslation(newTranslationText);
  }

  public getTranslationBlock(): TranslationBlock {
    return new TranslationBlock({
      className: this.className,
      text: '',
      style: this.style,
      textTranslation: this.textTranslation.getTextTranslation(),
    });
  }
}
