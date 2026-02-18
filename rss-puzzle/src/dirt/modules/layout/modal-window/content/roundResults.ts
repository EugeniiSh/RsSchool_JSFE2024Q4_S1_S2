import { Component } from '../../common/component';
import { CommonButton } from '../../button/common-button';

import { type IStorageSentenceProgress } from '../../../storage/local';
import { type IPuzzleRound } from '../../../storage/external';

export interface IRoundResultsStyleList
{
  resultsContainer: string;
  sentenceContainer: string;
  sentence: string;
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
}

export class RoundResults extends Component
{
  protected className: string[];

  protected style: IRoundResultsStyleList;

  constructor
  (
    {
      className,
      text,
      style,
    }: IRoundResultsOption
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
  }

  protected getRoundResultsSentences(sentenceProgress: IStorageSentenceProgress[], roundData: IPuzzleRound): Component
  {
    const completeSentences = roundData.words.map((roundSentence, index) =>
    {
      const sentence = roundSentence.textExample;
      const isWithHelp = sentenceProgress[index] ? sentenceProgress[index].isWithHelp : false;
      const helpStatusStyle = isWithHelp ? this.style.withHelp : this.style.withOutHelp;

      const sentenceComponent = new Component
      (
        {
          tag: 'div',
          className: [this.style.sentence, helpStatusStyle],
          text: sentence,
        }
      );

      return sentenceComponent;
    });

    const sentenceContainer = new Component({ tag: 'div', className: [this.style.sentenceContainer], text: '' });
    sentenceContainer.appendChildren(completeSentences);

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
      }
    )
  }
}