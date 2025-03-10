import * as style from './game-wrapper-style.module.scss';
import { GameHandler } from '../../modules/game-handler/game-handler';
import loginForm from '../login-form/loginForm';

const gameHandrelOptions = {
  className: [style.game],
  text: '',
  items: [loginForm],
};

const gameHandler = new GameHandler(gameHandrelOptions);
export default gameHandler;
