import * as style from './blocks-style.module.scss';
import { WordBlock } from '../../../../modules/layout/gameField/playField/blocks/wordBlock';

const wordBlockOptions =
{
  className: [style['word-block']],
  text: '',
  pieceClassName: [style['word-block__piece']],
}

export default new WordBlock(wordBlockOptions);