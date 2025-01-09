class SimonSaysGame
{
  constructor(body, options)
  {
    this.body = body;
    this.options = options,
    
    this.setup();
    this.addEvents();
  }

  setup()
  {
    //Обёртка для игры и штора для блокировки кликов
    this.wrapper = this.createBlock({ tag: 'div', classes: ['simon-game-wrapper'], parent: this.body });
    this.shadeBlock = this.createBlock({ tag: 'div', classes: ['shade'], parent: this.body });

    //Блоки Саймона
    this.simonSpeechBaloon = this.createBlock({ tag: 'div', classes: ['simon-speech', 'speech-baloon'], parent: this.wrapper });
    this.simonSpeechOwn = this.createBlock({ tag: 'div', classes: ['simon-speech__own'],  parent: this.simonSpeechBaloon });
    this.simonSpeechWord = this.createBlock({ tag: 'div', classes: ['simon-speech__word'],  parent: this.simonSpeechBaloon });
    this.simonSpeechAnswer = this.createBlock({ tag: 'div', classes: ['simon-speech__answer'],  parent: this.simonSpeechBaloon });

    //Кнопка начала игры
    this.startGameButton = this.createBlock({ tag: 'div', classes: ['start-button', 'block-hidden'],  parent: this.simonSpeechBaloon, text: 'Start' });

    //Блок настроек (сложность, счётчик раундов)
    this.settingsBlock = this.createBlock({ tag: 'div', classes: ['settings'],  parent: this.wrapper });

    //Блок для выбора сложности
    this.difficultyBlock = this.createBlock({ tag: 'div', classes: ['difficulty'],  parent: this.settingsBlock });
    this.options.difficulty //Создание радио кнопок и описания для них
    .forEach((diffItem, index) =>
    {
      const diffElem = this.createBlock
      (
        { 
          tag: 'div', 
          classes: ['difficulty__elem', `difficulty-${diffItem.tag}`],  
          parent: this.difficultyBlock,
        }
      )

      const label = this.createBlock
      (
        { 
          tag: 'label', 
          classes: ['difficulty__label', `label-${diffItem.tag}`],  
          parent: diffElem,
          text: diffItem.tag,
        }
      )
      label.setAttribute('for', `radio-${diffItem.tag}`);

      const newBlock = this.createBlock
      (
        { 
          tag: 'input', 
          classes: ['difficulty__input', `input__${diffItem.tag}`],  
          parent: diffElem,
        }
      )

      newBlock.type = 'radio';
      newBlock.id = `radio-${diffItem.tag}`;
      newBlock.name = 'difficulty';

      if(index === 0) newBlock.checked = true;
    });

    //Счётчик раудов
    this.roundViewBlock = this.createBlock({ tag: 'div', classes: ['round-view'],  parent: this.settingsBlock });
    this.roundText = this.createBlock({ tag: 'span', classes: ['round-view__text'],  parent: this.roundViewBlock, text: 'round' });
    this.roundCount = this.createBlock({ tag: 'span', classes: ['round-view__count'],  parent: this.roundViewBlock, text: '0/5' });

    //Создание клавиатуры
    this.keyboard = this.createBlock({ tag: 'div', classes: ['keyboard'],  parent: this.wrapper });
    this.createKeyboard(this.options.difficulty[2].value, this.keyboard);

    //Блок игрока (кнопки: повторить последовательность, следующий раунд, новая игра; поле для ввода ответа)
    this.playerSpeechBaloon = this.createBlock({ tag: 'div', classes: ['player-speech'],  parent: this.wrapper });
    this.playerSpeechButtons = this.createBlock({ tag: 'div', classes: ['player-buttons'],  parent: this.playerSpeechBaloon });
    this.playerSpeechHelp = this.createBlock({ tag: 'div', classes: ['player-buttons__help', 'button-player'],  parent: this.playerSpeechButtons, text: 'Repeat the sequence' });
    this.playerSpeechNext = this.createBlock({ tag: 'div', classes: ['player-buttons__next', 'button-player', 'block-hidden'],  parent: this.playerSpeechButtons, text: 'Next' });
    this.playerSpeechNewGame = this.createBlock({ tag: 'div', classes: ['player-buttons__new-game', 'button-player'],  parent: this.playerSpeechButtons, text: 'New game' });
    this.playerSpeechOwn = this.createBlock({ tag: 'input', classes: ['player-speech__own'],  parent: this.playerSpeechBaloon });
    this.playerSpeechOwn.type = 'text';
    this.playerSpeechOwn.value = 'I will write my answer here';
  }

  //Создание блоков
  createBlock(options) {
    const { tag = "div", text = "", parent, classes = [] } = options;
  
    const element = document.createElement(tag);
    element.textContent = text;
  
    if (classes.length > 0) 
    {
      element.classList.add(...classes);
    }
  
    if (parent != null)
    {
      parent.appendChild(element);
    }
  
    return element;
  }

  //Вывод текста по буквам
  lettertByLetterPrint(word, node, gap)
  {
    node.textContent = '';

    word.split('').forEach((letter, index) =>
    {
      setTimeout(() => 
      {
        const text = node.textContent;
        node.textContent = text + letter;
      }, gap * index);
    })
  }

  //Создание клавиатуры
  createKeyboard(value, parentNode)
  {
    value.forEach((item) =>
    {
      const startPosition = item[0];
      const letterCount = item[1];

      for(let i = startPosition; i < startPosition + letterCount; i += 1)
      {
        const letter = String.fromCodePoint(i);
        this.createBlock({ tag: 'div', classes: ['keyboard__button'],  parent: parentNode, text: letter });
      }
    })
  }

  disableEvent(event) 
  { 
    event.preventDefault();
    event.stopPropagation(); 
    console.log(event);
  }

  disableUI()
  {
    document.addEventListener('keydown', this.disableEvent, true);
  }

  addEvents()
  {
    this.simonSpeechBaloon.addEventListener('click', () => this.lettertByLetterPrint.call(this, this.options.greetings, this.simonSpeechOwn, this.options.printGap));
    this.disableUI();
  }
}

const body = document.querySelector('body');

const gameOptions =
{
  greetings: 'Come on, buddy, join us in a friendly game of Simon Says!',
  gameSpeech: 'Simon says: ...',
  goodAnswer: '... Correct ...',
  badAnswer: '!!! WRONG !!!',
  printGap: 100,
  difficulty: 
  [
    {
      tag: 'easy',
      value: [[48, 10]],
    }, 
    {
      tag: 'medium',
      value: [[65, 26]],
    },
    {
      tag: 'hard',
      value: [[48, 10], [65, 26]],
    },
  ],
}

new SimonSaysGame(body, gameOptions);