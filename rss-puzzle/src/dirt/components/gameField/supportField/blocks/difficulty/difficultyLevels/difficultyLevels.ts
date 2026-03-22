import * as style from './difficultyLevels-style.module.scss';
import { DifficultyLevels, IDifficultyLevelsOption, IDifficultyLevelsStyleList } from '../../../../../../modules/layout/gameField/supportField/blocks/difficulty/difficultyLevels';

const difficultyLevelsStyleList: IDifficultyLevelsStyleList =
{
  levelsContainer: style['levels-container'],
  levelBlock: style['level-block'],
  levelBlockActive: style['level-block_active'],
}

const difficultyLevelsOption: IDifficultyLevelsOption =
{
  className: [style['levels-container']],
  text: '',
  style: difficultyLevelsStyleList,
}

export default new DifficultyLevels(difficultyLevelsOption);