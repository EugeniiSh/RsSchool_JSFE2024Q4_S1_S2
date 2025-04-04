import * as style from './start-menu-style.module.scss';
import { Component } from '../../modules/layout/common/component';
import logoutButton from '../button/logout/logout';

const startMenu = new Component(
  {
    tag: 'div',
    className: [style['start-menu']],
    text: '',
  },

  logoutButton,
);

export default startMenu;
