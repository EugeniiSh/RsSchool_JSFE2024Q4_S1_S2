import gifts from '../../../assets/data/gifts.json' with {type: 'json'};
import * as mod from '../../scripts/module.js';


const bestGifts = document.querySelector('.best-gifts__content');
const randomGifts = mod.getRandomGifts(gifts, 4);
mod.addCards(bestGifts, randomGifts, mod.createCard);

bestGifts.addEventListener('click', (event) =>
{
  const target = event.target.closest('.card');

  if(!target) return;

  mod.showModalWindow(gifts, target.dataset.item);
  mod.hiddenBodyScroll();
});

const burgerMenu = new mod.BurgerMenu('navigation', 'burger', mod.hiddenBodyScroll);

const sliderBlock = document.querySelector('.slider__block');
const sliderLine = document.querySelector('.slider__line');
const buttonLeft = document.querySelector('.button-left');
const buttonRight = document.querySelector('.button-right');

const slider = new mod.Slider(sliderBlock, sliderLine, buttonLeft, buttonRight);

const timerDays = document.querySelector('.timer__days');
const timerHours = document.querySelector('.timer__hours');
const timerMinutes = document.querySelector('.timer__minutes');
const timerSeconds = document.querySelector('.timer__seconds');
const trackDate = Date.UTC(2025, 0, 1);

const reversTimer = new mod.ReversTimer(timerDays, timerHours, timerMinutes, timerSeconds, trackDate);


