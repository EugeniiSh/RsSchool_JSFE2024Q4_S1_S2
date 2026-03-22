import * as style from './blocks-style.module.scss';
import { ResultLine } from '../../../../modules/layout/gameField/playField/blocks/resultLine';

const resultLineOptions = {
  className: [style['guess-block'], style['result-guess']],
  text: '',
};

export default new ResultLine(resultLineOptions);
