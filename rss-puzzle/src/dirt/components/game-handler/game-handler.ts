import * as style from './game-handler-style.module.scss';
import { GameHandler } from '../../modules/game-handler/game-handler';
import wrapperFormElem from '../login-form/loginForm';


const gameHandlerOptions =
{
  className: [style.game],
  text: '',
  items: 
  [
    wrapperFormElem,
  ]
}

const gameHandler = new GameHandler(gameHandlerOptions);
export default gameHandler;
