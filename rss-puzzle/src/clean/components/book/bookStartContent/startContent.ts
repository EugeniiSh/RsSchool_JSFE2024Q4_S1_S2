import * as style from './startContent-style.module.scss';
import { Component } from '../../../modules/layout/common/component';

const content = [
  new Component(
    {
      tag: 'div',
      className: [style.side, style['first-side']],
      text: '',
    },
    new Component({
      tag: 'span',
      className: [style.span, style['first-side__word']],
      text: 'rolling',
    }),
    new Component({
      tag: 'span',
      className: [style.span, style['first-side__word']],
      text: 'scopes',
    }),
    new Component({
      tag: 'span',
      className: [style.span, style['first-side__word']],
      text: 'school',
    }),
    new Component({
      tag: 'span',
      className: [style.span, style['first-side__word']],
      text: 'puzzle',
    }),
    new Component({
      tag: 'span',
      className: [style.span, style['first-side__word']],
      text: 'game',
    }),
  ),

  new Component(
    {
      tag: 'div',
      className: [style.side, style['second-side']],
      text: '',
    },

    new Component(
      {
        tag: 'ul',
        className: [style.ul, style.develop],
        text: 'task development',
      },
      new Component({ tag: 'li', className: [style.li], text: 'valerydluski' }),
    ),

    new Component(
      {
        tag: 'ul',
        className: [style.ul, style.implement],
        text: 'implementation',
      },
      new Component({ tag: 'li', className: [style.li], text: 'EugeniiSh' }),
    ),
  ),

  new Component(
    {
      tag: 'div',
      className: [style.side, style['third-side']],
      text: '',
    },

    new Component(
      {
        tag: 'ul',
        className: [style.ul, style.stack],
        text: 'used stack:',
      },
      new Component({ tag: 'li', className: [style.li], text: 'typescript' }),
      new Component({ tag: 'li', className: [style.li], text: 'scss' }),
      new Component({ tag: 'li', className: [style.li], text: 'eslint' }),
      new Component({ tag: 'li', className: [style.li], text: 'prettier' }),
      new Component({ tag: 'li', className: [style.li], text: 'husky' }),
      new Component({ tag: 'li', className: [style.li], text: 'webpack' }),
    ),
  ),

  new Component(
    {
      tag: 'div',
      className: [style.side, style['fourth-side']],
      text: '',
    },
    new Component({ tag: 'div', className: [style.h3], text: 'rules' }),
    new Component({
      tag: 'p',
      className: [style.p],
      text: "Take your time. Because further you will have to fight the most terrible enemy - your own ignorance. If you are ready, press start. Collect sentences by clicking on words or dragging them. Hints will be available to you. Don't give in, it's just waiting for this! You must cope. You can stop at any time and take a break. Just don't press the logout button, otherwise everything will be lost. Now you can begin. Good luck!",
    }),
  ),
];

export default content;
