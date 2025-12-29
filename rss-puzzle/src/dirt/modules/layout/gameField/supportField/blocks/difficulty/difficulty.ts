import { Component } from '../../../../common/component';
import { Loader } from '../../../../../loader/loader';

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
}

export class DifficultyBlock extends Component
{
  protected className: string[];

  protected style: IDifficultyBlockStyleList;

  protected loader: Loader;

  protected activeLoader: Loader | null;

  constructor
  (
    {
      className,
      text,
      style,
      loader,
    }: IDifficultyBlockOption
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.loader = loader;
    this.activeLoader = null;
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
      }
    )
  }
}