import * as style from './supportField-style.module.scss';
import { SupportField, ISupportFieldOption, ISupportFieldStyleList } from '../../../modules/layout/gameField/supportField/supportField';
import DifficultyBlock from './blocks/difficulty/difficulty';
import TranslationBlock from './blocks/translation/translation';
import storageExternal from '../../storage/external';
import storageLocal from '../../storage/local';
import { customEventList } from '../../events/custom';

const supportFieldStyle: ISupportFieldStyleList =
{
  supportField: style.supportField,
}

const supportFieldOption: ISupportFieldOption =
{
  className: [style.supportField],
  text: '',
  style: supportFieldStyle,
  difficultyBlock: DifficultyBlock,
  translationBlock: TranslationBlock,
  externalStorage: storageExternal,
  localStorage: storageLocal,
  eventList: customEventList,
}

export default new SupportField(supportFieldOption);