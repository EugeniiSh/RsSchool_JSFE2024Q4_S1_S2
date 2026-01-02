import { Component } from '../../../../common/component';
import { Loader } from '../../../../../loader/loader';
import { DifficultyLevels } from './difficultyLevels';

export interface IDifficultyBlockStyleList
{
  difficultyBlock: string;
}

export interface IDifficultyBlockOption
{
  className: string[];
  text: string;
  style: IDifficultyBlockStyleList;
  loader: Loader;
  difficultyLevels: DifficultyLevels;
}

export class DifficultyBlock extends Component
{
  protected className: string[];

  protected style: IDifficultyBlockStyleList;

  protected loader: Loader;

  protected activeLoader: Loader | null;

  protected difficultyLevels: DifficultyLevels;

  constructor
  (
    {
      className,
      text,
      style,
      loader,
      difficultyLevels,
    }: IDifficultyBlockOption
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.loader = loader;
    this.activeLoader = null;
    this.difficultyLevels = difficultyLevels.getDifficultyLevels();

    this.append(this.difficultyLevels);
  }

  protected loadLoader(): void
  {
    this.deleteLoader();

    this.activeLoader = this.loader.getLoader();
    this.append(this.activeLoader);

    this.activeLoader.start();
  }

  protected deleteLoader(): void
  {
    if(this.activeLoader)
    {
      this.activeLoader.stop();
      this.activeLoader.destroy();
      this.activeLoader = null;
    } 
  }

  public getDifficultyBlock(): DifficultyBlock
  {
    return new DifficultyBlock
    (
      {
        className: this.className,
        text: '',
        style: this.style,
        loader: this.loader,
        difficultyLevels: this.difficultyLevels.getDifficultyLevels(),
      }
    )
  }
}