import * as style from './translation-style.module.scss';
import { AbleTranslation, IAbleTranslationOption, IAbleTranslationStyleList } from '../../../../../modules/layout/gameField/supportField/blocks/translation/able';

const ableTranslationStyleList: IAbleTranslationStyleList =
{
  ableTranslation: style['able-translation'],
}

const ableTranslationOption: IAbleTranslationOption =
{
  className: [style['able-translation']],
  text: '',
  style: ableTranslationStyleList,
}

export default new AbleTranslation(ableTranslationOption);