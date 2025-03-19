import { Component } from '../common/component';
import { CoverTop } from './cover/cover-top';
import { PagesBlock } from './pages/pages-block';

export interface IBook
{
  className: string[], 
  text: string,
  items: [CoverTop, PagesBlock, Component],
}

export class Book extends Component
{
  constructor
  (
    {
      className, 
      text,
      items
    }: IBook
  )
  {
    super({ tag: 'div', className, text });
    this.prependChildren(items);
  }
}