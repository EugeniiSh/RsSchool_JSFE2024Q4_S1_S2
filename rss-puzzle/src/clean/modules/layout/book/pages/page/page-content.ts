import { Component } from '../../../common/component';

export interface IPageContentOption {
  className: string[];
  text: string;
  content: Component;
}

export class PageContent extends Component {
  protected content: Component;

  constructor({ className, text, content }: IPageContentOption) {
    super({ tag: 'div', className, text });
    super.append(content);
    this.content = content;
  }

  // append(child: Component): void
  // {
  //   this.destroyChildren();
  //   super.append(child);
  // }
}
