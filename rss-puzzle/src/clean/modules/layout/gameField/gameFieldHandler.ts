import { Component } from '../common/component';
import { PlayField } from './playField/playField';
import { SupportField } from './supportField/supportField';

import { IStorageGameProgress } from '../../storage/local';

export interface IGameFieldHandlerOptions {
  className: string[];
  text: string;
  playField: PlayField;
  supportField: SupportField;
}

export class GameFieldHandler extends Component {
  protected className: string[];

  protected playField: PlayField;

  protected supportField: SupportField;

  constructor({
    className,
    text,
    playField,
    supportField,
  }: IGameFieldHandlerOptions) {
    super({ tag: 'div', className, text });
    this.className = className;
    this.playField = playField;
    this.supportField = supportField;
  }

  public getGameFieldInterface(
    playerProgress: IStorageGameProgress,
  ): [SupportField, PlayField] {
    const { playField, renderInfo } =
      this.playField.getPlayFieldInterface(playerProgress);
    playField.renderGameFieldContent(renderInfo);

    const supportField = this.supportField.getSupportField();
    supportField.updateSupportField();

    playField.setSupportField(supportField);
    supportField.setPlayField(playField);

    return [supportField, playField];
  }
}
