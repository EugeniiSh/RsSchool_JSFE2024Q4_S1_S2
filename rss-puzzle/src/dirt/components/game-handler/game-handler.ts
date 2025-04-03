import * as style from './game-handler-style.module.scss';
// import { Component } from '../../modules/layout/common/component';
import { GameHandler, TCustomEventListeners } from '../../modules/game-handler/game-handler';

import wrapperFormElem from '../login-form/loginForm';
import book from '../book/book';
import modalWindow from '../pop-up/modal-window/modal-window';
import preLogoutMessage from '../pop-up/pre-logout/pre-logout';
import storageLocal from '../storage/local';

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
  const userData = this.localStorage.getValue();
  if(!userData.isNew)
  {
    this.wrapperForm.changeVisibility(true);
    this.book.openCover(style['turn-over']);
  }
}

const customEventListeners: TCustomEventListeners =
{
  login: loginHandler,
  preLogout: preLogoutHandler,
  logout: logoutHandler,
  hideModal: hideModalHandler,
  bookClose: bookCloseHandler,
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
  wrapperForm: wrapperFormElem,
  localStorage: storageLocal,
  loadListener: loadHandler,
}

const gameHandler = new GameHandler(gameHandlerOptions);

export default gameHandler;
