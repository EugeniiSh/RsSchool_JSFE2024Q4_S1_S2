import * as style from './audioTest-style.module.scss';
import { AudioPlayer, IAudioPlayerOption, IAudioPlayerStyleList } from '../../modules/audio/audioPlayer';

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
  volume: true,
  progress: true,
  buttons: true,
  volumeVector: 'height',
  progressVector:'width',
  songs: ['https://raw.githubusercontent.com/eugeniish/rss-puzzle-data/main/files/01_0001_example.mp3', 'https://raw.githubusercontent.com/eugeniish/rss-puzzle-data/main/files/01_0002_example.mp3'], 
  autoPlay: true,
  loop: false,
}

export default new AudioPlayer(audioPlayerOption);