import { Component } from '../../common/component';
import { InitialContainer } from './blocks/initialContainer';
import { ResultContainer } from './blocks/resultContainer';
import { ResultLine } from './blocks/resultLine';
import { WordContainer } from './blocks/wordContainer';
import { WordBlock } from './blocks/wordBlock';
import { ButtonContainer } from './blocks/buttonContainer';
import collapsEffect from '../../../effects/collapse/collapse';

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
  statusCorrect: string,
  statusError: string,
  wordBlockDrag: string,
  wordBlockHLLeft: string,
  wordBlockHLRight: string,
  wordBlockHLCenter: string,
}

export interface IFetchDataOptions
{
  level: TNumberOfLevel
}

export interface IPlayFieldOption
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

export type TPlayFieldMethods = Pick<
  PlayField,
  | 'collectSentenceInRightOrder'
  | 'goToNextSentence'
  | 'toggleWordValidationHighligh'
>

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

  protected currentSentence: WordBlock[];

  protected errorInSentence: number[];

  protected resultGuessFill: number[];

  protected initialGuessFill: number[];

  protected currentResultContainer: ResultContainer;

  protected currentButtonBlock: ButtonContainer;

  protected currentLine: { result: ResultLine, initial: InitialContainer };

  protected isMouseDown: boolean;

  protected timeoutId: NodeJS.Timeout | null;

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
    }: IPlayFieldOption
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

    this.isMouseDown = false;
    this.timeoutId = null;
    
    this.addListener('click', this.handlerClickWordBlock);
    this.addListener('pointerdown', this.handlerPointerDown);
    this.addListener('pointerup', this.handlerPointerUp);
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
    const resultWidth = resultLine.getNode().getBoundingClientRect().width;

    // === Set the size of the word cards ===
    wordContainer.forEach((elem) =>
    {
      // === Take the size '.word-container' ... ===
      const wordElem = elem.getNode();
      const elemWidth = wordElem.getBoundingClientRect().width;

      // === and set it to '.word-block' ===
      const wordElemChild = elem.getChildren()[0].getNode();
      wordElemChild.style.width = 'calc(var(--size-width-result) * var(--size-width-ratio))';

      // === add a variable for adaptability ===
      const  wordElemWidthRatio = elemWidth / resultWidth;
      wordElemChild.style.setProperty('--size-width-ratio', wordElemWidthRatio.toString());
    })
  }


  public async renderGameFieldContent(this: PlayField, contentInfo: IRenderContentInfo): Promise<void>
  {
    const lastGameData = contentInfo.playerProgress.last;
    this.contentData = await this.externalStorage.getData(lastGameData.level);
    const lastRoundSentenceList = this.contentData.rounds[lastGameData.round].words;

    this.currentResultContainer = contentInfo.result;
    this.currentLine.initial = contentInfo.initial;
    this.currentButtonBlock = contentInfo.button;
    this.currentButtonBlock.setParentMethods(this.getBoundMethods());
    
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
    // In this array, the words are arranged in the correct order.
    this.currentSentence = currentSentence.map((container) => container.getChildren()[0]) as WordBlock[];

    const wordCount = this.currentSentence.length;
    this.resultGuessFill = new Array(wordCount).fill(0);
    this.initialGuessFill = initialGuessFill;
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

  public toggleWordValidationHighligh(isHighligh: boolean): void
  {
    const wordBlockList = this.currentLine.result.getChildren();

    if(isHighligh)
    {
      const errors = this.errorInSentence;
      wordBlockList.forEach((wordBlock, index) =>
      {
        if(errors.includes(index))
        {
          wordBlock.toggleClass(this.style.statusError, true);
          return;
        }

        wordBlock.toggleClass(this.style.statusCorrect, true);
      })

      if(errors.length === 0)
      {
        this.currentButtonBlock.changeStatusNextButton(errors.length === 0);
        this.currentButtonBlock.toggleVisibleMotivationButton('next');
      }
      
      return;
    }

    wordBlockList.forEach((wordBlock) =>
    {
      wordBlock.toggleClass(this.style.statusError, false);
      wordBlock.toggleClass(this.style.statusCorrect, false);
    })

    this.currentButtonBlock.toggleVisibleMotivationButton('check');
  }

  public goToNextSentence(): void
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
    this.toggleWordValidationHighligh(false);

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
    this.currentButtonBlock.changeStatusCheckButton(false);
    this.currentButtonBlock.toggleVisibleMotivationButton('check');
  }

  public async collectSentenceInRightOrder(): Promise<void>
  {
    this.dispatchSomeEvent(this.eventList.disableUI());
    this.toggleWordValidationHighligh(false);

    await collapsEffect(this.currentSentence, 'hide');

    this.currentLine.result.cleanInnerHTML();
    this.currentLine.initial.getChildren().forEach((wordContainer) =>
    {
      wordContainer.cleanInnerHTML();
    });

    this.currentSentence.forEach((wordBlock, index) =>
    {
      this.currentLine.result.append(wordBlock);
      this.resultGuessFill[index] = index + 1;
      this.initialGuessFill[index] = 0;
    });

    await collapsEffect(this.currentSentence, 'show');

    this.errorInSentence = this.getErrorsInSentence();
    this.toggleWordValidationHighligh(true);
    this.dispatchSomeEvent(this.eventList.anableUI());
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
    if(!this.isMouseDown) return;
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
      this.toggleWordValidationHighligh(false);

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

    const isResultLineFill = !this.resultGuessFill.includes(0);
    this.currentButtonBlock.changeStatusCheckButton(isResultLineFill);

    this.isMouseDown = false;
  }

  protected handlerDragAndDropWordBlock = (event: Event) =>
  {
    if(!(event instanceof PointerEvent)) return;
    if(event.target === null) return;
    if(!(event.target instanceof HTMLElement)) return;
  
    // const parent = event.target.closest<HTMLElement>(`.${this.style.wordBlock}`);
    let parent = event.target.closest<HTMLElement>(`.${this.style.wordBlock}`);
    if(parent === null) return;

    let guessBlockElemBelow: 'result' | 'initial' = 'result';
    let guessBlockWordRised: 'result' | 'initial' = 'result';
    if(parent.closest(`.${this.style.initialGuess}`))
    {
      parent = parent.closest<HTMLElement>(`.${this.style.wordContainer}`);
      guessBlockWordRised = 'initial';
    }
    if(parent === null) return;

    parent.setPointerCapture(event.pointerId);
    this.toggleWordValidationHighligh(false);

    console.log('parent =', parent);

    let position = 0;
      
    this.currentLine[guessBlockWordRised].getChildren().find((wordContainer, index) =>
    {
      if(wordContainer && wordContainer.getNode() === parent) 
      {
        position = index;
        return true;
      }

      return false;
    })

    const parentComp = this.currentLine[guessBlockWordRised].getChildren()[position];
    const playFildCord = this.getNode().getBoundingClientRect();

    const dragstartOff = (event: Event) => {event.preventDefault();}
    parentComp.addListener('dragstart', dragstartOff);

    const parentCord = parentComp.getNode().getBoundingClientRect();
    const shiftX = event.clientX - parentCord.left;
    const shiftY = event.clientY - parentCord.top;

    const moveAt = (event: PointerEvent) =>
    {
      let isFlayOver = false;
      switch(true)
      {
        case event.pageX < playFildCord.left: isFlayOver = true;
        break; 
        case event.pageX + parentCord.width > playFildCord.right: isFlayOver = true;
        break;
        case event.pageY < playFildCord.top: isFlayOver = true;
        break;
        case event.pageY + parentCord.height > playFildCord.bottom: isFlayOver = true;
        break;
        default: isFlayOver = false;
      }
      if(isFlayOver) return;

      const cordX = event.pageX - playFildCord.left;
      const cordY = event.pageY - playFildCord.top;
      // Because of the "perspective" the Y coordinates are calculated incorrectly. 
      // Perhaps there is another reason that I don't know.
      // correctionCordY is used to correct these coordinates.
      const correctionCordY = 1.03;

      parentComp.getNode().style.left = cordX - shiftX + 'rem';
      parentComp.getNode().style.top = (cordY - shiftY) * correctionCordY + 'rem';
    }

    type TElemParts = 'center' | 'right' | 'left' | 'none';
    interface IDropableElems
    {
      center: Component | null,
      left: Component | null,
      right: Component | null,
    }

    const highLighPartElem = 
    (
      HLElems: IDropableElems,
      HLPart: TElemParts, 
      cleanHLElems?: (Component | null)[]
    ) =>
    {
      switch(HLPart)
      {
        case 'center': 
        {
          if(cleanHLElems) cleanHL(cleanHLElems);
          if(!HLElems.center) break;
          HLElems.center.toggleClass(this.style.wordBlockHLCenter, true);
          break;
        };
        case 'left': 
        {
          if(cleanHLElems) cleanHL(cleanHLElems);
          if(!HLElems.center) break;
          HLElems.center.toggleClass(this.style.wordBlockHLLeft, true);
          if(!HLElems.left) break;
          HLElems.left.toggleClass(this.style.wordBlockHLRight, true);
          break;
        };
        case 'right': 
        {
          if(cleanHLElems) cleanHL(cleanHLElems);
          if(!HLElems.center) break;
          HLElems.center.toggleClass(this.style.wordBlockHLRight, true);
          if(!HLElems.right) break;
          HLElems.right.toggleClass(this.style.wordBlockHLLeft, true);
          break;
        };
        default: break;
      }
    }

    const cleanHL = (components: (Component | null)[]) =>
    {
      components.forEach((component) =>
      {
        if(!component) return;
        component.toggleClass(this.style.wordBlockHLLeft, false);
        component.toggleClass(this.style.wordBlockHLRight, false);
        component.toggleClass(this.style.wordBlockHLCenter, false);
      })
    }

    const wordContainer = this.wordContainer.getWordContainerArr()[0];
    this.currentLine[guessBlockWordRised].replaceChildren(position, wordContainer);
    wordContainer.append(parentComp);

    parentComp.toggleClass(this.style.wordBlockDrag, true);
    parentComp.getNode().setPointerCapture(event.pointerId);
    moveAt(event);

    let elemBelowPosition = 0;
    let currentElemPart: TElemParts = 'none';
    let currentDroppable: IDropableElems = 
    {
      center: null,
      left: null,
      right: null,
    }
    
    const halfWidthParent = parentCord.width / 2;
    const xShiftForCordBelow = halfWidthParent - shiftX;

    const onMouseMove = (event: PointerEvent) => 
    {
      moveAt(event);

      const xCordBelow = event.clientX + xShiftForCordBelow;
      const yCordBelow = event.clientY - shiftY;
      parent.hidden = true;
      let elemBelow = document.elementFromPoint(xCordBelow, yCordBelow);
      parent.hidden = false;

      if(!elemBelow
      || !(elemBelow.closest(`.${this.style.wordBlock}`) || elemBelow.closest(`.${this.style.wordContainer}`))
      || (elemBelow.closest(`.${this.style.resultGuess}`) !== this.currentLine.result.getNode() || !elemBelow.closest(`.${this.style.initialGuess}`)))
      {
        currentElemPart = 'none';
        cleanHL(this.currentLine.result.getChildren());
        cleanHL(this.currentLine.initial.getChildren());
        return;
      }

      if(elemBelow.closest(`.${this.style.initialGuess}`))
      {
        guessBlockElemBelow = 'initial';
      }

      const elemBelowCord = elemBelow.getBoundingClientRect();
      const EBPartWidth = elemBelowCord.width / 5;
      let elemBelowPart: TElemParts = 'none';
      switch(true)
      {
        case event.clientX > elemBelowCord.left 
        && event.clientX < elemBelowCord.left + EBPartWidth:
        {
          elemBelowPart = 'left';
          break;
        }
        case event.clientX > elemBelowCord.left + EBPartWidth
        && event.clientX < elemBelowCord.left + EBPartWidth * 4:
        {
          elemBelowPart = 'center';
          break;
        }
        case event.clientX > elemBelowCord.left + EBPartWidth * 4
        && event.clientX < elemBelowCord.left + EBPartWidth * 5:
        {
          elemBelowPart = 'right';
          break;
        }
        default: elemBelowPart = 'none';
      }

      elemBelowPosition = 0;
      this.currentLine[guessBlockElemBelow].getChildren().find((wordContainer, index) =>
      {
        if(wordContainer && wordContainer.getNode() === elemBelow) 
        {
          elemBelowPosition = index;
          return true;
        }

        return false;
      })

      const compBelow = this.currentLine[guessBlockElemBelow].getChildren()[elemBelowPosition];
      const compBelowNearbyLeft = this.currentLine[guessBlockElemBelow].getChildren()[elemBelowPosition - 1];
      const compBelowNearbyRight = this.currentLine[guessBlockElemBelow].getChildren()[elemBelowPosition + 1];

      if(currentDroppable.center !== compBelow)
      {
        const { center, left, right } = currentDroppable;
        const dropArr = [center, left, right];
        cleanHL(dropArr);
        
        currentDroppable.center = compBelow;
        currentDroppable.left = compBelowNearbyLeft;
        currentDroppable.right = compBelowNearbyRight;
        if(!currentDroppable.center) return;

        highLighPartElem(currentDroppable, elemBelowPart);
        return;
      }

      if(currentElemPart === elemBelowPart) return;
      currentElemPart = elemBelowPart;

      const { center, left, right } = currentDroppable;
      const dropArr = [center, left, right];

      highLighPartElem(currentDroppable, elemBelowPart, dropArr);
    }

    parent.addEventListener('pointermove', onMouseMove);

    const insertDragElement = () =>
    {
      // let updateParentComp = parentComp;

      const getUpdateDragElem = (dragElem: Component, targetForUpdate: 'result' | 'initial') =>
      {
        let updateElem: Component = dragElem;
        switch(targetForUpdate)
        {
          case 'result':
          {
            updateElem = dragElem.getChildren()[0];
            dragElem.cleanInnerHTML();
            dragElem.destroy();
            break;
          }
          case 'initial':
          {
            if(dragElem.getNode().closest(`${this.style.wordContainer}`)) break;
            const container = this.wordContainer.getWordContainerArr()[0];
            container.append(dragElem);
            updateElem = container;
            break;
          }
          default: break;
        }

        return updateElem;
      }

      // if(guessBlockElemBelow !== guessBlockWordRised)
      // {
      //   switch(guessBlockElemBelow)
      //   {
      //     case 'result':
      //     {
      //       updateParentComp = parentComp.getChildren()[0];
      //       parentComp.cleanInnerHTML();
      //       parentComp.destroy();
      //       break;
      //     }
      //     case 'initial':
      //     {
      //       const container = this.wordContainer.getWordContainerArr()[0];
      //       container.append(parentComp);
      //       updateParentComp = container;
      //       break;
      //     }
      //     default:;
      //   }
        
      // }
      const isSameGuessBlocks = guessBlockElemBelow === guessBlockWordRised;

      if(currentElemPart === 'center'
      && currentDroppable.center)
      {
        // const replacingElem = this.currentLine.result.replaceChildren(elemBelowPosition, parentComp);
        const replacingElem = 
        this.currentLine[guessBlockElemBelow]
        .replaceChildren
        (
          elemBelowPosition, 
          !isSameGuessBlocks ? getUpdateDragElem(parentComp, guessBlockElemBelow) : parentComp
        );

        if(position === elemBelowPosition
        && isSameGuessBlocks) return;

        this.currentLine[guessBlockWordRised]
        .replaceChildren
        (
          position, 
          !isSameGuessBlocks ? getUpdateDragElem(replacingElem, guessBlockWordRised) : replacingElem
        );

        // const parentCorrectOrder = this.resultGuessFill[position];
        // this.resultGuessFill[position] = this.resultGuessFill[elemBelowPosition];
        // this.resultGuessFill[elemBelowPosition] = parentCorrectOrder;
        const parentCorrectOrder = this[`${guessBlockWordRised}GuessFill`][position];
        this[`${guessBlockWordRised}GuessFill`][position] = this[`${guessBlockElemBelow}GuessFill`][elemBelowPosition];
        this[`${guessBlockElemBelow}GuessFill`][elemBelowPosition] = parentCorrectOrder;

        return;
      }

      const transferVector = position - elemBelowPosition;
      let wordContainerPosition = transferVector > 0 ? position + 1 : position;

      if(currentElemPart === 'right'
      && currentDroppable.center)
      {
        // this.currentLine.result.appAfterSpecifiedChildren(elemBelowPosition, parentComp);
        // this.currentLine.result.getChildren()[wordContainerPosition].cleanInnerHTML();
        // this.currentLine.result.destroyOneChild(wordContainerPosition);

        // const parentCorrectOrder = this.resultGuessFill[position];
        // this.resultGuessFill = this.resultGuessFill.reduce((acc, corOrder, index) =>
        // {
        //   if(index === position) return acc;
        //   if(index === elemBelowPosition)
        //   {
        //     acc.push(corOrder, parentCorrectOrder);
        //     return acc;
        //   }

        //   acc.push(corOrder);
        //   return acc;
        // }, [] as number[]);

        let deletingBlockPosition = position;

        if(!isSameGuessBlocks)
        {
          // TODO - сделать обработку результата = -1;
          const emptyPosition = this[`${guessBlockElemBelow}GuessFill`].lastIndexOf(0);
          const vector = emptyPosition - elemBelowPosition;
          deletingBlockPosition = vector > 0 ? emptyPosition + 1 : emptyPosition;
          this.currentLine[guessBlockElemBelow].appAfterSpecifiedChildren
          (
            elemBelowPosition, 
            getUpdateDragElem(parentComp, guessBlockElemBelow)
          );
          this.currentLine.result.destroyOneChild(deletingBlockPosition);

          const parentCorrectOrder = this[`${guessBlockWordRised}GuessFill`][position];
          this[`${guessBlockWordRised}GuessFill`][position] = 0;
          this[`${guessBlockElemBelow}GuessFill`] = this[`${guessBlockElemBelow}GuessFill`].reduce((acc, corOrder, index) =>
          {
            if(index === emptyPosition) return acc;
            if(index === elemBelowPosition)
            {
              acc.push(corOrder, parentCorrectOrder);
              return acc;
            }

            acc.push(corOrder);
            return acc;
          }, [] as number[]);

        }
        else
        {
          const vector = position - elemBelowPosition;
          deletingBlockPosition = vector > 0 ? position + 1 : position;
          this.currentLine[guessBlockElemBelow].appAfterSpecifiedChildren(elemBelowPosition, parentComp);
          this.currentLine[guessBlockWordRised].getChildren()[deletingBlockPosition].cleanInnerHTML();
          this.currentLine[guessBlockWordRised].destroyOneChild(deletingBlockPosition);

          const parentCorrectOrder = this[`${guessBlockWordRised}GuessFill`][position];
          this[`${guessBlockElemBelow}GuessFill`] = this[`${guessBlockElemBelow}GuessFill`].reduce((acc, corOrder, index) =>
          {
            if(index === position) return acc;
            if(index === elemBelowPosition)
            {
              acc.push(corOrder, parentCorrectOrder);
              return acc;
            }

            acc.push(corOrder);
            return acc;
          }, [] as number[]);
        }

        return;
      }

      if(currentElemPart === 'left'
      && currentDroppable.center)
      {
        // this.currentLine.result.appBeforeSpecifiedChildren(elemBelowPosition, parentComp);
        // this.currentLine.result.getChildren()[wordContainerPosition].cleanInnerHTML();
        // this.currentLine.result.destroyOneChild(wordContainerPosition);

        // const parentCorrectOrder = this.resultGuessFill[position];
        // this.resultGuessFill = this.resultGuessFill.reduce((acc, corOrder, index) =>
        // {
        //   if(index === position) return acc;
        //   if(index === elemBelowPosition)
        //   {
        //     acc.push(parentCorrectOrder, corOrder);
        //     return acc;
        //   }

        //   acc.push(corOrder);
        //   return acc;
        // }, [] as number[]);

        let deletingBlockPosition = position;

        if(!isSameGuessBlocks)
        {
          // TODO - сделать обработку результата = -1;
          const emptyPosition = this[`${guessBlockElemBelow}GuessFill`].indexOf(0);
          const vector = emptyPosition - elemBelowPosition;
          deletingBlockPosition = vector >= 0 ? emptyPosition + 1 : emptyPosition;
          this.currentLine[guessBlockElemBelow].appBeforeSpecifiedChildren
          (
            elemBelowPosition, 
            getUpdateDragElem(parentComp, guessBlockElemBelow)
          );
          this.currentLine.result.destroyOneChild(deletingBlockPosition);

          const parentCorrectOrder = this[`${guessBlockWordRised}GuessFill`][position];
          this[`${guessBlockWordRised}GuessFill`][position] = 0;
          this[`${guessBlockElemBelow}GuessFill`] = this[`${guessBlockElemBelow}GuessFill`].reduce((acc, corOrder, index) =>
          {
            if(index === emptyPosition) return acc;
            if(index === elemBelowPosition)
            {
              acc.push(parentCorrectOrder, corOrder);
              return acc;
            }

            acc.push(corOrder);
            return acc;
          }, [] as number[]);

        }
        else
        {
          const vector = position - elemBelowPosition;
          deletingBlockPosition = vector >= 0 ? position + 1 : position;
          this.currentLine[guessBlockElemBelow].appBeforeSpecifiedChildren(elemBelowPosition, parentComp);
          this.currentLine[guessBlockWordRised].getChildren()[deletingBlockPosition].cleanInnerHTML();
          this.currentLine[guessBlockWordRised].destroyOneChild(deletingBlockPosition);

          const parentCorrectOrder = this[`${guessBlockWordRised}GuessFill`][position];
          this[`${guessBlockElemBelow}GuessFill`] = this[`${guessBlockElemBelow}GuessFill`].reduce((acc, corOrder, index) =>
          {
            if(index === position) return acc;
            if(index === elemBelowPosition)
            {
              acc.push(parentCorrectOrder, corOrder);
              return acc;
            }

            acc.push(corOrder);
            return acc;
          }, [] as number[]);
        }

        return;
      }

      this.currentLine.result.replaceChildren(position, parentComp);
    }













    if(parent.closest(`.${this.style.initialGuess}`))
    {
      let position = 0;
      
      this.currentLine.initial.getChildren().find((wordContainer, index) =>
      {
        if(wordContainer && wordContainer.getNode() === parent) 
        // if(wordContainer && wordContainer.getChildren()[0].getNode() === parent) 
        {
          position = index;
          return true;
        }

        return false;
      })

      console.log('Position in initial =', position);

      const parentComp = this.currentLine.initial.getChildren()[position].getChildren()[0];
      const playFildCord = this.getNode().getBoundingClientRect();

      const dragstartOff = (event: Event) => {event.preventDefault();}
      parentComp.addListener('dragstart', dragstartOff);

      const parentCord = parentComp.getNode().getBoundingClientRect();
      const shiftX = event.clientX - parentCord.left;
      const shiftY = event.clientY - parentCord.top;

      const moveAt = (event: PointerEvent) =>
      {
        let isFlayOver = false;
        switch(true)
        {
          case event.pageX < playFildCord.left: isFlayOver = true;
          break; 
          case event.pageX + parentCord.width > playFildCord.right: isFlayOver = true;
          break;
          case event.pageY < playFildCord.top: isFlayOver = true;
          break;
          case event.pageY + parentCord.height > playFildCord.bottom: isFlayOver = true;
          break;
          default: isFlayOver = false;
        }
        if(isFlayOver) return;

        const cordX = event.pageX - playFildCord.left;
        const cordY = event.pageY - playFildCord.top;
        // Because of the "perspective" the Y coordinates are calculated incorrectly. 
        // Perhaps there is another reason that I don't know.
        // correctionCordY is used to correct these coordinates.
        const correctionCordY = 1.03;

        parentComp.getNode().style.left = cordX - shiftX + 'rem';
        parentComp.getNode().style.top = (cordY - shiftY) * correctionCordY + 'rem';
      }

      type TElemParts = 'center' | 'right' | 'left' | 'none';
      interface IDropableElems
      {
        center: Component | null,
        left: Component | null,
        right: Component | null,
      }

      const highLighPartElem = 
      (
        HLElems: IDropableElems,
        HLPart: TElemParts, 
        cleanHLElems?: (Component | null)[]
      ) =>
      {
        switch(HLPart)
        {
          case 'center': 
          {
            if(cleanHLElems) cleanHL(cleanHLElems);
            if(!HLElems.center) break;
            HLElems.center.toggleClass(this.style.wordBlockHLCenter, true);
            break;
          };
          case 'left': 
          {
            if(cleanHLElems) cleanHL(cleanHLElems);
            if(!HLElems.center) break;
            HLElems.center.toggleClass(this.style.wordBlockHLLeft, true);
            if(!HLElems.left) break;
            HLElems.left.toggleClass(this.style.wordBlockHLRight, true);
            break;
          };
          case 'right': 
          {
            if(cleanHLElems) cleanHL(cleanHLElems);
            if(!HLElems.center) break;
            HLElems.center.toggleClass(this.style.wordBlockHLRight, true);
            if(!HLElems.right) break;
            HLElems.right.toggleClass(this.style.wordBlockHLLeft, true);
            break;
          };
          default: break;
        }
      }

      const cleanHL = (components: (Component | null)[]) =>
      {
        components.forEach((component) =>
        {
          if(!component) return;
          component.toggleClass(this.style.wordBlockHLLeft, false);
          component.toggleClass(this.style.wordBlockHLRight, false);
          component.toggleClass(this.style.wordBlockHLCenter, false);
        })
      }

      // const wordContainer = this.wordContainer.getWordContainerArr()[0];
      // this.currentLine.result.replaceChildren(position, wordContainer);
      // wordContainer.append(parentComp);
  
      parentComp.toggleClass(this.style.wordBlockDrag, true);
      // parentComp.getNode().setPointerCapture(event.pointerId);
      moveAt(event);

      let elemBelowPosition = 0;
      let currentElemPart: TElemParts = 'none';
      let currentDroppable: IDropableElems = 
      {
        center: null,
        left: null,
        right: null,
      }
      
      const halfWidthParent = parentCord.width / 2;
      const xShiftForCordBelow = halfWidthParent - shiftX;

      const onMouseMove = (event: PointerEvent) => 
      {
        moveAt(event);

        const xCordBelow = event.clientX + xShiftForCordBelow;
        const yCordBelow = event.clientY - shiftY;
        parent.hidden = true;
        let elemBelow = document.elementFromPoint(xCordBelow, yCordBelow);
        parent.hidden = false;

        console.log('Parent position =', position);
        console.log('Elem Below Position =', elemBelowPosition);
        console.log('Current Elem Part =', currentElemPart);
        console.log('--------------------------------------');

        if(!elemBelow
        // || !(elemBelow.closest(`.${this.style.wordBlock}`) || elemBelow.closest(`.${this.style.wordContainer}`))
        || !elemBelow.closest(`.${this.style.wordContainer}`)
        // || elemBelow.closest(`.${this.style.resultGuess}`) !== this.currentLine.result.getNode())
        || elemBelow.closest(`.${this.style.initialGuess}`) !== this.currentLine.initial.getNode())
        {
          currentElemPart = 'none';
          // cleanHL(this.currentLine.result.getChildren());
          cleanHL(this.currentLine.initial.getChildren());
          return;
        }

        const elemBelowCord = elemBelow.getBoundingClientRect();
        const EBPartWidth = elemBelowCord.width / 5;
        let elemBelowPart: TElemParts = 'none';
        switch(true)
        {
          case event.clientX > elemBelowCord.left 
          && event.clientX < elemBelowCord.left + EBPartWidth:
          {
            elemBelowPart = 'left';
            break;
          }
          case event.clientX > elemBelowCord.left + EBPartWidth
          && event.clientX < elemBelowCord.left + EBPartWidth * 4:
          {
            elemBelowPart = 'center';
            break;
          }
          case event.clientX > elemBelowCord.left + EBPartWidth * 4
          && event.clientX < elemBelowCord.left + EBPartWidth * 5:
          {
            elemBelowPart = 'right';
            break;
          }
          default: elemBelowPart = 'none';
        }

        elemBelowPosition = 0;
        this.currentLine.result.getChildren().find((wordContainer, index) =>
        {
          if(wordContainer && wordContainer.getNode() === elemBelow) 
          {
            elemBelowPosition = index;
            return true;
          }

          return false;
        })

        // const compBelow = this.currentLine.result.getChildren()[elemBelowPosition];
        // const compBelowNearbyLeft = this.currentLine.result.getChildren()[elemBelowPosition - 1];
        // const compBelowNearbyRight = this.currentLine.result.getChildren()[elemBelowPosition + 1];
        const compBelow = this.currentLine.initial.getChildren()[elemBelowPosition];
        const compBelowNearbyLeft = this.currentLine.initial.getChildren()[elemBelowPosition - 1];
        const compBelowNearbyRight = this.currentLine.initial.getChildren()[elemBelowPosition + 1];

        if(currentDroppable.center !== compBelow)
        {
          const { center, left, right } = currentDroppable;
          const dropArr = [center, left, right];
          cleanHL(dropArr);
          
          currentDroppable.center = compBelow;
          currentDroppable.left = compBelowNearbyLeft;
          currentDroppable.right = compBelowNearbyRight;
          if(!currentDroppable.center) return;

          highLighPartElem(currentDroppable, elemBelowPart);
          return;
        }

        if(currentElemPart === elemBelowPart) return;
        currentElemPart = elemBelowPart;

        const { center, left, right } = currentDroppable;
        const dropArr = [center, left, right];

        highLighPartElem(currentDroppable, elemBelowPart, dropArr);
        
        console.log('Parent position =', position);
        console.log('Elem Below Position =', elemBelowPosition);
        console.log('Current Elem Part =', currentElemPart);
        console.log('--------------------------------------');
      }

      parent.addEventListener('pointermove', onMouseMove);

      const insertDragElement = () =>
      {
        if(currentElemPart === 'center'
        && currentDroppable.center)
        {
          // const replacingElem = this.currentLine.result.replaceChildren(elemBelowPosition, parentComp);

          if(position === elemBelowPosition) return;
          // this.currentLine.result.replaceChildren(position, replacingElem);
          const initialChildren = this.currentLine.initial.getChildren();
          const replacingElem = initialChildren[elemBelowPosition].getChildren()[0];
          initialChildren[elemBelowPosition].append(parentComp);
          initialChildren[position].getChildren()[0].cleanInnerHTML();
          if(replacingElem) initialChildren[position].append(replacingElem);

          // const parentCorrectOrder = this.resultGuessFill[position];
          // this.resultGuessFill[position] = this.resultGuessFill[elemBelowPosition];
          // this.resultGuessFill[elemBelowPosition] = parentCorrectOrder;
          const parentCorrectOrder = this.initialGuessFill[position];
          this.initialGuessFill[position] = this.initialGuessFill[elemBelowPosition];
          this.initialGuessFill[elemBelowPosition] = parentCorrectOrder;

          return;
        }

        const transferVector = position - elemBelowPosition;
        const wordContainerPosition = transferVector > 0 ? position + 1 : position;

        if(currentElemPart === 'right'
        && currentDroppable.center)
        {
          this.currentLine.result.appAfterSpecifiedChildren(elemBelowPosition, parentComp);
          this.currentLine.result.getChildren()[wordContainerPosition].cleanInnerHTML();
          this.currentLine.result.destroyOneChild(wordContainerPosition);

          const parentCorrectOrder = this.resultGuessFill[position];
          this.resultGuessFill = this.resultGuessFill.reduce((acc, corOrder, index) =>
          {
            if(index === position) return acc;
            if(index === elemBelowPosition)
            {
              acc.push(corOrder, parentCorrectOrder);
              return acc;
            }

            acc.push(corOrder);
            return acc;
          }, [] as number[]);

          return;
        }

        if(currentElemPart === 'left'
        && currentDroppable.center)
        {
          this.currentLine.result.appBeforeSpecifiedChildren(elemBelowPosition, parentComp);
          this.currentLine.result.getChildren()[wordContainerPosition].cleanInnerHTML();
          this.currentLine.result.destroyOneChild(wordContainerPosition);

          const parentCorrectOrder = this.resultGuessFill[position];
          this.resultGuessFill = this.resultGuessFill.reduce((acc, corOrder, index) =>
          {
            if(index === position) return acc;
            if(index === elemBelowPosition)
            {
              acc.push(parentCorrectOrder, corOrder);
              return acc;
            }

            acc.push(corOrder);
            return acc;
          }, [] as number[]);

          return;
        }

        this.currentLine.result.replaceChildren(position, parentComp);
      }
    }









    if(parent.closest(`.${this.style.resultGuess}`) === this.currentLine.result.getNode())
    {
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

      const parentComp = this.currentLine.result.getChildren()[position];
      const playFildCord = this.getNode().getBoundingClientRect();

      const dragstartOff = (event: Event) => {event.preventDefault();}
      parentComp.addListener('dragstart', dragstartOff);

      const parentCord = parentComp.getNode().getBoundingClientRect();
      const shiftX = event.clientX - parentCord.left;
      const shiftY = event.clientY - parentCord.top;

      const moveAt = (event: PointerEvent) =>
      {
        let isFlayOver = false;
        switch(true)
        {
          case event.pageX < playFildCord.left: isFlayOver = true;
          break; 
          case event.pageX + parentCord.width > playFildCord.right: isFlayOver = true;
          break;
          case event.pageY < playFildCord.top: isFlayOver = true;
          break;
          case event.pageY + parentCord.height > playFildCord.bottom: isFlayOver = true;
          break;
          default: isFlayOver = false;
        }
        if(isFlayOver) return;

        const cordX = event.pageX - playFildCord.left;
        const cordY = event.pageY - playFildCord.top;
        // Because of the "perspective" the Y coordinates are calculated incorrectly. 
        // Perhaps there is another reason that I don't know.
        // correctionCordY is used to correct these coordinates.
        const correctionCordY = 1.03;

        parentComp.getNode().style.left = cordX - shiftX + 'rem';
        parentComp.getNode().style.top = (cordY - shiftY) * correctionCordY + 'rem';
      }

      type TElemParts = 'center' | 'right' | 'left' | 'none';
      interface IDropableElems
      {
        center: Component | null,
        left: Component | null,
        right: Component | null,
      }

      const highLighPartElem = 
      (
        HLElems: IDropableElems,
        HLPart: TElemParts, 
        cleanHLElems?: (Component | null)[]
      ) =>
      {
        switch(HLPart)
        {
          case 'center': 
          {
            if(cleanHLElems) cleanHL(cleanHLElems);
            if(!HLElems.center) break;
            HLElems.center.toggleClass(this.style.wordBlockHLCenter, true);
            break;
          };
          case 'left': 
          {
            if(cleanHLElems) cleanHL(cleanHLElems);
            if(!HLElems.center) break;
            HLElems.center.toggleClass(this.style.wordBlockHLLeft, true);
            if(!HLElems.left) break;
            HLElems.left.toggleClass(this.style.wordBlockHLRight, true);
            break;
          };
          case 'right': 
          {
            if(cleanHLElems) cleanHL(cleanHLElems);
            if(!HLElems.center) break;
            HLElems.center.toggleClass(this.style.wordBlockHLRight, true);
            if(!HLElems.right) break;
            HLElems.right.toggleClass(this.style.wordBlockHLLeft, true);
            break;
          };
          default: break;
        }
      }

      const cleanHL = (components: (Component | null)[]) =>
      {
        components.forEach((component) =>
        {
          if(!component) return;
          component.toggleClass(this.style.wordBlockHLLeft, false);
          component.toggleClass(this.style.wordBlockHLRight, false);
          component.toggleClass(this.style.wordBlockHLCenter, false);
        })
      }

      const wordContainer = this.wordContainer.getWordContainerArr()[0];
      this.currentLine.result.replaceChildren(position, wordContainer);
      wordContainer.append(parentComp);
  
      parentComp.toggleClass(this.style.wordBlockDrag, true);
      parentComp.getNode().setPointerCapture(event.pointerId);
      moveAt(event);

      let elemBelowPosition = 0;
      let currentElemPart: TElemParts = 'none';
      let currentDroppable: IDropableElems = 
      {
        center: null,
        left: null,
        right: null,
      }
      
      const halfWidthParent = parentCord.width / 2;
      const xShiftForCordBelow = halfWidthParent - shiftX;

      const onMouseMove = (event: PointerEvent) => 
      {
        moveAt(event);

        const xCordBelow = event.clientX + xShiftForCordBelow;
        const yCordBelow = event.clientY - shiftY;
        parent.hidden = true;
        let elemBelow = document.elementFromPoint(xCordBelow, yCordBelow);
        parent.hidden = false;

        console.log('Parent position =', position);
        console.log('Elem Below Position =', elemBelowPosition);
        console.log('Current Elem Part =', currentElemPart);
        console.log('--------------------------------------');

        if(!elemBelow
        || !(elemBelow.closest(`.${this.style.wordBlock}`) || elemBelow.closest(`.${this.style.wordContainer}`))
        || elemBelow.closest(`.${this.style.resultGuess}`) !== this.currentLine.result.getNode())
        {
          currentElemPart = 'none';
          cleanHL(this.currentLine.result.getChildren());
          return;
        }

        const elemBelowCord = elemBelow.getBoundingClientRect();
        const EBPartWidth = elemBelowCord.width / 5;
        let elemBelowPart: TElemParts = 'none';
        switch(true)
        {
          case event.clientX > elemBelowCord.left 
          && event.clientX < elemBelowCord.left + EBPartWidth:
          {
            elemBelowPart = 'left';
            break;
          }
          case event.clientX > elemBelowCord.left + EBPartWidth
          && event.clientX < elemBelowCord.left + EBPartWidth * 4:
          {
            elemBelowPart = 'center';
            break;
          }
          case event.clientX > elemBelowCord.left + EBPartWidth * 4
          && event.clientX < elemBelowCord.left + EBPartWidth * 5:
          {
            elemBelowPart = 'right';
            break;
          }
          default: elemBelowPart = 'none';
        }

        elemBelowPosition = 0;
        this.currentLine.result.getChildren().find((wordContainer, index) =>
        {
          if(wordContainer && wordContainer.getNode() === elemBelow) 
          {
            elemBelowPosition = index;
            return true;
          }

          return false;
        })

        const compBelow = this.currentLine.result.getChildren()[elemBelowPosition];
        const compBelowNearbyLeft = this.currentLine.result.getChildren()[elemBelowPosition - 1];
        const compBelowNearbyRight = this.currentLine.result.getChildren()[elemBelowPosition + 1];

        if(currentDroppable.center !== compBelow)
        {
          const { center, left, right } = currentDroppable;
          const dropArr = [center, left, right];
          cleanHL(dropArr);
          
          currentDroppable.center = compBelow;
          currentDroppable.left = compBelowNearbyLeft;
          currentDroppable.right = compBelowNearbyRight;
          if(!currentDroppable.center) return;

          highLighPartElem(currentDroppable, elemBelowPart);
          return;
        }

        if(currentElemPart === elemBelowPart) return;
        currentElemPart = elemBelowPart;

        const { center, left, right } = currentDroppable;
        const dropArr = [center, left, right];

        highLighPartElem(currentDroppable, elemBelowPart, dropArr);
        
        console.log('Parent position =', position);
        console.log('Elem Below Position =', elemBelowPosition);
        console.log('Current Elem Part =', currentElemPart);
        console.log('--------------------------------------');
        // console.log('EBPartWidth =', EBPartWidth);
        // console.log('event.clientY =', event.clientY);
        // console.log('elemBelowCord.left =', elemBelowCord.left);
        // console.log(elemBelowPart);
        // console.log(elemBelow);
        // div.style.left = xCordBelow + 'rem';
        // div.style.top = yCordBelow + 'rem';
        // div.style.left = event.clientX + 'rem';
        // div.style.top = event.clientY + 'rem';
        // console.log('cord below = X =', xCordBelow, ', Y =', yCordBelow);
        // console.log('parent cord =', parent.getBoundingClientRect());
      }

      parent.addEventListener('pointermove', onMouseMove);

      const insertDragElement = () =>
      {
        if(currentElemPart === 'center'
        && currentDroppable.center)
        {
          const replacingElem = this.currentLine.result.replaceChildren(elemBelowPosition, parentComp);

          if(position === elemBelowPosition) return;
          this.currentLine.result.replaceChildren(position, replacingElem);

          const parentCorrectOrder = this.resultGuessFill[position];
          this.resultGuessFill[position] = this.resultGuessFill[elemBelowPosition];
          this.resultGuessFill[elemBelowPosition] = parentCorrectOrder;

          return;
        }

        const transferVector = position - elemBelowPosition;
        const wordContainerPosition = transferVector > 0 ? position + 1 : position;

        if(currentElemPart === 'right'
        && currentDroppable.center)
        {
          this.currentLine.result.appAfterSpecifiedChildren(elemBelowPosition, parentComp);
          this.currentLine.result.getChildren()[wordContainerPosition].cleanInnerHTML();
          this.currentLine.result.destroyOneChild(wordContainerPosition);

          const parentCorrectOrder = this.resultGuessFill[position];
          this.resultGuessFill = this.resultGuessFill.reduce((acc, corOrder, index) =>
          {
            if(index === position) return acc;
            if(index === elemBelowPosition)
            {
              acc.push(corOrder, parentCorrectOrder);
              return acc;
            }

            acc.push(corOrder);
            return acc;
          }, [] as number[]);

          return;
        }

        if(currentElemPart === 'left'
        && currentDroppable.center)
        {
          this.currentLine.result.appBeforeSpecifiedChildren(elemBelowPosition, parentComp);
          this.currentLine.result.getChildren()[wordContainerPosition].cleanInnerHTML();
          this.currentLine.result.destroyOneChild(wordContainerPosition);

          const parentCorrectOrder = this.resultGuessFill[position];
          this.resultGuessFill = this.resultGuessFill.reduce((acc, corOrder, index) =>
          {
            if(index === position) return acc;
            if(index === elemBelowPosition)
            {
              acc.push(parentCorrectOrder, corOrder);
              return acc;
            }

            acc.push(corOrder);
            return acc;
          }, [] as number[]);

          return;
        }

        this.currentLine.result.replaceChildren(position, parentComp);
      }

      // console.log('Parent position =', position);
      // console.log('Elem Below Position =', elemBelowPosition);
      // console.log('Current Elem Part =', currentElemPart);
      // console.log('--------------------------------------');

      const handlerPointerUp = (event: PointerEvent) =>
      {
        
        cleanHL(this.currentLine.result.getChildren());
        insertDragElement();
        // this.currentLine.result.replaceChildren(position, parentComp);
        parent.removeEventListener('pointermove', onMouseMove);
        parentComp.toggleClass(this.style.wordBlockDrag, false);
        parentComp.removeListener('dragstart', dragstartOff);
        parent.removeEventListener('pointerup', handlerPointerUp);
      }

      parent.addEventListener('pointerup', handlerPointerUp);
    }


    /*
    // let guessBlock: HTMLElement | null = null;
    // const initial = parent.closest<HTMLElement>(`.${this.style.initialGuess}`);
    // const result = parent.closest<HTMLElement>(`.${this.style.resultGuess}`);
    // guessBlock = initial ? initial : result;
    // if(guessBlock === null) return;

    const playFildCord = this.getNode().getBoundingClientRect();

    const dragstartOff = (event: Event) => { event.preventDefault(); }
    parent.addEventListener('dragstart', dragstartOff);

    // const guessBlockCord = guessBlock.getBoundingClientRect();
    const parentCord = parent.getBoundingClientRect();
    const shiftX = event.clientX - parentCord.left;
    const shiftY = event.clientY - parentCord.top;

    // console.log('shiftX = ', shiftX);
    // console.log('shiftY = ', shiftY);

    const moveAt = (event: PointerEvent) =>
    {
      let isFlayOver = false;
      switch(true)
      {
        case event.pageX < playFildCord.left: isFlayOver = true;
        break; 
        case event.pageX + parentCord.width > playFildCord.right: isFlayOver = true;
        break;
        case event.pageY < playFildCord.top: isFlayOver = true;
        break;
        case event.pageY + parentCord.height > playFildCord.bottom: isFlayOver = true;
        break;
        default: isFlayOver = false;
      }

      // console.log('isFlayOver =', isFlayOver);
      // console.log('moveAt event =', event);

      if(isFlayOver) return;

      const cordX = event.pageX - playFildCord.left;
      const cordY = event.pageY - playFildCord.top;

      // 1.022503
      // console.log('cordX = ', cordX);
      // console.log('cordY = ', cordY);
      
      // For some reason, unknown to me, the block is shifted higher than it should be 
      // in the Y coordinate. This coefficient is used to correct the position.
      const correctionCordY = 1.03;

      parent.style.left = cordX - shiftX + 'rem';
      parent.style.top = (cordY - shiftY) * correctionCordY + 'rem';
      // parent.style.left = cordX - shiftX + 'rem';
      // parent.style.top = (cordY - shiftY) + 'rem';
      // parent.style.left = cordX + 'rem';
      // parent.style.top = cordY + 'rem';

      // console.log('parentCordInFlay = ', parent.getBoundingClientRect());
    }

    // console.log('parentCord = ', parentCord);
    // console.log('playFildCord = ', playFildCord);
    // console.log('event = ', event);
    // console.log('guessBlock = ', guessBlock);

    parent.classList.add(this.style.wordBlockDrag);
    // document.body.append(parent);
    moveAt(event);

    const onMouseMove = (event: PointerEvent) => 
    {
      moveAt(event);
    }

    parent.addEventListener('pointermove', onMouseMove);

    const handlerPointerUp = (event: PointerEvent) =>
    {
      // console.log('in handlerPointerUp');

      parent.removeEventListener('pointermove', onMouseMove);
      parent.classList.remove(this.style.wordBlockDrag);
      parent.removeEventListener('dragstart', dragstartOff);
      parent.removeEventListener('pointerup', handlerPointerUp);
    }

    parent.addEventListener('pointerup', handlerPointerUp);
    */
  }

  protected handlerPointerDown = (event: Event) =>
  {
    this.isMouseDown = true;
    this.timeoutId = setTimeout(() =>
    {
      if(this.isMouseDown)
      {
        this.handlerDragAndDropWordBlock(event);
        this.isMouseDown = false;
      }
    }, 200);
  }

  protected handlerPointerUp = () =>
  {
    if(this.timeoutId) clearTimeout(this.timeoutId);
  }

  public getWordCount(): number
  {
    return this.wordCount;
  }

  public getBoundMethods(): TPlayFieldMethods
  {
    return {
      collectSentenceInRightOrder: this.collectSentenceInRightOrder.bind(this),
      goToNextSentence: this.goToNextSentence.bind(this),
      toggleWordValidationHighligh: this.toggleWordValidationHighligh.bind(this)
    }
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