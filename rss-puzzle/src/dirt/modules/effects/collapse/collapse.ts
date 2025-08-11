import * as style from './collapse-style.module.scss';
import { Component } from '../../layout/common/component';

async function collapse
(
  elements: Component[], 
  action: 'hide' | 'show', 
  delay: number = 100
)
{
  const hideClass = style.hide;
  const showClass = style.show;

  const result = new Promise<void>((res) =>
  {
    elements.forEach((elem, index) =>
    {
      setTimeout(() => 
      {
        elem.toggleClass(style.collapse, false);
        elem.toggleClass(style.animation);
        elem.toggleClass(action === 'hide'? hideClass : showClass);
      }, index * delay);

      const actionEnd = () =>
      {
        if(action === 'hide') elem.toggleClass(style.collapse);
        elem.toggleClass(style.animation, false);
        elem.toggleClass(action === 'hide'? hideClass : showClass, false);

        elem.removeListener('animationend', actionEnd);
        if(index === elements.length - 1) res();
      }

      elem.addListener('animationend', actionEnd);
    })
  })

  return result;
}

export default collapse;