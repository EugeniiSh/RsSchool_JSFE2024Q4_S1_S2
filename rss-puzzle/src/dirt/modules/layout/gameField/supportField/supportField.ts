import { Component } from '../../common/component';
import { TranslationBlock } from './blocks/translation/translation';
import { DifficultyBlock } from './blocks/difficulty/difficulty';
import { type PlayField, type TStatusForBgImg } from '../../../shared/index';

import { PuzzleGameExternalStorage } from '../../../storage/external';
import { PuzzleGameStorage, type TStorageValue, type TLastLevelAndRound } from '../../../storage/local';
import { TCustomEventList } from '../../../events/custom';

export interface ISupportFieldStyleList
{
  supportField: string;
}

export interface ISupportFieldOption
{
  className: string[];
  text: string;
  style: ISupportFieldStyleList;
  difficultyBlock: DifficultyBlock;
  translationBlock: TranslationBlock;
  externalStorage: PuzzleGameExternalStorage;
  localStorage: PuzzleGameStorage;
  eventList: TCustomEventList;
}

export class SupportField extends Component
{
  protected className: string[];

  protected style: ISupportFieldStyleList;

  protected difficultyBlock: DifficultyBlock;

  protected translationBlock: TranslationBlock;

  protected externalStorage: PuzzleGameExternalStorage;

  protected localStorage: PuzzleGameStorage;

  protected eventList: TCustomEventList;

  protected  playField: PlayField | null;

  constructor
  (
    {
      className,
      text,
      style,
      difficultyBlock,
      translationBlock,
      externalStorage,
      localStorage,
      eventList,
    }: ISupportFieldOption
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.difficultyBlock = difficultyBlock.getDifficultyBlock();
    this.difficultyBlock.setGoToChoosedRoundFunc(this.goToChoosedRound);
    this.translationBlock = translationBlock.getTranslationBlock();
    this.translationBlock.setImageHintToggle(this.changeStatusBgImgPlayFieldCurrentLine);
    this.externalStorage = externalStorage;
    this.localStorage = localStorage;
    this.eventList = eventList;
    this.playField = null;

    this.append(this.difficultyBlock);
    this.append(this.translationBlock);
  }

  public showHints(): void
  {
    this.translationBlock.toggleTextTranslationVisibility(true);
    this.translationBlock.toggleAudioTranslationVisibility(true);

    this.changeStatusBgImgPlayFieldCurrentLine('on');
  }

  public setPlayField(newPlayField: PlayField): void
  {
    this.playField = newPlayField;
  }

  public goToChoosedRound = (userData: TStorageValue, newLastGame: TLastLevelAndRound): void =>
  {
    if(this.playField)
    {
      this.playField.mutableUpdateUserGameProgress(userData.game, 'custom-choice', newLastGame);
      this.localStorage.setValue(userData);
      this.dispatchSomeEvent(this.eventList.start());
    } 
  }

  public changeStatusBgImgPlayFieldCurrentLine = (status: TStatusForBgImg) =>
  {
    if(this.playField) this.playField.setStatusBgImgForCurrentLine(status);
  }


  public async updateSupportField(): Promise<void>
  {
    const playerProgress = this.localStorage.getValue().game;
    const contentData = await this.externalStorage.getData(playerProgress.last.level);

    const lastSentence = contentData
    .rounds[playerProgress.last.round]
    .words[playerProgress.last.sentense];

    const newTranslationText = lastSentence.textExampleTranslate;
    const newAudioTranslation = this.externalStorage.getAudioPath(lastSentence);

    this.translationBlock.updateTranslation(newTranslationText, newAudioTranslation);
    this.difficultyBlock.updateDifficulty();
  }

  public getSupportField(): SupportField
  {
    return new SupportField
    (
      {
        className: this.className,
        text: '',
        style: this.style,
        difficultyBlock: this.difficultyBlock.getDifficultyBlock(),
        translationBlock: this.translationBlock.getTranslationBlock(),
        externalStorage: this.externalStorage,
        localStorage: this.localStorage,
        eventList: this.eventList,
      }
    )
  }
}



