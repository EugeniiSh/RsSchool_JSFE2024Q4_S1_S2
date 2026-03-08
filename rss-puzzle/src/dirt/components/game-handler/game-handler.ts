import * as style from './game-handler-style.module.scss';
import { GameHandler, TCustomEventListeners } from '../../modules/game-handler/game-handler';
import { playerGreetings } from '../start-menu/start-menu';

import wrapperFormElem from '../login-form/loginForm';
import book from '../book/book';
import modalWindow from '../pop-up/modal-window/modal-window';
import handlerGameField from '../gameField/gameFieldHandler';
import preLogoutMessage from '../pop-up/pre-logout/pre-logout';
import storageLocal from '../storage/local';
import accompanySound from '../accompanySound/accompanySound';
import startCard from '../pop-up/startCard/startCard';

function loginHandler(this: GameHandler)
{
  const player = storageLocal.getValue();
  const playerInitials = `${player.fname} ${player.lname}`;
  playerGreetings.setPlayerName(playerInitials);

  this.book.openCover(style['turn-over']);
}

function preLogoutHandler(this: GameHandler)
{
  this.modalWindow.showModal(preLogoutMessage);
}

function logoutHandler(this: GameHandler)
{
  this.localStorage.resetValue();
  this.modalWindow.hideModal();
  this.book.closeCover(style['turn-over']);
}

function hideModalHandler(this: GameHandler)
{
  this.modalWindow.hideModal();
}

function bookCloseHandler(this: GameHandler)
{
  this.wrapperForm.changeVisibility(false);
}

function disableUIHandler(this: GameHandler)
{
  this.disableUICount += 1;

  if(this.disableUICount === 1)
  {
    this.toggleClass(style.disableUI, true);
    this.addListener('keydown', GameHandler.disableEvent, true);
  }
}

function anableUIHandler(this: GameHandler)
{
  this.disableUICount -= 1;

  if(this.disableUICount === 0)
  {
    this.toggleClass(style.disableUI, false);
    this.removeListener('keydown', GameHandler.disableEvent, true);
  }
}

function loadHandler(this: GameHandler)
{
  const startCardCloseHandler = () =>
  {
    this.modalWindow.hideModal();
    accompanySound.startBackground();

    const userData = this.localStorage.getValue();
    if(!userData.isNew)
    {
      this.wrapperForm.changeVisibility(true);
      this.book.openCover(style['turn-over']);
    }
  }

  startCard.setCloseHandler(startCardCloseHandler);
  this.modalWindow.showModal(startCard);
}

function startHandler(this: GameHandler)
{ 
  const userData = this.localStorage.getValue();
  const [ supportField, playField ] = this.gameFieldHandler.getGameFieldInterface(userData.game);

  this.book.turnPage
  (
    style['turn-over'],
    supportField,
    playField
  )
}

const customEventListeners: TCustomEventListeners =
{
  login: loginHandler,
  preLogout: preLogoutHandler,
  logout: logoutHandler,
  hideModal: hideModalHandler,
  bookClose: bookCloseHandler,
  anableUI: anableUIHandler,
  disableUI: disableUIHandler,
  start: startHandler,
}

const gameHandlerOptions =
{
  book,
  modalWindow,
  customEventListeners,

  className: [style.game],
  text: '',
  items: 
  [
    wrapperFormElem,
    book,
    modalWindow
  ],
  wrapperForm: wrapperFormElem,
  gameFieldHandler: handlerGameField,
  localStorage: storageLocal,
  loadListener: loadHandler,
}

const gameHandler = new GameHandler(gameHandlerOptions);

export default gameHandler;
