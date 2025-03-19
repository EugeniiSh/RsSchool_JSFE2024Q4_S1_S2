import * as style from './cover-style.module.scss';
import { Component } from '../../../modules/layout/common/component';
import { CoverTop } from '../../../modules/layout/book/cover/cover-top';

const coverTopOption = {
  className: [style['cover-top']],
  text: '',
  coverFront: new Component(
    {
      tag: 'div',
      className: [style.front],
      text: '',
    },

    new Component(
      {
        tag: 'h1',
        className: [style.header],
        text: '',
      },

      new Component({
        tag: 'span',
        className: [style.span, style['header-top']],
        text: 'rss',
      }),
      new Component({
        tag: 'span',
        className: [style.span, style['header-bottom']],
        text: 'puzzle',
      }),
    ),
  ),

  coverBack: new Component({
    tag: 'div',
    className: [style.back],
    text: '',
  }),
};

const coverTop = new CoverTop(coverTopOption);
export default coverTop;
