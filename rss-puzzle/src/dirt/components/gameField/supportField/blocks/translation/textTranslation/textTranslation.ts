import * as style from './textTranslation-style.module.scss';
import { TextTranslation, ITextTranslationOption, ITextTranslationStyleList } from '../../../../../../modules/layout/gameField/supportField/blocks/translation/textTranslation';

const textTranslationStyleList: ITextTranslationStyleList =
{
  textTranslation: style['text-translation'],
  textBlock: style['text-block'],
  textBlockVisible: style['text-block__visible'],
  textBlockHidden: style['text-block__hidden'],
  textBlockStatusActive: style['text-block__status_active'],
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