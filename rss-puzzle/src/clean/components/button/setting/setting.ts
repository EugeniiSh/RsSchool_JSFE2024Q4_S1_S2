import * as style from './setting-style.module.scss';
import {
  ISettingButtonOption,
  ISettingButtonStyleList,
  SettingButton,
} from '../../../modules/layout/settingButton/settingButton';
import windowModal from '../../pop-up/modal-window/modal-window';
import settingVolume from '../../pop-up/volumeSetting/volumeSetting';

const settingButtonStyleList: ISettingButtonStyleList = {
  settingButton: style['setting-button'],
  settingContainer: style['setting-container'],
  closeButton: style['close-button'],
};

const settingButtonOption: ISettingButtonOption = {
  className: [style['setting-button']],
  text: '',
  style: settingButtonStyleList,
  modalWindow: windowModal,
  volumeSetting: settingVolume,
};

export default new SettingButton(settingButtonOption);
