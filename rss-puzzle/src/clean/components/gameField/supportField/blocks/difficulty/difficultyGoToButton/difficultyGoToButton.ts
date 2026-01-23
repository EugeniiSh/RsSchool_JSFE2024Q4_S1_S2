import * as style from './difficultyGoToButton-style.module.scss';
import {
  DifficultyGoToButton,
  IDifficultyGoToButtonOption,
  IDifficultyGoToButtonStyleList,
} from '../../../../../../modules/layout/gameField/supportField/blocks/difficulty/difficultyGoToButton';

import effectSpark from '../../../../../../modules/effects/spark/spark';

const difficultyGoToButtonStyleList: IDifficultyGoToButtonStyleList = {
  buttonContainer: style['button-container'],
  buttonText: style['button-text'],
  active: style.active,
};

const difficultyGoToButtonOption: IDifficultyGoToButtonOption = {
  className: [style['button-container']],
  text: '',
  style: difficultyGoToButtonStyleList,
  sparkEffect: effectSpark,
};

export default new DifficultyGoToButton(difficultyGoToButtonOption);
