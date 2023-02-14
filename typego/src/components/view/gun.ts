import { removeChild } from '../helper/index';

class GunGame {
  language: string;
  score: number;
  accuracy: number;
  gameClock: number;
  level: number;

  constructor() {
    this.language = 'ru';
    this.score = 0;
    this.accuracy = 0;
    this.gameClock = 0;
    this.level = 1;
  }

  private renderStartPage(): void {
    const app: HTMLElement | null = document.querySelector('.app');

    if (app !== null) {
      removeChild(app);
    }
  }

  run(): void {
    this.renderStartPage();
  }
}

export default GunGame;
