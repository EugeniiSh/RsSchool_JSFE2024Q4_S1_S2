import * as style from './field-hints-style.module.scss';
import { Component } from '../../../../modules/layout/common/component';
import { HintField } from '../../../../modules/layout/hint/hintField';
import {
  HintsBlock,
  IHintsBlock,
} from '../../../../modules/layout/hint/hintsBlock';
import { TInputTextFieldsCheckers } from '../../../../modules/layout/login-form/input/input-text';
import {
  firstNamefieldCheckers,
  setStateHintField,
  setStateHintFieldComponent,
  setInitialStateHintField,
  setInitialStateHintFieldComponent,
} from './firsNameHints';

const lastNamefieldCheckers: TInputTextFieldsCheckers = new Map();
lastNamefieldCheckers.set('size', {
  func: (value: string) => value.length >= 4,
  text: 'minimum 4 characters',
});

firstNamefieldCheckers.forEach((value, key) => {
  if (key !== 'size') {
    lastNamefieldCheckers.set(key, value);
  }
});

const hintFieldsMap: Map<string, HintField> = new Map();

lastNamefieldCheckers.forEach((value, checkFor) => {
  const firstHint = new Component({
    tag: 'div',
    className: [style.tick, style.error],
    text: '',
  });
  const secondHint = new Component({
    tag: 'div',
    className: [style.string],
    text: value.text,
  });
  const hintField = new HintField({
    className: [style.field],
    text: '',
    hintName: checkFor,
    hintComponents: [firstHint, secondHint],
    setState: setStateHintFieldComponent,
    setInitialState: setInitialStateHintFieldComponent,
  });

  hintFieldsMap.set(checkFor, hintField);
});

const hintBlockOptions: IHintsBlock = {
  className: [style.block],
  text: '',
  hintFields: hintFieldsMap,
  setState: setStateHintField,
  setInitialState: setInitialStateHintField,
};

const lastNameHintsBlock = new HintsBlock(hintBlockOptions);
export { lastNameHintsBlock, lastNamefieldCheckers };
