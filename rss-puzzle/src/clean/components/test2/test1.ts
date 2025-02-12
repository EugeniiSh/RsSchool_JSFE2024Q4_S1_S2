import * as styles from './styles.module.scss';

export default function test2() {
  const div = document.createElement('div');
  div.classList.add(styles.test);
  return div;
}
