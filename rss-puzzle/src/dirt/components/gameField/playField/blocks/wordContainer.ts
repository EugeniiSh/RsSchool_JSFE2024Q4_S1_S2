import * as style from './blocks-style.module.scss';
import { WordContainer, IWordContainerStyleList } from '../../../../modules/layout/gameField/playField/blocks/wordContainer';

const wordContainerStyle: IWordContainerStyleList =
{
  resultContainer: style['result-container'],
  resultGuess: style['result-guess'],
  wordContainerFilled: style['word-container__filled'],
}

const wordContainerOptions =
{
  className: [style['word-container']],
  text: '',
  style: wordContainerStyle,
}

export default new WordContainer(wordContainerOptions);