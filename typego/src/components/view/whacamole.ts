import { createElement, removeChild, getLetter } from '../helper/index'; //
import whackBackground from '../../assets/png/whac_background.png';
import whackHoleImg from '../../assets/png/whac_hole.png';
import whackHoleEmptyImg from '../../assets/png/whac_hole_empty.png';
import moleImg from '../../assets/png/mole.png';

/*
 В зависимости от сложности регулировать
 - Время через которое кроты пропадают.
 - Время появления новых кротов
 - Кол-во кротов
 - скорость анимации появления / исчезновения.
 - увеличивать сложнолсть по таймеру каждых 30с.

 ! Ю не влазит
*/

interface IMole {
  moleElement: HTMLElement | null;
  isShowed: boolean;
  letterElement: HTMLElement | null;
  curentLetter: string;
  timer: NodeJS.Timeout | null;
}

interface ILetter {
  letter: string;
  svg: string;
}

class WhacAMole {
  language: string;
  gameField: Array<IMole>;

  constructor() {
    this.language = 'ru';
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

  showMole(mole: IMole): void {
    const currentMole: IMole = mole;
    let letter: ILetter | null = null;

    do {
      letter = getLetter(this.language);
      console.log(letter);
    } while (this.checkLetterShowed(letter.letter));

    if (currentMole.letterElement !== null) {
      currentMole.letterElement.innerHTML = letter.svg;
    }

    currentMole.curentLetter = letter.letter;

    currentMole.isShowed = true;

    if (currentMole.moleElement !== null) {
      currentMole.moleElement.classList.add('go');

      currentMole.timer = setTimeout(() => {
        if (currentMole.moleElement !== null) {
          currentMole.moleElement.classList.remove('go');
          setTimeout(() => {
            currentMole.isShowed = false;
            currentMole.curentLetter = '';
          }, 800);
        }
      }, 3000);
    }
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

      // ADD KEYPRESS EVENT
      const keyPressHandle = (e: Event) => {
        const event: KeyboardEvent = e as KeyboardEvent;
        console.log(event.key);
        if (
          this.gameField
            .filter((value) => value.isShowed === true)
            .some((value) => {
              if (value.curentLetter === event.key.toLocaleLowerCase()) {
                if (value.letterElement !== null) {
                  const svgPath = value.letterElement.querySelector('.letter_img');
                  // console.log(p);
                  if (svgPath !== null) {
                    svgPath.classList.add('handle');
                  }
                }

                if (value.moleElement !== null) {
                  value.moleElement.classList.remove('go');
                  setTimeout((v: IMole) => {
                    const tempValue = v;
                    tempValue.isShowed = false;
                    tempValue.curentLetter = '';
                  }, 800, value);
                }
                return true;
              }

              return false;
            })
        ) {
          console.log('WIN!!!');
        } else {
          console.log('LOOSE!!!');
        }
      };

      document.addEventListener('keypress', keyPressHandle);

      // SHOW INTERVAL
      const intervalId = setInterval(() => {
        // this.gameField.forEach
        if (this.gameField.length > 0) {
          let randomCount = Math.floor(Math.random() * 2) + 1;
          console.log(`Show ${randomCount} moles.`);

          this.gameField
            .slice(0)
            .filter((value) => value.isShowed === false)
            .sort(() => Math.random() - 0.5)
            .forEach((value) => {
              if (randomCount) {
                randomCount -= 1;

                this.showMole(value);
              }
            });
        }

        if (!document.querySelector('.whac')) {
          clearInterval(intervalId);
          document.removeEventListener('keypress', keyPressHandle);
        }
      }, 3900);
      // END INTERVAL

      for (let i = 0; i < 6; i += 1) {
        const currentMole: IMole = {
          moleElement: null,
          isShowed: false,
          letterElement: null,
          curentLetter: '',
          timer: null,
        };
        const cell = createElement('div', 'cell', gameAgea);
        const hole = createElement('div', 'layer1', cell); // hole
        const mole = createElement('div', 'layer2', cell); // mole

        currentMole.moleElement = mole;

        const charBlock = createElement('div', 'char_block', mole); // character
        const char = createElement('div', 'char', charBlock);

        currentMole.letterElement = char;

        const holeEmpty = createElement('div', 'layer3', cell); // hole empty

        this.setBackground(hole, whackHoleImg);
        this.setBackground(holeEmpty, whackHoleEmptyImg);
        this.setBackground(mole, moleImg);

        // for test
        holeEmpty.addEventListener('click', () => {
          if (currentMole.isShowed === true) {
            // currentMole.isShowed = false;
            // mole.classList.remove('go');

            // currentMole.curentLetter = '';
          } else {
            // currentMole.isShowed = true;
            // mole.classList.add('go');

            this.showMole(currentMole);

            // setTimeout(() => {
            //   mole.classList.remove('go');
            //   setTimeout(() => {
            //     currentMole.isShowed = false;
            //     currentMole.curentLetter = '';
            //   }, 800);
            // }, 3000);
          }
        });

        this.gameField.push(currentMole);
      }

      console.log(getLetter(this.language));
    }
  }

  handleKey(event: KeyboardEvent) {
    console.log(event.key);
    console.log(this.gameField);
  }

  run(): void {
    this.gameField = [];
    this.render();
  }
}

export default WhacAMole;
