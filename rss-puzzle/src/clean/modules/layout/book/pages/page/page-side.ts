import { PageContent, IPageContentOption } from './page-content';

export interface IPageSide extends IPageContentOption {
  content: PageContent;
}

export class PageSide extends PageContent {
  constructor({ className, text, content }: IPageSide) {
    super({ className, text, content });
  }
}
