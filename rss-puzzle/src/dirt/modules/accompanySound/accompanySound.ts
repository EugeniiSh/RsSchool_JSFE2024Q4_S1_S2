import { Component } from '../layout/common/component';
import { AudioPlayer } from '../audio/audioPlayer';

export interface IAccompanySoundStyleList
{
  ASContainer: string;
}

export interface IAccompanySoundOption
{
  className: string[];
  text: '';
  style: IAccompanySoundStyleList;
  backgroundSound: AudioPlayer;
  effectSound: AudioPlayer;
}

export class AccompanySound extends Component
{
  protected className: string[];

  protected style: IAccompanySoundStyleList;

  protected backgroundSound: AudioPlayer;

  protected effectSound: AudioPlayer;

  constructor
  (
    {
      className,
      text,
      style,
      backgroundSound,
      effectSound,
    }: IAccompanySoundOption
  )
  {
    super({tag: 'div', className, text});
    this.className = className;
    this.style = style;
    this.backgroundSound = backgroundSound;
    this.effectSound = effectSound;

    this.appendChildren([this.backgroundSound]);
  }

  public getBackgroundVolumeConteiner(): Component
  {
    return this.backgroundSound.getPlayerComponents().volumeContainer;
  }

  public getEffectVolumeConteiner(): Component
  {
    return this.effectSound.getPlayerComponents().volumeContainer;
  }

  public startBackground(): void
  {
    this.backgroundSound.nextSong();
  }

  public startEffect(path: string): void
  {
    if(this.effectSound.getSongStatus() === 'play')
    {
      const effectSoundClone = this.effectSound.getAudioPlayer();

      effectSoundClone
      .getPlayerComponents()
      .audioTag
      .addListener('ended', () =>
      {
        effectSoundClone.destroy();
      });

      effectSoundClone.loadSong(path);
      effectSoundClone.playSong();

      return;
    }

    this.effectSound.loadSong(path);
    this.effectSound.playSong();
  }

  public asyncStartEffect(path: string, delay: number): void
  {
    if(this.effectSound.getSongStatus() === 'play')
    {
      const effectSoundClone = this.effectSound.getAudioPlayer();

      effectSoundClone
      .getPlayerComponents()
      .audioTag
      .addListener('ended', () =>
      {
        effectSoundClone.destroy();
      });

      setTimeout(() =>
      {
        effectSoundClone.loadSong(path);
        effectSoundClone.playSong();
      }, delay);

      return;
    }

    setTimeout(() =>
    {
      this.effectSound.loadSong(path);
      this.effectSound.playSong();
    }, delay);
  }
}