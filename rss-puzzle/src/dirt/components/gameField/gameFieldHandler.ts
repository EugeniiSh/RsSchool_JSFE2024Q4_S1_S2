import * as style from './gameFieldHandler-style.module.scss';

// import externalStorage from '../storage/external';

import { GameFieldHandler } from '../../modules/layout/gameField/gameFieldHandler';
import PF from './playField/playField';

const gameFieldHandlerOptions =
{
  className: [style['game-field-handler']],
  text: '',
  playField: PF,
}

export default new GameFieldHandler(gameFieldHandlerOptions);

// export default async function check()
// {
//   const data = await externalStorage.getData(1);

//   console.log(data);
//   console.log(externalStorage.getAudioPath(data.rounds[9].words[3]));
//   console.log(externalStorage.getImagePath(data.rounds[9].levelData));
// }