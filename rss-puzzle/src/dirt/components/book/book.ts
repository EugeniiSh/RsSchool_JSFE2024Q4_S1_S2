import * as style from './book-style.module.scss';
import { Book, IBook } from '../../modules/layout/book/book';
import { customEventsUI } from '../events/custom';

import coverTop from './cover/cover-top';
import coverBottom from './cover/cover-bottom';
import pagesBlock from './pages/pages-block';

const bookOption: IBook =
{
  coverTop,
  pagesBlock,
  customEventsUI,

  className: [style.book], 
  text: '',
  items: [coverTop, pagesBlock, coverBottom],
}

const book = new Book(bookOption);

export default book;