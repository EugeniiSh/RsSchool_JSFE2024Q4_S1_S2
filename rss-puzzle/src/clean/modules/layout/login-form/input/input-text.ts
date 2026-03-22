import * as input from './input';

export type TInputTextAttributes = Exclude<input.TInputAttributes, 'type'>;
export type TInputTextFieldsCheckers = Map<
  string,
  { func: (value: string) => boolean; text: string }
>;
export type TInputTextNames = 'fname' | 'lname';

export interface IInputTextValues {
  type: TInputTextNames;
  value: string;
}

export interface IInputTextOptions extends input.IInputOptions {
  attributes: [TInputTextAttributes, string][];
  inputName: TInputTextNames;
  fieldCheckers: TInputTextFieldsCheckers;
  inputListener: EventListener;
}

export class InputText extends input.Input {
  private validList: Map<string, boolean> = new Map();

  private fieldCheckers: TInputTextFieldsCheckers;

  private onInput: EventListener;

  protected inputName: TInputTextNames;

  protected inputValue: IInputTextValues;

  constructor({
    className,
    text,
    attributes,
    inputName,
    fieldCheckers,
    inputListener,
  }: IInputTextOptions) {
    super({ className, text, attributes });
    this.setAttribute('type', 'text');
    this.onInput = inputListener.bind(this);
    this.addListener('input', this.onInput);
    this.fieldCheckers = fieldCheckers;
    this.fieldCheckers.forEach((value, key) => this.validList.set(key, false));
    this.inputName = inputName;
    this.inputValue = { type: this.inputName, value: '' };
  }

  protected setValue(value: string) {
    this.inputValue.value = value;
  }

  protected setValid(inputValue: string) {
    this.fieldCheckers.forEach((value, checkFor) => {
      this.validList.set(checkFor, value.func(inputValue));
    });
  }

  public getValue() {
    return this.inputValue;
  }

  public getValid(checkFor: string): boolean {
    const result = this.validList.get(checkFor);
    if (!result) return false;
    return true;
  }

  public setInputValueAttribute(value: string): void {
    const inputElem = this.getNode() as HTMLInputElement;
    inputElem.value = value;
    this.setValue(value);
  }

  destroy() {
    this.removeListener('input', this.onInput);
    super.destroy();
  }
}
