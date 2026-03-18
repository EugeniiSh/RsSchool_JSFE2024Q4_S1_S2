import * as style from './volumeSetting-style.module.scss';
import { IVolumeSettingOption, IVolumeSettingStyleList, VolumeSetting } from '../../../modules/layout/modal-window/content/volumeSetting';
import soundAccompany from '../../accompanySound/accompanySound';

const volumeSettingStyleList: IVolumeSettingStyleList =
{
  settingContainer: style['setting-container'],
  header: style.header,
}

const volumeSettingOption: IVolumeSettingOption =
{
  className: [style['setting-container']],
  text: '',
  style: volumeSettingStyleList,
  accompanySound: soundAccompany,
}

export default new VolumeSetting(volumeSettingOption);