import { Component } from '../../../../common/component';
import { AudioPlayer } from '../../../../../audio/audioPlayer';

export interface IAudioTranslationStyleList {
  audioTranslation: string;
}

export interface IAudioTranslationOption {
  className: string[];
  text: string;
  style: IAudioTranslationStyleList;
  audioPlayer: AudioPlayer;
}

export class AudioTranslation extends Component {
  protected className: string[];

  protected style: IAudioTranslationStyleList;

  protected audioPlayer: AudioPlayer;

  constructor({
    className,
    text,
    style,
    audioPlayer,
  }: IAudioTranslationOption) {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.audioPlayer = audioPlayer.getAudioPlayer();

    this.append(this.audioPlayer);
  }

  public updateAudioTranslation(newAudioTranslation: string): void {
    this.audioPlayer.loadSong(newAudioTranslation);
  }

  public getAudioTranslation(): AudioTranslation {
    return new AudioTranslation({
      className: this.className,
      text: '',
      style: this.style,
      audioPlayer: this.audioPlayer.getAudioPlayer(),
    });
  }
}
