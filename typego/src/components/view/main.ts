import { createElement, removeChild } from '../helper';
import image1 from '../../assets/png/image1.png';

class Main {
  // constructor() {
  //   // console.log('tratata');
  // }

  private render() {
    const app: HTMLElement | null = document.querySelector('.app');

    if (app !== null) {
      removeChild(app);
      const main = createElement('main', 'main', app);
      const wrapper = createElement('div', 'main_wrapper', main);
      const fasterBlock = createElement('div', 'block_typig-faster', wrapper);
      const leftCol = createElement('div', 'typig-faster__left-col', fasterBlock);
      const leftColCaption = createElement('div', 'left-col__caption', leftCol);
      createElement('span', 'text', leftColCaption).textContent = 'печатай быстрее';
      const leftColText = createElement('div', 'left-col__text', leftCol);
      createElement('span', 'text', leftColText).textContent = 'Научись быстро печатать с клавиатурным тренажером TypeGo. Уроки слепой печати помогут тебе использовать все 10 пальцев.';
      const leftColButton = createElement('div', 'left-col__button', leftCol);
      createElement('div', 'button', leftColButton).textContent = 'Начать печатать';
      const rightCol = createElement('div', 'typig-faster__right-col', fasterBlock);

      // const rightColImage = createElement('div', 'right-col__image', rightCol);
      const image = createElement('div', 'image', rightCol);
      image.style.background = `url(${image1}) center no-repeat, radial-gradient(rgba(255, 239, 182, 0.6) 30%, rgb(41, 129, 254) 70%) right 5% top 5%`;
    }
  }

  run(): void {
    this.render();
  }
}

export default Main;
