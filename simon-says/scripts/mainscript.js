class SimonSaysGame
{
  constructor(body, options)
  {
    this.body = body;
    this.options = options,
    this.logs = {},
    this.keyFlags = [];
    this.repeatFlag = true;
    this.gameEndFlag = false;
    
    this.setup();
    this.addEvents();
  }

  setup()
  {
    //Объект для отключнных\включённых интерфейсов
    this.logs.disableUI = new Map();

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
    this.logs.disableUI.set(this.difficultyBlock, 'Anabled');
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
    this.logs.disableUI.set(this.keyboard, 'Anabled');
    this.createKeyboard(this.options.difficulty[0].value, this.keyboard);

    //Блок игрока (кнопки: повторить последовательность, следующий раунд, новая игра; поле для ввода ответа)
    this.playerSpeechBaloon = this.createBlock({ tag: 'div', classes: ['player-speech'],  parent: this.wrapper });
    this.playerSpeechButtons = this.createBlock({ tag: 'div', classes: ['player-buttons'],  parent: this.playerSpeechBaloon });

    this.playerSpeechHelp = this.createBlock({ tag: 'div', classes: ['player-buttons__help', 'button-player', 'block_action_hidden'],  parent: this.playerSpeechButtons, text: 'Repeat the sequence' });
    this.playerSpeechHelp.dataset.info = 'help';
    this.logs.disableUI.set(this.playerSpeechHelp, 'Anabled');

    this.playerSpeechNext = this.createBlock({ tag: 'div', classes: ['player-buttons__next', 'button-player', 'block_action_hidden'],  parent: this.playerSpeechButtons, text: 'Next' });
    this.playerSpeechNext.dataset.info = 'next';

    this.playerSpeechNewGame = this.createBlock({ tag: 'div', classes: ['player-buttons__new-game', 'button-player', 'block_action_hidden'],  parent: this.playerSpeechButtons, text: 'New game' });
    this.playerSpeechNewGame.dataset.info = 'new-game';
    this.logs.disableUI.set(this.playerSpeechNewGame, 'Anabled');

    this.playerSpeechBlock = this.createBlock({ tag: 'div', classes: ['player-speech__block'], parent: this.playerSpeechBaloon });
    this.logs.disableUI.set(this.playerSpeechBlock, 'Anabled');
    this.playerSpeechOwn = this.createBlock({ tag: 'input', classes: ['player-speech__own'],  parent: this.playerSpeechBlock });
    this.logs.disableUI.set(this.playerSpeechOwn, 'Anabled');
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
        const button = this.createBlock({ tag: 'div', classes: ['keyboard__button'],  parent: parentNode, text: letter });
        button.dataset[letter] = letter.toUpperCase();
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
  disableUI(...nodes)
  {
    nodes.forEach((node) =>
    {
      const nodeStatus = this.logs.disableUI.get(node);
      if(nodeStatus === 'Disable') return;

      const nodeTag = node.tagName;
      if(nodeTag !== 'INPUT')
      {
        node.append(this.shadeBlock.cloneNode());
        node.classList.add('block_action_disable');
      }
      
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
    })
  }

  //Возврат взаимодействия пользователя с определённым блоком.
  anableUI(...nodes)
  {
    nodes.forEach((node) =>
    {
      const nodeStatus = this.logs.disableUI.get(node);
      if(nodeStatus === 'Anable') return;

      const nodeTag = node.tagName;
      if(nodeTag !== 'INPUT')
      {
        node.querySelector('.shade').remove();
        node.classList.remove('block_action_disable');
      }

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
    }) 
  }

  //Приветственное вступление
  greetings()
  {
    this.simonSpeechBaloon.querySelectorAll('.simon-speech__text').forEach((item) => item.textContent = '');
    this.startGameButton.classList.add('block_action_hidden');

    if(this.gameEndFlag)
    {
      this.anableUI(this.playerSpeechNewGame, this.playerSpeechHelp);
      this.playerSpeechNext.classList.add('block_action_hidden');
      this.playerSpeechHelp.classList.add('block_action_hidden');
      this.playerSpeechNewGame.classList.add('block_action_hidden');

      this.roundCount.textContent = '0/5';

      this.gameEndFlag = false;
    }
    else
    {
      this.disableUI
      (
        this.difficultyBlock, 
        this.keyboard, 
        this.playerSpeechBlock,
        this.playerSpeechOwn
      );
    }

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
    this.anableUI(this.difficultyBlock);
    this.startGameButton.classList.remove('block_action_hidden');
  }

  //Начало нового раунда
  playRound(newRound = true)
  {
    this.simonSpeechBaloon.querySelectorAll('.simon-speech__text').forEach((item) => 
    {
      item.textContent = '';
      item.classList.remove('simon-speech__answer_bad', 'simon-speech__answer_good');
    });

    this.keyFlags = [];

    const anableNodes =
    [
      this.keyboard,
      this.playerSpeechNewGame,
      this.playerSpeechBlock,
      this.playerSpeechOwn,
    ];

    if(newRound) 
    {
      this.changeRoundCount();

      if(this.logs.disableUI.get(this.playerSpeechHelp) === 'Disable')
      {
        anableNodes.push(this.playerSpeechHelp);
      }
    }

    this.lettertByLetterPrint
    (
      {
        word: this.options.gameSpeech, 
        node: this.simonSpeechOwn,
        gap: this.options.printGap,
        callBack: this.simonPrint.bind(this),
        args:
        {
          nodsArr: newRound ? this.getNewSymbols() : this.currentSymbols.nods, 
          gap: this.options.simonPrintGap,
          anableNodes: anableNodes,
        }
      }
    )
  }

  //Изменение счётчика раудов
  changeRoundCount(newGame = false)
  {
    const count = this.roundCount.textContent;
    this.currentRound = parseInt(count[0]);

    if(this.currentRound === 5 || newGame)
    {
      this.roundCount.textContent = '0/5';
    }
    else
    {
      this.currentRound += 1;
      this.roundCount.textContent = this.currentRound + count.slice(1);
    }
  }

  //Получение случайного числа
  getRandomNum(min, max)
  {
    return Math.round((Math.random() * max) + min);
  }

  //Почучение массива случайных символов для игры
  getNewSymbols()
  {
    const length = this.keyboardButtons.length;
    const nodsArr = [];
    const symbolsArr = [];
    this.currentSymbols = {};

    for(let i = 0; i < this.currentRound * this.options.difficultyScale; i += 1)
    {
      const randomNum = this.getRandomNum(0, length - 1);
      nodsArr.push(this.keyboardButtons[randomNum]);
      symbolsArr.push(nodsArr.at(-1).textContent);
    }

    console.log('Current symbols = ', symbolsArr);

    this.currentSymbols.nods = nodsArr;
    this.currentSymbols.symbols = symbolsArr;

    return nodsArr;
  }

  //Печатает на экранной клавиатуре от имени Саймона
  simonPrint(options)
  {
    const { nodsArr, gap, anableNodes } = options;

    const printEvent = new CustomEvent
    (
      'print-event',
      {
        detail: 'simon',
        bubbles: true,
      }
    );

    nodsArr.forEach((node, index, arr) =>
    {
      setTimeout(() =>
      {
        node.dispatchEvent(printEvent);

        if(index === arr.length - 1)
        {
          setTimeout(() =>
          {
            this.simonSpeechWord.textContent = '';
            this.playerSpeechOwn.value = '';

            this.anableUI(...anableNodes);

            if(!this.gameEndFlag)
            {
              this.playerSpeechOwn.focus();
            }
          }, gap);
        }
      }, gap * index);
    });
  }

  //Показывает или прячет кнопку Next
  showNext(show = true)
  {
    if(show)
    {
      this.playerSpeechHelp.classList.add('block_action_hidden');
      this.playerSpeechNext.classList.remove('block_action_hidden');
      this.anableUI(this.playerSpeechNewGame);
    }
    else
    {
      this.playerSpeechHelp.classList.remove('block_action_hidden');
      this.playerSpeechNext.classList.add('block_action_hidden');
      this.disableUI(this.playerSpeechNewGame);
    }
  }

  //Завершение игры
  endGame(result)
  {
    const disableNodes = [ this.playerSpeechNewGame ];
    if(this.repeatFlag) disableNodes.push(this.playerSpeechHelp);
    this.disableUI(...disableNodes);
    
    this.lettertByLetterPrint
    (
      {
        word: result, 
        node: this.simonSpeechWord,
        gap: this.options.printGap,
        callBack: this.anableUI.bind(this),
        args: this.playerSpeechNewGame,
      }
    );

    this.gameEndFlag = true;
    // this.repeatFlag = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  //Добавляет необходимые обработчики событий
  addEvents()
  {
    //Запуск приветствия после полной загрузки страницы
    window.addEventListener('DOMContentLoaded', () => setTimeout(() => this.greetings(), 0));

    //Запуск первого раунда после нажатия кнопку "Старт"
    this.startGameButton.addEventListener('click', () =>
    {
      this.startGameButton.classList.add('block_action_hidden');
      this.playerSpeechHelp.classList.remove('block_action_hidden');
      this.playerSpeechNewGame.classList.remove('block_action_hidden');

      this.disableUI
      (
        this.difficultyBlock,
        this.playerSpeechHelp,
        this.playerSpeechNewGame
      );

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

    //Изменение сложности и вида экранной клавиатуры
    this.difficultyBlock.addEventListener('change', (event) =>
    {
      const newDifficulty = event.target.previousElementSibling.textContent;
      const difficultyValue = this.options.difficulty.find((item) => item.tag === newDifficulty);
      
      this.createKeyboard(difficultyValue.value, this.keyboard);

      const logs = this.logs.disableUI;
      if(logs && logs.has(this.keyboard))
      {
        const value = logs.get(this.keyboard);
        if(value === 'Disable') this.keyboard.append(this.shadeBlock.cloneNode());
      }
    });

    //Обработка Custom события 'print-event' - определяет кто печатает символы
    this.keyboard.addEventListener('print-event', (event) =>
    {
      const eventTarget = event.target.closest('.keyboard__button');
      if(!eventTarget) return;

      const caller = event.detail;
      const printNode = caller === 'simon' ? this.simonSpeechWord : this.playerSpeechOwn;
      const printField = printNode.tagName === 'INPUT' ? 'value' : 'textContent';

      printNode[printField] += eventTarget.textContent;
      eventTarget.classList.add(`keyboard__button_active_${caller}`);

      if(printNode.tagName === 'INPUT') printNode.dispatchEvent(new Event('input'));

      setTimeout(() =>
      {
        eventTarget.classList.remove(`keyboard__button_active_${caller}`);
      }, caller === 'simon' ? this.options.simonPrintGap * 0.9 : this.options.printGap * 0.9);
    });

    //Обработка стандартного 'click' на экранной клавиатуре и передача управления в 'print-event'
    this.keyboard.addEventListener('click', (event) =>
    {
      const eventTarget = event.target.closest('.keyboard__button');
      if(!eventTarget) return;

      const printEvent = new CustomEvent
      (
        'print-event',
        {
          detail: 'player',
          bubbles: true,
        }
      );

      eventTarget.dispatchEvent(printEvent);
    });

    //Проверка правильности ввода символов пользователем
    this.playerSpeechOwn.addEventListener('input', (event) =>
    {
      const currentValue = event.target.value.toUpperCase();
      const currentSymbols = this.currentSymbols.symbols;

      if(currentValue.at(-1) !== currentSymbols[currentValue.length - 1])
      {
        console.log('WRONG');

        this.disableUI(this.keyboard, this.playerSpeechOwn, this.playerSpeechBlock);
        this.playerSpeechOwn.blur();

        if(this.repeatFlag)
        {
          this.simonSpeechAnswer.textContent = this.options.badAnswer;
          this.simonSpeechAnswer.classList.add('simon-speech__answer_bad', 'simon-speech__answer_trembling');

          setTimeout(() => this.simonSpeechAnswer.classList.remove('simon-speech__answer_trembling'), 600);
        }
        else
        {
          this.endGame('Ha-Ha! You lose!');
        }
        
        return;
      }

      if(currentValue === currentSymbols.join(''))
      {
        console.log('CORRECT');

        this.currentRound

        this.playerSpeechOwn.blur();
        this.simonSpeechAnswer.classList.add('simon-speech__answer_good');

        this.disableUI
        (
          this.keyboard,
          this.playerSpeechBlock,
          this.playerSpeechOwn,
          this.playerSpeechHelp,
          this.playerSpeechNewGame
        );

        if(this.currentRound === 5)
        {
          this.endGame('You Win !@#$%^');
        }
        else
        {
          this.lettertByLetterPrint
          (
            {
              word: this.options.goodAnswer,
              node: this.simonSpeechAnswer,
              gap: this.options.printGap,
              callBack: this.showNext.bind(this), 
              args: true, 
            }
          )
        }

        return;
      }
    });

    //Обработка нажатия кнопок на физической клавиатуре и передача управления в print-event
    this.playerSpeechOwn.addEventListener('keydown', (event) =>
    {
      event.preventDefault();

      if(event.repeat || this.keyFlags.length > 0) return;

      const codeName = ['Digit', 'Key'].find((code) => (event.code).includes(code));
      if(!codeName) return;

      const currentKeydown = (event.code).slice(codeName.length);
      let matchButton = this.keyboard.querySelector(`[data-${currentKeydown}]`);
      matchButton = matchButton ? matchButton : this.keyboard.querySelector(`[data--${currentKeydown}]`);

      if(!matchButton) return;

      this.keyFlags.push(event.code);
 
      const printEvent = new CustomEvent
      (
        'print-event',
        {
          detail: 'player',
          bubbles: true,
        }
      );

      matchButton.dispatchEvent(printEvent);
    });

    //Удаляет отжатую кнопку из списка нажатых кнопок. Не даёт нажать более одной кнопки.
    this.playerSpeechOwn.addEventListener('keyup', (event) =>
    {
      const keyUpIndex = this.keyFlags.indexOf(event.code);
      
      if(keyUpIndex !== -1)
      {
        this.keyFlags.splice(keyUpIndex, 1);
      }
    });

    //Обработка нажатий кнопок 'Next', 'New Game', 'Repeat the sequence'
    this.playerSpeechButtons.addEventListener('click', (event) =>
    {
      const currentButton = event.target.dataset.info;
      const logs = this.logs.disableUI;

      if(currentButton === 'help')
      {
        const disableNodes = 
        [
          event.target, 
          this.playerSpeechNewGame,
        ];

        if(logs && logs.has(this.keyboard) && logs.get(this.keyboard) !== 'Disable')
        {
          disableNodes.push(this.keyboard);
        }
        if(logs && logs.has(this.playerSpeechBlock) && logs.get(this.playerSpeechBlock) !== 'Disable')
        {
          disableNodes.push(this.playerSpeechBlock, this.playerSpeechOwn);
        }

        this.disableUI(...disableNodes);
        
        this.repeatFlag = false;
        this.playRound(this.repeatFlag);

        return;
      }

      if(currentButton === 'new-game')
      {
        this.gameEndFlag = true;
        this.repeatFlag = true;

        this.disableUI
        ( 
          this.keyboard, 
          this.playerSpeechBlock,
          this.playerSpeechOwn,
          this.playerSpeechHelp,
          this.playerSpeechNewGame,
        );
        
        this.greetings();
        return;
      }

      if(currentButton === 'next')
      {
        this.repeatFlag = true;
        this.showNext(false);
        this.playRound();
      }
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
  countdownGap: 1000,
  printGap: 100,
  simonPrintGap: 600,
  difficulty: 
  [
    {
      tag: 'easy',
      value: [[48, 10]],
    }, 
    {
      tag: 'medium',
      value: [[65, 26]],
      // value: [[97, 26]],
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