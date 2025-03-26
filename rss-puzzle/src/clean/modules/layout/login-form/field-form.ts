import * as comp from '../common/component';
import { InputText } from './input/input-text';
import { HintsBlock } from '../hint/hintsBlock';

export interface IFieldFormOptions
{
  className: string[];
  text: string;
  items: comp.Component[];
  validateItem: InputText;
  checkFieldFor: string[];
  hintsBlock: HintsBlock;
  inputListener: EventListener,
}

export class FieldForm extends comp.Component
{
  private isValid = false;

  private onInput: EventListener;

  protected checkFieldFor: string[];

  protected validateItem: InputText;

  protected hintsBlock: HintsBlock;

  constructor
  (
    { 
      className, 
      text, 
      items,
      validateItem,
      checkFieldFor,
      hintsBlock,
      inputListener
    }: IFieldFormOptions
  )
  {
    super({ tag: 'div', className, text });
    this.appendChildren(items);
    this.validateItem = validateItem;
    this.checkFieldFor = checkFieldFor;
    this.hintsBlock = hintsBlock;
    this.onInput = inputListener.bind(this);
    this.addListener('input', this.onInput);
  }

  protected setFieldValid(validationResult: boolean[])
  {
    this.isValid = validationResult.every((item) => item);
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