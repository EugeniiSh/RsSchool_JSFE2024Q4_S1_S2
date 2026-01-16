import { Component } from '../../../../common/component';
import { type TNumberOfLevel } from '../../../../../storage/external';
import { type TLastLevelAndRound } from '../../../../../storage/local';
import { type TChildElementName } from './difficulty';

export interface IDifficultyGoToButtonStyleList
{
  buttonContainer: string;
  buttonText: string;
  active: string;
}

export interface IDifficultyGoToButtonOption
{
  className: string[];
  text: string;
  style: IDifficultyGoToButtonStyleList;
}

export class DifficultyGoToButton extends Component
{
  protected className: string[];

  protected style: IDifficultyGoToButtonStyleList;

  protected activeStatus: boolean;

  protected currentLevel: TNumberOfLevel;

  protected currentRound: number;

  protected goToRoundTextBlock: Component;

  protected goToRoundNumberBlock: Component;

  protected goToLevelTextBlock: Component;

  protected goToLevelNumberBlock: Component;

  protected updateDifficultyFrom: (source: TChildElementName) => void

  constructor
  (
    {
      className,
      text,
      style,
    }: IDifficultyGoToButtonOption
  )
  {
    super({ tag: 'div', className, text  });
    this.className = className;
    this.style = style;
    this.activeStatus = false;
    this.currentLevel = 1;
    this.currentRound = 0;

    this.goToRoundTextBlock = new Component({ tag: 'div', className: [this.style.buttonText], text: 'go to round' });
    this.goToRoundNumberBlock = new Component({ tag: 'div', className: [this.style.buttonText], text: '' });
    this.goToLevelTextBlock = new Component({ tag: 'div', className: [this.style.buttonText], text: 'level' });
    this.goToLevelNumberBlock = new Component({ tag: 'div', className: [this.style.buttonText], text: '' });
    this.appendChildren
    (
      [
        this.goToRoundTextBlock,
        this.goToRoundNumberBlock,
        this.goToLevelTextBlock,
        this.goToLevelNumberBlock
      ]
    );

    this.updateDifficultyFrom = () => {};
    this.addListener('click', () => this.clickHandler());
  }

  public setUpdateDifficultyFrom(func: (source: TChildElementName) => void): void
  {
    this.updateDifficultyFrom = func;
  }

  public setGoToButtonContent(level: TNumberOfLevel, round: number): void
  {
    this.currentLevel = level;
    this.currentRound = round;
    this.goToRoundNumberBlock.setTextContent(`${round + 1}`);
    this.goToLevelNumberBlock.setTextContent(`${level}`);
  }

  public getGoToButtonContent(): TLastLevelAndRound
  {
    return {
      level: this.currentLevel,
      round: this.currentRound
    }
  }

  public setGoToButtonStatus(status: boolean): void
  {
    if(status)
    {
      this.toggleClass(this.style.active, true);
      this.activeStatus = status;
      return;
    }

    this.toggleClass(this.style.active, false);
    this.activeStatus = status;
  }

  protected clickHandler(): void
  {
    if(!this.activeStatus) return;

    this.updateDifficultyFrom('goto');
  }

  public getDifficultyGoToButton(): DifficultyGoToButton
  {
    return new DifficultyGoToButton
    (
      {
        className: this.className,
        text: '',
        style: this.style,
      }
    )
  }
}