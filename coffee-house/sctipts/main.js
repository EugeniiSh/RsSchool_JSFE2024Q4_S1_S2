/* ============================== +Burger menu+ ============================== */
const burgerButtonConteiner = document.querySelector('.heading__burger-button-conteiner');
const headingNavContainer = document.querySelector('.heading__nav-container');
const burgerButtonLine = document.querySelector('.burger-button__line');
const listItem = document.querySelectorAll('.list-item');

const heading = document.querySelector('.heading');
const offer = document.querySelector('.offer');


burgerButtonConteiner.addEventListener('click', () =>
{
    headingNavContainer.classList.toggle('activ-burger');
    burgerButtonLine.classList.toggle('activ-burger__line');
    heading.classList.toggle('active-heading');
    offer.classList.toggle('active-offer');
});

listItem.forEach((item) =>
{
    item.addEventListener('click', () =>
    {
        headingNavContainer.classList.remove('activ-burger');
        burgerButtonLine.classList.remove('activ-burger__line');
        heading.classList.remove('active-heading');
        offer.classList.remove('active-offer');
    });
});

window.addEventListener('resize',() =>
{
    const width = document.body.clientWidth;
    if(width > 768)
    {
        headingNavContainer.classList.remove('activ-burger');
        burgerButtonLine.classList.remove('activ-burger__line');
        heading.classList.remove('active-heading');
        offer.classList.remove('active-offer');
    }
});
/* ============================== -Burger menu- ============================== */

/* ============================ +Favorite Carusel+ ============================= */
const carouselWrapper = document.querySelector('.carousel-wrapper');
const carouselBlocks = document.querySelector('.carousel-blocks');
const carouselArrowLeft = document.querySelector('.carousel-arrow-left');
const carouselArrowRight = document.querySelector('.carousel-arrow-right');
const paginationBlockItem = document.querySelectorAll('.pagination-block__item');

let position = 0;
let pagIndex = 0;

activatePagination();

function nextSlide()
{
    const scrollLength = carouselWrapper.offsetWidth + 100;

    if(position < ((paginationBlockItem.length - 1) * scrollLength))
    {
        position += scrollLength;
        pagIndex++;
    }
    else
    {
        position = 0;
        pagIndex = 0;
    }

    carouselBlocks.style.left = -position + 'px';
    activatePagination();
    // thisSlide(pagIndex);
}

function prevSlide()
{
    const scrollLength = carouselWrapper.offsetWidth + 100;

    if(position > 0)
    {
        position -= scrollLength;
        pagIndex--;
    }
    else
    {
        position = (paginationBlockItem.length - 1) * scrollLength;
        pagIndex = paginationBlockItem.length - 1;
    }

    carouselBlocks.style.left = -position + 'px';
    activatePagination();
    // thisSlide(pagIndex);
}

function activatePagination ()
{
    paginationBlockItem.forEach((item) =>
    {
        item.firstChild.classList.remove('activ-pagination');
    })

    paginationBlockItem[pagIndex].firstChild.classList.add('activ-pagination');
}

function removePausePagination()
{
    paginationBlockItem.forEach((item) =>
    {
        item.firstChild.style = '';
    })
}

paginationBlockItem.forEach((item) =>
{
    item.addEventListener('animationend', () =>
    {
        nextSlide();
    })
})

carouselArrowRight.addEventListener('click', nextSlide);
carouselArrowLeft.addEventListener('click', prevSlide);

// - - - - - -  - - - + Swipe Functional + - - - - -  - - - - 
carouselBlocks.addEventListener('touchstart', (event) =>
{
    swipe.posX1 = event.changedTouches[0].clientX;

    const activPagination = document.querySelector('.activ-pagination');
    activPagination.style.animationPlayState = 'paused';
})

carouselBlocks.addEventListener('touchend', (event) =>
{
    swipe.posX2 = event.changedTouches[0].clientX;
    swipe.swipeAction();

    removePausePagination();
})

carouselBlocks.addEventListener('mousedown', (event) =>
{
    swipe.posX1 = event.clientX;
})

carouselBlocks.addEventListener('mouseup', (event) =>
{
    swipe.posX2 = event.clientX;
    swipe.swipeAction();
})

const swipe = 
{
    posX1: 0,
    posX2: 0,
    swipeLength: 0,
    swipeThreshold: carouselWrapper.offsetWidth / 3,

    swipeAction()
    {
        this.swipeLength = this.posX1 - this.posX2;

        if(Math.abs(this.swipeLength) > this.swipeThreshold)
        {
            if(this.swipeLength > 0) nextSlide();
            if(this.swipeLength < 0) prevSlide();
        }
    }
}
// More advanced version of the slider with swipe: https://habr.com/ru/articles/501258/
// - - - - - -  - - - = Swipe Functional = - - - - -  - - - -
/* ============================ -Favorite Carusel- ============================= */

