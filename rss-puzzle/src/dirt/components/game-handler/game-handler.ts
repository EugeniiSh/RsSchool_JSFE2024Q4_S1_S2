import * as style from './game-handler-style.module.scss';
// import { Component } from '../../modules/layout/common/component';
import { GameHandler, TCustomEventListeners } from '../../modules/game-handler/game-handler';
import wrapperFormElem from '../login-form/loginForm';
import book from '../book/book';
import modalWindow from '../pop-up/modal-window/modal-window';
import preLogoutBlock from '../pop-up/pre-logout/pre-logout';

modalWindow.showModal(preLogoutBlock);

// function createContent(text: string)
// {
//   const option =
//   {
//     tag: 'div',
//     className: [style['new-content']],
//     text: `New content with ${text}`
//   }

//   return new Component(option);
// }

function loginHandler(this: GameHandler)
{
  this.book.openCover(style['turn-over']);

  // for(let i = 1; i < 5; i += 1)
  // {
  //   setTimeout(() =>
  //   {
  //     this.book.turnPage(style['turn-over'], createContent(i.toString()), createContent(i.toString()))
  //   }, i * 4000);
  // }
}

function preLogoutHandler(this: GameHandler)
{
  console.log('prelogout');
}

function logoutHandler(this: GameHandler)
{
  console.log('logout');
}

function hideModalHandler(this: GameHandler)
{
  console.log('hideModal');
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

const customEventListeners: TCustomEventListeners =
{
  login: loginHandler,
  preLogout: preLogoutHandler,
  logout: logoutHandler,
  hideModal: hideModalHandler,
  anableUI: anableUIHandler,
  disableUI: disableUIHandler
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
}

const gameHandler = new GameHandler(gameHandlerOptions);

export default gameHandler;
