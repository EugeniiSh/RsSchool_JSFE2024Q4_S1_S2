import { Component } from '../layout/common/component';
import { AudioPlayer } from '../audio/audioPlayer';

export interface IAccompanySoundStyleList {
  ASContainer: string;
}

export interface IAccompanySoundOption {
  className: string[];
  text: '';
  style: IAccompanySoundStyleList;
  backgroundSound: AudioPlayer;
}

export class AccompanySound extends Component {
  protected className: string[];

  protected style: IAccompanySoundStyleList;

  protected backgroundSound: AudioPlayer;

  constructor({
    className,
    text,
    style,
    backgroundSound,
  }: IAccompanySoundOption) {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
    this.backgroundSound = backgroundSound;
  }

  public startBackground(): void {
    this.backgroundSound.nextSong();
  }
}
