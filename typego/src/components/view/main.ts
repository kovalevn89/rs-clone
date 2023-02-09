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

      // block1
      const wrapper1 = createElement('div', 'block_wrapper', wrapper);
      const fasterBlock = createElement('div', 'block_typig-faster', wrapper1);
      const leftCol = createElement('div', 'typig-faster__left-col', fasterBlock);
      const leftColCaption = createElement('h1', 'left-col__caption', leftCol);
      createElement('span', 'text', leftColCaption).textContent = 'печатай быстрее';
      const leftColText = createElement('div', 'left-col__text', leftCol);
      createElement('span', 'text', leftColText).textContent = 'Научись быстро печатать с клавиатурным тренажером TypeGo. Уроки слепой печати помогут тебе использовать все 10 пальцев.';
      const leftColButton = createElement('div', 'left-col__button', leftCol);
      createElement('div', 'button', leftColButton).textContent = 'Начать печатать';
      const rightCol = createElement('div', 'typig-faster__right-col', fasterBlock);
      const image = createElement('div', 'image', rightCol);
      image.style.background = `url(${image1}) center no-repeat, radial-gradient(circle, rgba(255, 239, 182, 0.3) 40%, rgba(41, 129, 254, 0.5) 60%) right 5% top 5%`;

      // block2
      const proposalesBlock = createElement('div', 'block_proposales', wrapper);
      createElement('div', 'proposales__card', proposalesBlock);
      createElement('div', 'proposales__card', proposalesBlock);
      createElement('div', 'proposales__card', proposalesBlock);
    }
  }

  run(): void {
    this.render();
  }
}

export default Main;
