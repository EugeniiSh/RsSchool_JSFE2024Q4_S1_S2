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
type TSingleLevelBlockContent = TLevelBlocksContent[number];

export class DifficultyLevels extends Component
{
  protected className: string[];

  protected style: IDifficultyLevelsStyleList;

  protected content: TLevelBlocksContent;

  protected levelBlocks: Component[];

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
    this.levelBlocks = this.content.map((textContent) =>
    {
      const block = new Component({ tag: 'div', className: [this.style.levelBlock], text: '' });
      block.setAttribute('data-description', textContent);
      return block;
    });

    this.appendChildren(this.levelBlocks);
    this.addListener('click', (event) => this.clickHandler(event));
  }

  protected setActiveLevelBlock(activBlockDescription: TSingleLevelBlockContent): void
  {
    this.content.forEach((elementContent, index) =>
    {
      if(index === 0) return;
      
      if(elementContent === activBlockDescription)
      {
        this.levelBlocks[index].toggleClass(this.style.levelBlockActive, true);
        return;
      }

      this.levelBlocks[index].toggleClass(this.style.levelBlockActive, false);
    })
  }

  protected clickHandler(event: Event): void
  {
    if(event.target === null) return;
    if(!(event.target instanceof HTMLElement)) return;

    const levelBlock = event.target.closest(`.${this.style.levelBlock}`) as HTMLElement | null;
    if(!levelBlock) return;

    const clickBlockDescription = levelBlock.dataset.description as TSingleLevelBlockContent | undefined;
    if(!clickBlockDescription) throw new Error('No block description on click element');

    this.setActiveLevelBlock(clickBlockDescription);
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