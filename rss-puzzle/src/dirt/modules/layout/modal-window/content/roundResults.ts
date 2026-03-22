import { Component } from '../../common/component';
import { CommonButton } from '../../button/common-button';
import { AudioPlayer } from '../../../audio/audioPlayer';
import { PuzzleGameExternalStorage, type IPuzzleRound } from '../../../storage/external';

import { type IStorageSentenceProgress } from '../../../storage/local';

export interface IRoundResultsStyleList
{
  resultsContainer: string;
  miniatureContainer: string;
  miniatureImageBlock: string;
  miniatureTextBlock: string;
  sentenceContainer: string;
  knowledgeBlock: string;
  knowledgeHeader: string;
  sentenceBlock: string;
  sentence: string;
  audioHint: string;
  withHelp: string;
  withOutHelp: string;
  buttonContainer: string;
  button: string;
}

export interface IRoundResultsOption
{
  className: string[];
  text: string;
  style: IRoundResultsStyleList;
  audioPlayer: AudioPlayer;
  externalStorage: PuzzleGameExternalStorage;
}

export class RoundResults extends Component
{
  protected className: string[];

  protected style: IRoundResultsStyleList;

  protected audioPlayer: AudioPlayer;

  protected externalStorage: PuzzleGameExternalStorage;

  constructor
  (
    {
      className,
      text,
      style,
      audioPlayer,
      externalStorage,
    }: IRoundResultsOption
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.audioPlayer = audioPlayer.getAudioPlayer();
    this.externalStorage = externalStorage;

    this.append(this.audioPlayer);
  }

  protected audioHintClickHandler = (event: Event) =>
  {
    if(event.target === null) return;
    if(!(event.target instanceof HTMLElement)) return;

    const audioHintNode = event.target.closest(`.${this.style.audioHint}`);
    if(audioHintNode === null) return;
    if(!(audioHintNode instanceof HTMLElement)) return;

    const audioHintPart = audioHintNode.dataset.audio;
    if(!audioHintPart) return;

    this.audioPlayer.loadSong(audioHintPart);
    this.audioPlayer.playSong();
  }

  protected getRoundResutsMiniature(roundData: IPuzzleRound): Component
  {
    const imageBlock = new Component({ tag: 'div',className: [this.style.miniatureImageBlock],text: '', });
    imageBlock.getNode().style.backgroundImage = `url(${this.externalStorage.getImagePath(roundData.levelData)})`;

    const { year, author, name } = roundData.levelData;
    const textBlock = new Component
    (
      { 
        tag: 'div',
        className: [this.style.miniatureTextBlock],
        text: `${author} - ${name}(${year} г.)`, 
      }
    );

    const miniatureContainer = new Component({ tag: 'div',className: [this.style.miniatureContainer],text: '', });
    miniatureContainer.appendChildren([imageBlock, textBlock]);

    return miniatureContainer;
  }

  protected getRoundResultsSentences(sentenceProgress: IStorageSentenceProgress[], roundData: IPuzzleRound): Component
  {
    const iKnowBlock = new Component({ tag: 'div',className: [this.style.knowledgeBlock],text: '', });
    const iKnowHeader = new Component
    (
      { 
        tag: 'div',
        className: [this.style.knowledgeHeader, this.style.withOutHelp],
        text: 'i know', 
      }
    );
    iKnowBlock.append(iKnowHeader);

    const iDontKnowBlock = new Component({ tag: 'div',className: [this.style.knowledgeBlock],text: '', });
    const iDontKnowHeader = new Component
    (
      { 
        tag: 'div',
        className: [this.style.knowledgeHeader, this.style.withHelp],
        text: "i don't know", 
      }
    );
    iDontKnowBlock.append(iDontKnowHeader);

    roundData.words.forEach((roundSentence, index) =>
    {
      const sentence = roundSentence.textExample;
      const isWithHelp = sentenceProgress[index] ? sentenceProgress[index].isWithHelp : false;

      const sentenceComponent = new Component({ tag: 'div',className: [this.style.sentence], text: sentence, });

      const audioComponent = new Component({ tag: 'div',className: [this.style.audioHint], text: '', });
      audioComponent.setAttribute('data-audio', this.externalStorage.getAudioPath(roundSentence));

      const sentenceBlock = new Component({ tag: 'div',className: [this.style.sentenceBlock], text: '', });
      sentenceBlock.appendChildren([audioComponent, sentenceComponent]);

      if(isWithHelp)
      {
        iDontKnowBlock.append(sentenceBlock);
        return;
      }

      iKnowBlock.append(sentenceBlock);
    });

    const miniatureContainer = this.getRoundResutsMiniature(roundData);

    const sentenceContainer = new Component({ tag: 'div', className: [this.style.sentenceContainer], text: '' });
    sentenceContainer.appendChildren([miniatureContainer, iKnowBlock, iDontKnowBlock]);
    sentenceContainer.addListener('click', this.audioHintClickHandler);

    return sentenceContainer;
  }

  protected getRoundResultsButtons(closeHandler: EventListener, nextHandler: EventListener): Component
  {
    const closeButton = new CommonButton
    (
      {
        className: [this.style.button],
        text: 'close',
        items: [],
        clickListener: closeHandler,
      }
    );

    const nextButton = new CommonButton
    (
      {
        className: [this.style.button],
        text: 'next',
        items: [],
        clickListener: nextHandler,
      }
    );

    const buttonsContainer = new Component({ tag: 'div', className: [this.style.buttonContainer], text: '' });
    buttonsContainer.appendChildren([closeButton, nextButton]);

    return buttonsContainer;
  }

  public getPlayerResultsComponent
  (
    sentenceProgress: IStorageSentenceProgress[], 
    roundData: IPuzzleRound,
    closeHandler: EventListener,
    nextHandler: EventListener
  ): Component
  {
    const resultsContainer = new Component({ tag: 'div', className: [this.style.resultsContainer], text: '' });
    resultsContainer.appendChildren
    (
      [
        this.getRoundResultsSentences(sentenceProgress, roundData),
        this.getRoundResultsButtons(closeHandler, nextHandler),
      ]
    );

    return resultsContainer; 
  }

  public getRoundResults(): RoundResults
  {
    return new RoundResults
    (
      {
        className: this.className,
        text: '',
        style: this.style,
        audioPlayer: this.audioPlayer.getAudioPlayer(),
        externalStorage: this.externalStorage,
      }
    )
  }
}