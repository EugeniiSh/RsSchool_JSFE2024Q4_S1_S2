import * as style from './loginForm-style.module.scss';
import { Form } from '../../modules/layout/login-form/form';

import firstName from './fields/firstName';
import lastName from './fields/lastName';
import loginButton from './buttons/login/loginButton';

const formOptions = {
  className: [style.form],
  text: '',
  items: [firstName, lastName, loginButton],
};

const loginForm = new Form(formOptions);
export default loginForm;
