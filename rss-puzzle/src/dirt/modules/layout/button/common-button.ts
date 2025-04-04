import { Component } from '../common/component';
import { TCustomEventList } from '../../events/custom';

export interface ICommonButtonOptions
{
  className: string[],
  text: string,
  items: Component[],
  clickListener: EventListener,

  changeStatus?: (status: boolean) => void,
  customEventList?: TCustomEventList,
}

export class CommonButton extends Component
{
  protected onClick: EventListener;

  public changeStatus?: (status: boolean) => void;

  protected customEventList?: TCustomEventList;

  constructor
  (
    { 
      className, 
      text, 
      items,
      clickListener,
      changeStatus,
      customEventList
    }:ICommonButtonOptions
  )
  {
    super({ tag: 'button', className, text });
    this.appendChildren(items);
    this.onClick = clickListener.bind(this);
    this.addListener('click', this.onClick);

    if(changeStatus) this.changeStatus = changeStatus;
    if(customEventList) this.customEventList = customEventList;
  }

  destroy() 
  {
    this.removeListener('click', this.onClick);
    super.destroy();
  }
}