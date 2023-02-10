import { createElement, removeChild } from '../helper';
import image1 from '../../assets/png/image1.png';
import proposale1 from '../../assets/png/propo1.png';
import proposale2 from '../../assets/png/propo2.png';
import proposale3 from '../../assets/png/propo3.png';

class Main {
  private setBackground(element: HTMLElement, image: string): void {
    element.style.background = `url(${image})`;
    element.style.backgroundRepeat = 'no-repeat';
    element.style.backgroundPosition = 'center';
    element.style.backgroundSize = 'contain';
  }

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
      this.setBackground(image, image1);
      createElement('div', 'ellipse', rightCol);

      // block2
      const proposalesBlock = createElement('div', 'block_proposales', wrapper);
      createElement('div', 'ellipse1', proposalesBlock);
      createElement('div', 'ellipse2', proposalesBlock);
      const wrapper2 = createElement('div', 'block_wrapper', proposalesBlock);

      // propo1
      const card1 = createElement('div', 'proposales__card', wrapper2);
      const cardLeft1 = createElement('div', 'card__left', card1);
      const cardImage1 = createElement('div', 'card__image', cardLeft1);
      this.setBackground(cardImage1, proposale1);
      const cardRight1 = createElement('div', 'card__right', card1);
      const cardContext1 = createElement('div', 'card__context', cardRight1);
      createElement('h2', 'card__context-caption', cardContext1).textContent = 'Научись печатать вслепую';
      createElement('div', 'card__context-text', cardContext1).textContent = 'Ускорь прогресс обучения слепой печати и развивай ценные навыки набора текста.';
      const contextLink1 = createElement('div', 'card__context-link', cardContext1);
      createElement('div', 'context-link__button', contextLink1).textContent = 'Перейти к обучению';

      // propo2
      const card2 = createElement('div', 'proposales__card', wrapper2);
      card2.style.marginTop = '47px';
      card2.style.marginLeft = '37px';
      const cardLeft2 = createElement('div', 'card__left', card2);
      const cardImage2 = createElement('div', 'card__image', cardLeft2);
      this.setBackground(cardImage2, proposale2);
      const cardRight2 = createElement('div', 'card__right', card2);
      cardRight2.style.order = '-1';
      const cardContext2 = createElement('div', 'card__context', cardRight2);
      createElement('h2', 'card__context-caption', cardContext2).textContent = 'Пройди тест скорости печати';
      createElement('div', 'card__context-text', cardContext2).textContent = 'Узнай свою скорость печати и удиви приятелей или руководство полученным сертификатом.';
      const contextLink2 = createElement('div', 'card__context-link', cardContext2);
      createElement('div', 'context-link__button', contextLink2).textContent = 'Перейти к тесту скоростной печати';

      // propo3
      const card3 = createElement('div', 'proposales__card', wrapper2);
      card3.style.marginTop = '40px';
      const cardLeft3 = createElement('div', 'card__left', card3);
      const cardImage3 = createElement('div', 'card__image', cardLeft3);
      this.setBackground(cardImage3, proposale3);
      const cardRight3 = createElement('div', 'card__right', card3);
      const cardContext3 = createElement('div', 'card__context', cardRight3);
      createElement('h2', 'card__context-caption', cardContext3).textContent = 'Учись играя';
      createElement('div', 'card__context-text', cardContext3).textContent = 'Каждая игра направлена на развитие техники вашей печати. Играйте, следите за прогрессом, становитесь ближе к своей цели!';
      const contextLink3 = createElement('div', 'card__context-link', cardContext3);
      createElement('div', 'context-link__button', contextLink3).textContent = 'Перейти к играм';

      // registration
      const registration = createElement('div', 'registration', wrapper2);
      const registrationCaption = createElement('h2', 'registration-caption', registration);
      registrationCaption.textContent = 'Печатать вслепую - легко';
      const registrationText = createElement('div', 'registration-text', registration);
      registrationText.textContent = 'Регистрируйся прямо сейчас, проходи обучение и следи за своим прогрессом';
      const registrationButton = createElement('div', 'registration-button', registration);
      registrationButton.textContent = 'Создать аккаунт';
    }
  }

  run(): void {
    this.render();
  }
}

export default Main;
