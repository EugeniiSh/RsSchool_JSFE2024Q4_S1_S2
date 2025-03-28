import * as style from './fields-style.module.scss';
import { FieldForm } from '../../../modules/layout/login-form/field-form';
import { Label } from '../../../modules/layout/login-form/label';
import {
  InputText,
  IInputTextOptions,
  TInputTextNames,
} from '../../../modules/layout/login-form/input/input-text';
import {
  firstNamefieldCheckers,
  firstNameHintsBlock,
} from './field-hints/firsNameHints';

const inputFirstNameId: TInputTextNames = 'fname';
const firstNameLabel = 'first name *';

const firstNamelabelOptions = {
  className: [style.lable],
  text: firstNameLabel,
  forAttribute: inputFirstNameId,
};

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

  this.setValue(text);
  this.setValid(text);
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
  inputName: inputFirstNameId,
  fieldCheckers: firstNamefieldCheckers,
  inputListener: firstNameInputListener,
};

const firstNameInput = new InputText(firsNameInputOptions);

const fieldCheckersName = Object.keys(
  Object.fromEntries(firstNamefieldCheckers),
);

function fieldFirstNameInputListener(this: FieldForm) {
  const validList: boolean[] = [];

  this.checkFieldFor.forEach((checkFor) => {
    const isValidCondition = this.validateItem.getValid(checkFor);
    validList.push(isValidCondition);
    this.hintsBlock.setState(isValidCondition, checkFor);
  });

  this.setFieldValid(validList);
}

const FieldFormFirstNameOptions = {
  className: [style.wrapper],
  text: '',
  items: [
    new Label(firstNamelabelOptions),
    firstNameInput,
    firstNameHintsBlock,
  ],
  validateItem: firstNameInput,
  checkFieldFor: fieldCheckersName,
  hintsBlock: firstNameHintsBlock,
  inputListener: fieldFirstNameInputListener,
};

const firstName = new FieldForm(FieldFormFirstNameOptions);

export {
  firstName,
  fieldCheckersName,
  firstNameInputListener,
  fieldFirstNameInputListener,
};
