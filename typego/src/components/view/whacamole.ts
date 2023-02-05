import { createElement, removeChild } from '../helper/index'; // getLetter
import whackBackground from '../../assets/png/whac_background.png';
import whackHoleImg from '../../assets/png/whac_hole.png';
import whackHoleEmptyImg from '../../assets/png/whac_hole_empty.png';
import moleImg from '../../assets/png/mole.png';

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
        const cell = createElement('div', 'cell', gameAgea);
        const hole = createElement('div', 'layer1', cell); // hole
        const mole = createElement('div', 'layer2', cell); // mole

        const charBlock = createElement('div', 'char_block', mole); // .textContent = 'TEST'; // character
        createElement('div', 'char', charBlock);

        const holeEmpty = createElement('div', 'layer3', cell); // hole empty

        this.setBackground(hole, whackHoleImg);
        this.setBackground(holeEmpty, whackHoleEmptyImg);
        this.setBackground(mole, moleImg);

        // for test
        holeEmpty.addEventListener('click', () => {
          mole.classList.toggle('go');
        });
      }

      // for (let i = 0; i < 26; i += 1) {
      //   const test = createElement('div', 'test', app);
      //   const t = getLetter('en', i);
      //   if (t) {
      //     createElement('div', 'test1', test).innerHTML = t.letter;
      //     createElement('div', 'test2', test).innerHTML = t.svg;
      //   }
      // }
    }
  }

  run(): void {
    this.render();
  }
}

export default WhacAMole;
