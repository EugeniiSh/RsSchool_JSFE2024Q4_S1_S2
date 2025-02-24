import * as common from '../common/common';

export interface IWrapperOptions {
  className: string[];
  text: string;
  items: common.Component[];
}

export class Wrapper extends common.Component {
  constructor({ className, text, items }: IWrapperOptions) {
    super({ tag: 'div', className, text });
    this.appendChildren(items);
  }
}
