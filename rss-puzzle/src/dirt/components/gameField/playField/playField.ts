import * as style from './playField-style.module.scss';
import * as styleBlocks from './blocks/blocks-style.module.scss';
import { PlayField } from '../../../modules/layout/gameField/playField/playField';
import IC from './blocks/initialContainer';
import RC from './blocks/resultContainer';
import RL from './blocks/resultLine';
import WC from './blocks/wordContainer';
import WB from './blocks/wordBlock';
import storageExternal from '../../storage/external';

const playFieldStyle =
{
  pazzleWrapper: style['play-field'],
  resultContainer: styleBlocks['result-container'],
  initialContainer: styleBlocks['initial-container'],
  resultGuess: styleBlocks['result-guess'],
  initialGuess: styleBlocks['initial-guess'],
  guessBlock: styleBlocks['guess-block'],
  wordContainer: styleBlocks['word-container'],
  wordBlock: styleBlocks['word-block'],
  wordBlockPiece: styleBlocks['word-block__piece'],
}

const playFieldOptions =
{
  className: [style['play-field']],
  text: '',
  style: playFieldStyle,
  initialContainer: IC,
  resultContainer: RC,
  resultLine: RL,
  wordContainer: WC,
  wordBlock: WB,
  externalStorage: storageExternal,
}

export default new PlayField(playFieldOptions);