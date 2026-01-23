import * as style from './spark-style.module.scss';
import { Component } from '../../layout/common/component';


function sparkEffect(element: Component): void
{
  const removeSpark = (event: Event) =>
  {
    if(event.target !== element.getNode()) return;

    element.toggleClass(style['spark-effect'], false);
    element.removeListener('animationend', removeSpark);
  }

  if(element.getClassList()[style['spark-effect']])
  {
    element.toggleClass(style['spark-effect'], false);
  }

  element.addListener('animationend', removeSpark);
  requestAnimationFrame(() =>
  {
    element.toggleClass(style['spark-effect'], true);
  })
}

export default sparkEffect;