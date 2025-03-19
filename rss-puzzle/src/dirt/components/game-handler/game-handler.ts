import * as style from './game-handler-style.module.scss';
import { GameHandler } from '../../modules/game-handler/game-handler';
import wrapperFormElem from '../login-form/loginForm';
import book from '../book/book';


const gameHandlerOptions =
{
  className: [style.game],
  text: '',
  items: 
  [
    wrapperFormElem,
    book
  ]
}

const gameHandler = new GameHandler(gameHandlerOptions);

export default gameHandler;
