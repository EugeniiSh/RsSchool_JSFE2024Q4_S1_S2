import * as style from './fields-style.module.scss';
import { FieldForm } from '../../../modules/layout/login-form/field-form';
import { Label } from '../../../modules/layout/login-form/label';
import {
  InputText,
  IInputTextOptions,
} from '../../../modules/layout/login-form/input/input-text';
import {
  lastNamefieldCheckers,
  lastNameHintsBlock,
} from './field-hints/lastNameHints';
import {
  firstNameInputListener,
  fieldFirstNameInputListener,
  fieldCheckersName,
} from './firstName';

const inputLastnameId = 'lname';
const lastnameLabel = 'last name *';

const lastNamelabelOptions = {
  className: [style.lable],
  text: lastnameLabel,
  forAttribute: inputLastnameId,
};

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

const lastNameInput = new InputText(lastNameInputOptions);

const FieldFormLastNameOptions = {
  className: [style.wrapper],
  text: '',
  items: [new Label(lastNamelabelOptions), lastNameInput, lastNameHintsBlock],
  validateItem: lastNameInput,
  checkFieldFor: fieldCheckersName,
  hintsBlock: lastNameHintsBlock,
  inputListener: fieldFirstNameInputListener,
};

const lastName = new FieldForm(FieldFormLastNameOptions);
export { lastName, lastNamefieldCheckers };
