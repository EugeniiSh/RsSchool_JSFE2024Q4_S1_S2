//Устанавливает ширину background-image в зависимости от ширины игрового поля (game-field)
export function setBackGroundSize(gameFieldWidth, elemWidthBackground)
{
  const percentPlayFieldArea = 26.9; /*Постоянный процент ширины от background-image 
                                       в котором должно разместиться игоровое поле.*/
  const newBackGroundSize = (gameFieldWidth / percentPlayFieldArea) * 100;
  elemWidthBackground.style.setProperty('--backGroundSize', newBackGroundSize + 'px');

  return newBackGroundSize;
}

//Устанавливает необходимые отступы background-image в зависимости от текущей ширины и высоты игрового поля (game-field)
export function setBackGroundPosition(currentSizeBgImg, elemWidthBackground)
{
  //Вычисление отступа сверху:
  const headerHeight = elemWidthBackground.querySelector('header').offsetHeight;
  const tableWrapperHeight = elemWidthBackground.querySelector('.table-wrapper').offsetHeight;
  const bodyPaddingTop = parseInt(window.getComputedStyle(elemWidthBackground).paddingTop);

  //Коэффициент вычисляющий необходимую позицию для нижней границы игрового поля на background-image
  //или как высоко вверх надо поднять background-image
  const coefficientPositionTop = 0.7724; 
  //Высота от верхней границы экрана до нижней границы игрового поля
  const heightTopFromBottom = headerHeight + tableWrapperHeight + bodyPaddingTop;
  //Высота отступа для background-image
  const newMarginTopBgImg = (currentSizeBgImg * coefficientPositionTop) - heightTopFromBottom;

  //Вычисление отступа слева:
  const gameField = elemWidthBackground.querySelector('.game-field');
  const gameFieldWidth = gameField.offsetWidth;
  const gameFieldMarginLeft =  gameField.offsetLeft;

  //Коэффициент вычисляющий необходимую позицию для правой границы игрового поля на background-image
  //или как далеко влево надо сместить background-image
  const coefficientPositionLeft = 0.653;
  //Ширина от левой границы экрана до правой границы игрового поля
  const widthLeftFromRight = gameFieldWidth + gameFieldMarginLeft;
  //Ширина отступа для background-image
  const newMarginLeftBgImg = (currentSizeBgImg * coefficientPositionLeft) - widthLeftFromRight;

  elemWidthBackground.style.setProperty('--backGroundPositionTop', -newMarginTopBgImg + 'px');
  elemWidthBackground.style.setProperty('--backGroundPositionLeft', -newMarginLeftBgImg + 'px');
}

//Адаптирует background-image под размеры игрового поля (game-field)
export function adaptationBgImg(gameFieldWidth, elemWidthBackground)
{
  const currentSizeBgImg = setBackGroundSize(gameFieldWidth, elemWidthBackground);
  setBackGroundPosition(currentSizeBgImg, elemWidthBackground);

  document.querySelector('.header__head').style.setProperty('background-size', `${gameFieldWidth}px 100%`);
  document.querySelector('.header__timer').style.setProperty('background-size', `${gameFieldWidth}px 100%`);
}

//Возвращает имя класса shaded-Cell, с рандомным числом в конце, от 1 до 4
export function getRandomShadedCell(string)
{
  const randomNum = Math.floor(Math.random() * 4 + 1); //4 - количество вариантов закрашеных клеток
  return `${string}-${randomNum}`;
}

//Возвращает имя класса shaded-Cell в элементе, с текущим числом в конце. 
//Если такого класса нет, возвращает  shaded-Cell с рандомным числом.
export function getCurrentShadedCell(elem, string)
{
  for(let className of elem.classList)
  {
    if(className.includes(string))
    {
      return className;
    }
  }

  return getRandomShadedCell(string);
} 

// Создаёт, вставляет и показывает модальное окно.
export function showModalWindow(header, content)
{
  const modalWindow = document.querySelector('.modal-window');
  const currentWrapper = modalWindow.querySelector('.wrapper');
  const audioContainer = modalWindow.querySelector('.audio-container');

  if(!content.classList.contains('audio-container') && audioContainer)
  {
    const main = document.querySelector('main');
    main.prepend(audioContainer);
    audioContainer.classList.remove('active__audio-container');
  }

  const div = document.createElement('div');

  const wrapper = div.cloneNode();
  wrapper.classList.add('wrapper');

  const contentBlock = div.cloneNode();
  contentBlock.classList.add('content-block');

  const modalHeader = document.createElement('h3');
  modalHeader.classList.add('modal-header');
  modalHeader.textContent = header;

  const textContent = div.cloneNode();
  textContent.classList.add('text-content');
  textContent.append(content);

  const closeCross = div.cloneNode();
  closeCross.classList.add('close-cross');

  const closeBtn = div.cloneNode();
  closeBtn.classList.add('close-btn');
  closeBtn.textContent = 'Close';
  
  const closeWM = new CustomEvent('close-modal-window', { bubbles: true, });

  modalWindow.addEventListener('click', (event) =>
  {
    if(event.target.classList.contains('close-cross')
    || event.target.classList.contains('close-btn')
    || !event.target.closest('.content-block'))
    {
      modalWindow.classList.remove('active__modal-window'); 
      modalWindow.dispatchEvent(closeWM);
      setTimeout(() => { content.classList.remove('active__audio-container') }, 600);

      const audioContainer = modalWindow.querySelector('.audio-container');
      if(audioContainer) setTimeout(() => { audioContainer.classList.remove('active__audio-container') }, 600)
    }
  })

  contentBlock.append(modalHeader, textContent, closeCross, closeBtn);
  wrapper.append(contentBlock);
  currentWrapper ? currentWrapper.replaceWith(wrapper) : modalWindow.append(wrapper);

  modalWindow.classList.add('active__modal-window');

  if(content.classList.contains('audio-container'))
  {
    content.classList.add('active__audio-container');
  }

  if(content.querySelector('.audio-container'))
  {
    content.querySelector('.audio-container').classList.add('active__audio-container');
  }
}

export function getStartMessage(parentElement, ...content)
{
  parentElement.classList.add('start-message-container');
  const textBlock = document.createElement('div');
  textBlock.classList.add('start-message__text-block');

  const textContent1 = document.createElement('p');
  textContent1.classList.add('start-message__text-1');
  textContent1.innerHTML = 'We present to your attention a puzzle game - nonograms, in which, unlike ordinary crosswords, not words, but images are encoded. More details can be found, for example, on Wikipedia, in <a target="_blank" href="https://ru.wikipedia.org/wiki/%D0%AF%D0%BF%D0%BE%D0%BD%D1%81%D0%BA%D0%B8%D0%B9_%D0%BA%D1%80%D0%BE%D1%81%D1%81%D0%B2%D0%BE%D1%80%D0%B4">Russian</a> and <a target="_blank" href="https://en.wikipedia.org/wiki/Nonogram">English</a>.';

  const textContent2 = document.createElement('p');
  textContent2.classList.add('start-message__text-2');
  textContent2.innerHTML = 'The game has sound. You can adjust the volume using the sliders below. Or in the settings by clicking on the icon <span><img src="assets/images/cogwheel.svg" alt="cogwheel"></span> in the upper right corner during the game.';

  textBlock.append(textContent1, textContent2);
  parentElement.append(textBlock, ...content);

  return parentElement;
}

export function getButterflyContainer()
{
  const div = document.createElement('div');

  const butterflyContainer = div.cloneNode();
  butterflyContainer.classList.add('butterfly-container');

  const butterfly = div.cloneNode();
  butterfly.classList.add('butterfly');

  const leftwing = div.cloneNode();
  leftwing.classList.add('leftwing');

  const rightwing = div.cloneNode();
  rightwing.classList.add('rightwing');

  butterfly.append(leftwing, rightwing);
  butterflyContainer.append(butterfly);

  return butterflyContainer;
}

export function startButterflyAnimation(delayRange = [30, 60])
{
  const animationClass = getRandomShadedCell('active-batterfly');
  const butterfly = document.querySelector('.butterfly');
  butterfly.classList.add(animationClass);

  const delay = Math.floor((Math.random() * (delayRange[1] - delayRange[0])) + delayRange[0]) * 1000;

  butterfly.addEventListener('animationend', function endAnimation()
  {
    butterfly.classList.remove(animationClass);
    setTimeout(startButterflyAnimation, delay);
    butterfly.removeEventListener('animationend', endAnimation);
  })
}
