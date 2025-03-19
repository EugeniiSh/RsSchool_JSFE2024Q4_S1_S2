import { Component } from '../../../common/component';

export interface IPageContentOption
{
  className: string[], 
  text: string,
  content: Component 
}

export class PageContent extends Component
{
  protected content: Component

  constructor
  (
    {
      className,
      text,
      content
    }: IPageContentOption
  )
  {
    super({ tag: 'div', className, text });
    this.append(content);
    this.content = content;
  }
}