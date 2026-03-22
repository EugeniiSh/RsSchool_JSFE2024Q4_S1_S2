import * as style from './pages-block-style.module.scss';
import { Component } from '../../../modules/layout/common/component';
import { PageContent } from '../../../modules/layout/book/pages/page/page-content';
import { PageSide } from '../../../modules/layout/book/pages/page/page-side';
import { Page } from '../../../modules/layout/book/pages/page/page';
import { PagesBlock } from '../../../modules/layout/book/pages/pages-block';
import { customEventList } from '../../events/custom';

import startMenu from '../../start-menu/start-menu';
import firstPageFiller from '../bookStartContent/startContent';

const firstPageContent: Component[] = [...firstPageFiller, startMenu];

// const orderName =
// [
//   'first',
//   'second',
//   'prelast',
//   'last'
// ]

function createStandartPages(count: number): Page[] {
  const pages: Page[] = [];

  for (let i = 0; i < count; i += 1) {
    let page: PageSide[] = [];

    for (let j = 0; j < 2; j += 1) {
      const side = j === 0 ? 'front' : 'back';

      const contentOption = {
        className: [style.content],
        text: '',
        content: new Component({
          tag: 'div',
          className: [style.item],
          // text: `Content ${ side.toUpperCase() } Item #-${i}`,
          text: '',
        }),
      };

      const sideOption = {
        className: [style.side, style[`side-${side}`]],
        text: '',
        content: new PageContent(contentOption),
      };

      page.push(new PageSide(sideOption));
    }

    const pageOption = {
      className: [style.page],
      text: '',
      pageFront: page[0],
      pageBack: page[1],
    };

    pages.push(new Page(pageOption));
    page = [];
  }

  return pages;
}

const pages: Page[] = [];

for (let i = 0; i < 4; i += 1) {
  let page: PageSide[] = [];

  for (let j = 0; j < 2; j += 1) {
    const side = j === 0 ? 'front' : 'back';

    const isStartMenuSide = i === 2 && j === 0;

    const contentOption = {
      className: [style.content],
      text: '',
      content: isStartMenuSide
        ? startMenu
        : new Component({
            tag: 'div',
            className: [style.item],
            text: `Content ${side.toUpperCase()} Item #-${i}`,
          }),
    };

    const sideOption = {
      className: [style.side, style[`side-${side}`]],
      text: '',
      content: new PageContent(contentOption),
    };

    page.push(new PageSide(sideOption));
  }

  const pageOption = {
    className: [style.page],
    text: '',
    pageFront: page[0],
    pageBack: page[1],
  };

  pages.push(new Page(pageOption));
  page = [];
}

const pagesBlockOption = {
  customEventList,

  className: [style['pages-block']],
  text: '',
  items: createStandartPages(4),
  // items: pages,
  startContent: firstPageContent,
  pageCreator: createStandartPages,
};

const pagesBlock = new PagesBlock(pagesBlockOption);

export default pagesBlock;
