import * as style from './supportField-style.module.scss';
import {
  SupportField,
  ISupportFieldOption,
  ISupportFieldStyleList,
} from '../../../modules/layout/gameField/supportField/supportField';
import TranslationBlock from './blocks/translation/translation';
import storageExternal from '../../storage/external';
import storageLocal from '../../storage/local';

const supportFieldStyle: ISupportFieldStyleList = {
  supportField: style.supportField,
};

const supportFieldOption: ISupportFieldOption = {
  className: [style.supportField],
  text: '',
  style: supportFieldStyle,
  translationBlock: TranslationBlock,
  externalStorage: storageExternal,
  localStorage: storageLocal,
};

export default new SupportField(supportFieldOption);
