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

new BurgerMenu('navigation', 'burger', hiddenBodyScroll);


export { hiddenBodyScroll, BurgerMenu };