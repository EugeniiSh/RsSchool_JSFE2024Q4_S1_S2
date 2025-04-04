import * as comp from '../common/component';
import { FieldForm } from './field-form';
import { InputButton } from './input/input-button';
import { TInputTextNames } from './input/input-text';

export type TFieldsValue = Record<TInputTextNames, string>;

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

export interface IFormOptions {
  className: string[];
  text: string;
  items: comp.Component[];
  attributes: [TFormAttributes, string][];
  fields: FieldForm[];
  submit: InputButton;
  inputListener: EventListener;
}

export class Form extends comp.Component {
  private isValid = false;

  private fields: FieldForm[];

  private submit: InputButton;

  private onInput: EventListener;

  constructor({
    className,
    text,
    items,
    attributes,
    fields,
    submit,
    inputListener,
  }: IFormOptions) {
    super({ tag: 'form', className, text });
    this.appendChildren(items);
    this.fields = fields;
    this.submit = submit;
    attributes.forEach(
      ([attribut, value]) => this.setAttribute(attribut, value),
      this,
    );
    this.onInput = inputListener.bind(this);
    this.addListener('input', this.onInput);
  }

  protected setFormValid() {
    this.isValid = this.fields.every((field) => field.isFieldValid());
    this.submit.changeStatus(this.isValid);
  }

  public isFormValid(): boolean {
    return this.isValid;
  }

  public getFormValue(): TFieldsValue {
    const result = {} as TFieldsValue;
    this.fields.forEach((field) => {
      const fieldValue = field.getFieldValue();
      const { type, value } = fieldValue;
      result[type] = value;
    });

    return result;
  }

  public setFormValue(value: string): void {
    this.fields.forEach((field) => {
      field.setFieldValue(value);
    });
  }

  destroy() {
    this.removeListener('input', this.onInput);
    super.destroy();
  }
}
