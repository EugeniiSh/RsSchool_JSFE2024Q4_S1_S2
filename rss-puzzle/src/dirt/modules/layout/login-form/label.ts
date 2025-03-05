import * as comp from '../common/component';

export interface ILabelOptions
{
  className: string[];
  text: string;
  forAttribute: string;
}

export class Label extends comp.Component
{
  constructor({ className, text, forAttribute }: ILabelOptions)
  {
    super({ tag: 'label', className, text });
    this.setAttribute("for", forAttribute);
  }
}