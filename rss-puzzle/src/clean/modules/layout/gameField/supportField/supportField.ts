import { Component } from '../../common/component';
import { TranslationBlock } from './blocks/translation/translation';
import { type PlayField, type TStatusForBgImg } from '../../../shared/index';

import { PuzzleGameExternalStorage } from '../../../storage/external';
import { PuzzleGameStorage } from '../../../storage/local';

export interface ISupportFieldStyleList {
  supportField: string;
}

export interface ISupportFieldOption {
  className: string[];
  text: string;
  style: ISupportFieldStyleList;
  translationBlock: TranslationBlock;
  externalStorage: PuzzleGameExternalStorage;
  localStorage: PuzzleGameStorage;
}

export class SupportField extends Component {
  protected className: string[];

  protected style: ISupportFieldStyleList;

  protected translationBlock: TranslationBlock;

  protected externalStorage: PuzzleGameExternalStorage;

  protected localStorage: PuzzleGameStorage;

  protected playField: PlayField | null;

  constructor({
    className,
    text,
    style,
    translationBlock,
    externalStorage,
    localStorage,
  }: ISupportFieldOption) {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.translationBlock = translationBlock.getTranslationBlock();
    this.translationBlock.setImageHintToggle(
      this.changeStatusBgImgPlayFieldCurrentLine,
    );
    this.externalStorage = externalStorage;
    this.localStorage = localStorage;
    this.playField = null;

    this.append(this.translationBlock);
  }

  public showHints(): void {
    this.translationBlock.toggleTextTranslationVisibility(true);
    this.translationBlock.toggleAudioTranslationVisibility(true);

    this.changeStatusBgImgPlayFieldCurrentLine('on');
  }

  public setPlayField(newPlayField: PlayField): void {
    this.playField = newPlayField;
  }

  public changeStatusBgImgPlayFieldCurrentLine = (status: TStatusForBgImg) => {
    if (this.playField) this.playField.setStatusBgImgForCurrentLine(status);
  };

  public async updateSupportField(): Promise<void> {
    const playerProgress = this.localStorage.getValue().game;
    const contentData = await this.externalStorage.getData(
      playerProgress.last.level,
    );

    const lastSentence =
      contentData.rounds[playerProgress.last.round].words[
        playerProgress.last.sentense
      ];

    const newTranslationText = lastSentence.textExampleTranslate;
    const newAudioTranslation = this.externalStorage.getAudioPath(lastSentence);

    this.translationBlock.updateTranslation(
      newTranslationText,
      newAudioTranslation,
    );
  }

  public getSupportField(): SupportField {
    return new SupportField({
      className: this.className,
      text: '',
      style: this.style,
      translationBlock: this.translationBlock.getTranslationBlock(),
      externalStorage: this.externalStorage,
      localStorage: this.localStorage,
    });
  }
}
