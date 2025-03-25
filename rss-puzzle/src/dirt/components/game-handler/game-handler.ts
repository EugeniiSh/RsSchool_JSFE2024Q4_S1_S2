import * as style from './game-handler-style.module.scss';
// import { Component } from '../../modules/layout/common/component';
import { GameHandler, TCustomEventListeners } from '../../modules/game-handler/game-handler';
import wrapperFormElem from '../login-form/loginForm';
import book from '../book/book';

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
  anableUI: anableUIHandler,
  disableUI: disableUIHandler
}

const gameHandlerOptions =
{
  book,
  customEventListeners,

  className: [style.game],
  text: '',
  items: 
  [
    wrapperFormElem,
    book
  ],
}

const gameHandler = new GameHandler(gameHandlerOptions);

export default gameHandler;
