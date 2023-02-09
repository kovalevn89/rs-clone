import { createElement, removeChild } from '../helper';
import image1 from '../../assets/png/image1.png';
import proposale1 from '../../assets/png/propo1.png';
// import proposale2 from '../../assets/png/propo2.png';
// import proposale3 from '../../assets/png/propo3.png';

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
      const fasterBlock = createElement('div', 'block_typig-faster', wrapper);
      const wrapper1 = createElement('div', 'block_wrapper', fasterBlock);
      const leftCol = createElement('div', 'typig-faster__left-col', wrapper1);
      const leftColCaption = createElement('h1', 'left-col__caption', leftCol);
      createElement('span', 'text', leftColCaption).textContent = 'печатай быстрее';
      const leftColText = createElement('div', 'left-col__text', leftCol);
      createElement('span', 'text', leftColText).innerHTML = 'Научись быстро печатать с клавиатурным тренажером <span>TypeGo</span>. Уроки слепой печати помогут тебе использовать все 10 пальцев.';
      const leftColButton = createElement('div', 'left-col__button', leftCol);
      createElement('div', 'button', leftColButton).textContent = 'Начать печатать';
      const rightCol = createElement('div', 'typig-faster__right-col', wrapper1);
      const image = createElement('div', 'image', rightCol);
      image.style.background = `url(${image1}) center no-repeat, radial-gradient(circle, rgba(255, 239, 182, 0.3) 40%, rgba(41, 129, 254, 0.5) 60%) right 5% top 5%`;

      // block2
      const proposalesBlock = createElement('div', 'block_proposales', wrapper);
      createElement('div', 'ellipse1', proposalesBlock);
      createElement('div', 'ellipse2', proposalesBlock);
      const wrapper2 = createElement('div', 'block_wrapper', proposalesBlock);

      const card1 = createElement('div', 'proposales__card', wrapper2);
      const cardLeft1 = createElement('div', 'card__left', card1);
      const cardImage1 = createElement('div', 'card__image', cardLeft1);
      cardImage1.style.background = `url(${proposale1}) center no-repeat`;
      const cardRight1 = createElement('div', 'card__right', card1);
      const cardContext1 = createElement('div', 'card__context', cardRight1);
      createElement('h2', 'card__context-caption', cardContext1).textContent = 'Научись печатать вслепую';
      createElement('div', 'card__context-text', cardContext1).textContent = 'Ускорь прогресс обучения слепой печати и развивай ценные навыки набора текста.';
      const contextLink = createElement('div', 'card__context-link', cardContext1);
      createElement('div', 'context-link__button', contextLink).textContent = 'Перейти к обучению';

      createElement('div', 'proposales__card', wrapper2);
      createElement('div', 'proposales__card', wrapper2);
    }
  }

  run(): void {
    this.render();
  }
}

export default Main;
