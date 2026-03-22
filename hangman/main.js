// ========== + Create HTML + ==========
const body = document.querySelector('body');

// --- Modal window ---
const createModalWindow = document.createElement('div');
createModalWindow.classList.add('modal-window');
createModalWindow.innerHTML = `
  <div class="window__end-game">
    <h4 class="end-game__header"></h4>
    <p class="end-game__text"><span class="correct-word"></span></p>
    <button class="end-game__play-again-btn">Play Again</button>
  </div>`;
body.appendChild(createModalWindow);

// --- Main ---
const createMain = document.createElement('main');
createMain.classList.add('main-container');
// - sections -
let createSection = document.createElement('section');
createSection.classList.add('hangman-box');
createSection.innerHTML = `
  <img class="hangman-box__img" src="assets/images/hangman-0.svg" alt="hungman">
  <h1 class="hangman-box__header">Hangman game</h1>`;
createMain.appendChild(createSection);

createSection = document.createElement('section');
createSection.classList.add('game-box');
createSection.innerHTML = `
  <ul class="words-display"></ul>
  <h4 class="hint-text">
    Hint: <span class="hint-text__details"></span>
  </h4>
  <h4 class="guesses-text">
    Incorrect guesses: <span class="guesses-text__details"></span>
  </h4>
  <div class="keyboard"></div>`;
createMain.appendChild(createSection);
body.appendChild(createMain);
// ========== - Create HTML - ==========

const keyboard = document.querySelector('.keyboard');
const wordsDisplay = document.querySelector('.words-display');
const guessesTextDetails = document.querySelector('.guesses-text__details');
const hangmanBoxImg = document.querySelector('.hangman-box__img');
const modalWindow = document.querySelector('.modal-window');
const endGamePlayAgainBtn = document.querySelector('.end-game__play-again-btn');

let currentWord;
let wrongCount;
let correctLetters;
const maxTries = 6;


function getRandomWord()
{
  const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log('correct word: ', word);
  document.querySelector('.hint-text__details').textContent = hint;
  restartGame();
}

// initGame
function getGame(clickButton, letterButton)
{
  if(currentWord.includes(letterButton))
  {
    [...currentWord].forEach((item, index) =>
    {
      if(item === letterButton)
      {
        correctLetters.push(item);
        wordsDisplay.querySelectorAll('li')[index].textContent = item;
        wordsDisplay.querySelectorAll('li')[index].classList.add('correct-guess');
      }
    });
  }
  else
  {
    wrongCount++;
    hangmanBoxImg.src = `assets/images/hangman-${wrongCount}.svg`
  }

  clickButton.disabled = true;
  guessesTextDetails.textContent = `${wrongCount} / ${maxTries}`;

  if(wrongCount === maxTries) return getEndGame(false);
  if(correctLetters.length === currentWord.length) return getEndGame(true);
}

function getEndGame(result)
{
  setTimeout(() => 
  {
    const modalText = result ? 'You guessed the word!' : 'The correct word was:'
    modalWindow.classList.add('active');
    modalWindow.querySelector('.end-game__header').textContent = `${result ? 'Congratulations!' : 'Badly!'}`;
    modalWindow.querySelector('.end-game__text').innerHTML = `${modalText} <span class="correct-word">${currentWord}</span>`;
  }, 300)
}

function restartGame()
{
  correctLetters = [];
  wrongCount = 0;

  wordsDisplay.innerHTML = currentWord.split('').map(() => `<li class="letter"></li>`).join('');
  guessesTextDetails.textContent = `${wrongCount} / ${maxTries}`;
  hangmanBoxImg.src = `assets/images/hangman-${wrongCount}.svg`;
  keyboard.querySelectorAll('.keyboard__btn').forEach((item) => item.disabled = false);
  modalWindow.classList.remove('active');
}

// Create keyboard buttons and their functional
for (let i = 97; i <= 122; i++) {
  const button = document.createElement('button');
  button.classList.add('keyboard__btn');
  button.textContent = String.fromCharCode(i);
  keyboard.appendChild(button);

  button.addEventListener('click', (event) =>
  {
    getGame(event.target, String.fromCharCode(i));
  });
}

window.addEventListener('keydown', (event) =>
{
  const keyboardBtn = document.querySelectorAll('.keyboard__btn'); 
  keyboardBtn.forEach((item) => 
  {
    if(item.textContent === event.key
    && item.disabled !== true)
    {
      getGame(item, event.key);
    }
  })
});

getRandomWord();
endGamePlayAgainBtn.addEventListener('click', getRandomWord)