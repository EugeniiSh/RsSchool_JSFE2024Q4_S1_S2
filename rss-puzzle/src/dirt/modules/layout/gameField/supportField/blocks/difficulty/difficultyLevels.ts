import { Component } from '../../../../common/component';

export interface IDifficultyLevelsStyleList
{
  levelsContainer: string;
  levelBlock: string;
  levelBlockActive: string;
}

export interface IDifficultyLevelsOption
{
  className: string[];
  text: string;
  style: IDifficultyLevelsStyleList;
}

type TLevelBlocksContent = ['Level', 'I', 'II', 'III', 'IV', 'V', 'VI'];
type StringToNumber<T extends string> = T extends `${infer N extends number}` ? N : never;
export type TSingleLevelBlockIndex = StringToNumber<keyof TLevelBlocksContent & `${number}`>;

export class DifficultyLevels extends Component
{
  protected className: string[];

  protected style: IDifficultyLevelsStyleList;

  protected content: TLevelBlocksContent;

  protected levelBlocks: Component[];

  protected renderRounds: (clickBlockNumber: TSingleLevelBlockIndex) => void

  constructor
  (
    {
      className,
      text,
      style,
    }: IDifficultyLevelsOption
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;

    this.content = ['Level', 'I', 'II', 'III', 'IV', 'V', 'VI'];
    this.levelBlocks = this.content.map((textContent, index) =>
    {
      const block = new Component({ tag: 'div', className: [this.style.levelBlock], text: '' });
      block.setAttribute('data-description', textContent);
      block.setAttribute('data-number', `${index}`);
      return block;
    });

    this.renderRounds = () => {};

    this.appendChildren(this.levelBlocks);
    this.addListener('click', (event) => this.clickHandler(event));
  }

  public setRenderRoundFunc(func: (clickBlockNumber: TSingleLevelBlockIndex) => void): void
  {
    this.renderRounds = func;
  }

  public setActiveLevelBlock(activBlockIndex: TSingleLevelBlockIndex): void
  {
    this.levelBlocks.forEach((block, index) =>
    {
      if(activBlockIndex === index)
      {
        block.toggleClass(this.style.levelBlockActive, true);
        return;
      }

      block.toggleClass(this.style.levelBlockActive, false);
    })
  }

  protected clickHandler(event: Event): void
  {
    if(event.target === null) return;
    if(!(event.target instanceof HTMLElement)) return;

    const levelBlock = event.target.closest(`.${this.style.levelBlock}`) as HTMLElement | null;
    if(!levelBlock) return;

    const clickBlockIndexAsString = levelBlock.dataset.number;
    if(!clickBlockIndexAsString) throw new Error('No block number on click element');

    const clickBlockIndexAsNumber = Number(clickBlockIndexAsString) as TSingleLevelBlockIndex;
    if(!clickBlockIndexAsNumber) throw new Error('Incorrect value clickBlockNumber');

    this.setActiveLevelBlock(clickBlockIndexAsNumber);
    this.renderRounds(clickBlockIndexAsNumber);
  }

  public getDifficultyLevels(): DifficultyLevels
  {
    return new DifficultyLevels
    (
      {
        className: this.className,
        text: '',
        style: this.style,
      }
    )
  }
}