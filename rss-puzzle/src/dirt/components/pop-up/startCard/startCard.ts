import * as style from './startCard-style.module.scss';
import { StartCard, IStartCardOption, IStartCardStyleList } from '../../../modules/layout/modal-window/content/startCard';
import soundAccompany from '../../accompanySound/accompanySound';

const startCardStyleList: IStartCardStyleList =
{
  startCardContainer: style['start-card-container'],
  cardText: style['card-text'],
  audioSetting: style['audio-setting'],
  audioWarning: style['audio-warning'],
  closeButton: style['close-button'],
}

const startCardOption: IStartCardOption =
{
  className: [style['start-card-container']],
  text: '',
  style: startCardStyleList,
  accompanySound: soundAccompany,
}

export default new StartCard(startCardOption);