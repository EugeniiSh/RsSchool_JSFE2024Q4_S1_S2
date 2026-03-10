import * as style from './startCard-style.module.scss';
import { StartCard, IStartCardOption, IStartCardStyleList } from '../../../modules/layout/modal-window/content/startCard';

const startCardStyleList: IStartCardStyleList =
{
  startCardContainer: style['start-card-container'],
  cardText: style['card-text'],
  closeButton: style['close-button'],
}

const startCardOption: IStartCardOption =
{
  className: [style['start-card-container']],
  text: '',
  style: startCardStyleList,
}

export default new StartCard(startCardOption);