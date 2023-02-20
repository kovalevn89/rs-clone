import PageView from './baseViewClass';
import { createElement, removeChild } from '../helper';
import { Themes } from '../types/enums';
import whack from '../../assets/img/mole.png';
import drop from '../../assets/img/drob-food.png';
import gun from '../../assets/img/gun-game.png';

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
      const title = createElement('h2', 'games-title', wrapper);
      title.textContent = this.translation.getString('captiongamePage');
      this.translation.regObserver(() => {
        title.textContent = this.translation.getString('captiongamePage');
      });

      const gamesBlock = createElement('div', 'games-block', wrapper);

      const game1 = createElement('div', 'game1', gamesBlock);
      game1.addEventListener('click', () => {
        window.location.hash = '#/games?name=whac';
      });
      createElement('h3', 'games-title', game1).textContent = 'whack-a-mole';
      createElement<HTMLImageElement>('img', 'bgr', game1, ['alt', 'whack-a-mole']).src = whack;

      const game2 = createElement('div', 'game2', gamesBlock);
      game2.addEventListener('click', () => {
        window.location.hash = '#/games?name=drop';
      });
      createElement('h3', 'games-title', game2).textContent = 'Drop Food';
      createElement<HTMLImageElement>('img', 'bgr', game2, ['alt', 'whack-a-mole']).src = drop;

      const game3 = createElement('div', 'game3', gamesBlock);
      game3.addEventListener('click', () => {
        window.location.hash = '#/games?name=shooter';
      });
      createElement('h3', 'games-title', game3).textContent = `
      Hogan's Alley`;
      createElement<HTMLImageElement>('img', 'bgr', game3, ['alt', 'whack-a-mole']).src = gun;
    }
  }

  public run(): void {
    this.render();
  }
}

export default Games;
