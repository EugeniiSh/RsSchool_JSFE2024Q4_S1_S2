import * as style from './roundResults-style.module.scss';
import { RoundResults, IRoundResultsOption, IRoundResultsStyleList } from '../../../modules/layout/modal-window/content/roundResults';
import { AudioPlayer, IAudioPlayerOption, IAudioPlayerStyleList } from '../../../modules/audio/audioPlayer';
import storageExternal from '../../storage/external';

const audioPlayerStyleList: IAudioPlayerStyleList =
{
  audioPlayer: style['audio-player'],
  volumeContainer: style['volume-container'],
  volumeButton: style['volume-button'],
  volumeLine: style['volume-line'],
  volumeLinePersent: style['volume-line-persent'],
  progressContainer: style['progress-container'],
  progressLine: style['progress-line'],
  progressPersent: style['progress-persent'],
  totalTime: style['total-time'],
  currentTime: style['current-time'],
  buttonsContainer: style['buttons-container'],
  btn: style.btn,
  buttonPrev: style['button-prev'],
  buttonPlay: style['button-play'],
  buttonNext: style['button-next'],
  playing: style.playing,
  activeMuteVolume: style['active-mute-volume'],
}

const audioPlayerOption: IAudioPlayerOption =
{
  className: [style['audio-player']],
  text: '',
  style: audioPlayerStyleList,
  volume: false,
  progress: false,
  buttons: false,
  volumeVector: 'width',
  progressVector:'width',
  songs: [], 
  autoPlay: false,
  loop: false,
}

const resultAudioPlayer = new AudioPlayer(audioPlayerOption);

const roundResultsStyleList: IRoundResultsStyleList =
{
  resultsContainer: style['results-container'],
  miniatureContainer: style['miniature-container'],
  miniatureImageBlock: style['miniature-image-block'],
  miniatureTextBlock: style['miniature-text-block'],
  sentenceContainer: style['sentence-container'],
  knowledgeBlock: style['knowledge-block'],
  knowledgeHeader: style['knowledge-header'],
  sentenceBlock: style['sentence-block'],
  sentence: style.sentence,
  audioHint: style['audio-hint'],
  withHelp: style['with-help'],
  withOutHelp: style['with-out-help'],
  buttonContainer: style['button-container'],
  button: style.button,
}

const roundResultsOption: IRoundResultsOption =
{
  className: [style['results-container']],
  text: '',
  style: roundResultsStyleList,
  audioPlayer: resultAudioPlayer,
  externalStorage: storageExternal,
}

const roundResults = new RoundResults(roundResultsOption);
export default roundResults;
