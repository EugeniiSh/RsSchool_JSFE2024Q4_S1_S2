import * as style from './start-menu-style.module.scss';
import { Component } from '../../modules/layout/common/component';
import { Greeting } from '../../modules/layout/personalization/greeting';

import startButton from '../button/start/start';
import logoutButton from '../button/logout/logout';
import gameLocalStorage from '../storage/local';

const player = gameLocalStorage.getValue();
const playerInitials = `${player.fname} ${player.lname}`;

const greatingHeader = new Component
(
  {
    tag: 'div',
    className: [style.hello],
    text: 'hello',
  },
);

const palyerFullName = new Component
(
  {
    tag: 'div',
    className: [style.player],
    text: playerInitials,
  },
);

const playerGreetings = new Greeting
(
  {
    className: [style.greetings],
    text: '',
    items: [greatingHeader, palyerFullName],
    playerName: palyerFullName,
  },
)

const startMenu = new Component
(
  {
    tag: 'div',
    className: [style['start-menu']],
    text: '',
  },

  playerGreetings,
  startButton,
  logoutButton
)

export { playerGreetings };
export default startMenu;