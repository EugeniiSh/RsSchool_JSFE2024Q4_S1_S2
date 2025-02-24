import * as common from '../../common/common';

export interface IFormOptions {
  className: string[];
  text: string;
  items: common.Component[];
}

export class Form extends common.Component {
  constructor({ className, text, items }: IFormOptions) {
    super({ tag: 'form', className, text });
    this.appendChildren(items);
  }
}
