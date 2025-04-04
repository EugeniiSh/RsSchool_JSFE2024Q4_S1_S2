import * as input from './input';
import { TCustomEventValues } from '../../../events/custom';

export type TInputButtonAttributes = Exclude<
  input.TInputAttributes,
  'type' | 'name' | 'required'
>;

export interface IInputButtonOptions extends input.IInputOptions {
  attributes: [TInputButtonAttributes, string][];
  loginCustomEvent: TCustomEventValues;
  clickListener: EventListener;
  changeStatus: (status: boolean) => void;
}

export class InputButton extends input.Input {
  private onClick: EventListener;

  public changeStatus: (status: boolean) => void;

  protected loginCustomEvent: TCustomEventValues;

  constructor({
    className,
    text,
    attributes,
    loginCustomEvent,
    clickListener,
    changeStatus,
  }: IInputButtonOptions) {
    super({ className, text, attributes });
    this.loginCustomEvent = loginCustomEvent;
    this.setAttribute('type', 'button');
    this.onClick = clickListener.bind(this);
    this.changeStatus = changeStatus;
    this.addListener('click', this.onClick);
  }

  destroy() {
    this.removeListener('click', this.onClick);
    super.destroy();
  }
}
