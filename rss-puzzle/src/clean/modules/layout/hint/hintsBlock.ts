import { Component } from '../common/component';
import { HintField } from './hintField';

export interface IHintsBlock {
  className: string[];
  text: string;
  hintFields: Map<string, HintField>;
  setState: (state: boolean, checkFor: string) => void;
  setInitialState: () => void;
}

export class HintsBlock extends Component {
  protected hintFields: Map<string, HintField>;

  public setState: (state: boolean, checkFor: string) => void;

  public setInitialState: () => void;

  constructor({
    className,
    text,
    hintFields,
    setState,
    setInitialState,
  }: IHintsBlock) {
    super({ tag: 'div', className, text });
    this.hintFields = hintFields;
    hintFields.forEach((field) => this.append(field), this);
    this.setState = setState;
    this.setInitialState = setInitialState;
  }
}
