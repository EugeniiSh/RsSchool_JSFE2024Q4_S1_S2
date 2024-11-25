export function hiddenBodyScroll()
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

export function getRandomGifts(data, amount)
{
  const randomNums = new Set();

  while(randomNums.size !== amount)
  {
    randomNums.add(Math.floor(Math.random() * data.length));
  }

  const result = [];
  randomNums.forEach((num) => result.push({ num: num, content: data[num], isRandom: true, }));
  return result;
}

export function createCard(data, index)
{
  let num;
  let category;
  let name;

  if(data.isRandom)
  {
    num = data.num;
    category = data.content.category;
    name = data.content.name;
  }
  else
  {
    num = index;
    category = data.category;
    name = data.name;
  }

  const splitCategory = category.toLowerCase().split(' ');

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.item = num;
  card.innerHTML = `
    <div class="card__image-block">
      <img class="card__image" src="../../../assets/images/gift-${splitCategory[0]}-${splitCategory[1]}.png" alt="gift-${splitCategory[0]}-${splitCategory[1]}">
    </div>

    <div class="card__text-block">
      <h4 class="h4 category ${splitCategory[1]}">${category}</h4>
      <h3 class="h3 name">${name}</h3>
    </div>
  `;

  return card;
}

export function addCards(parentNode, cards, cardCreatorFunc)
{
  parentNode.innerHTML = '';
  parentNode.append(...cards.map((card, index) => cardCreatorFunc(card, index)));
}

export function showModalWindow(data, index)
{
  const newCard = createCard(data[index], index);

  function addSnowflake(powerNum)
  {
    const power = +powerNum[1];
    const wrapper = document.createElement('div');

    for(let i = 1; i <= 5; i += 1)
    {
      const item = document.createElement('div');
      item.classList.add('power__item');
      if(i <= power) item.classList.add('power__item_active');

      wrapper.append(item);
    }

    return wrapper.innerHTML;
  }

  const newDescription = document.createElement('div');
  newDescription.classList.add('card_description');
  newDescription.innerHTML = 
  `
    <p class="prgf description">${data[index].description}</p>

    <div class="superpowers">
      <div class="h4">Adds superpowers to:</div>
      <div class="stats">
        <div class="stats__name">
          <p class="prgf">Live</p>
          <p class="prgf">Create</p>
          <p class="prgf">Love</p>
          <p class="prgf">Dream</p>
        </div>

        <div class="stats__power">
          <div class="power__name power__live">
            <p class="prgf">${data[index].superpowers.live}</p>
            <div class="power">${addSnowflake(data[index].superpowers.live)}</div>
          </div>
          <div class="power__name power__create">
            <p class="prgf">${data[index].superpowers.create}</p>
            <div class="power">${addSnowflake(data[index].superpowers.create)}</div>
          </div>
          <div class="power__name power__love">
            <p class="prgf">${data[index].superpowers.love}</p>
            <div class="power">${addSnowflake(data[index].superpowers.love)}</div>
          </div>
          <div class="power__name power__dream">
            <p class="prgf">${data[index].superpowers.dream}</p>
            <div class="power">${addSnowflake(data[index].superpowers.dream)}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="button-close"></div>
  `

  newCard.querySelector('.card__text-block').append(newDescription);

  const modalWindow = document.querySelector('.modal-window');

  modalWindow.innerHTML = '';
  modalWindow.append(newCard);
  modalWindow.classList.add('modal-window_active');

  modalWindow.addEventListener('click', function close(event)
  {
    const target = event.target;

    if(target.closest('.button-close')
    || !target.closest('.card'))
    {
      modalWindow.classList.remove('modal-window_active');
      setTimeout(hiddenBodyScroll, 200);

      modalWindow.removeEventListener('click', close);
    }
  });
}

export class BurgerMenu
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

export class Slider
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

export class ReversTimer
{
  constructor(days, hours, minutes, seconds, trackDate)
  {
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.trackDate = trackDate;
    this.setDate();
  }

  setDate()
  {
    const timeLeft = this.trackDate - Date.now();
    const seconds = timeLeft / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;

    this.days.textContent = Math.floor(days);
    this.hours.textContent = Math.floor(hours % 24);
    this.minutes.textContent = Math.floor(minutes % 60);
    this.seconds.textContent = Math.floor(seconds % 60);

    if(timeLeft >= 0)
    {
      setTimeout(() => this.setDate.call(this), 1000);
    }
  }
}