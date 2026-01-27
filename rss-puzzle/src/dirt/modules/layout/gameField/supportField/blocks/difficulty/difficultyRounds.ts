import { Component } from '../../../../common/component';
import { Loader } from '../../../../../loader/loader';
import { PuzzleGameExternalStorage } from '../../../../../storage/external';
import { type IStorageLevelProgress } from '../../../../../storage/local';
import { type TSingleLevelBlockIndex } from './difficultyLevels';
import { type TChildElementName } from './difficulty';

export interface IDifficultyRoundsStyleList
{
  roundsContainer: string;
  roundsHint: string;
  roundsButton: string;
  activeButton: string;
  completeRound: string;
  inProgressRound: string;
  currentRound: string;
}

export interface IDifficultyRoundsOption
{
  className: string[];
  text: string;
  style: IDifficultyRoundsStyleList;
  loader: Loader;
  externalStorage: PuzzleGameExternalStorage;
}

export class DifficultyRounds extends Component
{
  protected className: string[];
  
  protected style: IDifficultyRoundsStyleList;

  protected loader: Loader;

  protected externalStorage: PuzzleGameExternalStorage;

  protected activeLoader: Loader | null;

  protected activeRequestID: number;

  protected currentActiveRoundButtonIndex: number;

  protected updateDifficultyFrom: (source: TChildElementName) => void

  constructor
  (
    {
      className,
      text,
      style,
      loader,
      externalStorage,
    }: IDifficultyRoundsOption
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.loader = loader;
    this.externalStorage = externalStorage;
    this.activeLoader = null;
    this.activeRequestID = 1;
    this.currentActiveRoundButtonIndex = 0; 
    this.updateDifficultyFrom = () => {};

    this.addListener('click', (event) => this.clickHandler(event));
  }

  protected loadLoader(): void
  {
    this.activeLoader = this.loader.getLoader();
    this.append(this.activeLoader);

    this.activeLoader.start();
  }

  protected deleteActiveLoader(): void
  {
    if(this.activeLoader)
    {
      this.activeLoader.stop();
      this.activeLoader.destroy();
      this.activeLoader = null;
    } 
  }

  public setUpdateDifficultyFrom(func: (source: TChildElementName) => void): void
  {
    this.updateDifficultyFrom = func;
  }

  protected setActiveRoundButton(newActiveRoundButtonIndex: number): void
  {
    const allRoundButtons = this.getChildren();
    const activeButton = allRoundButtons[newActiveRoundButtonIndex];
    const oldActiveButton = allRoundButtons[this.currentActiveRoundButtonIndex];

    if(!activeButton) throw new Error('Unable to find the active button');
    if(oldActiveButton) oldActiveButton.toggleClass(this.style.activeButton, false);

    activeButton.toggleClass(this.style.activeButton, true);
    this.currentActiveRoundButtonIndex = newActiveRoundButtonIndex;
  }

  public getActiveRoundButtonIndex(): number
  {
    return this.currentActiveRoundButtonIndex;
  }

  protected getRoundsButtons(roundsCount: number): Component[]
  {
    const roundsArr: Component[] = [];

    for(let i = 0; i < roundsCount; i += 1)
    {
      const roundButton = new Component({ tag: 'div', className: [this.style.roundsButton], text: `${i + 1}` });
      roundButton.setAttribute('data-round-number', `${i}`);
      roundsArr.push(roundButton);
    }

    return roundsArr;
  }

  public visualUpdateRoundsStatus
  (
    levelProgress: IStorageLevelProgress, 
    lastRound: number, 
    isCurrentRound: boolean
  ): void
  {
    const roundsButtons = this.getChildren();
    const roundsProgress = levelProgress.roundProgress;
    roundsButtons.forEach((roundButton, index) =>
    {
      const currentRoundStatus = roundsProgress[index];

      if(!currentRoundStatus) return;

      let newStatusStyle =  currentRoundStatus.isComplete
      ? this.style.completeRound 
      : null;

      if(!newStatusStyle)
      {
        newStatusStyle = currentRoundStatus.completeSentence.length !== 0
        ? this.style.inProgressRound
        : null;
      }

      requestAnimationFrame(() => 
      {
        if(!newStatusStyle) return;
        roundButton.toggleClass(newStatusStyle, true);
      });
    });

    if(isCurrentRound)
    {
      roundsButtons[lastRound].toggleClass(this.style.currentRound, true);
    }
  }

  protected getRoundsHint(): Component
  {
    const hint = new Component({ tag: 'div', className: [this.style.roundsHint], text: 'Choice Round' });
    return hint;
  }

  protected clickHandler(event: Event): void
  {
    if(event.target === null) return;
    if(!(event.target instanceof HTMLElement)) return;

    const roundButton = event.target.closest(`.${this.style.roundsButton}`) as HTMLElement | null;
    if(!roundButton) return;

    const clickBlockIndexAsString = roundButton.dataset.roundNumber;
    if(!clickBlockIndexAsString) throw new Error('No block number on click element');

    const clickBlockIndexAsNumber = Number(clickBlockIndexAsString);
    if(!clickBlockIndexAsNumber && clickBlockIndexAsNumber !== 0) throw new Error('Incorrect value clickBlockNumber');

    this.setActiveRoundButton(clickBlockIndexAsNumber);
    this.updateDifficultyFrom('round');
  }

  public renderCurrentDifficultyRounds = async (gameLevel: TSingleLevelBlockIndex): Promise<0 | 1> =>
  {
    if(gameLevel === 0)
    {
      this.activeRequestID += 1;
      this.deleteActiveLoader();
      this.cleanInnerHTML();
      this.append(this.getRoundsHint());
      return 1;
    }

    this.activeRequestID += 1;
    const currentRequestID = this.activeRequestID;

    this.deleteActiveLoader();
    this.cleanInnerHTML();
    this.loadLoader();

    const levelData = await this.externalStorage.getData(gameLevel);
    const roundsButtons = this.getRoundsButtons(levelData.roundsCount);

    if(this.activeRequestID !== currentRequestID) return 0; 

    this.deleteActiveLoader();
    this.cleanInnerHTML();
    this.appendChildren(roundsButtons);

    return 1;
  }

  public getDifficultyRounds(): DifficultyRounds
  {
    return new DifficultyRounds
    (
      {
        className: this.className,
        text: '',
        style: this.style,
        loader: this.loader,
        externalStorage: this.externalStorage,
      }
    )
  }
}