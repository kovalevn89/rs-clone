import { createElement, removeChild } from '../helper/index';
import hitSound from '../../assets/media/hit.mp3';
import clickSound from '../../assets/media/click.mp3';
import winSound from '../../assets/media/win.mp3';

class GunGame {
  language: string;
  isSound: boolean;
  score: number;
  accuracy: number;
  gameClock: number;
  level: number;

  constructor() {
    this.language = 'RU';
    this.isSound = true;
    this.score = 0;
    this.accuracy = 0;
    this.gameClock = 0;
    this.level = 1;

    const gunSound = localStorage.getItem('gunSound');
    if (gunSound !== null) {
      this.isSound = Boolean(Number(gunSound));
    }

    const gunLang = localStorage.getItem('gunLang');
    if (gunLang !== null) {
      this.language = gunLang;
    }
  }

  // private setBackground(element: HTMLElement, backgroundImage: string): HTMLElement {
  //   const el = element;
  //   el.style.backgroundImage = `url(${backgroundImage})`;
  //   el.style.backgroundPosition = 'center';
  //   el.style.backgroundRepeat = 'no-repeat';
  //   el.style.backgroundSize = 'cover';

  //   return el;
  // }

  private resetGame(): void {
    this.score = 0;
    this.accuracy = 0;
    this.gameClock = 0;
    this.level = 1;
  }

  private playSound(type: string): void {
    if (this.isSound === true) {
      switch (type) {
        case 'hit':
          new Audio(hitSound).play();
          break;
        case 'click':
          new Audio(clickSound).play();
          break;
        case 'win':
          new Audio(winSound).play();
          break;
        default: {
          new Audio(hitSound).play();
          // поменять
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
    if (this.language === 'RU') {
      lengText = 'RU';
    } else {
      lengText = 'EN';
    }
    return lengText;
  }

  private renderStartPage(): void {
    const app: HTMLElement | null = document.querySelector('.app');

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
      });
    }
  }

  private renderEndGame(): void {
    const app: HTMLElement | null = document.querySelector('.app');

    if (app !== null) {
      this.playSound('win');
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
      createElement('div', 'caption', line3).textContent = 'Accuracy:';
      createElement('div', 'value', line3).textContent = `${this.accuracy}%`;
      const controls = createElement('div', 'game_controls', menu);
      const startButton = createElement('div', 'controls_restart-btn', controls);
      startButton.addEventListener('click', () => {
        this.renderGame();
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
      // control_lang
      const langButton = createElement('div', 'control_lang', bgrWrapper);
      langButton.textContent = this.changeLangBtnInner();
      langButton.addEventListener('click', () => {
        this.language = this.language === 'RU' ? 'EN' : 'RU';
        langButton.textContent = this.changeLangBtnInner();
        localStorage.setItem('gunLang', `${Number(this.language)}`);
      });
      // control_sound
      const soundButton = createElement('div', 'control_sound', bgrWrapper);
      soundButton.textContent = this.changeSoundBtnInner();
      soundButton.addEventListener('click', () => {
        this.isSound = !this.isSound;
        soundButton.textContent = this.changeSoundBtnInner();
        localStorage.setItem('gunSound', `${Number(this.isSound)}`);
      });
      // level
      const statsLevel = createElement('div', 'stats_level', bgrWrapper);
      createElement('div', 'label', statsLevel).textContent = 'R=';
      const levelValue = createElement('div', 'value', statsLevel);
      levelValue.textContent = '1';
      // score
      const statsScore = createElement('div', 'stats_score', bgrWrapper);
      createElement('div', 'label', statsScore).textContent = 'Score:';
      const scoreValue = createElement('div', 'value', statsScore);
      scoreValue.textContent = '0';
      // accuracy
      const statsAccuracy = createElement('div', 'stats_accuracy', bgrWrapper);
      createElement('div', 'label', statsAccuracy).textContent = 'Accuracy:';
      const accuracyValue = createElement('div', 'value', statsAccuracy);
      accuracyValue.textContent = '100%';
      // time
      const statsTime = createElement('div', 'stats_time', bgrWrapper);
      createElement('div', 'label', statsTime).textContent = 'Time:';
      const timerValue = createElement('div', 'value', statsTime);
      timerValue.textContent = '00s';
      // shooters
      for (let i = 1; i <= 4; i += 1) {
        this.createShooterWrap(bgrWrapper, i);
      }
    }
  }

  private createShooterWrap(parent: HTMLElement, index: number) {
    const shooterWrap = createElement('div', `shooter${index}-wrap`, parent);
    createElement('div', 'word', shooterWrap);
    createElement('div', `shooter${index}-bgr`, shooterWrap);
  }
  run(): void {
    this.renderStartPage();
  }
}

export default GunGame;
