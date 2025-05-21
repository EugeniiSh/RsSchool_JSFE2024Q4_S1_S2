import * as style from './blocks-style.module.scss';
import { WordContainer } from '../../../../modules/layout/gameField/playField/blocks/wordContainer';

const wordContainerOptions =
{
  className: [style['word-container']],
  text: '',
}

export default new WordContainer(wordContainerOptions);