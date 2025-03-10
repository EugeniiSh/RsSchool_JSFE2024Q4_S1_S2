import * as style from './fields-style.module.scss';
import { FieldForm } from '../../../modules/layout/login-form/field-form';
import { Label } from '../../../modules/layout/login-form/label';
import {
  InputText,
  IInputTextOptions,
  TInputTextFieldsCheckers,
} from '../../../modules/layout/login-form/input/input-text';

const inputFirstNameId = 'fname';
const firstNameLabel = 'First name';

const firstNamelabelOptions = {
  className: [style.lable],
  text: firstNameLabel,
  forAttribute: inputFirstNameId,
};

const firstNamefieldCheckers: TInputTextFieldsCheckers = new Map();
firstNamefieldCheckers.set('size', (value: string) => value.length >= 3);
firstNamefieldCheckers.set('upperCase', (value: string) =>
  value[0] ? value[0] === value[0].toUpperCase() : false,
);
firstNamefieldCheckers.set('latinLeter', (value: string) => {
  if (value.length === 0) return false;

  for (let i = 0; i < value.length; i += 1) {
    const char = value[i];
    const charPoint = char.codePointAt(0);

    if (!charPoint) return false;

    if (charPoint !== 45) {
      if (charPoint < 65 || charPoint > 122) return false;
      if (charPoint > 90 && charPoint < 97) return false;
    }
  }

  return true;
});

function firstNameInputListener(this: InputText, event: Event) {
  if (event.target === null) {
    console.log('Event Target = ', null);
    return;
  }

  if (!(event.target instanceof HTMLInputElement)) {
    console.log('Event Target not instanceof HTMLInputElement ');
    return;
  }

  const text: string = event.target.value;

  this.setValid(text);
}

function fieldFirstNameInputListener(event: Event) {
  console.log('empty', event);
}

const firsNameInputOptions: IInputTextOptions = {
  className: [style.input],
  text: '',
  attributes: [
    ['id', inputFirstNameId],
    ['name', inputFirstNameId],
    ['value', ''],
    ['required', ''],
  ],
  fieldCheckers: firstNamefieldCheckers,
  inputListener: firstNameInputListener,
};

const FieldFormFirstNameOptions = {
  className: [style.wrapper, style['wrapper__first-name']],
  text: '',
  items: [
    new Label(firstNamelabelOptions),
    new InputText(firsNameInputOptions),
  ],
  inputListener: fieldFirstNameInputListener,
};

const firstName = new FieldForm(FieldFormFirstNameOptions);
export {
  firstName,
  firstNamefieldCheckers,
  firstNameInputListener,
  fieldFirstNameInputListener,
};
