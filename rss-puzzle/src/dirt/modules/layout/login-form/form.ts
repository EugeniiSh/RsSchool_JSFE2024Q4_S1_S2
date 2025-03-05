import * as comp from '../common/component';

export interface IFormOptions
{
  className: string[];
  text: string;
  items: comp.Component[];
}

export class Form extends comp.Component
{
  constructor({ className, text, items }: IFormOptions)
  {
    super({ tag: 'form', className, text });
    this.appendChildren(items);
  }
}