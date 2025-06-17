import { Component } from '../common/component';
import { PlayField } from './playField/playField';

import { IStorageGameProgress } from '../../storage/local';


export interface IGameFieldHandlerOptions
{
  className: string[],
  text: string,
  playField: PlayField,
}

export class GameFieldHandler extends Component
{
  protected className: string[];

  protected playField: PlayField;

  constructor
  (
    {
      className, 
      text,
      playField,
    }: IGameFieldHandlerOptions
  )
  {
    super({ tag: 'div', className, text });
    this.className = className;
    this.playField = playField;
  }

  public getGameFieldInterface(playerProgress: IStorageGameProgress): [PlayField]
  {
    // const playFieldInterface = this.playField.getPlayFieldInterface(playerProgress);
    // playFieldInterface.playField.renderGameFieldContent(playFieldInterface.renderInfo);
    // return [
    //   playFieldInterface.playField
    // ];
    const { playField, renderInfo } = this.playField.getPlayFieldInterface(playerProgress);
    playField.renderGameFieldContent(renderInfo);

    return [ playField ];
  }
}