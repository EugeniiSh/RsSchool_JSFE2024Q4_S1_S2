import { Component } from '../../common/component';
import { TranslationBlock } from './blocks/translation/translation';
import { type PlayField } from '../../../shared/index';

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

  protected currentTranslationBlock: TranslationBlock;

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
    this.translationBlock = translationBlock;
    this.externalStorage = externalStorage;
    this.localStorage = localStorage;
    this.playField = null;

    this.currentTranslationBlock = this.translationBlock.getTranslationBlock();
    this.append(this.currentTranslationBlock);
  }

  public setPlayField(newPlayField: PlayField): void {
    this.playField = newPlayField;
  }

  public async updateSupportField(): Promise<void> {
    const playerProgress = this.localStorage.getValue().game;
    const contentData = await this.externalStorage.getData(
      playerProgress.last.level,
    );

    const newTranslationText =
      contentData.rounds[playerProgress.last.round].words[
        playerProgress.last.sentense
      ].textExampleTranslate;

    this.currentTranslationBlock.updateTranslation(newTranslationText);
  }

  public getSupportField(): SupportField {
    return new SupportField({
      className: this.className,
      text: '',
      style: this.style,
      translationBlock: this.translationBlock,
      externalStorage: this.externalStorage,
      localStorage: this.localStorage,
    });
  }
}
