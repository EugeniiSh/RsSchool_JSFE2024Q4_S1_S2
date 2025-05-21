import * as style from './blocks-style.module.scss';
import { ResultContainer } from '../../../../modules/layout/gameField/playField/blocks/resultContainer';

const resultContainerOptions =
{
  className: [style['result-container']],
  text: '',
}

export default new ResultContainer(resultContainerOptions);