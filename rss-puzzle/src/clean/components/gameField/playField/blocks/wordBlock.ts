import * as style from './blocks-style.module.scss';
import {
  WordBlock,
  IWordBlockOptions,
} from '../../../../modules/layout/gameField/playField/blocks/wordBlock';

const wordBlockOptions: IWordBlockOptions = {
  className: [style['word-block']],
  text: '',
  pieceClassName: [style['word-block__piece']],
  pieceLeftClassName: [style['word-block__piece_left']],
};

export default new WordBlock(wordBlockOptions);
