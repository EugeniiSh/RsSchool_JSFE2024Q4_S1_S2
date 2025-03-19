import * as style from './book-style.module.scss';
import { Book, IBook } from '../../modules/layout/book/book';

import coverTop from './cover/cover-top';
import coverBottom from './cover/cover-bottom';
import pagesBlock from './pages/pages-block';

const bookOption: IBook = {
  className: [style.book],
  text: '',
  items: [coverTop, pagesBlock, coverBottom],
};

const book = new Book(bookOption);

export default book;
