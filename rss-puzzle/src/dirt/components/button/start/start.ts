import * as style from './start-style.module.scss';
import { Component } from '../../../modules/layout/common/component';
import { CommonButton } from '../../../modules/layout/button/common-button';
import { customEventList } from '../../events/custom';

function startListener(this: CommonButton)
{
  if(this.customEventList)
  {
    this.dispatchSomeEvent(this.customEventList.start());
  }
}

const startButtonOption =
{
  customEventList,

  className: [style.button],
  text: '',
  items: [ new Component({ tag: 'span', className: [style.text], text: 'start' }) ],
  clickListener: startListener,
}

const startButton = new CommonButton(startButtonOption);

export default startButton;