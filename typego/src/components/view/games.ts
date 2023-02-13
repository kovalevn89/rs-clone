import PageView from './baseViewClass';
import { createElement, removeChild } from '../helper';
import { Themes } from '../types/enums';

class Games extends PageView {
  private render(): void {
    const app: HTMLElement | null = document.querySelector('.app');

    if (app !== null) {
      removeChild(app);
      const main = createElement('div', 'main', app);
      if (this.config.getTheme() === Themes.Dark) {
        main.classList.add('dark');
      } else {
        main.classList.remove('dark');
      }
      const wrapper = createElement('div', 'games-wrapper', main);
      const gamesBlock = createElement('div', 'games-block', wrapper);
      const gameBlock1 = createElement('div', 'game1', gamesBlock);
      gameBlock1.textContent = 'whack';
      gameBlock1.addEventListener('click', () => { window.location.hash = '#/games?name=whac'; });
      const gameBlock2 = createElement('div', 'game2', gamesBlock);
      gameBlock2.textContent = 'drop';
      gameBlock2.addEventListener('click', () => { window.location.hash = '#/games?name=drop'; });
      const gameBlock3 = createElement('div', 'game3', gamesBlock);
      gameBlock3.textContent = 'shooter';
      gameBlock3.addEventListener('click', () => { window.location.hash = '#/games?name=shooter'; });
    }
  }

  public run(): void {
    this.render();
  }
}

export default Games;
