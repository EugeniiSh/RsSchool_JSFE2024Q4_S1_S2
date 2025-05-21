import * as style from './playField-style.module.scss';
import { PlayField } from '../../../modules/layout/gameField/playField/playField';
import IC from './blocks/initialContainer';
import RC from './blocks/resultContainer';
import RL from './blocks/resultLine';
import WC from './blocks/wordContainer';
import WB from './blocks/wordBlock';

const playFieldOptions =
{
  className: [style['play-field']],
  text: '',
  initialContainer: IC,
  resultContainer: RC,
  resultLine: RL,
  wordContainer: WC,
  wordBlock: WB,
}

export default new PlayField(playFieldOptions);