import * as style from './loginButton-style.module.scss';
import { InputButton, IInputButtonOptions } from '../../../../modules/layout/login-form/input/input-button';
import { customEventList } from '../../../events/custom';

const loginEvent = customEventList.login;

function loginButtonClickListener(this: InputButton)
{
  this.changeStatus(false);
  this.getNode().dispatchEvent(this.loginCustomEvent);
}

function loginButtonChangeStatus(this: InputButton, status: boolean)
{
  const invertStatus = !status;
  this.toggleClass(style.disabled, invertStatus);

  if(status)
  {
    this.removeAttribute('disabled');
  } 
  else
  {
    this.setAttribute('disabled', 'disabled');
  }
}

const buttonInputOptions: IInputButtonOptions =
{
  className: [style.button, style.disabled],
  text: '',
  attributes: 
  [
    ['value', 'login'],
    ['disabled', 'disabled'],
  ],
  loginCustomEvent: loginEvent,
  clickListener: loginButtonClickListener,
  changeStatus: loginButtonChangeStatus,
}

const loginButton = new InputButton(buttonInputOptions);

export default loginButton;