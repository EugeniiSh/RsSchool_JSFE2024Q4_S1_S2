import { Component } from '../../../../common/component';
import { CommonButton } from '../../../../button/common-button';

export interface ISwitchTranslationStyleList {
  switchTranslation: string;
  button: string;
  buttonAble: string;
  buttonDisable: string;
  buttonText: string;
  buttonAudio: string;
  buttonImg: string;
}

export interface ISwitchTranslationOption {
  className: string[];
  text: string;
  style: ISwitchTranslationStyleList;
}

export class SwitchTranslation extends Component {
  protected className: string[];

  protected style: ISwitchTranslationStyleList;

  protected textButton: CommonButton;

  protected audioButton: CommonButton;

  protected imgButton: CommonButton;

  protected handlerClickTextButton: () => void;

  protected handlerClickAudioButton: () => void;

  protected handlerClickImgButton: () => void;

  constructor({ className, text, style }: ISwitchTranslationOption) {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.handlerClickTextButton = () => {};
    this.handlerClickAudioButton = () => {};
    this.handlerClickImgButton = () => {};

    this.textButton = new CommonButton({
      className: [
        this.style.button,
        this.style.buttonAble,
        this.style.buttonText,
      ],
      text: 'aa',
      items: [],
      clickListener: () => {
        this.handlerClickTextButton();
      },
    });

    this.audioButton = new CommonButton({
      className: [
        this.style.button,
        this.style.buttonAble,
        this.style.buttonAudio,
      ],
      text: '',
      items: [],
      clickListener: () => {
        this.handlerClickAudioButton();
      },
    });

    this.imgButton = new CommonButton({
      className: [
        this.style.button,
        this.style.buttonAble,
        this.style.buttonImg,
      ],
      text: '',
      items: [],
      clickListener: () => {
        this.handlerClickImgButton();
      },
    });

    this.append(this.textButton);
    this.append(this.audioButton);
    this.append(this.imgButton);
  }

  public setHandlerClickTextButton(func: () => void): void {
    this.handlerClickTextButton = func;
  }

  public setHandlerClickAudioButton(func: () => void): void {
    this.handlerClickAudioButton = func;
  }

  public setHandlerClickImgButton(func: () => void): void {
    this.handlerClickImgButton = func;
  }

  public toggleStatusTextButton(status: boolean): void {
    if (!status) {
      this.textButton.toggleClass(this.style.buttonAble, false);
      this.textButton.toggleClass(this.style.buttonDisable, true);
      return;
    }

    this.textButton.toggleClass(this.style.buttonAble, true);
    this.textButton.toggleClass(this.style.buttonDisable, false);
  }

  public toggleStatusAudioButton(status: boolean): void {
    if (!status) {
      this.audioButton.toggleClass(this.style.buttonAble, false);
      this.audioButton.toggleClass(this.style.buttonDisable, true);
      return;
    }

    this.audioButton.toggleClass(this.style.buttonAble, true);
    this.audioButton.toggleClass(this.style.buttonDisable, false);
  }

  public toggleStatusImgButton(status: boolean): void {
    if (!status) {
      this.imgButton.toggleClass(this.style.buttonAble, false);
      this.imgButton.toggleClass(this.style.buttonDisable, true);
      return;
    }

    this.imgButton.toggleClass(this.style.buttonAble, true);
    this.imgButton.toggleClass(this.style.buttonDisable, false);
  }

  public getSwitchTranslation(): SwitchTranslation {
    return new SwitchTranslation({
      className: this.className,
      text: '',
      style: this.style,
    });
  }
}
