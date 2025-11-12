import { Component } from '../../../../common/component';
import {
  CommonButton,
  ICommonButtonOptions,
} from '../../../../button/common-button';

export interface ITextTranslationStyleList {
  textTranslation: string;
  textBlock: string;
  textBlockVisible: string;
  textBlockHidden: string;
  textBlockStatusActive: string;
  buttonBlock: string;
  buttonBlockAble: string;
  buttonBlockDisable: string;
}

export interface ITextTranslationOption {
  className: string[];
  text: string;
  style: ITextTranslationStyleList;
}

export class TextTranslation extends Component {
  protected className: string[];

  protected style: ITextTranslationStyleList;

  protected currentText: string;

  protected isVisible: boolean;

  protected textBlock: Component;

  protected visibleText: Component;

  protected hiddenText: Component;

  protected buttonBlock: CommonButton;

  constructor({ className, text, style }: ITextTranslationOption) {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.currentText = text;
    this.isVisible = true;

    this.visibleText = new Component({
      tag: 'div',
      className: [style.textBlockVisible],
      text: this.currentText,
    });

    this.hiddenText = new Component({
      tag: 'div',
      className: [style.textBlockHidden],
      text: this.currentText,
    });

    this.textBlock = new Component(
      {
        tag: 'div',
        className: [style.textBlock],
        text: this.currentText,
      },
      this.visibleText,
      this.hiddenText,
    );

    const buttonBlockOption: ICommonButtonOptions = {
      className: [style.buttonBlock, style.buttonBlockAble],
      text: '',
      items: [],
      clickListener: this.handlerClickButtonBlock,
    };

    this.buttonBlock = new CommonButton(buttonBlockOption);

    this.append(this.textBlock);
    this.append(this.buttonBlock);
  }

  protected handlerClickButtonBlock = () => {
    this.toggleVisible();
  };

  protected toggleVisible(): void {
    if (this.isVisible) {
      this.hiddenText.toggleClass(this.style.textBlockStatusActive, true);
      this.visibleText.toggleClass(this.style.textBlockStatusActive, false);
      this.buttonBlock.toggleClass(this.style.buttonBlockDisable, true);
      this.buttonBlock.toggleClass(this.style.buttonBlockAble, false);
      this.isVisible = false;
      return;
    }

    this.hiddenText.toggleClass(this.style.textBlockStatusActive, false);
    this.visibleText.toggleClass(this.style.textBlockStatusActive, true);
    this.buttonBlock.toggleClass(this.style.buttonBlockDisable, false);
    this.buttonBlock.toggleClass(this.style.buttonBlockAble, true);
    this.isVisible = true;
  }

  public updateTextTranslation(newTextTranslation: string): void {
    this.visibleText.setTextContent(newTextTranslation);
    this.hiddenText.setTextContent(newTextTranslation.replace(/[^\s]/g, '*'));
    this.currentText = newTextTranslation;
    this.isVisible = true;
    this.toggleVisible();
  }

  public getTextTranslation(): TextTranslation {
    return new TextTranslation({
      className: this.className,
      text: '',
      style: this.style,
    });
  }
}
