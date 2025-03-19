import { Component } from '../../common/component';
import { Page } from './page/page';

export interface IPagesBlock {
  className: string[];
  text: string;
  items: Page[];
}

export class PagesBlock extends Component {
  private zIndex = 1;

  constructor({ className, text, items }: IPagesBlock) {
    super({ tag: 'div', className, text });
    this.prependChildren(items); // Реверс элементов для правильного отображения (наложения друг на друга)
  }

  protected getAndUpZindex(): number {
    const current = this.zIndex;
    this.zIndex += 1;

    return current;
  }
}
