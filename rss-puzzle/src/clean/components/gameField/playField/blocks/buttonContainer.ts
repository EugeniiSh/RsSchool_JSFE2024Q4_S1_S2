import * as style from './blocks-style.module.scss';
import {
  ButtonContainer,
  IButtonContainerStyleList,
} from '../../../../modules/layout/gameField/playField/blocks/buttonContainer';

import sparkEffect from '../../../../modules/effects/spark/spark';

const buttonContainerStyle: IButtonContainerStyleList = {
  buttonWrapper: style['button-wrapper'],
  supportButtonWrapper: style['button-wrapper__support'],
  motivationButtonWrapper: style['button-wrapper__motivation'],
  buttonSentence: style['button-sentence'],
  buttonSentenceDisabled: style['button-sentence__disabled'],
  buttonSentenceHidden: style['button-sentence__visible_hidden'],
};

const buttonContainerOption = {
  className: [style['button-container']],
  text: '',
  style: buttonContainerStyle,
  effectSpark: sparkEffect,
};

export default new ButtonContainer(buttonContainerOption);
