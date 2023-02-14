import { createElement, removeChild, getLetter } from '../helper/index';
import { IMole, ILetter } from '../types/index';
import whackBackground from '../../assets/png/whac_background.png';
import whackHoleImg from '../../assets/png/whac_hole.png';
import whackHoleEmptyImg from '../../assets/png/whac_hole_empty.png';
import moleImg from '../../assets/png/mole.png';
import moleStartBtn from '../../assets/png/mole_start_btn.png';
import moleResettBtn from '../../assets/png/mole_restart_btn.png';
import langRu from '../../assets/png/lang_ru.png';
import langUsa from '../../assets/png/lang_usa.png';
import soundOff from '../../assets/png/sound_off.png';
import soundOn from '../../assets/png/sound_on.png';
import hitSound from '../../assets/media/hit.mp3';
import clickSound from '../../assets/media/click.mp3';
import winSound from '../../assets/media/win.mp3';

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
  gameClockId: NodeJS.Timeout | null;
  gameShowMoleId: NodeJS.Timeout | null;
  keyHandler: (event: Event) => void;

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
    this.gameClockId = null;
    this.gameShowMoleId = null;
    this.keyHandler = () => {};

    const whacamoleSound = localStorage.getItem('whacamoleSound');
    if (whacamoleSound !== null) {
      this.isSound = Boolean(Number(whacamoleSound));
    }
    const whacamoleLang = localStorage.getItem('whacamoleLang');
    if (whacamoleLang !== null) {
      this.language = whacamoleLang;
    }
  }

  private resetGame(): void {
    this.gameField = [];
    this.score = 0;
    this.accuracy = 0;
    this.missClickCount = 0;
    this.clickCount = 0;
    this.gameClock = 0;
    this.level = 1;

    this.clearTimers();
  }

  private getTimeWithSeconds(seconds: number): string {
    if (seconds >= 60) {
      const min = Math.floor(seconds / 60);
      const sec = seconds % 60;
      return `${String(min).padStart(2, '0')}m ${String(sec).padStart(2, '0')}s`;
    }
    return `${String(seconds).padStart(2, '0')}s`;
  }

  private setBackground(element: HTMLElement, backgroundImage: string): HTMLElement {
    const el = element;
    el.style.backgroundImage = `url(${backgroundImage})`;
    el.style.backgroundPosition = 'center';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.backgroundSize = 'cover';

    return el;
  }

  private checkLetterShowed(letter: string): boolean {
    return this.gameField.some((value) => value.curentLetter === letter);
  }

  private playSound(type: string): void {
    if (this.isSound === true) {
      switch (type) {
        case 'hit': (new Audio(hitSound)).play(); break;
        case 'click': (new Audio(clickSound)).play(); break;
        case 'win': (new Audio(winSound)).play(); break;
        default: {
          // console.log();
        }
      }
    }
  }

  private showMole(mole: IMole): void {
    const currentMole: IMole = mole;
    let letter: ILetter | null = null;

    do {
      letter = getLetter(this.language);
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
          currentMole.timer = setTimeout(() => {
            currentMole.isShowed = false;
            currentMole.curentLetter = '';
          }, 800);
        }
      }, 3000);
    }
  }

  private showMoleTimer(): void {
    const showFun = () => {
      if (this.gameField.length > 0) {
        let randomCount = 1;
        switch (this.level) {
          case 1: randomCount = Math.floor(Math.random() * 2) + 1; break;
          case 2: randomCount = Math.floor(Math.random() * 3) + 1; break;
          case 3: randomCount = Math.floor(Math.random() * 3) + 2; break;
          default: randomCount = 1; break;
        }

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
    };

    setTimeout(showFun, 500);

    this.gameShowMoleId = setInterval(showFun, 3900);
  }

  private clearTimers(): void {
    // stop game mole show interval
    if (this.gameShowMoleId !== null) {
      clearInterval(this.gameShowMoleId);
    }
    // stop game clock
    if (this.gameClockId !== null) {
      clearInterval(this.gameClockId);
    }

    document.removeEventListener('keypress', this.keyHandler);
  }

  private startGameClock(Clock: HTMLElement, Level: HTMLElement) {
    this.gameClockId = setInterval(() => {
      const tempCLock = Clock;
      this.gameClock += 1;

      tempCLock.textContent = this.getTimeWithSeconds(this.gameClock);

      if (this.gameClock % 60 === 0) {
        // next level
        this.level += 1;

        if (this.level === 4) {
          this.level = 3;
        }

        Level.textContent = `${this.level}`;
      }

      if (this.gameClock >= 180) { // 180
        // stop game
        this.renderEndGame();
        this.clearTimers();
      }

      if (!document.querySelector('.whac')) {
        this.clearTimers();
      }
    }, 1000);
  }

  private keyHandle(e: Event, scoreValue: HTMLElement, accuracyValue: HTMLElement) {
    const event: KeyboardEvent = e as KeyboardEvent;
    if (
      this.gameField
        .filter((value) => value.isShowed === true)
        .some((value) => {
          if (value.curentLetter === event.key.toLocaleLowerCase()) {
            if (value.letterElement !== null) {
              const svgPath = value.letterElement.querySelector('.letter_img');

              if (svgPath !== null) {
                svgPath.classList.add('handle');
              }
            }

            if (value.moleElement !== null) {
              if (value.timer) {
                clearInterval(value.timer);
              }
              value.curentLetter = '';
              value.moleElement.classList.remove('go');
              setTimeout((v: IMole) => {
                v.isShowed = false;
              }, 800, value);
            }
            return true;
          }

          return false;
        })
    ) {
      this.playSound('hit');
      this.score += 1;

      if (scoreValue !== null) {
        scoreValue.textContent = `${this.score}`;
      }
    } else {
      this.missClickCount += 1;
      this.playSound('click');
    }

    this.clickCount += 1;
    this.accuracy = Number(Number((this.score / this.clickCount) * 100).toFixed(1));
    if (accuracyValue !== null) {
      accuracyValue.textContent = `${this.accuracy}%`;
    }
  }

  private changeSoundLogo(element: HTMLElement): void {
    if (this.isSound === true) {
      this.setBackground(element, soundOn);
    } else {
      this.setBackground(element, soundOff);
    }
  }

  private changeLangLogo(element: HTMLElement): void {
    if (this.language === 'ru') {
      this.setBackground(element, langRu);
    } else {
      this.setBackground(element, langUsa);
    }
  }

  private renderModal(whac: HTMLElement): void {
    const modal = createElement('div', 'modal_low-resolution', whac);
    this.setBackground(modal, whackBackground);
    const wrap = createElement('div', 'modal_wrapper', modal);
    createElement('div', 'message', wrap).textContent = 'Low screen width (nedd more then 800px)!';
  }

  private renderGame(): void {
    this.resetGame();

    const app: HTMLElement | null = document.querySelector('.app');

    if (app !== null) {
      removeChild(app);
      const whac = createElement('div', 'whac', app);
      this.renderModal(whac);
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

      const controls = createElement('div', 'controls', statsBlock);
      const soundButton = createElement('div', 'control_sound', controls);
      this.changeSoundLogo(soundButton);
      soundButton.addEventListener('click', () => {
        this.isSound = !this.isSound;
        this.changeSoundLogo(soundButton);
        localStorage.setItem('whacamoleSound', `${Number(this.isSound)}`);
      });
      const langButton = createElement('div', 'control_lang', controls);
      this.changeLangLogo(langButton);
      langButton.addEventListener('click', () => {
        this.language = this.language === 'ru' ? 'en' : 'ru';
        this.changeLangLogo(langButton);
        localStorage.setItem('whacamoleLang', this.language);
      });

      const gameAgea = createElement('div', 'game-area', game);

      // SET GAME TIMER
      this.startGameClock(timerValue, levelValue);

      // ADD KEYPRESS EVENT
      const handlerWrapper = (e: Event) => {
        this.keyHandle(e, scoreValue, accuracyValue);
      };

      this.keyHandler = handlerWrapper;
      document.addEventListener('keypress', this.keyHandler);

      // SET SHOW MОLE INTERVAL
      this.showMoleTimer();

      // GENERATE MOLES
      for (let i = 0; i < 6; i += 1) {
        const currentMole: IMole = {
          moleElement: null,
          isShowed: false,
          letterElement: null,
          curentLetter: '',
          timer: null,
        };
        const cell = createElement('div', 'cell', gameAgea);
        const hole = createElement('div', 'layer1', cell);
        const mole = createElement('div', 'layer2', cell);

        currentMole.moleElement = mole;

        const charBlock = createElement('div', 'char_block', mole);
        const char = createElement('div', 'char', charBlock);

        currentMole.letterElement = char;

        const holeEmpty = createElement('div', 'layer3', cell);

        this.setBackground(hole, whackHoleImg);
        this.setBackground(holeEmpty, whackHoleEmptyImg);
        this.setBackground(mole, moleImg);

        this.gameField.push(currentMole);
      }
    }
  }

  private renderMenu(): void {
    const app: HTMLElement | null = document.querySelector('.app');

    if (app !== null) {
      removeChild(app);
      const whac = createElement('div', 'whac', app);
      this.renderModal(whac);
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

  private renderEndGame(): void {
    const app: HTMLElement | null = document.querySelector('.app');

    if (app !== null) {
      this.playSound('win');
      removeChild(app);
      const whac = createElement('div', 'whac', app);
      this.renderModal(whac);
      const menu = createElement('div', 'menu', whac);
      this.setBackground(menu, whackBackground);
      const caption = createElement('div', 'game_caption', menu);
      caption.textContent = 'Game end...';
      caption.style.fontSize = '8vw';

      const result = createElement('div', 'game_result', menu);
      const line1 = createElement('div', 'result_line', result);
      createElement('div', 'caption', line1).textContent = 'Level:';
      createElement('div', 'value', line1).textContent = `${this.level}`;
      const line2 = createElement('div', 'result_line', result);
      createElement('div', 'caption', line2).textContent = 'Score:';
      createElement('div', 'value', line2).textContent = `${this.score}`;
      const line3 = createElement('div', 'result_line', result);
      createElement('div', 'caption', line3).textContent = 'Accuracy:';
      createElement('div', 'value', line3).textContent = `${this.accuracy}%`;
      const controls = createElement('div', 'game_controls', menu);
      const startButton = createElement('div', 'controls_restart-btn', controls);
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