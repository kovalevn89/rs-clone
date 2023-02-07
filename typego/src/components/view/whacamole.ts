import { createElement, removeChild, getLetter } from '../helper/index'; //
import whackBackground from '../../assets/png/whac_background.png';
import whackHoleImg from '../../assets/png/whac_hole.png';
import whackHoleEmptyImg from '../../assets/png/whac_hole_empty.png';
import moleImg from '../../assets/png/mole.png';
import hitSound from '../../assets/media/hit.mp3';
import clickSound from '../../assets/media/click.mp3';
import moleStartBtn from '../../assets/png/mole_start_btn.png';
import moleResettBtn from '../../assets/png/mole_restart_btn.png';
/*
 В зависимости от сложности регулировать
 - Время через которое кроты пропадают.
 - Время появления новых кротов
 - Кол-во кротов
 - скорость анимации появления / исчезновения.
 - увеличивать сложнолсть по таймеру каждых 30с.
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
  isSound: boolean;
  gameField: Array<IMole>;
  score: number;
  accuracy: number;
  missClickCount: number;
  clickCount: number;
  gameClock: number;
  level: number;

  constructor() {
    this.language = 'ru';
    this.isSound = true;
    this.gameField = [];
    this.score = 0;
    this.accuracy = 0;
    this.missClickCount = 0;
    this.clickCount = 0;
    this.gameClock = 0;
    this.level = 1;
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

  clickSound(type: string): void {
    if (this.isSound === true) {
      switch (type) {
        case 'hit': (new Audio(hitSound)).play(); break;
        case 'click': (new Audio(clickSound)).play(); break;
        default: {
          // console.log();
        }
      }
    }
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

  resetGame(): void {
    this.gameField = [];
    this.score = 0;
    this.accuracy = 0;
    this.missClickCount = 0;
    this.clickCount = 0;
    this.gameClock = 0;
  }

  getTimeWithSeconds(seconds: number): string {
    if (seconds >= 60) {
      const min = Math.floor(seconds / 60);
      const sec = seconds % 60;
      return `${String(min).padStart(2, '0')}m ${String(sec).padStart(2, '0')}s`;
    }
    return `${String(seconds).padStart(2, '0')}s`;
  }

  renderGame(): void {
    this.resetGame();

    const app: HTMLElement | null = document.querySelector('.app');

    if (app !== null) {
      removeChild(app);
      const whac = createElement('div', 'whac', app);
      const game = createElement('div', 'game', whac);
      this.setBackground(game, whackBackground);
      const statsBlock = createElement('div', 'stats', game);
      // level
      const statsLevel = createElement('div', 'stats_level', statsBlock);
      createElement('div', 'label', statsLevel).textContent = 'Level:';
      const levelValue = createElement('div', 'value', statsLevel);
      levelValue.textContent = '1';
      // score
      const statsScore = createElement('div', 'stats_score', statsBlock);
      createElement('div', 'label', statsScore).textContent = 'Score:';
      const scoreValue = createElement('div', 'value', statsScore);
      scoreValue.textContent = '0';
      // accuracy
      const statsAccuracy = createElement('div', 'stats_accuracy', statsBlock);
      createElement('div', 'label', statsAccuracy).textContent = 'Accuracy:';
      const accuracyValue = createElement('div', 'value', statsAccuracy);
      accuracyValue.textContent = '100%';
      // time
      const statsTime = createElement('div', 'stats_time', statsBlock);
      createElement('div', 'label', statsTime).textContent = 'Time:';
      const timerValue = createElement('div', 'value', statsTime);
      timerValue.textContent = '00s';

      // createElement('div', 'sound_control', statsBlock);

      const gameAgea = createElement('div', 'game-area', game);

      // GAME TIMER
      const gameTimerID = setInterval(() => {
        this.gameClock += 1;

        timerValue.textContent = this.getTimeWithSeconds(this.gameClock);

        if (this.gameClock === 60) {
          // next level
        }

        if (this.gameClock === 180) {
          // stop game
          this.renderEndGame();
        }
      }, 1000);

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
                  if (value.timer) {
                    clearInterval(value.timer);
                  }
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
          this.clickSound('hit');
          this.score += 1;
          if (scoreValue !== null) {
            scoreValue.textContent = `${this.score}`;
          }
        } else {
          console.log('LOOSE!!!');
          this.missClickCount += 1;
          this.clickSound('click');
        }

        this.clickCount += 1;
        this.accuracy = Number(Number((this.score / this.clickCount) * 100).toFixed(1));
        accuracyValue.textContent = `${this.accuracy}%`;
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
          clearInterval(gameTimerID);
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

        this.gameField.push(currentMole);
      }

      console.log(getLetter(this.language));
    }
  }

  handleKey(event: KeyboardEvent) {
    console.log(event.key);
    console.log(this.gameField);
  }

  renderMenu(): void {
    const app: HTMLElement | null = document.querySelector('.app');

    if (app !== null) {
      removeChild(app);
      const whac = createElement('div', 'whac', app);
      const menu = createElement('div', 'menu', whac);
      this.setBackground(menu, whackBackground);
      const caption = createElement('div', 'game_caption', menu);
      caption.textContent = 'Whac A Mole';
      const controls = createElement('div', 'game_controls', menu);
      const startButton = createElement('div', 'controls_start-btn', controls);
      this.setBackground(startButton, moleStartBtn);
      startButton.addEventListener('click', () => {
        this.renderGame();
      });
    }
  }

  renderEndGame(): void {
    const app: HTMLElement | null = document.querySelector('.app');

    if (app !== null) {
      removeChild(app);
      const whac = createElement('div', 'whac', app);
      const menu = createElement('div', 'menu', whac);
      this.setBackground(menu, whackBackground);
      const caption = createElement('div', 'game_caption', menu);
      caption.textContent = 'End game...';
      const controls = createElement('div', 'game_controls', menu);
      const startButton = createElement('div', 'controls_start-btn', controls);
      this.setBackground(startButton, moleResettBtn);
      startButton.addEventListener('click', () => {
        this.renderGame();
      });
    }
  }

  run(): void {
    this.renderMenu();
  }
}

export default WhacAMole;
