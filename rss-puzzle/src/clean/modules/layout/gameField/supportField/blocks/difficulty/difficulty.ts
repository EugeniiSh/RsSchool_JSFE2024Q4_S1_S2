import { Component } from '../../../../common/component';
import {
  PuzzleGameStorage,
  type TStorageValue,
  type TLastLevelAndRound,
} from '../../../../../storage/local';
import { DifficultyLevels } from './difficultyLevels';
import { DifficultyRounds } from './difficultyRounds';
import { DifficultyGoToButton } from './difficultyGoToButton';

export interface IDifficultyBlockStyleList {
  difficultyBlock: string;
}

export interface IDifficultyBlockOption {
  className: string[];
  text: string;
  style: IDifficultyBlockStyleList;
  localStorage: PuzzleGameStorage;
  difficultyLevels: DifficultyLevels;
  difficultyRounds: DifficultyRounds;
  goToButton: DifficultyGoToButton;
}

export type TChildElementName = 'level' | 'round' | 'goto';

export class DifficultyBlock extends Component {
  protected className: string[];

  protected style: IDifficultyBlockStyleList;

  protected localStorage: PuzzleGameStorage;

  protected difficultyLevels: DifficultyLevels;

  protected difficultyRounds: DifficultyRounds;

  protected goToButton: DifficultyGoToButton;

  protected isFirstRenderDifficultyBlock: boolean;

  protected goToChoosedRound: (
    userData: TStorageValue,
    newLastGame: TLastLevelAndRound,
  ) => void;

  constructor({
    className,
    text,
    style,
    localStorage,
    difficultyLevels,
    difficultyRounds,
    goToButton,
  }: IDifficultyBlockOption) {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.localStorage = localStorage;
    this.difficultyLevels = difficultyLevels.getDifficultyLevels();
    this.difficultyRounds = difficultyRounds.getDifficultyRounds();
    this.goToButton = goToButton.getDifficultyGoToButton();
    this.isFirstRenderDifficultyBlock = true;

    this.goToChoosedRound = () => {};

    this.difficultyLevels.setUpdateDifficultyFrom(this.updateDifficulty);
    this.difficultyRounds.setUpdateDifficultyFrom(this.updateDifficulty);
    this.goToButton.setUpdateDifficultyFrom(this.updateDifficulty);

    this.append(this.difficultyLevels);
    this.append(this.difficultyRounds);
    this.append(this.goToButton);
  }

  public setGoToChoosedRoundFunc(
    func: (userData: TStorageValue, newLastGame: TLastLevelAndRound) => void,
  ): void {
    this.goToChoosedRound = func;
  }

  public updateDifficulty = (updateSource?: TChildElementName): void => {
    const playerProgress = this.localStorage.getValue();
    const lastLevel = playerProgress.game.last.level;
    const lastRound = playerProgress.game.last.round;
    const currentLevel = this.difficultyLevels.getActiveLevelBlockIndex();
    const currentRound = this.difficultyRounds.getActiveRoundButtonIndex();

    switch (updateSource) {
      case 'level': {
        const renderStatus =
          this.difficultyRounds.renderCurrentDifficultyRounds(currentLevel);
        renderStatus.then((status) => {
          if (status === 0) return;
          if (currentLevel === 0) return;

          const currentLevelProgress =
            playerProgress.game.progress[currentLevel];
          const isCurrentRound = currentLevel === lastLevel;
          this.difficultyRounds.visualUpdateRoundsStatus(
            currentLevelProgress,
            lastRound,
            isCurrentRound,
          );
        });
        break;
      }

      case 'round': {
        if (currentLevel === 0) {
          Error('Custom: Uncorrect level round for go to button');
          return;
        }

        const goToButtonStatus =
          currentLevel === lastLevel && currentRound === lastRound;
        this.goToButton.setGoToButtonContent(currentLevel, currentRound);
        this.goToButton.setGoToButtonStatus(!goToButtonStatus);
        break;
      }

      case 'goto': {
        const playerChoice = this.goToButton.getGoToButtonContent();
        this.goToChoosedRound(playerProgress, playerChoice);
        break;
      }

      default: {
        if (!this.isFirstRenderDifficultyBlock) return;
        this.isFirstRenderDifficultyBlock = false;

        this.difficultyLevels.setActiveLevelBlock(lastLevel);
        this.goToButton.setGoToButtonContent(lastLevel, lastRound);

        const renderStatus =
          this.difficultyRounds.renderCurrentDifficultyRounds(lastLevel);
        renderStatus.then((status) => {
          if (status === 0) return;

          const currentLevelProgress = playerProgress.game.progress[lastLevel];
          this.difficultyRounds.visualUpdateRoundsStatus(
            currentLevelProgress,
            lastRound,
            true,
          );
        });
      }
    }
  };

  public getDifficultyBlock(): DifficultyBlock {
    return new DifficultyBlock({
      className: this.className,
      text: '',
      style: this.style,
      localStorage: this.localStorage,
      difficultyLevels: this.difficultyLevels.getDifficultyLevels(),
      difficultyRounds: this.difficultyRounds.getDifficultyRounds(),
      goToButton: this.goToButton.getDifficultyGoToButton(),
    });
  }
}
