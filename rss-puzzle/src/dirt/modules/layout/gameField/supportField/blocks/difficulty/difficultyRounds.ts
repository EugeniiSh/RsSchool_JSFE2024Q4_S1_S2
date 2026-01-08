import { Component } from '../../../../common/component';
import { Loader } from '../../../../../loader/loader';
import { PuzzleGameExternalStorage } from '../../../../../storage/external';
import { type TSingleLevelBlockIndex } from './difficultyLevels';

export interface IDifficultyRoundsStyleList
{
  roundsContainer: string;
  wrapper: string;
  roundsButtonWrapper: string;
  roundsButton: string;
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

  protected getRoundsButtons(roundsCount: number): Component[]
  {
    const roundsArr: Component[] = [];

    for(let i = 1; i <= roundsCount; i += 1)
    {
      const roundButton = new Component({ tag: 'div', className: [this.style.roundsButton], text: `${i}` });
      roundButton.setAttribute('data-round-number', `${i}`);
      roundsArr.push(roundButton);
    }

    return roundsArr;
  }

  protected getRoundsInterface(roundsCount: number): Component
  {
    const wrapper = new Component({ tag: 'div', className: [this.style.wrapper], text: '' });
    const roundsButtonWrapper = new Component({ tag: 'div', className: [this.style.roundsButtonWrapper], text: '' });

    roundsButtonWrapper.appendChildren(this.getRoundsButtons(roundsCount));
    wrapper.append(roundsButtonWrapper);

    return wrapper;
  }

  protected getRoundsHint(): Component
  {
    const wrapper = new Component({ tag: 'div', className: [this.style.wrapper], text: '' });
    const hint = new Component({ tag: 'div', className: [this.style.wrapper], text: 'Choice Round' });

    wrapper.append(hint);

    return wrapper;
  }

  public renderCurrentDifficultyRounds = async (gameLevel: TSingleLevelBlockIndex): Promise<void> =>
  {
    if(gameLevel === 0)
    {
      this.activeRequestID += 1;
      this.deleteActiveLoader();
      this.cleanInnerHTML();
      this.append(this.getRoundsHint());
      return;
    }

    this.activeRequestID += 1;
    const currentRequestID = this.activeRequestID;

    this.deleteActiveLoader();
    this.cleanInnerHTML();
    this.loadLoader();

    const levelData = await this.externalStorage.getData(gameLevel);
    const roundInterface = this.getRoundsInterface(levelData.roundsCount);

    if(this.activeRequestID !== currentRequestID) return; 

    this.deleteActiveLoader();
    this.cleanInnerHTML();
    this.append(roundInterface);
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