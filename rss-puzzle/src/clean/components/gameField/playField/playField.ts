import * as style from './playField-style.module.scss';
import * as styleBlocks from './blocks/blocks-style.module.scss';
import {
  PlayField,
  IPlayFieldOption,
  IPlayFieldStyleList,
} from '../../../modules/layout/gameField/playField/playField';
import IC from './blocks/initialContainer';
import RC from './blocks/resultContainer';
import RL from './blocks/resultLine';
import WC from './blocks/wordContainer';
import WB from './blocks/wordBlock';
import BC from './blocks/buttonContainer';
import storageExternal from '../../storage/external';
import storageLocal from '../../storage/local';
import { customEventList } from '../../events/custom';

const playFieldStyle: IPlayFieldStyleList = {
  pazzleWrapper: style['play-field'],
  resultContainer: styleBlocks['result-container'],
  initialContainer: styleBlocks['initial-container'],
  resultGuess: styleBlocks['result-guess'],
  initialGuess: styleBlocks['initial-guess'],
  guessBlock: styleBlocks['guess-block'],
  wordContainer: styleBlocks['word-container'],
  wordBlock: styleBlocks['word-block'],
  wordBlockPiece: styleBlocks['word-block__piece'],
  statusCorrect: styleBlocks['word-block__status_correct'],
  statusError: styleBlocks['word-block__status_error'],
};

const playFieldOptions: IPlayFieldOption = {
  className: [style['play-field']],
  text: '',
  style: playFieldStyle,
  initialContainer: IC,
  resultContainer: RC,
  resultLine: RL,
  wordContainer: WC,
  wordBlock: WB,
  buttonContainer: BC,
  externalStorage: storageExternal,
  localStorage: storageLocal,
  eventList: customEventList,
};

export default new PlayField(playFieldOptions);
