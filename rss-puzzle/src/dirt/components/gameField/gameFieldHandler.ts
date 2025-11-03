import * as style from './gameFieldHandler-style.module.scss';

import { GameFieldHandler } from '../../modules/layout/gameField/gameFieldHandler';
import PF from './playField/playField';

const gameFieldHandlerOptions =
{
  className: [style['game-field-handler']],
  text: '',
  playField: PF,
}

export default new GameFieldHandler(gameFieldHandlerOptions);