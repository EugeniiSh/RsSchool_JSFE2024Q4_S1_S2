import * as input from './input';

export type TInputButtonAttributes = Exclude<input.TInputAttributes, 'type'| 'name' | 'required'>;

export interface IInputButtonOptions extends input.IInputOptions
{
  attributes: [TInputButtonAttributes, string][];
  clickListener: EventListener,
  changeStatus: (status: boolean) => void,
}

export class InputButton extends input.Input
{
  private onClick: EventListener;

  public changeStatus: (status: boolean) => void;

  constructor
  (
    { 
      className, 
      text, 
      attributes,
      clickListener,
      changeStatus,
    }:IInputButtonOptions
  )
  {
    super({ className, text, attributes });
    this.setAttribute('type', 'button');
    this.onClick = clickListener;
    this.changeStatus = changeStatus;
    this.addListener('click', this.onClick);
  }

  destroy() 
  {
    this.removeListener('click', this.onClick);
    super.destroy();
  }
}