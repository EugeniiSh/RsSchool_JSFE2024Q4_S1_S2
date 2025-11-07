import * as style from './translation-style.module.scss';
import { TranslationBlock, ITranslationBlockStyleList, ITranslationBlockOption } from '../../../../../modules/layout/gameField/supportField/blocks/translation/translation';
import TranslationAble from './able';


const translationBlockStyleList: ITranslationBlockStyleList =
{
  translationBlock: style['translation-block'],
  header: style['translation-block__header'],
  content: style['translation-block__content'],
}

const translationBlockOption: ITranslationBlockOption =
{
  className: [style['translation-block']],
  text: '',
  style: translationBlockStyleList,
  ableTranslation: TranslationAble,
}

export default new TranslationBlock(translationBlockOption);