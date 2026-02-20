import * as style from './roundResults-style.module.scss';
import {
  RoundResults,
  IRoundResultsOption,
  IRoundResultsStyleList,
} from '../../../modules/layout/modal-window/content/roundResults';

const roundResultsStyleList: IRoundResultsStyleList = {
  resultsContainer: style['results-container'],
  sentenceContainer: style['sentence-container'],
  knowledgeBlock: style['knowledge-block'],
  knowledgeHeader: style['knowledge-header'],
  sentence: style.sentence,
  withHelp: style['with-help'],
  withOutHelp: style['with-out-help'],
  buttonContainer: style['button-container'],
  button: style.button,
};

const roundResultsOption: IRoundResultsOption = {
  className: [style['results-container']],
  text: '',
  style: roundResultsStyleList,
};

const roundResults = new RoundResults(roundResultsOption);
export default roundResults;
