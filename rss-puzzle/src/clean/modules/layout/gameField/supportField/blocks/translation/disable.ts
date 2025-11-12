import { Component } from '../../../../common/component';

export interface IDisableTranslationStyleList {
  disableTranslation: string;
}

export interface IDisableTranslationOption {
  className: string[];
  text: string;
  style: IDisableTranslationStyleList;
}

export class DisableTranslation extends Component {
  protected className: string[];

  protected style: IDisableTranslationStyleList;

  constructor({ className, text, style }: IDisableTranslationOption) {
    super({ tag: 'div', className, text });
    this.className = className;
    this.style = style;
  }

  public getDisableTranslation(): DisableTranslation {
    return new DisableTranslation({
      className: this.className,
      text: '',
      style: this.style,
    });
  }
}
