import { Component } from '../../../common/component';

export interface IInitialContainerOptions {
  className: string[];
  text: string;
}

export class InitialContainer extends Component {
  protected className: string[];

  constructor({ className, text }: IInitialContainerOptions) {
    super({ tag: 'div', className, text });
    this.className = className;
  }

  public getInitialContainer() {
    return new InitialContainer({
      className: this.className,
      text: '',
    });
  }
}
