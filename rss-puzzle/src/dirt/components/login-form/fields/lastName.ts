import * as style from './fields-style.module.scss';
import { Wrapper } from '../../../modules/layout/common/wrapper';
import { Label } from '../../../modules/layout/login-form/label';
import { Input, IInputOptions } from '../../../modules/layout/login-form/input';

const inputLastnameId = 'lname';
const lastnameLabel = 'Last name';

const lastNamelabelOptions =
{
  className: [style.lable],
  text: lastnameLabel,
  forAttribute: inputLastnameId,
}

const lastNameInputOptions: IInputOptions =
{
  className: [style.input],
  text: '',
  attributes: 
  [
    ['type', 'text'],
    ['id', inputLastnameId],
    ['name', inputLastnameId],
    ['value', ''],
    ['required', ''],
  ]
}

const wrapperLastNameOptions =
{
  className: [style['wrapper__last-name']],
  text: '',
  items: 
  [
    new Label(lastNamelabelOptions),
    new Input(lastNameInputOptions),
  ]
}

const lastName = new Wrapper(wrapperLastNameOptions);
export default lastName;