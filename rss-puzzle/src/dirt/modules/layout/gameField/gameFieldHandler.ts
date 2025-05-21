import { Component } from '../common/component';
import { PlayField } from './playField/playField';

// import { IPuzzleGameData } from '../../storage/external';

// export interface IGameFieldHandlerStyleList
// {
//   pazzleWrapper: string,
//   resultContainer: string,
//   guessBlock: string,
//   wordContainer: string,
//   wordBlock: string,
//   wordBlockPiece: string,
// }

export interface IGameFieldHandlerOptions
{
  className: string[],
  text: string,
  playField: PlayField,
  // styleList: IGameFieldHandlerStyleList
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

  public getGameFieldInterface(): [PlayField]
  {
    return [
      this.playField.getPlayFieldInterface()
    ];
  }
}