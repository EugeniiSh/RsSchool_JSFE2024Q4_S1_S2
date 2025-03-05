import * as style from './loginButton-style.module.scss';
import {
  Input,
  IInputOptions,
} from '../../../../modules/layout/login-form/input';

const buttonInputOptions: IInputOptions = {
  className: [style.button],
  text: '',
  attributes: [
    ['type', 'button'],
    ['value', 'Login'],
  ],
};

const loginButton = new Input(buttonInputOptions);
export default loginButton;
