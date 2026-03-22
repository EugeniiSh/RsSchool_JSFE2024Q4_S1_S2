import * as style from './pre-logout-style.module.scss';
import { Component } from '../../../modules/layout/common/component';
import { CommonButton } from '../../../modules/layout/button/common-button';
import { customEventList } from '../../events/custom';

const yesButtonOption = {
  customEventList,

  className: [style.button],
  text: 'yes',
  items: [],
  clickListener(this: CommonButton) {
    if (this.customEventList) {
      this.dispatchSomeEvent(this.customEventList.anableUI());
      this.dispatchSomeEvent(this.customEventList.logout());
    }
  },
};

const yesButton = new CommonButton(yesButtonOption);

const noButtonOption = {
  customEventList,

  className: [style.button],
  text: 'no',
  items: [],
  clickListener(this: CommonButton) {
    if (this.customEventList) {
      this.dispatchSomeEvent(this.customEventList.hideModal());
      this.dispatchSomeEvent(this.customEventList.anableUI());
    }
  },
};

const noButton = new CommonButton(noButtonOption);

const buttonWrapperOption = {
  tag: 'div',
  className: [style['button-block']],
  text: '',
};

const buttonBlock = new Component(buttonWrapperOption, yesButton, noButton);

const headerOption = {
  tag: 'h4',
  className: [style.header],
  text: 'This action will destroy your data and progress. Are you sure?',
};

const header = new Component(headerOption);

const preLogoutMessageOption = {
  tag: 'div',
  className: [style.logout],
  text: '',
};

const preLogoutMessage = new Component(
  preLogoutMessageOption,
  header,
  buttonBlock,
);

export default preLogoutMessage;
