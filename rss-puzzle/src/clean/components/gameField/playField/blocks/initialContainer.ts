import * as style from './blocks-style.module.scss';
import { InitialContainer } from '../../../../modules/layout/gameField/playField/blocks/initialContainer';

const initialContainerOptions = {
  className: [
    style['initial-container'],
    style['initial-guess'],
    style['guess-block'],
  ],
  text: '',
};

export default new InitialContainer(initialContainerOptions);
