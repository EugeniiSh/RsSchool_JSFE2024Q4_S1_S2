import { Component } from '../../../../common/component';
import { PuzzleGameStorage } from '../../../../../storage/local';
import { DifficultyLevels } from './difficultyLevels';
import { DifficultyRounds } from './difficultyRounds';

export interface IDifficultyBlockStyleList
{
  difficultyBlock: string;
}

export interface IDifficultyBlockOption
{
  className: string[];
  text: string;
  style: IDifficultyBlockStyleList;
  localStorage: PuzzleGameStorage;
  difficultyLevels: DifficultyLevels;
  difficultyRounds: DifficultyRounds;
}

export class DifficultyBlock extends Component
{
  protected className: string[];

  protected style: IDifficultyBlockStyleList;

  protected localStorage: PuzzleGameStorage;

  protected difficultyLevels: DifficultyLevels;

  protected difficultyRounds: DifficultyRounds;

  protected isFirstRenderDifficultyBlock: boolean;

  constructor
  (
    {
      className,
      text,
      style,
      localStorage,
      difficultyLevels,
      difficultyRounds,
    }: IDifficultyBlockOption
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.localStorage = localStorage;
    this.difficultyLevels = difficultyLevels.getDifficultyLevels();
    this.difficultyRounds = difficultyRounds.getDifficultyRounds();
    this.isFirstRenderDifficultyBlock = true;

    this.difficultyLevels.setRenderRoundFunc(this.difficultyRounds.renderCurrentDifficultyRounds);

    this.append(this.difficultyLevels);
    this.append(this.difficultyRounds);
  }

  public updateDifficulty(): void
  {
    if(!this.isFirstRenderDifficultyBlock) return;
    this.isFirstRenderDifficultyBlock = false;

    const playerProgress = this.localStorage.getValue();
    const lastLevel = playerProgress.game.last.level;

    this.difficultyLevels.setActiveLevelBlock(lastLevel);
    this.difficultyRounds.renderCurrentDifficultyRounds(lastLevel);
  }

  public getDifficultyBlock(): DifficultyBlock
  {
    return new DifficultyBlock
    (
      {
        className: this.className,
        text: '',
        style: this.style,
        localStorage: this.localStorage,
        difficultyLevels: this.difficultyLevels.getDifficultyLevels(),
        difficultyRounds: this.difficultyRounds.getDifficultyRounds(),
      }
    )
  }
}