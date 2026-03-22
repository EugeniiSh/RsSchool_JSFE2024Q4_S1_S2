import { Component } from '../common/component';


export interface IGreeting
{
  className: string[];
  text: string;
  items: Component[];
  playerName: Component;
}

export class Greeting extends Component
{
  protected playerName: Component;

  constructor
  (
    {
      className,
      text,
      items,
      playerName
    }: IGreeting
  )
  {
    super({ tag: 'div', className, text });
    this.appendChildren(items);
    this.playerName = playerName;
  }

  public setPlayerName(namePlayer: string): void
  {
    this.playerName.setTextContent(namePlayer);
  }
}