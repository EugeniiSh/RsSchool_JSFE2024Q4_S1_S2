import * as style from './fields-style.module.scss';
import { Wrapper } from '../../../modules/layout/common/wrapper';
import { Label } from '../../../modules/layout/login-form/label';
import { Input, IInputOptions } from '../../../modules/layout/login-form/input';

const inputFirstNameId = 'fname';
const firstNameLabel = 'First name';

const firstNamelabelOptions = {
  className: [style.lable],
  text: firstNameLabel,
  forAttribute: inputFirstNameId,
};

const firsNameInputOptions: IInputOptions = {
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

const wrapperFirstNameOptions = {
  className: [style.wrapper, style['wrapper__first-name']],
  text: '',
  items: [new Label(firstNamelabelOptions), new Input(firsNameInputOptions)],
};

const firstName = new Wrapper(wrapperFirstNameOptions);
export default firstName;
