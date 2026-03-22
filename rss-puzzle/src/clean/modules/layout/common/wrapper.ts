import * as comp from './component';

export interface IWrapperOptions {
  className: string[];
  text: string;
  items: comp.Component[];
}

export class Wrapper extends comp.Component {
  constructor({ className, text, items }: IWrapperOptions) {
    super({ tag: 'div', className, text });
    this.appendChildren(items);
  }
}
