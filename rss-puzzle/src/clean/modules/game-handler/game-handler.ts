import * as comp from '../layout/common/component';

export interface IGameHandlerOptions {
  className: string[];
  text: string;
  items: comp.Component[];
}

export class GameHandler extends comp.Component {
  constructor({ className, text, items }: IGameHandlerOptions) {
    super({ tag: 'div', className, text });
    this.appendChildren(items);
  }
}
