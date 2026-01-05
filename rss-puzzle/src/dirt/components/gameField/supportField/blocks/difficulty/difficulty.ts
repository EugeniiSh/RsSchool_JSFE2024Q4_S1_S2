import * as style from './difficulty-style.module.scss';
import { DifficultyBlock, IDifficultyBlockOption, IDifficultyBlockStyleList } from '../../../../../modules/layout/gameField/supportField/blocks/difficulty/difficulty';
import Loader from '../../../../loader/loader';
import DifficultyLevels from './difficultyLevels/difficultyLevels';
import DifficultyRounds from './difficultyRounds/difficultyRounds';

const difficultyStyleList: IDifficultyBlockStyleList =
{
  difficultyBlock: style['difficulty-block'],
}

const difficultyOption: IDifficultyBlockOption =
{
  className: [style['difficulty-block']],
  text: '',
  style: difficultyStyleList,
  loader: Loader,
  difficultyLevels: DifficultyLevels,
  difficultyRounds: DifficultyRounds,
}

export default new DifficultyBlock(difficultyOption);