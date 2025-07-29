import * as style from './blocks-style.module.scss';
import { ButtonContainer, IButtonContainerStyleList } from '../../../../modules/layout/gameField/playField/blocks/buttonContainer';

const buttonContainerStyle: IButtonContainerStyleList =
{
  motivationButtonWrapper: style['button-wrapper'],
  buttonSentence: style['button-sentence'],
  buttonSentenceDisabled: style['button-sentence__disabled'],
  buttonSentenceHidden: style['button-sentence__visible_hidden'],
}

const buttonContainerOption =
{
  className: [style['button-container']],
  text: '',
  style: buttonContainerStyle,
}

export default new ButtonContainer(buttonContainerOption);