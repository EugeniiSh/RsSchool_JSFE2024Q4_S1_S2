import * as style from './switchTranslation-style.module.scss';
import {
  SwitchTranslation,
  ISwitchTranslationOption,
  ISwitchTranslationStyleList,
} from '../../../../../../modules/layout/gameField/supportField/blocks/translation/switchTranslation';

const switchTranslationStyleList: ISwitchTranslationStyleList = {
  switchTranslation: style['switch-translation'],
  button: style.button,
  buttonAble: style['button-able'],
  buttonDisable: style['button-disable'],
};

const switchTranslationOption: ISwitchTranslationOption = {
  className: [style['switch-translation']],
  text: '',
  style: switchTranslationStyleList,
};

export default new SwitchTranslation(switchTranslationOption);
