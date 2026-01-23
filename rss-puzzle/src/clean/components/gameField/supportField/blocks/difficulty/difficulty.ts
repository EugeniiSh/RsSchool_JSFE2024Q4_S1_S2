import * as style from './difficulty-style.module.scss';
import {
  DifficultyBlock,
  IDifficultyBlockOption,
  IDifficultyBlockStyleList,
} from '../../../../../modules/layout/gameField/supportField/blocks/difficulty/difficulty';
import LocalStorage from '../../../../storage/local';
import DifficultyLevels from './difficultyLevels/difficultyLevels';
import DifficultyRounds from './difficultyRounds/difficultyRounds';
import DifficultyGoToButton from './difficultyGoToButton/difficultyGoToButton';

const difficultyStyleList: IDifficultyBlockStyleList = {
  difficultyBlock: style['difficulty-block'],
};

const difficultyOption: IDifficultyBlockOption = {
  className: [style['difficulty-block']],
  text: '',
  style: difficultyStyleList,
  localStorage: LocalStorage,
  difficultyLevels: DifficultyLevels,
  difficultyRounds: DifficultyRounds,
  goToButton: DifficultyGoToButton,
};

export default new DifficultyBlock(difficultyOption);
