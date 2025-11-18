import * as style from './translation-style.module.scss';
import { TranslationBlock, ITranslationBlockStyleList, ITranslationBlockOption } from '../../../../../modules/layout/gameField/supportField/blocks/translation/translation';
import TranslationText from './textTranslation/textTranslation';
import TranslationSwitch from './switchTranslation/switchTranslation';

const translationBlockStyleList: ITranslationBlockStyleList =
{
  translationBlock: style['translation-block'],
  header: style['translation-block__header'],
  content: style['translation-block__content'],
  disableBlock: style['disable-block'],
}

const translationBlockOption: ITranslationBlockOption =
{
  className: [style['translation-block']],
  text: '',
  style: translationBlockStyleList,
  textTranslation: TranslationText,
  switchTranslation: TranslationSwitch,
}

export default new TranslationBlock(translationBlockOption);