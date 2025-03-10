import * as comp from '../common/component';
// import { Input } from './input/input';

export interface IFieldFormOptions
{
  className: string[];
  text: string;
  items: comp.Component[];
  // validateItem: Input;
  // checkFieldFor: string[];
  inputListener: EventListener,
}

export class FieldForm extends comp.Component
{
  private isValid = false;

  private onInput: EventListener;

  constructor
  (
    { 
      className, 
      text, 
      items,
      // validateItem,
      // checkFieldFor,
      inputListener
    }: IFieldFormOptions
  )
  {
    super({ tag: 'div', className, text });
    this.appendChildren(items);
    this.onInput = inputListener;
    this.addListener('input', this.onInput);
  }

  public isFieldValid(): boolean 
  { 
    return this.isValid; 
  }

  destroy() 
  {
    this.removeListener("input", this.onInput);
    super.destroy();
  }
}