import * as style from './difficultyRounds-style.module.scss';
import Loader from '../../../../../loader/loader';
import ExternalStorage from '../../../../../storage/external';
import { DifficultyRounds, IDifficultyRoundsOption, IDifficultyRoundsStyleList } from '../../../../../../modules/layout/gameField/supportField/blocks/difficulty/difficultyRounds';

const difficultyRoundsStyleList: IDifficultyRoundsStyleList =
{
  roundsContainer: style['rounds-container'],
  roundsHint: style['rounds-hint'],
  roundsButton: style['rounds-button'],
  activeButton: style['active-button'],
  completeRound: style['complete-round'],
  inProgressRound: style['in-progress-round'],
  currentRound: style['current-round'],
  legendWrapper: style['legend-wrapper'],
  legendBlock: style['legend-block'],
  legendBlockOpen: style['legend-block_open'],
  legendRow: style['legend-row'],
  legendHeader: style['legend-header'],
  legendHeaderText: style['legend-header-text'],
  legendHeaderImage: style['legend-header-image'],
  legendHeaderImageOpen: style['legend-header-image_open'],
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