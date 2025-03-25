import * as comp from '../common/component';

export interface IWrapperForm
{
  className: string[];
  text: string;
  items: comp.Component[];
  loginListener: EventListener;
}

export class WrapperForm extends comp.Component
{
  private onLogin: EventListener;

  constructor
  (
    {
      className,
      text,
      items,
      loginListener
    }: IWrapperForm
  )
  {
    super({ tag: 'div', className, text });
    this.appendChildren(items);
    this.onLogin = loginListener.bind(this);
    this.addListener('login', this.onLogin);
  }

  destroy() 
  {
    this.removeListener('login', this.onLogin);
    super.destroy();
  }
}