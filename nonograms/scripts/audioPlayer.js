export class AudioPlayer
{
  constructor(
    { 
      audioContainer, // HTMLelement в который вставится разметка аудиоплеера
      volume = true,  // Отображать ли полоску изменения громкости звука
      progress = true, // Отображать ли полоску изменения прогресса трека
      buttons = true,  // Отображать ли кнопки управления треком (play, next, prev)
      volumeVector = 'width', // Расположение полоски звука (горизонтальное\вертикальное)
      progressVector = 'width', // Расположение полоски прогесса (горизонтальное\вертикальное)
      songs = [], // Массив с путями (строки) к трекам 
      autoPlay = true, // Авто проигрывание следующего трека после завершения текущего
      loop = false, // Авто проигрывание текущего трека после его завершения (зацикливание)
    })
  {
    this.volume = volume;
    this.progress = progress;
    this.buttons = buttons;
    this.volumeVector = volumeVector;
    this.progressVector = progressVector;
    this.songIndex = 0; // Индекс текущего трека
    this.songs = songs;
    this.autoPlay = autoPlay,
    this.loop = loop,
    this.dom = this.addHTML(audioContainer); // Создание разметки и копирование ссылки в свойство объекта
    this.addEvents(); // Добавление необходимых ивентов
    this.loadSong(this.songs[0]); // Загрузка первого трека для отображения информации о прогрессе и уровне громкости
  }

  // Функция создания размедки
  addHTML(parentElement /* Родительский элемент для будущего блока с разметкой аудиоплеера */ )
  {
    const div = document.createElement('div');

    const audioPlayer = div.cloneNode();
    audioPlayer.classList.add('audio-player');
  
    const audioTag = document.createElement('audio');
    audioTag.volume = 0.1; // Установка изначальной громкости звука

    const volumeContainer = div.cloneNode();
    const volumeButton = div.cloneNode();
    const volumeLine = div.cloneNode();
    const volumeLinePersent = div.cloneNode();
    volumeContainer.classList.add('volume-container');
    volumeButton.classList.add('volume-button');
    volumeLine.classList.add('volume-line');
    volumeLinePersent.classList.add('volume-line__persent');
    volumeLine.append(volumeLinePersent);
    volumeContainer.append(volumeButton, volumeLine);

    const progressContainer = div.cloneNode();
    const progressLine = div.cloneNode();
    const progressPersent = div.cloneNode();
    const totalTime = div.cloneNode();
    const currentTime = div.cloneNode();
    progressContainer.classList.add('progress-container');
    progressLine.classList.add('progress-line');
    progressPersent.classList.add('progress-persent');
    totalTime.classList.add('total-time');
    currentTime.classList.add('current-time');
    progressLine.append(progressPersent);
    progressContainer.append(totalTime, progressLine, currentTime);

    const buttonsContainer = div.cloneNode();
    const buttonPrev = div.cloneNode();
    const buttonPlay = div.cloneNode();
    const buttonNext = div.cloneNode();
    buttonsContainer.classList.add('buttons-container');
    buttonPrev.classList.add('btn', 'prev');
    buttonPlay.classList.add('btn', 'play');
    buttonNext.classList.add('btn', 'next');
    buttonsContainer.append(buttonPrev, buttonPlay, buttonNext);

    audioPlayer.append(audioTag);
    if(this.volume) audioPlayer.append(volumeContainer);
    if(this.progress) audioPlayer.append(progressContainer);
    if(this.buttons) audioPlayer.append(buttonsContainer);
    parentElement.append(audioPlayer);

    return audioPlayer;
  }

  // Загрузка трека с элемент < audio.src = >
  loadSong(path)
  {
    // tittleContent.textContent = song;
    const audio = this.dom.querySelector('audio');
    audio.src = path;
    // sliderImg.src = `assets/img/cover${songIndex + 1}.jpg`;
    // changeBgImage (songIndex); 
  }

  playSong()
  {
    this.dom.classList.add('playing');
    // imgSrc.src = 'assets/img/pause.svg';
    const audio = this.dom.querySelector('audio');
    audio.play();
  }

  pauseSong()
  {
    const audio = this.dom.querySelector('audio');
    this.dom.classList.remove('playing');
    // imgSrc.src = 'assets/img/play.svg';
    audio.pause();
  }

  nextSong()
  {
    this.songIndex++;

    if(this.songIndex > this.songs.length - 1)
    {
      this.songIndex = 0;
    }

    this.loadSong(this.songs[this.songIndex]);
    this.playSong();
  }

  prevSong()
  {
    this.songIndex--;

    if (this.songIndex < 0)
    {
      this.songIndex = this.songs.length - 1;
    }

    this.loadSong(this.songs[this.songIndex]);
    this.playSong();
  }

  // Получение срочного представления времени в формате 00:00
  getTimeCodeFromNum(num) 
  {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0)
    {
      return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    }  
    
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  }

  // Обновляет полоску прогресса и текущее время в DOM при проигрывании
  updateProgress(event) 
  {
    const duration = event.srcElement.duration;
    const currentTimeNum = event.srcElement.currentTime;
    const progressPercent = (currentTimeNum / duration) * 100;

    const progress = this.dom.querySelector('.progress-persent');
    progress.style[this.progressVector] = `${progressPercent}%`;

    const audio = this.dom.querySelector('audio');
    const currentTimeDom = this.dom.querySelector('.current-time');
    currentTimeDom.textContent = this.getTimeCodeFromNum(audio.currentTime);
  }

  // Обновляет полоску прогресса и текущее время в DOM при клике по полосе прогресса
  setProgress(event)
  {
    const audio = this.dom.querySelector('audio');
    const progressLine = this.dom.querySelector('.progress-line');

    const progressLineLength = progressLine[`client${ this.progressVector[0].toUpperCase() + this.progressVector.slice(1) }`];
    const currentClickPoint = event[`offset${ this.progressVector == 'width' ? 'X' : 'Y' }`];
    const duration = audio.duration;

    if(this.progressVector == 'width')
    {
      audio.currentTime = (currentClickPoint / progressLineLength) * duration;
    }
    else
    {
      audio.currentTime = ((progressLineLength - currentClickPoint) / progressLineLength) * duration;
    }
  }

  // Обновляет полоску звука и громкость в DOM при клике по полосе звука
  changeVolume(event)
  {
    const audio = this.dom.querySelector('audio');
    const volumeLine = this.dom.querySelector('.volume-line');
    const volumePercentage = this.dom.querySelector('.volume-line__persent');

    const volumelineLength = volumeLine[`client${ this.volumeVector[0].toUpperCase() + this.volumeVector.slice(1) }`];
    const currentClickPoint = event[`offset${ this.volumeVector == 'width' ? 'X' : 'Y' }`];

    if(this.volumeVector == 'width')
    {
      const newVolume = currentClickPoint / volumelineLength;
      audio.volume = newVolume;
      volumePercentage.style[this.volumeVector] = newVolume * 100 + '%';
    }
    else
    {
      const newVolume = (volumelineLength - currentClickPoint) / volumelineLength;
      audio.volume = newVolume;
      volumePercentage.style[this.volumeVector] = newVolume * 100 + '%';
    }
  }

  // Отключает звук, но не проигрывание
  muteVolume()
  {
    const audio = this.dom.querySelector('audio');
    const volumeBtn = this.dom.querySelector('.volume-button');
    audio.muted = !audio.muted;

    if (audio.muted)
    {
      // volumeImg.src = 'assets/img/volOff.svg';
      volumeBtn.classList.add('active__mute-volume');
    }
    else
    {
      // volumeImg.src = 'assets/img/volOn.svg';
      volumeBtn.classList.remove('active__mute-volume');
    }
  }

  // changeBgImage (songIndex)
  // {
  //   mainPage.style.opacity = '0.5';
  //   mainPage.style.backgroundImage = `url(assets/img/bgi${songIndex + 1}.jpg)`;
  //   setTimeout(getOpacityOne, 100,  mainPage);
  // }

  // getOpacityOne (element)
  // {
  //   element.style.opacity = '1';
  // }

  // Функция добавления необходимых ивентов
  addEvents()
  {
    const audio = this.dom.querySelector('audio'); 

    if(this.progress)
    {
      // Показывает общее и текущее врмя трека, уровень звука, после загрузки
      audio.addEventListener('loadeddata', () =>
      {
        this.dom.querySelector('.total-time').textContent = this.getTimeCodeFromNum(audio.duration);
        this.dom.querySelector('.current-time').textContent = this.getTimeCodeFromNum(audio.currentTime);
      });

      // Обновление полоски прогресса и времени при проигрывании
      audio.addEventListener('timeupdate', (event) => this.updateProgress.call(this, event));

      // Изменеие полоски прогресса при нажатии, обновление прогресса в теге < audio > 
      const progressLine = this.dom.querySelector('.progress-line'); 
      progressLine.addEventListener('click', (event) => this.setProgress.call(this, event));
    }
    
    if(this.volume)
    {
      // Показывает уровень звука, после загрузки
      audio.addEventListener('loadeddata', () =>
      {
        const newVolume = audio.volume;
        this.dom.querySelector('.volume-line__persent').style[this.volumeVector] = newVolume * 100 + '%';
      });

      //Изменеие полоски громкости звука при нажатии
      const volumeLine = this.dom.querySelector('.volume-line'); 
      volumeLine.addEventListener('click', (event) => this.changeVolume.call(this, event));

      //Вкл\Вкл звук, изменение картинки
      const volumeButton = this.dom.querySelector('.volume-button'); 
      volumeButton.addEventListener('click', (event) => this.muteVolume.call(this, event));
    }
    
    if(this.buttons)
    {
      //Вкл\Вкл проигрывание
      const play = this.dom.querySelector('.play');                 
      play.addEventListener('click', () =>
      {
        const isPlaing = this.dom.classList.contains('playing');
        if (isPlaing)
        {
          this.pauseSong();
        }
        else
        {
          this.playSong();
        }
      })

      //Следующий трек
      const next = this.dom.querySelector('.next');                
      next.addEventListener('click', (event) => this.nextSong.call(this, event));

      //Предыдущий трек
      const prev = this.dom.querySelector('.prev');                
      prev.addEventListener('click', (event) => this.prevSong.call(this, event));
    }

    if(this.autoPlay)
    {
      // Автопроигрование
      audio.addEventListener('ended', (event) => this.nextSong.call(this, event));
    }
     
    if(this.loop)
    {
      // Зацикливание. Повторение трека после его окончания
      audio.addEventListener('ended', (event) => this.playSong.call(this, event));
    }
    
  }
}

// Примерный объект-аргумент с настройками
const settings =
{
  audioContainer: 'HTMLelement',
  volume: true,
  progress: true,
  buttons: true,
  volumeVector: 'width',
  progressVector: 'width',
  songs: [],
  autoPlay: true,
  loop: false,
}