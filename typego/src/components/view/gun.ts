import { createElement, removeChild, getWord } from '../helper/index';
import shotSound from '../../assets/media/shot.mp3';
import clickSound from '../../assets/media/click.mp3';
import pressSound from '../../assets/media/press.mp3';
import winGunSound from '../../assets/media/winGun.mp3';
import { IShooter } from '../types/index';

class GunGame {
  language: string;
  isSound: boolean;
  score: number;
  accuracy: number;
  gameClock: number;
  level: number;
  keyListener: (event: Event) => void;
  gameClockId: NodeJS.Timeout | null;
  gameShowGunId: NodeJS.Timeout | null;
  levelChangeId: NodeJS.Timeout | null;
  gameField: Array<IShooter>;
  totalWord: number;
  inputStr: string;

  constructor() {
    this.language = 'ru';
    this.isSound = true;
    this.score = 0;
    this.accuracy = 0;
    this.gameClock = 99;
    this.level = 1;
    this.keyListener = () => {};
    this.gameClockId = null;
    this.gameShowGunId = null;
    this.levelChangeId = null;
    this.gameField = [];
    this.totalWord = 0;
    this.inputStr = '';

    const gunSound = localStorage.getItem('gunSound');
    if (gunSound !== null) {
      this.isSound = Boolean(Number(gunSound));
    }

    const gunLang = localStorage.getItem('gunLang');
    if (gunLang !== null) {
      this.language = gunLang;
    }
  }

  private resetGame(): void {
    this.gameField = [];
    this.score = 0;
    this.accuracy = 0;
    this.gameClock = 99;
    this.level = 1;
    this.inputStr = '';
    this.totalWord = 0;
  }

  private playSound(type: string): void {
    if (this.isSound === true) {
      switch (type) {
        case 'shot':
          new Audio(shotSound).play();
          break;
        case 'click':
          new Audio(clickSound).play();
          break;
        case 'press':
          new Audio(pressSound).play();
          break;
        case 'winGun':
          new Audio(winGunSound).play();
          break;
        default: {
          new Audio(clickSound).play();
        }
      }
    }
  }

  private changeSoundBtnInner(): string {
    let soundLogo;
    if (this.isSound === true) {
      soundLogo = `${String.fromCodePoint(0x1d160)}`;
    } else {
      soundLogo = `${String.fromCodePoint(0x1d194)}`;
    }
    return soundLogo;
  }

  private changeLangBtnInner(): string {
    let lengText;
    if (this.language === 'ru') {
      lengText = 'ru';
    } else {
      lengText = 'en';
    }
    return lengText;
  }

  private startGameClock(Clock: HTMLElement, Level: HTMLElement) {
    this.levelChangeId = setInterval(() => {
      this.level += 1;
      Level.textContent = `${this.level}`;
    }, 30000);

    this.gameClockId = setInterval(() => {
      const tempCLock = Clock;
      this.gameClock -= 1;

      tempCLock.textContent = `${this.gameClock} s`;

      if (this.gameClock <= 0) {
        this.renderEndGame();
        this.clearTimers();
      }

      if (!document.querySelector('.gun-wrapper')) {
        this.clearTimers();
      }
    }, 1000);
  }

  private clearTimers(): void {
    if (this.gameShowGunId !== null) {
      clearInterval(this.gameShowGunId);
    }

    if (this.gameClockId !== null) {
      clearInterval(this.gameClockId);
    }

    if (this.levelChangeId !== null) {
      clearInterval(this.levelChangeId);
    }

    document.removeEventListener('keypress', this.keyListener);
  }

  private renderStartPage(): void {
    const app: HTMLElement | null = document.querySelector('.app');
    // const header: HTMLElement | null = document.querySelector('.header');
    // const footer: HTMLElement | null = document.querySelector('.footer');
    // if (header) {
    //   header.style.display = 'none';
    // }
    // if (footer) {
    //   footer.style.display = 'none';
    // }

    if (app !== null) {
      removeChild(app);
      const gunWrapper = createElement('div', 'gun-wrapper', app);
      const bgrWrapper = createElement('div', 'bgr-wrapper', gunWrapper);
      const menu = createElement('div', 'menu', bgrWrapper);
      const caption = createElement('div', 'game_caption', menu);
      caption.textContent = `
      Hogan's Alley`;
      const controls = createElement('div', 'game_controls', menu);
      const startButton = createElement('div', 'controls_start-btn', controls);
      startButton.addEventListener('click', () => {
        this.renderGame();
        this.playSound('click');
      });
    }
  }

  private renderEndGame(): void {
    const app: HTMLElement | null = document.querySelector('.app');

    if (app !== null) {
      this.playSound('winGun');
      removeChild(app);
      const gunWrapper = createElement('div', 'gun-wrapper', app);
      const bgrWrapper = createElement('div', 'bgr-wrapper', gunWrapper);
      const menu = createElement('div', 'menu', bgrWrapper);
      const caption = createElement('div', 'game_caption', menu);
      caption.textContent = 'Game over';

      const result = createElement('div', 'game_result', menu);
      const line1 = createElement('div', 'result_line', result);
      createElement('div', 'caption', line1).textContent = 'Level:';
      createElement('div', 'value', line1).textContent = `${this.level}`;
      const line2 = createElement('div', 'result_line', result);
      createElement('div', 'caption', line2).textContent = 'Score:';
      createElement('div', 'value', line2).textContent = `${this.score}`;
      const line3 = createElement('div', 'result_line', result);
      createElement('div', 'caption', line3).textContent = 'Gun accuracy:';
      createElement('div', 'value', line3).textContent = `${this.accuracy}%`;
      const controls = createElement('div', 'game_controls', menu);
      const startButton = createElement('div', 'controls_restart-btn', controls);
      startButton.addEventListener('click', () => {
        this.renderGame();
        this.playSound('click');
      });
    }
  }

  private renderGame(): void {
    this.resetGame();
    const app: HTMLElement | null = document.querySelector('.app');

    if (app !== null) {
      removeChild(app);
      const gunWrapper = createElement('div', 'gun-wrapper', app);
      const bgrWrapper = createElement('div', 'bgr-wrapper', gunWrapper);

      const langButton = createElement('div', 'control_lang', bgrWrapper);
      langButton.textContent = this.changeLangBtnInner();
      langButton.addEventListener('click', () => {
        this.language = this.language === 'ru' ? 'en' : 'ru';
        langButton.textContent = this.changeLangBtnInner();
        localStorage.setItem('gunLang', this.language);
      });

      const soundButton = createElement('div', 'control_sound', bgrWrapper);
      soundButton.textContent = this.changeSoundBtnInner();
      soundButton.addEventListener('click', () => {
        this.isSound = !this.isSound;
        soundButton.textContent = this.changeSoundBtnInner();
        localStorage.setItem('gunSound', `${Number(this.isSound)}`);
      });

      const statsLevel = createElement('div', 'stats_level', bgrWrapper);
      createElement('div', 'label', statsLevel).textContent = 'R=';
      const levelValue = createElement('div', 'value', statsLevel);
      levelValue.textContent = '1';

      const statsScore = createElement('div', 'stats_score', bgrWrapper);
      createElement('div', 'label', statsScore).textContent = 'Score:';
      const scoreValue = createElement('div', 'value', statsScore);
      scoreValue.textContent = '0';

      const statsAccuracy = createElement('div', 'stats_accuracy', bgrWrapper);
      createElement('div', 'label', statsAccuracy).textContent = 'Gun accuracy:';
      const accuracyValue = createElement('div', 'value', statsAccuracy);
      accuracyValue.textContent = `${this.accuracy}%`;

      const statsTime = createElement('div', 'stats_time', bgrWrapper);
      createElement('div', 'label', statsTime).textContent = 'Time:';
      const timerValue = createElement('div', 'value', statsTime);
      timerValue.textContent = `${this.gameClock} s`;

      for (let i = 1; i <= 4; i += 1) {
        const currentShooter: IShooter = {
          shooterElement: null,
          isShowed: false,
          wordElement: null,
          curentword: '',
          timer: null,
        };
        const shooterWrap = createElement('div', `shooter${i}-wrap`, bgrWrapper);
        const word = createElement('div', 'word', shooterWrap);
        createElement('div', `shooter${i}-bgr`, shooterWrap);

        currentShooter.shooterElement = shooterWrap;
        currentShooter.wordElement = word;
        this.gameField.push(currentShooter);
      }
      this.startGameClock(timerValue, levelValue);

      this.showShooterTimer();

      this.keyListener = (e: Event) => {
        this.wordHandle(e, scoreValue, accuracyValue);
      };

      document.addEventListener('keypress', this.keyListener);
    }
  }

  private wordHandle(e: Event, scoreValue: HTMLElement, accuracyValue: HTMLElement) {
    const event: KeyboardEvent = e as KeyboardEvent;
    const statsTime = document.querySelector<HTMLElement>('.stats_time');
    this.inputStr += event.key;
    if (
      this.gameField
        .filter((value) => value.isShowed === true)
        .some((value) => {
          if (
            this.inputStr.toLocaleLowerCase().includes(value.curentword.toLocaleLowerCase())
            && this.inputStr.length > 1
          ) {
            if (value.wordElement !== null) {
              value.wordElement.style.color = 'green';
            }
            if (statsTime !== null) {
              statsTime.style.color = 'green';
            }
            this.gameClock += 2;
            this.totalWord += 1;

            if (value.shooterElement !== null) {
              if (value.timer) {
                clearInterval(value.timer);
              }
              value.curentword = '';
              this.inputStr = '';

              value.shooterElement.classList.remove('go');
              setTimeout(
                () => {
                  value.isShowed = false;
                  if (value.wordElement) {
                    value.wordElement.style.color = 'white';
                  }
                  if (statsTime !== null) {
                    statsTime.style.color = 'white';
                  }
                },
                900,
                value,
              );
            }
            return true;
          }

          return false;
        })
    ) {
      this.playSound('shot');
      this.score += 1;

      if (scoreValue !== null) {
        scoreValue.textContent = `${this.score}`;
      }
    } else {
      this.playSound('press');
    }

    this.accuracy = Number(Number((this.score / this.totalWord) * 100).toFixed(1));
    if (accuracyValue !== null) {
      accuracyValue.textContent = `${this.accuracy}%`;
    }
  }

  private showShooterTimer(): void {
    const showFun = () => {
      if (this.gameField.length > 0) {
        let randomCount = 1;
        switch (this.level) {
          case 1:
            randomCount = Math.floor(Math.random() * 2) + 1;
            break;
          case 2:
            randomCount = Math.floor(Math.random() * 2) + 1;
            break;
          case 3:
            randomCount = Math.floor(Math.random() * 2) + 2;
            break;
          case 4:
            randomCount = Math.floor(Math.random() * 3) + 2;
            break;
          default:
            randomCount = Math.floor(Math.random() * 2) + 3;
            break;
        }

        this.gameField
          .slice(0)
          .filter((value) => value.isShowed === false)
          .sort(() => Math.random() - 0.5)
          .forEach((value) => {
            if (randomCount) {
              randomCount -= 1;
              this.showShooter(value);
            }
          });
      }
    };

    setTimeout(showFun, 500);

    this.gameShowGunId = setInterval(showFun, 7000);
  }

  private showShooter(shooter: IShooter): void {
    const currentShooter: IShooter = shooter;
    let word: string | null = null;
    const statsTime = document.querySelector<HTMLElement>('.stats_time');
    const statsAccuracy = document.querySelector<HTMLElement>('.stats_accuracy .value');

    do {
      word = getWord(this.language);
    } while (this.checkwordShowed(word));

    if (currentShooter.wordElement !== null) {
      currentShooter.wordElement.textContent = word;
    }

    currentShooter.curentword = word;
    currentShooter.isShowed = true;

    if (currentShooter.shooterElement !== null) {
      currentShooter.shooterElement.classList.add('go');

      currentShooter.timer = setTimeout(() => {
        if (currentShooter.shooterElement !== null) {
          currentShooter.shooterElement.classList.remove('go');

          if (currentShooter.wordElement !== null) {
            currentShooter.wordElement.style.color = 'red';
          }

          if (statsTime !== null) {
            statsTime.style.color = 'red';
          }

          this.gameClock -= 2;
          this.totalWord += 1;
          this.accuracy = Number(Number((this.score / this.totalWord) * 100).toFixed(1));
          if (statsAccuracy !== null) {
            statsAccuracy.textContent = `${this.accuracy}%`;
          }

          currentShooter.timer = setTimeout(() => {
            currentShooter.isShowed = false;
            currentShooter.curentword = '';
            if (currentShooter.wordElement !== null) {
              currentShooter.wordElement.style.color = 'white';
            }
            if (statsTime !== null) {
              statsTime.style.color = 'white';
            }
          }, 900);
        }
      }, 6000);
    }
  }

  private checkwordShowed(word: string): boolean {
    return this.gameField.some((value) => value.curentword === word);
  }

  run(): void {
    this.renderStartPage();
  }
}

export default GunGame;
