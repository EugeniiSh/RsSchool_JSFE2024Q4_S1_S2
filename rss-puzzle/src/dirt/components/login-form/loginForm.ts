import * as style from './loginForm-style.module.scss';
import { Form, IFormOptions } from '../../modules/layout/login-form/form';

import { firstName } from './fields/firstName';
import lastName from './fields/lastName';
import loginButton from './buttons/login/loginButton';

function loginFormInputListener(event: Event)
{
  console.log('login form event = ', event)
} 

const formOptions: IFormOptions =
{
  className: [style.form],
  text: '',
  items: 
  [
    firstName,
    lastName,
    loginButton,
  ],
  attributes: [['action', '#']],
  fields:
  [
    firstName,
    lastName
  ],
  submit: loginButton,
  inputListener: loginFormInputListener
}

const loginForm = new Form(formOptions);
export default loginForm;
