import * as style from './difficultyRounds-style.module.scss';
import { DifficultyRounds, IDifficultyRoundsOption, IDifficultyRoundsStyleList } from '../../../../../../modules/layout/gameField/supportField/blocks/difficulty/difficultyRounds';

const difficultyRoundsStyleList: IDifficultyRoundsStyleList =
{
  roundsContainer: style['rounds-container'],
}

const difficultyRoundsOption: IDifficultyRoundsOption =
{
  className: [style['rounds-container']],
  text: '',
  style: difficultyRoundsStyleList,
}

export default new DifficultyRounds(difficultyRoundsOption);