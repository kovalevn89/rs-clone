import PageView from './baseViewClass';
import { createElement, removeChild } from '../helper';
import image1 from '../../assets/png/image1.png';
import proposale1 from '../../assets/png/propo1.png';
import proposale2 from '../../assets/png/propo2.png';
import proposale3 from '../../assets/png/propo3.png';
import { Themes } from '../types/enums';
import Sign from './sign';

class Main extends PageView {
  private sign: Sign;
  constructor() {
    super();

    this.sign = new Sign();
  }

  private setBackground(element: HTMLElement, image: string): void {
    element.style.background = `url(${image})`;
    element.style.backgroundRepeat = 'no-repeat';
    element.style.backgroundPosition = 'center';
    element.style.backgroundSize = 'contain';
  }

  private render() {
    const app: HTMLElement | null = document.querySelector('.app');

    if (app !== null) {
      this.translation.cleanObserver(); // clear translate obserber hook

      removeChild(app);
      const main = createElement('div', 'main', app);
      if (this.config.getTheme() === Themes.Dark) {
        main.classList.add('dark');
      } else {
        main.classList.remove('dark');
      }
      const wrapper = createElement('div', 'main_wrapper', main);

      // block1
      const fasterWrap = createElement('div', 'block_typig-faster__wrapper', wrapper);
      const fasterBlock = createElement('div', 'block_typig-faster', fasterWrap);
      const wrapper1 = createElement('div', 'block_wrapper', fasterBlock);
      const leftCol = createElement('div', 'typig-faster__left-col', wrapper1);
      const leftColCaption = createElement('h1', 'left-col__caption', leftCol);
      const leftColCaptionText = createElement('span', 'text', leftColCaption);
      // leftColCaptionText.textContent = 'печатай быстрее';
      leftColCaptionText.textContent = this.translation.getString('typigFasterCaption');
      this.translation.regObserver(() => { leftColCaptionText.textContent = this.translation.getString('typigFasterCaption'); });
      const leftColText = createElement('div', 'left-col__text', leftCol);
      const typingFasterDescription = createElement('span', 'text', leftColText);
      typingFasterDescription.innerHTML = this.translation.getString('typigFasterDescription');
      this.translation.regObserver(() => { typingFasterDescription.innerHTML = this.translation.getString('typigFasterDescription'); });

      const leftColButton = createElement('div', 'left-col__button', leftCol);
      const typingFasterBtn = createElement('div', 'button', leftColButton);
      typingFasterBtn.textContent = this.translation.getString('typigFasterButton');
      this.translation.regObserver(() => { typingFasterBtn.textContent = this.translation.getString('typigFasterButton'); });
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
      const proposaleCaption1 = createElement('h2', 'card__context-caption', cardContext1);
      proposaleCaption1.textContent = this.translation.getString('proposaleCaption1');
      this.translation.regObserver(() => { proposaleCaption1.textContent = this.translation.getString('proposaleCaption1'); });
      const proposaleText1 = createElement('div', 'card__context-text', cardContext1);
      proposaleText1.textContent = this.translation.getString('proposaleText1');
      this.translation.regObserver(() => { proposaleText1.textContent = this.translation.getString('proposaleText1'); });
      const contextLink1 = createElement('div', 'card__context-link', cardContext1);
      const proposaleButton1 = createElement('div', 'context-link__button', contextLink1);
      proposaleButton1.textContent = this.translation.getString('proposaleButton1');
      this.translation.regObserver(() => { proposaleButton1.textContent = this.translation.getString('proposaleButton1'); });

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
      const proposaleCaption2 = createElement('h2', 'card__context-caption', cardContext2);
      proposaleCaption2.textContent = this.translation.getString('proposaleCaption2');
      this.translation.regObserver(() => { proposaleCaption2.textContent = this.translation.getString('proposaleCaption2'); });
      const proposaleText2 = createElement('div', 'card__context-text', cardContext2);
      proposaleText2.textContent = this.translation.getString('proposaleText2');
      this.translation.regObserver(() => { proposaleText2.textContent = this.translation.getString('proposaleText2'); });
      const contextLink2 = createElement('div', 'card__context-link', cardContext2);
      const proposaleButton2 = createElement('div', 'context-link__button', contextLink2);
      proposaleButton2.textContent = this.translation.getString('proposaleButton2');
      this.translation.regObserver(() => { proposaleButton2.textContent = this.translation.getString('proposaleButton2'); });

      // propo3
      const card3 = createElement('div', 'proposales__card', wrapper2);
      card3.style.marginTop = '40px';
      const cardLeft3 = createElement('div', 'card__left', card3);
      const cardImage3 = createElement('div', 'card__image', cardLeft3);
      this.setBackground(cardImage3, proposale3);
      const cardRight3 = createElement('div', 'card__right', card3);
      const cardContext3 = createElement('div', 'card__context', cardRight3);
      const proposaleCaption3 = createElement('h2', 'card__context-caption', cardContext3);
      proposaleCaption3.textContent = this.translation.getString('proposaleCaption3');
      this.translation.regObserver(() => { proposaleCaption3.textContent = this.translation.getString('proposaleCaption3'); });
      const proposaleText3 = createElement('div', 'card__context-text', cardContext3);
      proposaleText3.textContent = this.translation.getString('proposaleText3');
      this.translation.regObserver(() => { proposaleText3.textContent = this.translation.getString('proposaleText3'); });
      const contextLink3 = createElement('div', 'card__context-link', cardContext3);
      const proposaleButton3 = createElement('div', 'context-link__button', contextLink3);
      proposaleButton3.textContent = this.translation.getString('proposaleButton3');
      this.translation.regObserver(() => { proposaleButton3.textContent = this.translation.getString('proposaleButton3'); });

      // registration
      const registration = createElement('div', 'registration', wrapper2);
      const registrationCaption = createElement('h2', 'registration-caption', registration);
      registrationCaption.textContent = this.translation.getString('registrationCaption');
      this.translation.regObserver(() => { registrationCaption.textContent = this.translation.getString('registrationCaption'); });
      const registrationText = createElement('div', 'registration-text', registration);
      registrationText.textContent = this.translation.getString('registrationText');
      this.translation.regObserver(() => { registrationText.textContent = this.translation.getString('registrationText'); });
      const registrationButton = createElement('div', 'registration-button', registration);
      registrationButton.textContent = this.translation.getString('registrationButton');
      this.translation.regObserver(() => { registrationButton.textContent = this.translation.getString('registrationButton'); });
      registrationButton.addEventListener('click', () => {
        this.sign.showUp();
      });
    }
  }

  run(): void {
    this.render();
  }
}

export default Main;
