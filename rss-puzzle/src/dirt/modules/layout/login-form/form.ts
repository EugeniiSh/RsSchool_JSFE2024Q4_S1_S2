import * as comp from '../common/component';
import { FieldForm } from './field-form';
import { InputButton } from './input/input-button';

export type TFormAttributes = 
| 'accept-charset'
| 'action'
| 'autocomplete'
| 'enctype' 
| 'method'
| 'name'
| 'novalidate'
| 'target'
| 'rel';

export interface IFormOptions
{
  className: string[];
  text: string;
  items: comp.Component[];
  attributes: [TFormAttributes, string][];
  fields: FieldForm[];
  submit: InputButton;
  inputListener: EventListener,
}

export class Form extends comp.Component
{
  private onInput: EventListener;

  constructor
  (
    { 
      className, 
      text, 
      items, 
      attributes,
      // fields,
      // submit, 
      inputListener
    }: IFormOptions
  )
  {
    super({ tag: 'form', className, text });
    this.appendChildren(items);
    attributes.forEach(([ attribut, value ]) => this.setAttribute(attribut, value), this);
    this.onInput = inputListener;
    this.addListener('input', this.onInput);
  }

  destroy() 
  {
    this.removeListener("input", this.onInput);
    super.destroy();
  }
}