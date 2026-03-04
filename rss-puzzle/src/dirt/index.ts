import './style.module.scss';
import { Component } from './modules/layout/common/component';
import gameHandler from './components/game-handler/game-handler';

class PuzzleGame
{
  constructor
  (
    private game: Component,
  ){}

  render(root: HTMLElement | null) 
  {
    if(root !== null)
    {
      root.append(this.game.getNode());
    }
    else
    {
      throw Error(`Cannot render. Root is = ${root}`);
    }
    
  }   
}



const body = document.querySelector('body');
const game = new PuzzleGame(gameHandler);
game.render(body);



