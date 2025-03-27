import * as style from './cover-style.module.scss';
import { Component } from '../../../modules/layout/common/component';

const coverBottom = new Component({
  tag: 'div',
  className: [style['cover-bottom']],
  text: '',
});

export default coverBottom;
