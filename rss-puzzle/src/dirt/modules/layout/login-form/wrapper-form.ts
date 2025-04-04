import * as comp from '../common/component';
import { PuzzleGameStorage } from '../../storage/local';
import { Form } from './form';

export interface IWrapperForm
{
  className: string[];
  text: string;
  items: comp.Component[];
  form: Form;
  storage: PuzzleGameStorage;
  loginListener: EventListener;
  changeVisibility: (isHiden: boolean) => void
}

export class WrapperForm extends comp.Component
{
  private onLogin: EventListener;

  protected storage: PuzzleGameStorage;

  protected form: Form;

  public changeVisibility: (isHiden: boolean) => void

  constructor
  (
    {
      className,
      text,
      items,
      form,
      storage,
      loginListener,
      changeVisibility
    }: IWrapperForm
  )
  {
    super({ tag: 'div', className, text });
    this.appendChildren(items);
    this.form = form;
    this.storage = storage;
    this.onLogin = loginListener.bind(this);
    this.addListener('login', this.onLogin);
    this.changeVisibility = changeVisibility;
  }

  destroy() 
  {
    this.removeListener('login', this.onLogin);
    super.destroy();
  }
}