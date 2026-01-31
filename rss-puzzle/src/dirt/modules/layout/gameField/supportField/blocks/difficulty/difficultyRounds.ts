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
  legendWrapper: string;
  legendBlock: string;
  legendBlockOpen: string;
  legendRow: string;
  legendHeader: string;
  legendHeaderText: string;
  legendHeaderImage: string;
  legendHeaderImageOpen: string;
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

  protected hintLegendStatus: boolean;

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
    this.hintLegendStatus = false;
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
    const textData = 
    [
      'Select the desired level from the numbers in the top row. (I, II, III, IV, V, VI)',
      'After selecting a level, you will see the available rounds for that level.',
      'Select one and click the Go To... button below.'
    ];
    const textRows = textData.map((textHint) => new Component({ tag: 'div', className: [], text: textHint }));
    
    
    const legendHeaderText = new Component({ tag: 'div', className: [this.style.legendHeaderText], text: 'legend:'});
    const legendHeaderImage = new Component({ tag: 'div', className: [this.style.legendHeaderImage], text: ''});
    const legendHeader = new Component({ tag: 'div', className: [this.style.legendHeader], text: ''});
    legendHeader.appendChildren([legendHeaderText, legendHeaderImage]);

    const legentData = 
    [
      ['current round', this.style.currentRound],
      ['in progress round', this.style.inProgressRound],
      ['complete round', this.style.completeRound],
      ['selected round to proceed to', this.style.activeButton]
    ];
    const legentRows = legentData.map(([description, style]) =>
    {
      const legendButton = this.getRoundsButtons(1)[0];
      legendButton.toggleClass(style, true);

      const legendText = new Component({ tag: 'div', className: [], text: description });

      const legendRow = new Component({ tag: 'div', className: [this.style.legendRow], text: '' });
      legendRow.appendChildren([legendButton, legendText]);

      return legendRow;
    });


    const legendBlock = new Component({ tag: 'div', className: [this.style.legendBlock], text: ''});
    legendBlock.appendChildren([legendHeader, ...legentRows]);
    legendBlock.addListener('click', (event: Event) =>
    {
      if(event.target === null) return;
      if(!(event.target instanceof HTMLElement)) return;

      const legendHeaderBlock = event.target.closest(`.${this.style.legendHeader}`) as HTMLElement | null;
      if(!legendHeaderBlock) return;

      if(this.hintLegendStatus)
      {
        legendBlock.toggleClass(this.style.legendBlockOpen, false);
        legendHeaderImage.toggleClass(this.style.legendHeaderImageOpen, false);
        this.hintLegendStatus = false;
        return;
      }

      legendBlock.toggleClass(this.style.legendBlockOpen, true);
      legendHeaderImage.toggleClass(this.style.legendHeaderImageOpen, true);
      this.hintLegendStatus = true;
    })

    const legendWrapper = new Component({ tag: 'div', className: [this.style.legendWrapper], text: ''});
    legendWrapper.append(legendBlock);

    const hint = new Component({ tag: 'div', className: [this.style.roundsHint], text: '' });
    hint.appendChildren([...textRows, legendWrapper]);

    return hint;
  }

  protected clickHandler(event: Event): void
  {
    if(event.target === null) return;
    if(!(event.target instanceof HTMLElement)) return;
    if(event.target.closest(`.${this.style.roundsHint}`)) return;
    
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