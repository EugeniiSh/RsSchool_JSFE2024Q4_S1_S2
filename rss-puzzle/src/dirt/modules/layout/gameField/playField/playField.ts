import { Component } from '../../common/component';
import { InitialContainer } from './blocks/initialContainer';
import { ResultContainer } from './blocks/resultContainer';
import { ResultLine } from './blocks/resultLine';
import { WordContainer } from './blocks/wordContainer';
import { WordBlock } from './blocks/wordBlock';
import { ButtonContainer } from './blocks/buttonContainer';

import { IPuzzleWordsData ,IPuzzleGameData, PuzzleGameExternalStorage, TNumberOfLevel } from '../../../storage/external';
import { PuzzleGameStorage, IStorageGameProgress, ILastlevelData } from '../../../storage/local';
import { TCustomEventList } from '../../../events/custom';
 
export interface IPlayFieldStyleList
{
  pazzleWrapper: string,
  resultContainer: string,
  initialContainer: string,
  resultGuess: string,
  initialGuess: string,
  guessBlock: string,
  wordContainer: string,
  wordBlock: string,
  wordBlockPiece: string,
}

export interface IFetchDataOptions
{
  level: TNumberOfLevel
}

export interface IPlayField
{
  className: string[], 
  text: string,
  style: IPlayFieldStyleList,
  initialContainer: InitialContainer,
  resultContainer: ResultContainer,
  resultLine: ResultLine,
  wordContainer: WordContainer,
  wordBlock: WordBlock,
  buttonContainer: ButtonContainer,
  externalStorage: PuzzleGameExternalStorage,
  localStorage: PuzzleGameStorage,
  eventList: TCustomEventList,
}

export interface IRenderContentInfo
{
  playerProgress: IStorageGameProgress,
  result: ResultContainer,
  initial: InitialContainer,
  button: ButtonContainer,
}

export class PlayField extends Component
{
  protected className: string[];

  protected style: IPlayFieldStyleList;

  protected initialContainer: InitialContainer;

  protected resultContainer: ResultContainer;

  protected resultLine: ResultLine;

  protected wordContainer: WordContainer;

  protected wordBlock: WordBlock;

  protected buttonContainer: ButtonContainer

  protected externalStorage: PuzzleGameExternalStorage;

  protected localStorage: PuzzleGameStorage;

  protected eventList: TCustomEventList;

  protected contentData: IPuzzleGameData | null; 

  protected wordCount: number;

  protected currentSentence: WordContainer[];

  protected errorInSentence: number[];

  protected resultGuessFill: number[];

  protected initialGuessFill: number[];

  protected currentResultContainer: ResultContainer;

  protected currentButtonBlock: ButtonContainer;

  protected currentLine: { result: ResultLine, initial: InitialContainer };

  constructor
  (
    {
      className,
      text,
      style,
      initialContainer,
      resultContainer,
      resultLine,
      wordContainer,
      wordBlock,
      buttonContainer,
      externalStorage,
      localStorage,
      eventList,
    }: IPlayField
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.initialContainer = initialContainer;
    this.resultContainer = resultContainer;
    this.resultLine = resultLine;
    this.wordContainer = wordContainer;
    this.wordBlock = wordBlock;
    this.buttonContainer = buttonContainer;
    this.externalStorage = externalStorage;
    this.localStorage = localStorage;
    this.eventList = eventList;

    this.contentData = null;
    this.wordCount = 0;
    this.currentSentence = [];
    this.errorInSentence = [1]; // initial value to prevent accidental transition to a new sentence.
    this.resultGuessFill = [];
    this.initialGuessFill = [];
    this.currentResultContainer = this.resultContainer.getResultContainer();
    this.currentButtonBlock = this.buttonContainer.getButtonContainer();
    this.currentLine =
    {
      result: this.resultLine.getResultLine(),
      initial: this.initialContainer.getInitialContainer()
    }
    
    this.addListener('click', this.handlerClickWordBlock);
  }

  static honestRandom(min: number, max: number): number
  {
    const range = max - min + 1;
    const result = Math.round((Math.random() * range) + min - 0.5);

    return result;
  }

  static getShuffleElementArr
  (elementArr: WordContainer[]): 
  { 
    shuffleSentence: WordContainer[], 
    shuffleOrderWords: number[]
  } 
  {
    const shuffleSentence: WordContainer[] = [];
    const shuffleOrderWords: number[] = [];
    const randomNumSet: Set<number> = new Set();

    while(randomNumSet.size < elementArr.length)
    {
      randomNumSet.add(PlayField.honestRandom(0, elementArr.length - 1));
    }

    randomNumSet.forEach((num) =>
    {
      shuffleSentence.push(elementArr[num]);
      shuffleOrderWords.push(num + 1);
    })

    return { shuffleSentence, shuffleOrderWords };
  }

  static calculateAndSetBlockWidth(resultLine: ResultLine | InitialContainer, wordContainer: WordContainer[])
  {
    // === Get width rezult line ===
    const resultWidth = resultLine.getNode().offsetWidth;
    // === Set the size of the word cards ===
    wordContainer.forEach((elem) =>
    {
      // === Take the size '.word-container' ... ===
      const wordElem = elem.getNode();
      const elemWidth = wordElem.offsetWidth;

      // === and set it to '.word-block' ===
      const wordElemChild = elem.getChildren()[0].getNode();
      wordElemChild.style.width = 'calc(var(--size-width-result) * var(--size-width-ratio))';

      // === add a variable for adaptability ===
      const  wordElemWidthRatio = elemWidth / resultWidth;
      wordElemChild.style.setProperty('--size-width-ratio', wordElemWidthRatio.toString());
    })
  }


  public async renderGameFieldContent(contentInfo: IRenderContentInfo): Promise<void>
  {
    const lastGameData = contentInfo.playerProgress.last;
    this.contentData = await this.externalStorage.getData(lastGameData.level);
    const lastRoundSentenceList = this.contentData.rounds[lastGameData.round].words;

    this.currentResultContainer = contentInfo.result;
    this.currentLine.initial = contentInfo.initial;
    this.currentButtonBlock = contentInfo.button;
    this.currentButtonBlock.setFuncGoToNextSentence(this.goToNextSentence.bind(this));
    
    const roundSentenceGroup = this.getRoundSentenceGroup(lastRoundSentenceList, lastGameData.sentense);
    this.renderRoundSentenceGroup(roundSentenceGroup);
  }

  protected renderCurrentSentence(currentSentence: WordContainer[])
  {
    const { shuffleSentence, shuffleOrderWords } = PlayField.getShuffleElementArr(currentSentence);
    this.setCurrentSentence(currentSentence, shuffleOrderWords);
    this.currentLine.initial.destroyChildren();
    this.currentLine.initial.appendChildren(shuffleSentence);

    this.currentLine.result.appendChildren(this.wordContainer.getWordContainerArr(shuffleSentence.length));
    this.currentResultContainer.append(this.currentLine.result);

    PlayField.calculateAndSetBlockWidth(this.currentLine.initial, shuffleSentence);
  }

  protected renderRoundSentenceGroup(sentenceGroup: WordContainer[][])
  {
    const lastSentence = sentenceGroup.length - 1;

    sentenceGroup.forEach((sentence, index) =>
    {
      const resultLine = this.resultLine.getResultLine();

      if(lastSentence === index)
      {
        this.currentLine.result = resultLine;
        this.renderCurrentSentence(sentence);
      }
      else
      {
        resultLine.appendChildren(sentence);
        this.currentResultContainer.append(resultLine);

        PlayField.calculateAndSetBlockWidth(resultLine, sentence);
      }
    })
  }

  protected setCurrentSentence(currentSentence: WordContainer[], initialGuessFill: number[]): void
  {
    this.currentSentence = currentSentence;
    const wordCount = this.currentSentence.length;
    this.resultGuessFill = new Array(wordCount).fill(0);
    this.initialGuessFill = initialGuessFill;
    // .map((item, index) => item + index);
  }

  protected getRoundSentenceGroup(round: IPuzzleWordsData[], currentSentenceIndex: number): WordContainer[][]
  {
    let count = -1;
    const roundSentenceArr: WordContainer[][] = []

    do
    {
      count += 1;

      const sentence = round[count].textExample.split(' ');
      roundSentenceArr.push(this.getConvertSentenceIntoLayout(sentence));
    }
    while(count < currentSentenceIndex)

    return roundSentenceArr;
  }

  protected getErrorsInSentence(): number[]
  {
    const errors: number[] = []; 
    this.resultGuessFill.forEach((item, index) =>
    {
      if(item !== index + 1) errors.push(index);
    })

    return errors;
  }

  protected getConvertSentenceIntoLayout(sentence: string[]): WordContainer[]
  {
    const result = sentence.map((word) => 
    {
      const wordContainer = this.wordContainer.getWordContainerArr()[0];
      wordContainer.append(this.wordBlock.getBlockWithWord(word));
      return wordContainer;
    });

    return result;
  }

  protected goToNextSentence()
  {
    const userData = this.localStorage.getValue();
    const oldLevel = userData.game.last.level;
    const oldRound = userData.game.last.round;
    this.mutableUpdateUserGameProgress(userData.game, 'next-sentence');

    const currentLevel = userData.game.last.level;
    const currentRound = userData.game.last.round;
    const nextSentenceNum = userData.game.last.sentense;

    if(oldLevel !== currentLevel
    || oldRound !== currentRound) 
    {
      this.localStorage.setValue(userData);
      this.dispatchSomeEvent(this.eventList.start());

      return;
    }

    if(!this.contentData) throw new Error('No information about current round.');
    if(!Number.isInteger(nextSentenceNum) 
    || (nextSentenceNum < 0 && nextSentenceNum > 9)) throw new Error('No information about next sentence.');

    this.localStorage.setValue(userData);

    const nextSentence = this.contentData
    .rounds[currentRound]
    .words[nextSentenceNum]
    .textExample
    .split(' ');
    
    const sentenceInLayout = this.getConvertSentenceIntoLayout(nextSentence);
    this.currentLine.result = this.resultLine.getResultLine();
    this.renderCurrentSentence(sentenceInLayout);

    this.errorInSentence = this.getErrorsInSentence();
    this.currentButtonBlock.changeStatusNextButton(this.errorInSentence.length === 0);
  }

  protected mutableUpdateUserGameProgress
  (
    gameProgress: IStorageGameProgress, 
    action: 'next-sentence' | 'custom-choice',
    newLastGame?: Omit<ILastlevelData, 'sentence'>
  ): void
  {
    switch(action)
    {
      case 'next-sentence':
      {
        const oldLastGame = gameProgress.last;
        const levelProgressList = gameProgress.progress;
        const level = levelProgressList[oldLastGame.level];
        const round = level.roundProgress[oldLastGame.round];
        round.completeSentence.push(oldLastGame.sentense);

        if(round.completeSentence.length === 10) round.isComplete = true;

        if(round.isComplete)
        {
          if(!this.contentData) throw Error("Can't update game progress.");

          level.completeRoundCount += 1;
          level.isComplete = this.contentData.roundsCount === level.completeRoundCount;
        }

        if(level.isComplete)
        {
          const nextLevel = Object.keys(levelProgressList).find((levelNum) =>
          {
            const isNotComplete = !levelProgressList[Number(levelNum) as TNumberOfLevel].isComplete
            return isNotComplete;
          }) as TNumberOfLevel | undefined;

          if(!nextLevel) throw Error("Game Over");

          const nextRoundProgress = levelProgressList[nextLevel].roundProgress;
          let nextRound = 0;
          Object.keys(nextRoundProgress).find((roundNum, index) =>
          {
            if(!nextRoundProgress[index])
            {
              nextRoundProgress[index] = this.localStorage.getStartRoundProgress();
              nextRound = index;
              return true;
            }

            if(!nextRoundProgress[Number(roundNum)].isComplete)
            {
              nextRound = Number(roundNum);
              return true;
            }

            return false;
          })

          const lastSentence = nextRoundProgress[nextRound].completeSentence.at(-1);
          const nextSentence = lastSentence || lastSentence === 0 ? lastSentence + 1 : 0;

          oldLastGame.level = Number(nextLevel) as TNumberOfLevel;
          oldLastGame.round = nextRound;
          oldLastGame.sentense = nextSentence;

          return;
        }

        if(round.isComplete)
        {
          const currentRoundProgress = level.roundProgress;
          let nextRound = 0;

          if(!this.contentData) throw Error("Can't update game progress.");

          const roundCount = this.contentData.roundsCount;
          Array.from({ length: roundCount }, (_ , index) => index)
          .find((roundNum) =>
          {
            if(!currentRoundProgress[roundNum])
            {
              currentRoundProgress[roundNum] = this.localStorage.getStartRoundProgress();
              nextRound = roundNum;
              return true;
            }

            if(!currentRoundProgress[Number(roundNum)].isComplete)
            {
              nextRound = Number(roundNum);
              return true;
            }

            return false;
          });

          const lastSentence = currentRoundProgress[nextRound].completeSentence.at(-1);
          const nextSentence = lastSentence || lastSentence === 0 ? lastSentence + 1 : 0;

          oldLastGame.round = nextRound;
          oldLastGame.sentense = nextSentence;

          return;
        }

        oldLastGame.sentense += 1;
        break;
      };

      case 'custom-choice':
      {
        if(!newLastGame) throw Error("New game is undefined.");

        const oldLastGame = gameProgress.last;
        const levelProgressList = gameProgress.progress;

        let nextLevel = levelProgressList[newLastGame.level];
        if(!nextLevel)
        {
          levelProgressList[newLastGame.level] = this.localStorage.getStartLevelProgress();
          nextLevel = levelProgressList[newLastGame.level];
        } 

        let nextRound = nextLevel.roundProgress[newLastGame.round];
        if(!nextRound)
        {
          nextLevel.roundProgress[newLastGame.round] = this.localStorage.getStartRoundProgress();
          nextRound = nextLevel.roundProgress[newLastGame.round];
        }

        let newSentence = nextRound.completeSentence.at(-1);
        newSentence = newSentence === undefined ? 0 : newSentence;

        oldLastGame.level = newLastGame.level;
        oldLastGame.round = newLastGame.round;
        oldLastGame.sentense = newSentence;

        break;
      }

      default: break;
    }
  }

  protected handlerClickWordBlock = (event: Event) =>
  {
    if(event.target === null) return;
    if(!(event.target instanceof HTMLElement)) return;
   
    const parent = event.target.closest(`.${this.style.wordBlock}`);
    if(parent === null) return;

    if(parent.closest(`.${this.style.initialGuess}`))
    {
      let position = 0;
      
      this.currentLine.initial.getChildren().find((wordContainer, index) =>
      {
        const wordBlock = wordContainer.getChildren()[0];
        if(wordBlock && wordBlock.getNode() === parent) 
        {
          position = index;
          return true;
        }

        return false;
      })

      const wordBlockComponent = 
      this.currentLine.initial
      .getChildren()[position]
      .getChildren()[0];

      this.currentLine.initial
      .getChildren()[position]
      .cleanInnerHTML();

      const numberCorrectOrder = this.initialGuessFill[position];
      this.initialGuessFill[position] = 0;

      const resultNewPosition = this.resultGuessFill.indexOf(0);
      this.resultGuessFill[resultNewPosition] = numberCorrectOrder;

      this.currentLine.result.replaceChildren(resultNewPosition, wordBlockComponent);
    }
    else
    {
      const resultGuess = parent.closest(`.${this.style.resultGuess}`);
      if(resultGuess !== this.currentLine.result.getNode()) return;

      let position = 0;
      
      this.currentLine.result.getChildren().find((wordContainer, index) =>
      {
        if(wordContainer && wordContainer.getNode() === parent) 
        {
          position = index;
          return true;
        }

        return false;
      })

      const wordBlockComponent = 
      this.currentLine.result
      .getChildren()[position];

      this.currentLine.result
      .replaceChildren(position, this.wordContainer.getWordContainerArr()[0]);

      const numberCorrectOrder = this.resultGuessFill[position];
      this.resultGuessFill[position] = 0;

      const initialNewPosition = this.initialGuessFill.indexOf(0);
      this.initialGuessFill[initialNewPosition] = numberCorrectOrder;

      this.currentLine.initial.getChildren()[initialNewPosition].append(wordBlockComponent);
    }

    this.errorInSentence = this.getErrorsInSentence();
    this.currentButtonBlock.changeStatusNextButton(this.errorInSentence.length === 0);
  }

  public getWordCount(): number
  {
    return this.wordCount;
  }

  public getPlayField(): PlayField
  {
    return new PlayField
    (
      {
        className: this.className,
        text: '',
        style: this.style,
        initialContainer: this.initialContainer.getInitialContainer(),
        resultContainer: this.resultContainer.getResultContainer(),
        resultLine: this.resultLine.getResultLine(),
        wordContainer: this.wordContainer.getWordContainerArr()[0],
        wordBlock: this.wordBlock.getBlockWithWord(''),
        buttonContainer: this.buttonContainer.getButtonContainer(),
        externalStorage: this.externalStorage,
        localStorage: this.localStorage,
        eventList: this.eventList,
      }
    )
  }

  public getPlayFieldInterface(progressPlayer: IStorageGameProgress): { playField: PlayField, renderInfo: IRenderContentInfo }
  {
    const playField = this.getPlayField();
    const resultContainer = this.resultContainer.getResultContainer();
    const initialContainer = this.initialContainer.getInitialContainer();
    const buttonContainer = this.buttonContainer.getButtonContainer();
    
    const renderInfo: IRenderContentInfo =
    {
      playerProgress: progressPlayer,
      initial: initialContainer,
      result: resultContainer,
      button: buttonContainer,
    }

    playField.appendChildren([resultContainer, initialContainer, buttonContainer]);

    return {playField, renderInfo};
  }

  destroy() 
  {
    this.removeListener('click', this.handlerClickWordBlock);
    super.destroy();
  }
}