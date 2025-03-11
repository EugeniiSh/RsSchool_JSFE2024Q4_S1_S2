import * as style from './loginForm-style.module.scss';
import * as comp from '../../modules/layout/common/component'
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

const loginFormHeader = new comp.Component
(
  {
    tag: 'h3',
    className: [style.header],
    text: 'visitor card'
  }
);

const loginFormRequired = new comp.Component
(
  {
    tag: 'div',
    className: [style.required],
    text: '* - required'
  }
);

const loginFormWrapper = new comp.Component
(
  {
    tag: 'div',
    className: [style.wrapper],
    text: ''
  },
  loginFormHeader,
  loginForm,
  loginFormRequired
);


export default loginFormWrapper;
