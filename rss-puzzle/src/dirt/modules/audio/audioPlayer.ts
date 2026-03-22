import { Component } from '../layout/common/component';

export interface IAudioPlayerStyleList
{
  audioPlayer: string;
  volumeContainer: string;
  volumeButton: string;
  volumeLine: string;
  volumeLinePersent: string;
  progressContainer: string;
  progressLine: string;
  progressPersent: string;
  totalTime: string;
  currentTime: string;
  buttonsContainer: string;
  btn: string;
  buttonPrev: string;
  buttonPlay: string;
  buttonNext: string;
  playing: string;
  activeMuteVolume: string;
}

export interface IAudioPlayerComponents
{
  audioTag: Component;
  audioNode: HTMLAudioElement;
  volumeContainer: Component;
  volumeButton: Component;
  volumeLine: Component;
  volumeLinePersent: Component;
  progressContainer: Component;
  progressLine: Component;
  progressPersent: Component;
  totalTime: Component;
  currentTime: Component;
  buttonsContainer: Component;
  buttonPrev: Component;
  buttonPlay: Component;
  buttonNext: Component;
}

export interface IAudioPlayerOption
{
  className: string[];
  text: string;
  style: IAudioPlayerStyleList; // Стили для всех элементов плеера
  volume: boolean;  // Отображать ли полоску изменения громкости звука
  progress: boolean; // Отображать ли полоску изменения прогресса трека
  buttons: boolean;  // Отображать ли кнопки управления треком (play, next, prev)
  volumeVector:'width' | 'height'; // Расположение полоски звука (горизонтальное\вертикальное)
  progressVector:'width' | 'height'; // Расположение полоски прогесса (горизонтальное\вертикальное)
  songs: string[]; // Массив с путями (строки) к трекам 
  autoPlay: boolean; // Авто проигрывание следующего трека после завершения текущего
  loop: boolean; // Авто проигрывание текущего трека после его завершения (зацикливание)
}

export class AudioPlayer extends Component
{
  protected className: string[];

  protected style: IAudioPlayerStyleList;

  protected volume: boolean;

  protected progress: boolean;

  protected buttons: boolean;

  protected volumeVector:'width' | 'height'; 

  protected progressVector:'width' | 'height';

  protected songIndex: number;

  protected songs: string[];

  protected autoPlay: boolean; 

  protected loop: boolean;

  protected dom: IAudioPlayerComponents;

  protected seconds: number;

  /*
  TODO: Добавить настройку изначальной громкости в конструктор.
  Держать этот параметр в создаваемом объекте и менять, при изменении громкости пользователем.
  Это позволит передавать этот параметр в дубликат аудио плеера, что бы текущая громкость
  родителя стала изначальной громкостью дубликата.
  */       
  constructor
  (
    {
      className,
      text,
      style,
      volume = true, 
      progress = true, 
      buttons = true, 
      volumeVector ='width', 
      progressVector = 'width',
      songs = [], 
      autoPlay = true, 
      loop = false, 
    }: IAudioPlayerOption
  )
  {
    super({tag: 'div', className, text});
    this.className = className;
    this.style = style;
    this.volume = volume;
    this.progress = progress;
    this.buttons = buttons;
    this.volumeVector = volumeVector;
    this.progressVector = progressVector;
    this.songIndex = 0; // Индекс текущего трека
    this.songs = songs;
    this.autoPlay = autoPlay;
    this.loop = loop;
    this.seconds = 0;
    this.dom = this.addHTML(); // Создание разметки и копирование ссылки в свойство объекта
    this.addEvents(); // Добавление необходимых ивентов
    this.loadSong(this.songs[0]); // Загрузка первого трека для отображения информации о прогрессе и уровне громкости
  }

  // Функция создания размедки
  protected addHTML(): IAudioPlayerComponents
  {
    const audioTag = new Component({tag: 'audio', className: [], text: ''});
    const audioNode = audioTag.getNode() as HTMLAudioElement;
    audioNode.volume = 0.1; // Установка изначальной громкости звука

    const volumeContainer = new Component({tag: 'div', className: [this.style.volumeContainer], text: ''});
    const volumeButton = new Component({tag: 'div', className: [this.style.volumeButton], text: ''});
    const volumeLine = new Component({tag: 'div', className: [this.style.volumeLine], text: ''});
    const volumeLinePersent = new Component({tag: 'div', className: [this.style.volumeLinePersent], text: ''});
    volumeLine.append(volumeLinePersent);
    volumeContainer.append(volumeButton);
    volumeContainer.append(volumeLine);

    const progressContainer = new Component({tag: 'div', className: [this.style.progressContainer], text: ''});
    const progressLine = new Component({tag: 'div', className: [this.style.progressLine], text: ''});
    const progressPersent = new Component({tag: 'div', className: [this.style.progressPersent], text: ''});
    const totalTime = new Component({tag: 'div', className: [this.style.totalTime], text: ''});
    const currentTime = new Component({tag: 'div', className: [this.style.currentTime], text: ''});
    progressLine.append(progressPersent);
    progressContainer.append(totalTime);
    progressContainer.append(progressLine);
    progressContainer.append(currentTime);

    const buttonsContainer = new Component({tag: 'div', className: [this.style.buttonsContainer], text: ''});
    const buttonPrev = new Component({tag: 'div', className: [this.style.btn, this.style.buttonPrev], text: ''});
    const buttonPlay = new Component({tag: 'div', className: [this.style.btn, this.style.buttonPlay], text: ''});
    const buttonNext = new Component({tag: 'div', className: [this.style.btn, this.style.buttonNext], text: ''});
    buttonsContainer.append(buttonPrev);
    buttonsContainer.append(buttonPlay);
    buttonsContainer.append(buttonNext);

    this.append(audioTag);
    if(this.volume) this.append(volumeContainer);
    if(this.progress) this.append(progressContainer);
    if(this.buttons) this.append(buttonsContainer);

    return {
      audioTag,
      audioNode,
      volumeContainer,
      volumeButton,
      volumeLine,
      volumeLinePersent,
      progressContainer,
      progressLine,
      progressPersent,
      totalTime,
      currentTime,
      buttonsContainer,
      buttonPrev,
      buttonPlay,
      buttonNext,
    };
  }

  public getSongStatus(): 'play' | 'stop'
  {
    const isPlaing = this.getClassList()[this.style.playing];
    
    if(isPlaing) return 'play';

    return 'stop';
  }

  public getPlayerComponents(): IAudioPlayerComponents
  {
    return this.dom;
  }

  // Загрузка трека с элемента < audio.src = >
  public loadSong(path: string): void
  {
    this.dom.audioNode.src = path;
  }

  public playSong(): void
  {
    this.toggleClass(this.style.playing, true);
    this.dom.audioNode.play();
  }

  public stopSong(): void
  {
    this.toggleClass(this.style.playing, false);
    this.dom.audioNode.load();
  }

  public pauseSong(): void
  {
    this.toggleClass(this.style.playing, false);
    this.dom.audioNode.pause();
  }

  public nextSong(): void
  {
    this.songIndex += 1;

    if(this.songIndex > this.songs.length - 1)
    {
      this.songIndex = 0;
    }

    this.loadSong(this.songs[this.songIndex]);
    this.playSong();
  }

  public prevSong(): void
  {
    this.songIndex -= 1;

    if (this.songIndex < 0)
    {
      this.songIndex = this.songs.length - 1;
    }

    this.loadSong(this.songs[this.songIndex]);
    this.playSong();
  }

  // Получение строчного представления времени в формате 00:00
  protected getTimeCodeFromNum(num: number): string 
  {
    let { seconds } = this;
    seconds = Math.trunc(num);
    let minutes = Math.trunc(seconds / 60);
    seconds -= minutes * 60;
    const hours = Math.trunc(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0)
    {
      return `${minutes}:${String(seconds).padStart(2, '0')}`;
    }  
    
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  // Обновляет полоску прогресса и текущее время в DOM при проигрывании
  protected updateProgress(): void
  {
    const { duration } = this.dom.audioNode;
    const currentTimeNum = this.dom.audioNode.currentTime;
    const progressPercent = (currentTimeNum / duration) * 100;
    this.dom.progressPersent.getNode().style[this.progressVector] = `${progressPercent}%`;

    const currentTimeText = this.getTimeCodeFromNum(currentTimeNum);
    this.dom.currentTime.setTextContent(currentTimeText);
  } 

  // Обновляет полоску прогресса и текущее время в DOM при клике по полосе прогресса
  // Для корректной работы необходимо для .progress-persent установить pointer-events: none;
  protected setProgress(event: Event): void
  {
    if(!(event instanceof PointerEvent)) return;
   
    const clientVector = `client${ this.progressVector[0].toUpperCase() + this.progressVector.slice(1) }` as 'clientWidth' | 'clientHeight';
    const progressLineLength = this.dom.progressLine.getNode()[clientVector];

    const offsetVector = `offset${ this.progressVector === 'width' ? 'X' : 'Y' }` as 'offsetX' | 'offsetY';
    const currentClickPoint = event[offsetVector];

    const { duration } = this.dom.audioNode;

    if(this.progressVector === 'width')
    {
      const newProgress = (currentClickPoint / progressLineLength) * duration
      this.dom.audioNode.currentTime = newProgress;
      this.dom.progressPersent.getNode().style[this.progressVector] = `${newProgress * 100}%`;
    }
    else
    {
      const newProgress = ((progressLineLength - currentClickPoint) / progressLineLength) * duration;
      this.dom.audioNode.currentTime = newProgress;
      this.dom.progressPersent.getNode().style[this.progressVector] = `${newProgress * 100}%`;
    }
  }

  // Обновляет полоску звука и громкость в DOM при клике по полосе звука
  // Для корректной работы необходимо для .volume-line-persent установить pointer-events: none;
  protected changeVolume(event: Event) : void
  {
    if(!(event instanceof PointerEvent)) return;

    const clientVector = `client${ this.volumeVector[0].toUpperCase() + this.volumeVector.slice(1) }` as 'clientWidth' | 'clientHeight';
    const volumelineLength = this.dom.volumeLine.getNode()[clientVector];

    const offsetVector = `offset${ this.volumeVector === 'width' ? 'X' : 'Y' }` as 'offsetX' | 'offsetY';
    const currentClickPoint = event[offsetVector];

    if(this.volumeVector === 'width')
    {
      const newVolume = currentClickPoint / volumelineLength;
      this.dom.audioNode.volume = newVolume;
      this.dom.volumeLinePersent.getNode().style[this.volumeVector] = `${newVolume * 100}%`;
    }
    else
    {
      const newVolume = (volumelineLength - currentClickPoint) / volumelineLength;
      this.dom.audioNode.volume = newVolume;
      this.dom.volumeLinePersent.getNode().style[this.volumeVector] = `${newVolume * 100}%`;
    }
  }

  // Отключает звук, но не проигрывание
  protected muteVolume(): void
  {
    this.dom.audioNode.muted = !this.dom.audioNode.muted;

    if (this.dom.audioNode.muted)
    {
      this.dom.volumeButton.toggleClass(this.style.activeMuteVolume, true);
    }
    else
    {
      this.dom.volumeButton.toggleClass(this.style.activeMuteVolume, false);
    }
  }

  // Функция добавления необходимых ивентов
  protected addEvents(): void
  {
    if(this.progress)
    {
      // Показывает общее и текущее время трека, начальное состояние полосы прогресса, после загрузки
      this.dom.audioTag.addListener('loadeddata', () =>
      {
        this.dom.totalTime.setTextContent(this.getTimeCodeFromNum(this.dom.audioNode.duration));
        this.dom.currentTime.setTextContent(this.getTimeCodeFromNum(this.dom.audioNode.currentTime));
        this.updateProgress();
      });

      // Обновление полоски прогресса и времени при проигрывании
      this.dom.audioTag.addListener('timeupdate', () => this.updateProgress());

      // Изменеие полоски прогресса при нажатии, обновление прогресса в теге < audio > 
      this.dom.progressLine.addListener('click', (event) => this.setProgress(event));
    }
    
    if(this.volume)
    {
      // Показывает уровень звука, после загрузки
      this.dom.audioTag.addListener('loadeddata', () =>
      {
        const newVolume = this.dom.audioNode.volume;
        this.dom.volumeLinePersent.getNode().style[this.volumeVector] = `${newVolume * 100}%`;
      });

      // Изменеие полоски громкости звука при нажатии
      this.dom.volumeLine.addListener('click', (event) => this.changeVolume(event));

      // Вкл\Вкл звук
      this.dom.volumeButton.addListener('click', () => this.muteVolume());
    }
    
    if(this.buttons)
    {
      // Вкл\Вкл проигрывание                 
      this.dom.buttonPlay.addListener('click', () =>
      {
        const isPlaing = this.getClassList()[this.style.playing];
        if (isPlaing)
        {
          this.pauseSong();
        }
        else
        {
          this.playSong();
        }
      })

      // Следующий трек
      this.dom.buttonNext.addListener('click', () => this.nextSong());

      // Предыдущий трек
      this.dom.buttonPrev.addListener('click', () => this.prevSong());
    }

    if(this.autoPlay)
    {
      // Автопроигрование
      this.dom.audioTag.addListener('ended', () => this.nextSong());
    }
     
    if(this.loop)
    {
      // Зацикливание. Повторение трека после его окончания
      this.dom.audioTag.addListener('ended', () => this.playSong());
    }

    if(!this.autoPlay && !this.loop)
    {
      // Перемотка на начало трека после его завершения
      this.dom.audioTag.addListener('ended', () => this.stopSong());
    }
  }

  // Создание аудио плеера с теми же настройками и стилями
  public getAudioPlayer(): AudioPlayer
  {
    return new AudioPlayer
    (
      {
        className: this.className,
        text: '',
        style: this.style,
        volume: this.volume, 
        progress: this.progress, 
        buttons: this.buttons, 
        volumeVector: this.volumeVector, 
        progressVector: this.progressVector,
        songs: this.songs, 
        autoPlay: this.autoPlay, 
        loop: this.loop,
      }
    )
  }
}