import { Component } from '../../../common/component';
import { WordBlock } from './wordBlock';

export interface IWordContainerStyleList {
  resultContainer: string;
  resultGuess: string;
  wordContainerFilled: string;
}

export interface IWordContainerOptions {
  className: string[];
  text: string;
  style: IWordContainerStyleList;
}

export class WordContainer extends Component {
  protected className: string[];

  protected style: IWordContainerStyleList;

  constructor({ className, text, style }: IWordContainerOptions) {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
  }

  public setFillStatus(
    isFilled: boolean,
    filler: Component | null = null,
  ): void {
    if (isFilled) {
      if (!filler) return;
      if (!(filler instanceof WordBlock)) return;
      if (!filler.getIsWidthSet()) return;

      this.toggleClass(this.style.wordContainerFilled, true);
      return;
    }

    this.toggleClass(this.style.wordContainerFilled, false);
  }

  public append(child: Component): void {
    super.append(child);
    this.setFillStatus(true, child);
  }

  public cleanInnerHTML(): void {
    super.cleanInnerHTML();
    this.setFillStatus(false);
  }

  public getWordContainerArr(count: number = 1): WordContainer[] {
    const corrCount = count < 1 ? 1 : count;
    const result: WordContainer[] = [];

    for (let i = 0; i < corrCount; i += 1) {
      result.push(
        new WordContainer({
          className: this.className,
          text: '',
          style: this.style,
        }),
      );
    }

    return result;
  }
}
