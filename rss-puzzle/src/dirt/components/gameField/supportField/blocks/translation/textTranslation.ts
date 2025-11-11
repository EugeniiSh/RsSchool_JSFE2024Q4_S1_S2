import * as style from './translation-style.module.scss';
import { TextTranslation, ITextTranslationOption, ITextTranslationStyleList } from '../../../../../modules/layout/gameField/supportField/blocks/translation/textTranslation';

const textTranslationStyleList: ITextTranslationStyleList =
{
  textTranslation: style['text-translation'],
  textBlock: style['text-block'],
  buttonBlock: style['button-block'],
  buttonBlockAble: style['button-block__able'],
  buttonBlockDisable: style['button-block__disable'],
}

const textTranslationOption: ITextTranslationOption =
{
  className: [style['text-translation']],
  text: '',
  style: textTranslationStyleList,
}

export default new TextTranslation(textTranslationOption);