import * as style from './cover-style.module.scss';
import { Component } from '../../../modules/layout/common/component';
import { CoverTop } from '../../../modules/layout/book/cover/cover-top';
import { CoverTopFront } from '../../../modules/layout/book/cover/cover-top-front';

import scull from '../../scull/scull';

const coverTopH1 = new Component(
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
);

const coverTopFrontOption = {
  scull,

  className: [style['cover-side'], style.front],
  text: '',
  items: [coverTopH1, scull],
};

const coverTopOption = {
  className: [style['cover-top']],
  text: '',
  coverFront: new CoverTopFront(coverTopFrontOption),
  coverBack: new Component({
    tag: 'div',
    className: [style['cover-side'], style.back],
    text: '',
  }),
};

const coverTop = new CoverTop(coverTopOption);

export default coverTop;
