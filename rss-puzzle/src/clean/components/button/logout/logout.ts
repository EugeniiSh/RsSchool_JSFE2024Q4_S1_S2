import * as style from './logout-style.module.scss';
import { Component } from '../../../modules/layout/common/component';
import { CommonButton } from '../../../modules/layout/button/common-button';
import { customEventList } from '../../events/custom';

function logoutListener(this: CommonButton) {
  if (this.customEventList) {
    this.dispatchSomeEvent(this.customEventList.disableUI());
    this.dispatchSomeEvent(this.customEventList.preLogout());
  }
}

const logoutButtonOption = {
  customEventList,

  className: [style.button],
  text: '',
  items: [
    new Component({ tag: 'span', className: [style.text], text: 'logout' }),
  ],
  clickListener: logoutListener,
};

const logoutButton = new CommonButton(logoutButtonOption);

export default logoutButton;
