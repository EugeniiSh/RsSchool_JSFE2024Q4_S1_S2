import * as style from './fields-style.module.scss';
import { FieldForm } from '../../../modules/layout/login-form/field-form';
import { Label } from '../../../modules/layout/login-form/label';
import {
  InputText,
  IInputTextOptions,
  TInputTextFieldsCheckers,
} from '../../../modules/layout/login-form/input/input-text';
import {
  firstNamefieldCheckers,
  firstNameInputListener,
  fieldFirstNameInputListener,
} from './firstName';

const inputLastnameId = 'lname';
const lastnameLabel = 'Last name';

const lastNamelabelOptions = {
  className: [style.lable],
  text: lastnameLabel,
  forAttribute: inputLastnameId,
};

const lastNamefieldCheckers: TInputTextFieldsCheckers = new Map();
lastNamefieldCheckers.set('size', (value: string) => value.length >= 4);
firstNamefieldCheckers.forEach((value, key) => {
  if (key !== 'size') {
    lastNamefieldCheckers.set(key, value);
  }
});

const lastNameInputOptions: IInputTextOptions = {
  className: [style.input],
  text: '',
  attributes: [
    ['id', inputLastnameId],
    ['name', inputLastnameId],
    ['value', ''],
    ['required', ''],
  ],
  fieldCheckers: lastNamefieldCheckers,
  inputListener: firstNameInputListener,
};

const FieldFormLastNameOptions = {
  className: [style['wrapper__last-name']],
  text: '',
  items: [new Label(lastNamelabelOptions), new InputText(lastNameInputOptions)],
  inputListener: fieldFirstNameInputListener,
};

const lastName = new FieldForm(FieldFormLastNameOptions);
export default lastName;
