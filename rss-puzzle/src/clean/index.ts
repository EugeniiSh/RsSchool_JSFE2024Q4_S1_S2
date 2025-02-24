import * as common from './components/common/common';
import loginForm from './components/login-form/loginForm';

class PuzzleGame {
  constructor(private game: common.Component) {}

  render(root: HTMLElement | null) {
    if (root !== null) {
      root.append(this.game.getNode());
    } else {
      throw Error(`Cannot render. Root is = ${root}`);
    }
  }
}

const body = document.querySelector('body');
const game = new PuzzleGame(loginForm);
game.render(body);
