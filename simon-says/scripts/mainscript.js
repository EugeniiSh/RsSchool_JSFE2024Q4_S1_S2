class SimonSaysGame
{
  constructor(body)
  {
    this.body = body;
    this.speech =
    {
      greetings: 'Come on, buddy, join us in a friendly game of Simon Says!',
      gameSpeech: 'Simon says: ...',
      goodAnswer: '... Correct ...',
      badAnswer: '!!! WRONG !!!',
    }
    this.setup();
    this.addEvents();
  }

  setup()
  {
    const div = document.createElement('div');
    const span = document.createElement('span');

    const wrapper = div.cloneNode();
    wrapper.classList.add('simon-game-wrapper');

    this.simonSpeechBaloon = div.cloneNode();
    this.simonSpeechOwn = div.cloneNode();
    this.simonSpeechWord = div.cloneNode();
    this.simonSpeechAnswer = div.cloneNode();
    this.simonSpeechBaloon.classList.add('simon-speech', 'speech-baloon');
    this.simonSpeechOwn.classList.add('simon-speech__own');
    this.simonSpeechWord.classList.add('simon-speech__word');
    this.simonSpeechAnswer.classList.add('simon-speech__answer');
    this.simonSpeechBaloon.append(this.simonSpeechOwn, this.simonSpeechWord, this.simonSpeechAnswer);


    wrapper.append(this.simonSpeechBaloon);
    this.body.append(wrapper);
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
    this.simonSpeechBaloon.addEventListener('click', () => this.lettertByLetterPrint.call(this, this.speech.gameSpeech, this.simonSpeechOwn, 100));
  }
}

const body = document.querySelector('body');
new SimonSaysGame(body);