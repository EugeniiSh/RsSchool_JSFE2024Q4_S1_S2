import gifts from '../../../assets/data/gifts.json' with {type: 'json'};
import * as mod from '../../scripts/module.js';

const giftsContent = document.querySelector('.gifts-content');
mod.addCards(giftsContent, gifts, mod.createCard);

giftsContent.addEventListener('click', (event) =>
{
  const target = event.target.closest('.card');

  if(!target) return;

  mod.showModalWindow(gifts, target.dataset.item);
  mod.hiddenBodyScroll();
});

const burgerMenu = new mod.BurgerMenu('navigation', 'burger', mod.hiddenBodyScroll);

const allCards = document.querySelectorAll('.card');
const tabs = document.querySelector('.tabs');
let currentTabDisabled = tabs.querySelector('.tabs-item__disabled');

tabs.addEventListener('click', (event) =>
{
  const clickTab = event.target.closest('.tabs-item');

  if(!clickTab || clickTab === currentTabDisabled) return;

  const clickTabData = clickTab.dataset.tab;

  currentTabDisabled.classList.remove('tabs-item__disabled');
  currentTabDisabled = clickTab;
  currentTabDisabled.classList.add('tabs-item__disabled');

  allCards.forEach((card) => 
  {
    card.hidden = true;

    if(clickTabData === 'all')
    {
      card.hidden = false;
      return;
    } 

    const cardCategory = card.querySelector('.category').textContent.toLowerCase();

    if(cardCategory === clickTabData) card.hidden = false;
  })
});

const buttonUp = document.querySelector('.button-up');

window.addEventListener('scroll', () =>
{
  const windowScrollY = window.scrollY;
  const docClientHeight = document.documentElement.clientHeight;

  if(windowScrollY > docClientHeight / 2)
  {
    buttonUp.classList.add('button-up_active');
    return;
  }

  buttonUp.classList.remove('button-up_active');
});

buttonUp.addEventListener('click', (event) =>
{
  const target = event.target.closest('.button-up');

  if(!target) return;

  window.scrollTo(
    {
      top: 0,
      left: 0,
      behavior: "smooth"
    }
  );
});






