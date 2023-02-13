import PageView from './baseViewClass';
import { createElement, removeChild } from '../helper';
import errorImage from '../../assets/png/404.png';
import { Themes } from '../types/enums';

class Error extends PageView {
  private render(messsageText: string): void {
    const app: HTMLElement | null = document.querySelector('.app');

    if (app !== null) {
      removeChild(app);
      const main = createElement('div', 'main', app);
      if (this.currentTheme === Themes.Dark) {
        main.classList.add('dark');
      }
      const wrapper = createElement('div', 'error-wrapper', main);
      const errorBlock = createElement('div', 'error-block', wrapper);
      const image = createElement('div', 'error-image', errorBlock);
      image.style.background = `url(${errorImage}) center no-repeat`;
      image.style.backgroundSize = 'contain';
      const message = createElement('div', 'error-message', errorBlock);
      message.textContent = messsageText;
    }
  }

  public run(messsageText: string): void {
    this.render(messsageText);
  }
}

export default Error;
