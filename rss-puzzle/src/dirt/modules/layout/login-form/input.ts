import * as comp from '../common/component';

type TInputAttributes = 'type' | 'id' | 'name' | 'value' | 'required'; 

export interface IInputOptions
{
  className: string[];
  text: string;
  attributes: [TInputAttributes, string][];
}

export class Input extends comp.Component
{
  constructor({ className, text, attributes }: IInputOptions)
  {
    super({ tag: 'input', className, text });
    attributes.forEach(([ attribut, value ]) => this.setAttribute(attribut, value), this);
  }
}