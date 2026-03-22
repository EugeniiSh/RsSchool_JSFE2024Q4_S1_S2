import { Component } from '../common/component';

export interface IScullOption {
  className: string[];
  text: string;
  items: Component[];
  scullTop: Component;
  scullBottom: Component;
  leftEye: Component;
  rightEye: Component;
  scullLaugh: () => void;
}

export class Scull extends Component {
  protected scullTop: Component;

  protected scullBottom: Component;

  protected leftEye: Component;

  protected rightEye: Component;

  public scullLaugh: () => void;

  constructor({
    className,
    text,
    items,
    scullTop,
    scullBottom,
    leftEye,
    rightEye,
    scullLaugh,
  }: IScullOption) {
    super({ tag: 'div', className, text });
    this.appendChildren(items);
    this.scullTop = scullTop;
    this.scullBottom = scullBottom;
    this.leftEye = leftEye;
    this.rightEye = rightEye;
    this.scullLaugh = scullLaugh;
  }
}
