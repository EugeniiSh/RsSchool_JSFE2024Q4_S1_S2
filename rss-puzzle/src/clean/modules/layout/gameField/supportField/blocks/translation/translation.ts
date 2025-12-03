import { Component } from '../../../../common/component';
import { AudioTranslation } from './audioTranslation';
import { TextTranslation } from './textTranslation';
import { SwitchTranslation } from './switchTranslation';

export interface ITranslationBlockStyleList {
  translationBlock: string;
  header: string;
  content: string;
  disableBlock: string;
  wrapper: string;
  disableContent: string;
}

export interface ITranslationBlockOption {
  className: string[];
  text: string;
  style: ITranslationBlockStyleList;
  audioTranslation: AudioTranslation;
  textTranslation: TextTranslation;
  switchTranslation: SwitchTranslation;
}

export class TranslationBlock extends Component {
  protected className: string[];

  protected style: ITranslationBlockStyleList;

  protected content: Component;

  protected textTranslation: TextTranslation;

  protected diableTextTranslation: Component;

  protected audioTranslation: AudioTranslation;

  protected diableAudioTranslation: Component;

  protected switchTranslation: SwitchTranslation;

  protected isTextVisible: boolean;

  protected isAudioVisible: boolean;

  constructor({
    className,
    text,
    style,
    audioTranslation,
    textTranslation,
    switchTranslation,
  }: ITranslationBlockOption) {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.audioTranslation = audioTranslation.getAudioTranslation();
    this.textTranslation = textTranslation.getTextTranslation();
    this.switchTranslation = switchTranslation.getSwitchTranslation();
    this.switchTranslation.setHandlerClickTextButton(
      this.toggleTextTranslationVisibility,
    );
    this.switchTranslation.setHandlerClickAudioButton(
      this.toggleAudioTranslationVisibility,
    );
    this.isTextVisible = true;
    this.isAudioVisible = true;

    const header = new Component(
      {
        tag: 'div',
        className: [],
        text: '',
      },

      new Component({
        tag: 'div',
        className: [this.style.header],
        text: 'translation / перевод',
      }),

      this.switchTranslation,
    );

    this.diableTextTranslation = new Component({
      tag: 'div',
      className: [this.style.disableContent, this.style.disableBlock],
      text: 'text hint disable',
    });

    const wrapperTextTranslation = new Component(
      {
        tag: 'div',
        className: [this.style.wrapper],
        text: '',
      },
      this.textTranslation,
      this.diableTextTranslation,
    );

    this.diableAudioTranslation = new Component({
      tag: 'div',
      className: [this.style.disableContent, this.style.disableBlock],
      text: 'audio hint disable',
    });

    const wrapperAudioTranslation = new Component(
      {
        tag: 'div',
        className: [this.style.wrapper],
        text: '',
      },
      this.audioTranslation,
      this.diableAudioTranslation,
    );

    this.content = new Component(
      {
        tag: 'div',
        className: [this.style.content],
        text: '',
      },
      wrapperAudioTranslation,
      wrapperTextTranslation,
    );

    this.append(header);
    this.append(this.content);
  }

  protected setCurrentVisibilityTextTranslation() {
    if (this.isTextVisible) {
      this.textTranslation.toggleClass(this.style.disableBlock, false);
      this.diableTextTranslation.toggleClass(this.style.disableBlock, true);
      return;
    }

    this.textTranslation.toggleClass(this.style.disableBlock, true);
    this.diableTextTranslation.toggleClass(this.style.disableBlock, false);
  }

  protected setCurrentVisibilityAudioTranslation() {
    if (this.isAudioVisible) {
      this.audioTranslation.toggleClass(this.style.disableBlock, false);
      this.diableAudioTranslation.toggleClass(this.style.disableBlock, true);
      return;
    }

    this.audioTranslation.toggleClass(this.style.disableBlock, true);
    this.diableAudioTranslation.toggleClass(this.style.disableBlock, false);
  }

  public toggleTextTranslationVisibility = (forceVisible: boolean = false) => {
    if (forceVisible) {
      this.textTranslation.toggleClass(this.style.disableBlock, false);
      this.diableTextTranslation.toggleClass(this.style.disableBlock, true);
      return;
    }

    if (this.isTextVisible) {
      this.textTranslation.toggleClass(this.style.disableBlock, true);
      this.diableTextTranslation.toggleClass(this.style.disableBlock, false);
      this.switchTranslation.toggleStatusTextButton(false);
      this.isTextVisible = false;
      return;
    }

    this.textTranslation.toggleClass(this.style.disableBlock, false);
    this.diableTextTranslation.toggleClass(this.style.disableBlock, true);
    this.switchTranslation.toggleStatusTextButton(true);
    this.isTextVisible = true;
  };

  public toggleAudioTranslationVisibility = (forceVisible: boolean = false) => {
    if (forceVisible) {
      this.audioTranslation.toggleClass(this.style.disableBlock, false);
      this.diableAudioTranslation.toggleClass(this.style.disableBlock, true);
      return;
    }

    if (this.isAudioVisible) {
      this.audioTranslation.toggleClass(this.style.disableBlock, true);
      this.diableAudioTranslation.toggleClass(this.style.disableBlock, false);
      this.switchTranslation.toggleStatusAudioButton(false);
      this.isAudioVisible = false;
      return;
    }

    this.audioTranslation.toggleClass(this.style.disableBlock, false);
    this.diableAudioTranslation.toggleClass(this.style.disableBlock, true);
    this.switchTranslation.toggleStatusAudioButton(true);
    this.isAudioVisible = true;
  };

  public updateTranslation(
    newTranslationText: string,
    newAudioTranslation: string,
  ): void {
    this.textTranslation.updateTextTranslation(newTranslationText);
    this.setCurrentVisibilityTextTranslation();

    this.audioTranslation.updateAudioTranslation(newAudioTranslation);
    this.setCurrentVisibilityAudioTranslation();
  }

  public getTranslationBlock(): TranslationBlock {
    return new TranslationBlock({
      className: this.className,
      text: '',
      style: this.style,
      audioTranslation: this.audioTranslation.getAudioTranslation(),
      textTranslation: this.textTranslation.getTextTranslation(),
      switchTranslation: this.switchTranslation.getSwitchTranslation(),
    });
  }
}
