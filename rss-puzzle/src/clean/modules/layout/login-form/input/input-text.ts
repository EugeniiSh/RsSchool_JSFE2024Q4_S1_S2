import * as input from './input';

export type TInputTextAttributes = Exclude<input.TInputAttributes, 'type'>;
export type TInputTextFieldsCheckers = Map<
  string,
  { func: (value: string) => boolean; text: string }
>;

export interface IInputTextOptions extends input.IInputOptions {
  attributes: [TInputTextAttributes, string][];
  fieldCheckers: TInputTextFieldsCheckers;
  inputListener: EventListener;
}

export class InputText extends input.Input {
  private validList: Map<string, boolean> = new Map();

  private fieldCheckers: TInputTextFieldsCheckers;

  private onInput: EventListener;

  constructor({
    className,
    text,
    attributes,
    fieldCheckers,
    inputListener,
  }: IInputTextOptions) {
    super({ className, text, attributes });
    this.setAttribute('type', 'text');
    this.onInput = inputListener.bind(this);
    this.addListener('input', this.onInput);
    this.fieldCheckers = fieldCheckers;
    this.fieldCheckers.forEach((value, key) => this.validList.set(key, false));
  }

  protected setValid(inputValue: string) {
    this.fieldCheckers.forEach((value, checkFor) => {
      this.validList.set(checkFor, value.func(inputValue));
    });
  }

  public getValid(checkFor: string): boolean {
    const result = this.validList.get(checkFor);
    if (!result) return false;
    return true;
  }

  destroy() {
    this.removeListener('input', this.onInput);
    super.destroy();
  }
}
