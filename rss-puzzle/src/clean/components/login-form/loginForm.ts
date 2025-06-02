import * as style from './loginForm-style.module.scss';
import * as comp from '../../modules/layout/common/component';
import { Form, IFormOptions } from '../../modules/layout/login-form/form';
import {
  IWrapperForm,
  WrapperForm,
} from '../../modules/layout/login-form/wrapper-form';
import { PuzzleGameStorage } from '../../modules/storage/local';

import { firstName } from './fields/firstName';
import { lastName } from './fields/lastName';
import loginButton from './buttons/login/loginButton';

import storage from '../storage/local';

function loginFormInputListener(this: Form) {
  this.setFormValid();
}

const formOptions: IFormOptions = {
  className: [style.form],
  text: '',
  items: [firstName, lastName, loginButton],
  attributes: [['action', '#']],
  fields: [firstName, lastName],
  submit: loginButton,
  inputListener: loginFormInputListener,
};

const loginForm = new Form(formOptions);

const loginFormHeader = new comp.Component({
  tag: 'h3',
  className: [style.header],
  text: 'visitor card',
});

const loginFormRequired = new comp.Component({
  tag: 'div',
  className: [style.required],
  text: '* - required',
});

function wrapperFormSetVisibilityStatus(this: WrapperForm, isHiden: boolean) {
  if (isHiden) {
    this.toggleClass(style['wrapper-hidden'], isHiden);
    this.setAttribute('tabindex', '-1');

    return;
  }

  this.toggleClass(style['wrapper-hidden'], isHiden);
  this.setAttribute('tabindex', '0');
}

function wrapperFormLoginListener(this: WrapperForm) {
  const userData = {
    ...this.form.getFormValue(),
    isNew: false,
    game: PuzzleGameStorage.getStartGameValue(),
  };

  this.storage.setValue(userData);
  this.form.setFormValue('');
  this.changeVisibility(true);
}

const WrapperFormOptions: IWrapperForm = {
  storage,

  className: [style.wrapper],
  text: '',
  items: [loginFormHeader, loginForm, loginFormRequired],
  form: loginForm,
  loginListener: wrapperFormLoginListener,
  changeVisibility: wrapperFormSetVisibilityStatus,
};

const wrapperFormElem = new WrapperForm(WrapperFormOptions);

export default wrapperFormElem;
