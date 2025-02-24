import * as style from './loginForm-style.module.scss';
import * as lable from './label/label';
import * as input from './input/input';
import * as form from './form/form';
import * as wrapper from '../wrapper/wrapper';

const inputFirstNameId = 'fname';
const inputLastnameId = 'lname';

const firstNameLabel = 'First name';
const lastnameLabel = 'Last name';

const firstNamelabelOptions: lable.ILabelOptions = {
  className: [style.lable],
  text: firstNameLabel,
  forAttribute: inputFirstNameId,
};

const lastNamelabelOptions: lable.ILabelOptions = {
  className: [style.lable],
  text: lastnameLabel,
  forAttribute: inputLastnameId,
};

const firsNameInputOptions: input.IInputOptions = {
  className: [style.input],
  text: '',
  attributes: [
    ['type', 'text'],
    ['id', inputFirstNameId],
    ['name', inputFirstNameId],
    ['value', ''],
    ['required', ''],
  ],
};

const lastNameInputOptions: input.IInputOptions = {
  className: [style.input],
  text: '',
  attributes: [
    ['type', 'text'],
    ['id', inputLastnameId],
    ['name', inputLastnameId],
    ['value', ''],
    ['required', ''],
  ],
};

const buttonInputOptions: input.IInputOptions = {
  className: [style.input],
  text: '',
  attributes: [
    ['type', 'button'],
    ['value', 'Login'],
  ],
};

const wrapperFirstNameOptions: wrapper.IWrapperOptions = {
  className: [style['wrapper__first-name']],
  text: '',
  items: [
    new lable.Label(firstNamelabelOptions),
    new input.Input(firsNameInputOptions),
  ],
};

const wrapperLastNameOptions: wrapper.IWrapperOptions = {
  className: [style['wrapper__last-name']],
  text: '',
  items: [
    new lable.Label(lastNamelabelOptions),
    new input.Input(lastNameInputOptions),
  ],
};

const formOptions: form.IFormOptions = {
  className: [style.form],
  text: '',
  items: [
    new wrapper.Wrapper(wrapperFirstNameOptions),
    new wrapper.Wrapper(wrapperLastNameOptions),
    new input.Input(buttonInputOptions),
  ],
};

const loginForm = new form.Form(formOptions);
export default loginForm;
