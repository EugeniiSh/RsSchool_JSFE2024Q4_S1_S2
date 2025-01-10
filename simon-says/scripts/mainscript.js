class SimonSaysGame
{
  constructor(body, options)
  {
    this.body = body;
    this.options = options,
    this.logs = {},
    
    this.setup();
    this.addEvents();
  }

  setup()
  {
    //Обёртка для игры и штора для блокировки кликов
    this.wrapper = this.createBlock({ tag: 'div', classes: ['simon-game-wrapper'], parent: this.body });
    this.shadeBlock = this.createBlock({ tag: 'div', classes: ['shade'] });

    //Блоки Саймона
    this.simonSpeechBaloon = this.createBlock({ tag: 'div', classes: ['simon-speech', 'speech-baloon'], parent: this.wrapper });
    this.simonSpeechOwn = this.createBlock({ tag: 'div', classes: ['simon-speech__own', 'simon-speech__text'],  parent: this.simonSpeechBaloon });
    this.simonSpeechWord = this.createBlock({ tag: 'div', classes: ['simon-speech__word', 'simon-speech__text'],  parent: this.simonSpeechBaloon });
    this.simonSpeechAnswer = this.createBlock({ tag: 'div', classes: ['simon-speech__answer', 'simon-speech__text'],  parent: this.simonSpeechBaloon });

    //Кнопка начала игры
    this.startGameButton = this.createBlock({ tag: 'div', classes: ['start-button', 'block_action_hidden'],  parent: this.simonSpeechBaloon, text: 'Start' });

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
    this.createKeyboard(this.options.difficulty[0].value, this.keyboard);

    //Блок игрока (кнопки: повторить последовательность, следующий раунд, новая игра; поле для ввода ответа)
    this.playerSpeechBaloon = this.createBlock({ tag: 'div', classes: ['player-speech'],  parent: this.wrapper });
    this.playerSpeechButtons = this.createBlock({ tag: 'div', classes: ['player-buttons'],  parent: this.playerSpeechBaloon });
    this.playerSpeechHelp = this.createBlock({ tag: 'div', classes: ['player-buttons__help', 'button-player'],  parent: this.playerSpeechButtons, text: 'Repeat the sequence' });
    this.playerSpeechNext = this.createBlock({ tag: 'div', classes: ['player-buttons__next', 'button-player', 'block_action_hidden'],  parent: this.playerSpeechButtons, text: 'Next' });
    this.playerSpeechNewGame = this.createBlock({ tag: 'div', classes: ['player-buttons__new-game', 'button-player'],  parent: this.playerSpeechButtons, text: 'New game' });
    this.playerSpeechOwn = this.createBlock({ tag: 'input', classes: ['player-speech__own'],  parent: this.playerSpeechBaloon });
    this.playerSpeechOwn.type = 'text';
    this.playerSpeechOwn.value = '';
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
  lettertByLetterPrint(options)
  {
    const { word, node, gap, callBack = () => {}, args = {}, rewrite = false } = options;

    const textField = node.tagName === 'INPUT'? 'value' : 'textContent';
    node[textField] = '';

    word.split('').forEach((letter, index, lettersArr) =>
    {
      setTimeout(() => 
      {
        const text = node[textField];
        node[textField] = rewrite ? letter : text + letter;

        if(lettersArr.length === index + 1) 
        {
          callBack(args);
        }
      }, gap * index);
    })
  }

  //Создание клавиатуры
  createKeyboard(value, parentNode)
  {
    parentNode.innerHTML = '';

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

    this.keyboardButtons = this.keyboard.querySelectorAll('.keyboard__button');
  }

  //Полная отмена события
  disableEvent(event) 
  { 
    event.preventDefault();
    event.stopPropagation(); 
  }

  //Отключение взаимодействия пользователя с определённым блоком.
  disableUI(node)
  {
    node.append(this.shadeBlock.cloneNode());
    node.addEventListener('keydown', this.disableEvent, true);

    const logs = this.logs.disableUI;

    if(logs)
    {
      logs.set(node, 'Disable');
    }
    else
    {
      this.logs.disableUI = new Map();
      this.logs.disableUI.set(node, 'Disable');
    }
  }

  //Возврат взаимодействия пользователя с определённым блоком.
  anableUI(node)
  {
    node.querySelector('.shade').remove();
    node.removeEventListener('keydown', this.disableEvent, true);

    const logs = this.logs.disableUI;

    if(logs)
    {
      logs.set(node, 'Anable');
    }
    else
    {
      console.log('Logs not found');
    }
  }

  //Приветственное вступление
  greetings()
  {
    this.disableUI(this.wrapper);

    this.lettertByLetterPrint
    (
      {
        word: this.options.greetings, 
        node: this.simonSpeechOwn,
        gap: this.options.printGap,
        callBack: this.lettertByLetterPrint,
        args: 
        {
          word: this.options.playerSpeech, 
          node: this.playerSpeechOwn,
          gap: this.options.printGap,
          callBack: this.showStartWindow.bind(this),
        }
      }
    );
  }

  //Показ начального экрана с кнопкой Start
  showStartWindow()
  {
    this.anableUI(this.wrapper);

    this.keyboard.classList.add('block_action_disable');
    this.disableUI(this.keyboard);
    this.playerSpeechBaloon.classList.add('block_action_disable');
    this.disableUI(this.playerSpeechBaloon);

    this.startGameButton.classList.remove('block_action_hidden');
  }

  //Начало нового раунда
  playRound()
  {
    this.simonSpeechBaloon.querySelectorAll('.simon-speech__text').forEach((item) => item.textContent = '');

    this.changeRoundCount();
    this.lettertByLetterPrint
    (
      {
        word: this.options.gameSpeech, 
        node: this.simonSpeechOwn,
        gap: this.options.printGap,
        callBack: this.getNewSymbols.bind(this),
      }
    )
  }

  changeRoundCount()
  {
    const count = this.roundCount.textContent;
    this.currentRound = parseInt(count[0]);

    if(this.currentRound === 5)
    {
      this.roundCount.textContent = '0/5';
    }
    else
    {
      this.currentRound += 1;
      this.roundCount.textContent = this.currentRound + count.slice(1);
    }
  }

  getRandomNum(min, max)
  {
    return Math.round((Math.random() * max) + min);
  }

  getNewSymbols()
  {
    const length = this.keyboardButtons.length;
    const nodsArr = [];
    this.currentSymbols = [];

    // console.log('Current round = ', this.currentRound);
    // console.log('Difficulty scale = ', this.options.difficultyScale);
    // console.log('Button collection = ', this.keyboardButtons);

    for(let i = 0; i < this.currentRound * this.options.difficultyScale; i += 1)
    {
      const randomNum = this.getRandomNum(0, length - 1);

      // console.log('Random number = ', randomNum);
      // console.log('Keyboard button from number = ', this.keyboardButtons[randomNum]);

      nodsArr.push(this.keyboardButtons[randomNum]);

      // console.log('Nods array width buttons = ', nodsArr);
      // console.log('Buttons node text content = ', nodsArr.at(-1).textContent);

      this.currentSymbols.push(nodsArr.at(-1).textContent);
    }

    console.log('Current symbols = ', this.currentSymbols);
  }

  addEvents()
  {
    // this.simonSpeechBaloon.addEventListener('click', () => this.lettertByLetterPrint.call(this, this.options.greetings, this.simonSpeechOwn, this.options.printGap));
    // this.disableUI();

    // window.addEventListener('DOMContentLoaded', () => setTimeout(() => this.greetings(), 0));

    this.startGameButton.addEventListener('click', () =>
    {
      this.disableUI(this.difficultyBlock);
      this.difficultyBlock.classList.add('block_action_disable');
      this.startGameButton.classList.add('block_action_hidden');

      this.lettertByLetterPrint
      (
        {
          word: this.options.countdown, 
          node: this.simonSpeechWord,
          gap: this.options.countdownGap,
          callBack: this.playRound.bind(this),
          rewrite: true,
        }
      );
    })

    this.difficultyBlock.addEventListener('change', (event) =>
    {
      const newDifficulty = event.target.previousElementSibling.textContent;
      const difficultyValue = this.options.difficulty.find((item) => item.tag === newDifficulty);
      
      this.createKeyboard(difficultyValue.value, this.keyboard)
    });
  }
}

const body = document.querySelector('body');

const gameOptions =
{
  greetings: 'Come on, buddy, join us in a friendly game of Simon Says!',
  gameSpeech: 'Simon says: ...',
  playerSpeech: 'I will write my answer here',
  goodAnswer: '... Correct ...',
  badAnswer: '!!! WRONG !!!',
  countdown: '3210',
  printGap: 100,
  countdownGap: 1000,
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
  difficultyScale: 2,
}

new SimonSaysGame(body, gameOptions);

// console.dir(document.querySelector('body'));