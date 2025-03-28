import * as comp from '../common/component';
import { InputText, IInputTextValues } from './input/input-text';
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

  protected setFieldValid(validationResult: boolean[]): void
  {
    this.isValid = validationResult.every((item) => item);
  }

  public isFieldValid(): boolean 
  { 
    return this.isValid; 
  }

  public getFieldValue(): IInputTextValues
  {
    return this.validateItem.getValue();
  }

  destroy() 
  {
    this.removeListener("input", this.onInput);
    super.destroy();
  }
}