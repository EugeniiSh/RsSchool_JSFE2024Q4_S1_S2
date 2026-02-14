import * as style from './playField-style.module.scss';
import * as styleBlocks from './blocks/blocks-style.module.scss';
import { PlayField, IPlayFieldOption, IPlayFieldStyleList } from '../../../modules/layout/gameField/playField/playField';
import IC from './blocks/initialContainer';
import RC from './blocks/resultContainer';
import RL from './blocks/resultLine';
import WC from './blocks/wordContainer';
import WB from './blocks/wordBlock';
import BC from './blocks/buttonContainer';
import storageExternal from '../../storage/external';
import storageLocal from '../../storage/local';
import { customEventList } from '../../events/custom';
import windowModal from '../../pop-up/modal-window/modal-window';
import resultsRound from '../../pop-up/roundResults/roundResults';

const playFieldStyle: IPlayFieldStyleList =
{
  pazzleWrapper: style['play-field'],
  resultContainer: styleBlocks['result-container'],
  initialContainer: styleBlocks['initial-container'],
  resultGuess: styleBlocks['result-guess'],
  initialGuess: styleBlocks['initial-guess'],
  guessBlock: styleBlocks['guess-block'],
  wordContainer: styleBlocks['word-container'],
  wordContainerFilled: styleBlocks['word-container__filled'],
  wordBlock: styleBlocks['word-block'],
  statusCorrect: styleBlocks['word-block__status_correct'],
  statusError: styleBlocks['word-block__status_error'],
  statusFirst: styleBlocks['word-block__status_first'],
  wordBlockPiece: styleBlocks['word-block__piece'],
  wordBlockPieceStatusCorrect: styleBlocks['word-block__piece__status_correct'],
  wordBlockPieceStatusError: styleBlocks['word-block__piece__status_error'],
  wordBlockPieceLeftStatusCorrect: styleBlocks['word-block__piece_left__status_correct'],
  wordBlockPieceLeftStatusError: styleBlocks['word-block__piece_left__status_error'],
  wordBlockDrag: styleBlocks['word-block__drag'],
  wordBlockHLLeft: styleBlocks['word-block__hl_left'],
  wordBlockHLRight: styleBlocks['word-block__hl_right'],
  wordBlockHLCenter: styleBlocks['word-block__hl_center'],
  completePictureBlock: styleBlocks['complete-picture-block'],
  pictureInformationBlock: styleBlocks['picture-information-block'],
  hiddenBlock: styleBlocks['hidden-block'],
  visibleBlock: styleBlocks['visible-block'],
  hiddenGuessBlock: styleBlocks['hidden-guess-block'],
}

const playFieldOptions: IPlayFieldOption =
{
  className: [style['play-field']],
  text: '',
  style: playFieldStyle,
  initialContainer: IC,
  resultContainer: RC,
  resultLine: RL,
  wordContainer: WC,
  wordBlock: WB,
  buttonContainer: BC,
  externalStorage: storageExternal,
  localStorage: storageLocal,
  eventList: customEventList,
  modalWindow: windowModal,
  roundResults: resultsRound,
}

export default new PlayField(playFieldOptions);