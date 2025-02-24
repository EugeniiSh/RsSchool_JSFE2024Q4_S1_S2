import * as common from '../../common/common';

export interface ILabelOptions {
  className: string[];
  text: string;
  forAttribute: string;
}

export class Label extends common.Component {
  constructor({ className, text, forAttribute }: ILabelOptions) {
    super({ tag: 'label', className, text });
    this.setAttribute('for', forAttribute);
  }
}
