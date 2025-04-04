import * as style from './modal-window-style.module.scss';
import { Component } from '../../../modules/layout/common/component';
import { ModalWindow } from '../../../modules/layout/modal-window/modal-window';

function showModal(this: ModalWindow, content: Component) {
  this.cleanInnerHTML();
  this.append(content);
  this.toggleClass(style.active, true);
}

function hideModal(this: ModalWindow) {
  this.toggleClass(style.active, false);
}

const modalWindowOption = {
  showModal,
  hideModal,

  tag: 'div',
  className: [style.modal],
  text: '',
};

const modalWindow = new ModalWindow(modalWindowOption);

export default modalWindow;
