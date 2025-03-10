import * as style from './loginButton-style.module.scss';
import {
  InputButton,
  IInputButtonOptions,
} from '../../../../modules/layout/login-form/input/input-button';

function loginButtonClickListener(event: Event) {
  console.log('lofin button event = ', event);
}

function loginButtonChangeStatus(status: boolean) {
  console.log('login bautton status = ', status);
}

const buttonInputOptions: IInputButtonOptions = {
  className: [style.button],
  text: '',
  attributes: [['value', 'Login']],
  clickListener: loginButtonClickListener,
  changeStatus: loginButtonChangeStatus,
};

const loginButton = new InputButton(buttonInputOptions);
export default loginButton;
