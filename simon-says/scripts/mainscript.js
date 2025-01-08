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
    this.wrapper = this.createBlock({ tag: 'div', classes: ['simon-game-wrapper'], parent: this.body });

    this.simonSpeechBaloon = this.createBlock({ tag: 'div', classes: ['simon-speech', 'speech-baloon'], parent: this.wrapper });
    this.simonSpeechOwn = this.createBlock({ tag: 'div', classes: ['simon-speech__own'],  parent: this.simonSpeechBaloon });
    this.simonSpeechWord = this.createBlock({ tag: 'div', classes: ['simon-speech__word'],  parent: this.simonSpeechBaloon });
    this.simonSpeechAnswer = this.createBlock({ tag: 'div', classes: ['simon-speech__answer'],  parent: this.simonSpeechBaloon });

    this.settingsBlock = this.createBlock({ tag: 'div', classes: ['settings'],  parent: this.wrapper });

    this.difficultyBlock = this.createBlock({ tag: 'div', classes: ['difficulty'],  parent: this.settingsBlock });
    this.options.difficultyNames
    .forEach((diffName, index) =>
    {
      const diffElem = this.createBlock
      (
        { 
          tag: 'div', 
          classes: ['difficulty__elem', `difficulty-${diffName}`],  
          parent: this.difficultyBlock,
        }
      )

      const label = this.createBlock
      (
        { 
          tag: 'label', 
          classes: ['difficulty__label', `label-${diffName}`],  
          parent: diffElem,
          text: diffName,
        }
      )
      label.setAttribute('for', `radio-${diffName}`);

      const newBlock = this.createBlock
      (
        { 
          tag: 'input', 
          classes: ['difficulty__input', `input__${diffName}`],  
          parent: diffElem,
        }
      )

      newBlock.type = 'radio';
      newBlock.id = `radio-${diffName}`;
      newBlock.name = 'difficulty';

      if(index === 0) newBlock.checked = true;
    });

    this.roundViewBlock = this.createBlock({ tag: 'div', classes: ['round-view'],  parent: this.settingsBlock });
    this.roundText = this.createBlock({ tag: 'span', classes: ['round-view__text'],  parent: this.roundViewBlock, text: 'round' });
    this.roundCount = this.createBlock({ tag: 'span', classes: ['round-view__count'],  parent: this.roundViewBlock, text: '0/5' });
  }

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

  addEvents()
  {
    this.simonSpeechBaloon.addEventListener('click', () => this.lettertByLetterPrint.call(this, this.options.greetings, this.simonSpeechOwn, this.options.printGap));
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
  difficultyNames: ['easy', 'medium', 'hard'],
}

new SimonSaysGame(body, gameOptions);