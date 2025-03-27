import { Component } from '../common/component';
import { HintField } from './hintField';

export interface IHintsBlock {
  className: string[];
  text: string;
  hintFields: Map<string, HintField>;
  setState: (state: boolean, checkFor: string) => void;
}

export class HintsBlock extends Component {
  protected hintFields: Map<string, HintField>;

  public setState: (state: boolean, checkFor: string) => void;

  constructor({ className, text, hintFields, setState }: IHintsBlock) {
    super({ tag: 'div', className, text });
    this.hintFields = hintFields;
    hintFields.forEach((field) => this.append(field), this);
    this.setState = setState;
  }
}
