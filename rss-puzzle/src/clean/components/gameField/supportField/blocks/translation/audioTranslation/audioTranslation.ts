import * as style from './audioTranslation-style.module.scss';
import {
  AudioPlayer,
  IAudioPlayerOption,
  IAudioPlayerStyleList,
} from '../../../../../../modules/audio/audioPlayer';
import {
  AudioTranslation,
  IAudioTranslationOption,
  IAudioTranslationStyleList,
} from '../../../../../../modules/layout/gameField/supportField/blocks/translation/audioTranslation';

const audioPlayerStyleList: IAudioPlayerStyleList = {
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
};

const audioPlayerOption: IAudioPlayerOption = {
  className: [style['audio-player']],
  text: '',
  style: audioPlayerStyleList,
  volume: true,
  progress: true,
  buttons: true,
  volumeVector: 'width',
  progressVector: 'width',
  songs: [],
  autoPlay: false,
  loop: false,
};

const translationAudioPlayer = new AudioPlayer(audioPlayerOption);

const audioTranslationStyleList: IAudioTranslationStyleList = {
  audioTranslation: style['audio-translation'],
};

const audioTranslationOption: IAudioTranslationOption = {
  className: [style['audio-translation']],
  text: '',
  style: audioTranslationStyleList,
  audioPlayer: translationAudioPlayer,
};

export default new AudioTranslation(audioTranslationOption);
