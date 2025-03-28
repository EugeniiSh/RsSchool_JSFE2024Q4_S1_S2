import { Component } from '../../../common/component';
import { PageContent, IPageContentOption } from './page-content';

export interface IPageSideOption extends IPageContentOption {
  content: PageContent;
}

export class PageSide extends Component {
  protected content: Component;

  constructor({ className, text, content }: IPageSideOption) {
    super({ tag: 'div', className, text });
    super.append(content);
    this.content = content;
  }

  append(child: Component): void {
    this.content.append(child);
  }
}
