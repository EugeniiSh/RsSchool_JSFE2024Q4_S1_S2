import * as style from './accompanySound-style.module.scss';
import {
  AccompanySound,
  IAccompanySoundOption,
  IAccompanySoundStyleList,
} from '../../modules/accompanySound/accompanySound';
import {
  AudioPlayer,
  IAudioPlayerOption,
  IAudioPlayerStyleList,
} from '../../modules/audio/audioPlayer';

const backgroundAudioPlayerStyleList: IAudioPlayerStyleList = {
  audioPlayer: style['audio-player'],
  volumeContainer: style['volume-container-background'],
  volumeButton: style['volume-button'],
  volumeLine: style['volume-line-background'],
  volumeLinePersent: style['volume-line-persent-background'],
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

const backgroundAudioPlayerOption: IAudioPlayerOption = {
  className: [style['audio-player']],
  text: '',
  style: backgroundAudioPlayerStyleList,
  volume: true,
  progress: false,
  buttons: false,
  volumeVector: 'width',
  progressVector: 'width',
  songs: ['./static/assets/sound/library-sound.mp3'],
  autoPlay: true,
  loop: true,
};

const backgroundAudioPlayer = new AudioPlayer(backgroundAudioPlayerOption);

const effectAudioPlayerStyleList: IAudioPlayerStyleList = {
  audioPlayer: style['audio-player'],
  volumeContainer: style['volume-container-effect'],
  volumeButton: style['volume-button'],
  volumeLine: style['volume-line-effect'],
  volumeLinePersent: style['volume-line-persent-effect'],
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

const effectAudioPlayerOption: IAudioPlayerOption = {
  className: [style['audio-player']],
  text: '',
  style: effectAudioPlayerStyleList,
  volume: true,
  progress: false,
  buttons: false,
  volumeVector: 'width',
  progressVector: 'width',
  songs: ['./static/assets/sound/scull-laugh.mp3'],
  autoPlay: false,
  loop: false,
};

const effectAudioPlayer = new AudioPlayer(effectAudioPlayerOption);

const accompanySoundStyleList: IAccompanySoundStyleList = {
  ASContainer: style['a-c-container'],
};

const accompanySoundOption: IAccompanySoundOption = {
  className: [style['a-c-container']],
  text: '',
  style: accompanySoundStyleList,
  backgroundSound: backgroundAudioPlayer,
  effectSound: effectAudioPlayer,
};

export default new AccompanySound(accompanySoundOption);
