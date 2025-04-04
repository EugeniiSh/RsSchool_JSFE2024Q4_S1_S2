import { Component } from '../common/component';

export interface IHintField {
  className: string[];
  text: string;
  hintName: string;
  hintComponents: Component[];
  setState: (state: boolean) => void;
  setInitialState: () => void;
}

export class HintField extends Component {
  private hintName: string;

  public setState: (state: boolean) => void;

  public setInitialState: () => void;

  constructor({
    className,
    text,
    hintName,
    hintComponents,
    setState,
    setInitialState,
  }: IHintField) {
    super({ tag: 'div', className, text }, ...hintComponents);
    this.hintName = hintName;
    this.setState = setState;
    this.setInitialState = setInitialState;
  }

  public getHintName(): string {
    return this.hintName;
  }
}
