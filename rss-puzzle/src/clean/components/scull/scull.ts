import * as style from './scull-style.module.scss';
import { Component } from '../../modules/layout/common/component';
import { Scull } from '../../modules/layout/scull/scull';

const scullTop = new Component({
  tag: 'div',
  className: [style['scull-top']],
  text: '',
});
const scullBottom = new Component({
  tag: 'div',
  className: [style['scull-bottom']],
  text: '',
});
const leftEye = new Component({
  tag: 'div',
  className: [style['left-eye'], style.eye],
  text: '',
});
const rightEye = new Component({
  tag: 'div',
  className: [style['right-eye'], style.eye],
  text: '',
});

function scullLaugh(this: Scull) {
  this.toggleClass(style['scull-laugh'], true);
}

const scullOption = {
  scullTop,
  scullBottom,
  leftEye,
  rightEye,
  scullLaugh,

  className: [style.scull],
  text: '',
  items: [scullTop, scullBottom, leftEye, rightEye],
};

const scull = new Scull(scullOption);

export default scull;
