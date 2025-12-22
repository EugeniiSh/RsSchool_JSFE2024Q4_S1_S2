import * as style from './difficulty-style.module.scss';
import { DifficultyBlock, IDifficultyBlockOption, IDifficultyBlockStyleList } from '../../../../../modules/layout/gameField/supportField/blocks/difficulty/difficulty';

const difficultyStyleList: IDifficultyBlockStyleList =
{
  levelSelection: style['difficulty-block'],
}

const difficultyOption: IDifficultyBlockOption =
{
  className: [style['difficulty-block']],
  text: '',
  style: difficultyStyleList,
}

export default new DifficultyBlock(difficultyOption);