import * as style from './gameFieldHandler-style.module.scss';

import { GameFieldHandler } from '../../modules/layout/gameField/gameFieldHandler';
import PF from './playField/playField';
import SF from './supportField/supportField';

const gameFieldHandlerOptions = {
  className: [style['game-field-handler']],
  text: '',
  playField: PF,
  supportField: SF,
};

export default new GameFieldHandler(gameFieldHandlerOptions);
