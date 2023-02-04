import { createElement, removeChild } from '../helper/index';
import whackBackground from '../../assets/whac_background.png';
import whackHole from '../../assets/whac_hole.png';

class WhacAMole {
  // constructor() {
  // }

  setBackground(element: HTMLElement, backgroundImage: string): HTMLElement {
    const el = element;
    el.style.backgroundImage = `url(${backgroundImage})`;
    el.style.backgroundPosition = 'center';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.backgroundSize = 'cover';

    return el;
  }

  render(): void {
    const app: HTMLElement | null = document.querySelector('.app');

    if (app !== null) {
      removeChild(app);
      const whac = createElement('div', 'whac', app);
      const game = createElement('div', 'game', whac);
      this.setBackground(game, whackBackground);
      createElement('div', 'stats', game);
      const gameAgea = createElement('div', 'game-area', game);
      for (let i = 0; i < 6; i += 1) {
        const hole = createElement('div', 'hole', gameAgea);
        this.setBackground(hole, whackHole);
      }
    }
  }

  run(): void {
    this.render();
  }
}

export default WhacAMole;
