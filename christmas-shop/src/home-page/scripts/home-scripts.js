import gifts from '../../../assets/data/gifts.json' with {type: 'json'};

function hiddenBodyScroll()
{
  const bodyWidth = document.body.clientWidth;
  const isAdd = document.body.classList.toggle('scroll-hidden');

  if(isAdd)
  {
    const currentBodyWidth = document.body.clientWidth;
    document.body.style.paddingRight = currentBodyWidth > bodyWidth ?
      currentBodyWidth - bodyWidth + 'px' : 0;
  }
  else
  {
    document.body.style.paddingRight = '';
  }
}

function getRandomGifts(data, amount)
{
  const randomNums = new Set();

  while(randomNums.size !== amount)
  {
    randomNums.add(Math.floor(Math.random() * data.length));
  }

  const result = [];
  randomNums.forEach((num) => result.push({ num: num, content: data[num] }));
  return result;
}

function createCard(data)
{
  const category = data.content.category.toLowerCase().split(' ');

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.item = data.num;
  card.innerHTML = `
    <div class="card__image-block">
      <img class="card__image" src="../../../assets/images/gift-${category[0]}-${category[1]}.png" alt="gift-${category[0]}-${category[1]}">
    </div>

    <div class="card__text-block">
      <h4 class="h4 category ${category[1]}">${data.content.category}</h4>
      <h3 class="h3 name">${data.content.name}</h3>
    </div>
  `;

  return card;
}

function addCards(parentNode, cards, cardCreatorFunc)
{
  parentNode.innerHTML = '';
  parentNode.append(...cards.map((card) => cardCreatorFunc(card)));
}

const bestGifts = document.querySelector('.best-gifts__content');
const randomGifts = getRandomGifts(gifts, 4);
addCards(bestGifts, randomGifts, createCard);

class BurgerMenu
{
  constructor(menu, burger, hiddenScrollFunc)
  {
    this.menu = document.querySelector(`.${menu}`);
    this.burger = document.querySelector(`.${burger}`);
    this.setup(menu, burger, hiddenScrollFunc);
  }

  setup(menuA, burgerA, hiddenScrollFuncA)
  {
    this.burger.addEventListener('click', (event) =>
    {
      if(event.target.closest(`.${burgerA}`))
      {
        this.menu.classList.toggle(`${menuA}_active`);
        this.menu.querySelector('ul').classList.toggle('action-large');
        this.burger.classList.toggle(`${burgerA}_active`);

        hiddenScrollFuncA();
      }
    });

    this.menu.addEventListener('click', (event) =>
    {
      if(event.target.closest('.menu__item'))
      {
        this.menu.classList.toggle(`${menuA}_active`);
        this.menu.querySelector('ul').classList.toggle('action-large');
        this.burger.classList.toggle(`${burgerA}_active`);

        hiddenScrollFuncA();
      }
    })
  }
}

const burgerMenu = new BurgerMenu('navigation', 'burger', hiddenBodyScroll);

class Slider
{
  constructor(sBlock, sLine, btnLeft, btnRight)
  {
    this.sBlock = sBlock;
    this.sLine = sLine;
    this.btnLeft = btnLeft;
    this.btnRight = btnRight;
    this.clickCount = 0;
    this.setup();
  }

  getMaxClick()
  {
    const bodyWidth = document.body.clientWidth;

    if(bodyWidth > 767) return 3;

    return 6;
  }

  right()
  {
    if(this.btnRight.classList.contains('button__disable')) return;

    this.btnLeft.classList.remove('button__disable');

    const maxClick = this.getMaxClick();
    const shift = (this.sLine.scrollWidth - this.sBlock.clientWidth) / maxClick;
    const currentShift = parseInt(this.sLine.style.left) || 0;

    this.sLine.style.left = (currentShift - shift) + 'px';
    this.clickCount += 1;

    if(this.clickCount >= maxClick)
    {
      this.clickCount = maxClick;
      this.btnRight.classList.add('button__disable');
      this.sLine.style.left = -parseInt(this.sLine.scrollWidth - this.sBlock.clientWidth) + 'px';
    } 
  }

  left()
  {
    if(this.btnLeft.classList.contains('button__disable')) return;

    this.btnRight.classList.remove('button__disable');

    const maxClick = this.getMaxClick();
    const shift = (this.sLine.scrollWidth - this.sBlock.clientWidth) / maxClick;
    const currentShift = parseInt(this.sLine.style.left) || 0;

    this.sLine.style.left = (currentShift + shift) + 'px';
    this.clickCount -= 1;

    if(this.clickCount <= 0)
    {
      this.clickCount = 0;
      this.btnLeft.classList.add('button__disable');
      this.sLine.style.left = 0;
    } 
  }

  setup()
  {
    this.sLine.style.left = 0;
    this.btnLeft.addEventListener('click', () => this.left.call(this));
    this.btnRight.addEventListener('click', () => this.right.call(this));
  }
}

const sliderBlock = document.querySelector('.slider__block');
const sliderLine = document.querySelector('.slider__line');
const buttonLeft = document.querySelector('.button-left');
const buttonRight = document.querySelector('.button-right');

const slider = new Slider(sliderBlock, sliderLine, buttonLeft, buttonRight);
// export { hiddenBodyScroll, BurgerMenu };
// export { hiddenBodyScroll, burgerMenu };
export { burgerMenu };