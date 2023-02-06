import { createElement, removeChild, getLetter } from '../helper/index'; //
import whackBackground from '../../assets/png/whac_background.png';
import whackHoleImg from '../../assets/png/whac_hole.png';
import whackHoleEmptyImg from '../../assets/png/whac_hole_empty.png';
import moleImg from '../../assets/png/mole.png';

interface IMole {
  moleElement: HTMLElement | null;
  isShowed: boolean;
  letterElement: HTMLElement | null;
  curentLetter: string;
  timestamp: number;
}

interface ILetter {
  letter: string;
  svg: string;
}

class WhacAMole {
  language: string;
  gameField: Array<IMole>;

  constructor() {
    this.language = 'en';
    this.gameField = [];
  }

  setBackground(element: HTMLElement, backgroundImage: string): HTMLElement {
    const el = element;
    el.style.backgroundImage = `url(${backgroundImage})`;
    el.style.backgroundPosition = 'center';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.backgroundSize = 'cover';

    return el;
  }

  checkLetterShowed(letter: string): boolean {
    return this.gameField.some((value) => value.curentLetter === letter);
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
        const currentMole: IMole = {
          moleElement: null,
          isShowed: false,
          letterElement: null,
          curentLetter: '',
          timestamp: 0,
        };
        const cell = createElement('div', 'cell', gameAgea);
        const hole = createElement('div', 'layer1', cell); // hole
        const mole = createElement('div', 'layer2', cell); // mole

        currentMole.moleElement = mole;

        const charBlock = createElement('div', 'char_block', mole); // .textContent = 'TEST'; // character
        const char = createElement('div', 'char', charBlock);

        currentMole.letterElement = char;

        const holeEmpty = createElement('div', 'layer3', cell); // hole empty

        this.setBackground(hole, whackHoleImg);
        this.setBackground(holeEmpty, whackHoleEmptyImg);
        this.setBackground(mole, moleImg);

        // for test
        holeEmpty.addEventListener('click', () => {
          if (currentMole.isShowed === true) {
            currentMole.isShowed = false;
            mole.classList.remove('go');

            currentMole.curentLetter = '';
          } else {
            currentMole.isShowed = true;
            mole.classList.add('go');

            if (currentMole.letterElement) {
              let letter: ILetter | null = null;
              do {
                letter = getLetter(this.language);
                console.log(letter);
              } while (this.checkLetterShowed(letter.letter));
              currentMole.letterElement.innerHTML = letter.svg;
              currentMole.curentLetter = letter.letter;
            }
          }
        });

        this.gameField.push(currentMole);
      }

      console.log(getLetter(this.language));
    }
  }

  run(): void {
    this.render();
  }
}

export default WhacAMole;
