import * as style from './difficultyRounds-style.module.scss';
import Loader from '../../../../../loader/loader';
import ExternalStorage from '../../../../../storage/external';
import { DifficultyRounds, IDifficultyRoundsOption, IDifficultyRoundsStyleList } from '../../../../../../modules/layout/gameField/supportField/blocks/difficulty/difficultyRounds';

const difficultyRoundsStyleList: IDifficultyRoundsStyleList =
{
  roundsContainer: style['rounds-container'],
  wrapper: style.wrapper,
  roundsButtonWrapper: style['rounds-button-wrapper'],
  roundsButton: style['rounds-button'],
}

const difficultyRoundsOption: IDifficultyRoundsOption =
{
  className: [style['rounds-container']],
  text: '',
  style: difficultyRoundsStyleList,
  loader: Loader,
  externalStorage: ExternalStorage,
}

export default new DifficultyRounds(difficultyRoundsOption);