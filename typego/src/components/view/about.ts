import PageView from './baseViewClass';
import { Themes } from '../types/enums';
import { createElement, removeChild } from '../helper';
import projectImg from '../../assets/png/project.png';
import devImg1 from '../../assets/png/dev1.png';
import devImg2 from '../../assets/png/dev2.png';
import devImg3 from '../../assets/png/dev3.png';

class AboutPage extends PageView {
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
      const about = createElement('div', 'main', app);

      this.translation.cleanObserver(); // clear translate obserber hook

      if (this.config.getTheme() === Themes.Dark) {
        about.classList.add('dark');
      } else {
        about.classList.remove('dark');
      }
      const wrapper = createElement('div', 'about_wrapper', about);

      // block2
      const proposalesBlock = createElement('div', 'block_proposales', wrapper);
      createElement('div', 'ellipse1', proposalesBlock);
      createElement('div', 'ellipse2', proposalesBlock);
      const wrapper2 = createElement('div', 'block_wrapper', proposalesBlock);
      const wrapper3 = createElement('div', 'block_wrapper-developers', proposalesBlock);

      // about project
      const aboutCaption = createElement('h2', 'card__context-caption', wrapper2);
      aboutCaption.textContent = this.translation.getString('aboutCaption');
      this.translation.regObserver(() => { aboutCaption.textContent = this.translation.getString('aboutCaption'); });
      const card0 = createElement('div', 'proposales__card', wrapper2);
      card0.style.marginTop = '47px';
      card0.style.marginLeft = '37px';
      const cardLeft0 = createElement('div', 'card__left', card0);
      const cardImage0 = createElement('div', 'card__image', cardLeft0);
      this.setBackground(cardImage0, projectImg);
      const cardRight0 = createElement('div', 'card__right', card0);
      cardRight0.style.order = '-1';
      const cardContext0 = createElement('div', 'card__context', cardRight0);
      const aboutDescription1 = createElement('div', 'card__context-text', cardContext0);
      aboutDescription1.textContent = this.translation.getString('aboutDescription1');
      this.translation.regObserver(() => { aboutDescription1.textContent = this.translation.getString('aboutDescription1'); });
      const aboutDescription2 = createElement('div', 'card__context-text', cardContext0);
      aboutDescription2.innerHTML = this.translation.getString('aboutDescription2');
      this.translation.regObserver(() => { aboutDescription2.innerHTML = this.translation.getString('aboutDescription2'); });
      const contextLink0 = createElement('div', 'card__context-link', cardContext0);
      const contextLinkButton = createElement('div', 'context-link__button', contextLink0);
      const contextLinkButton1 = createElement('a', '', contextLinkButton, ['href', 'https://github.com/kovalevn89/rs-clone/tree/main'], ['target', '_blank']);
      contextLinkButton1.textContent = this.translation.getString('aboutButton');
      this.translation.regObserver(() => { contextLinkButton1.textContent = this.translation.getString('aboutButton'); });

      // about dev1
      const aboutTeamCaption = createElement('h2', 'proposales__title', wrapper3);
      aboutTeamCaption.textContent = this.translation.getString('aboutTeamCaption');
      this.translation.regObserver(() => { aboutTeamCaption.textContent = this.translation.getString('aboutTeamCaption'); });
      const card1 = createElement('div', 'proposales__card', wrapper3);
      const cardLeft1 = createElement('div', 'card__left', card1);
      const cardImage1 = createElement('div', 'card__image', cardLeft1);
      this.setBackground(cardImage1, devImg1);
      const cardRight1 = createElement('div', 'card__right', card1);
      const cardContext1 = createElement('div', 'card__context', cardRight1);
      const cardContextCaption1 = createElement('h2', 'card__context-caption', cardContext1);
      const cardContextCaptionLink1 = createElement('a', '', cardContextCaption1, ['href', 'https://github.com/kovalevn89'], ['target', '_blank']);
      cardContextCaptionLink1.textContent = this.translation.getString('aboutDeveloperName1');
      this.translation.regObserver(() => { cardContextCaptionLink1.textContent = this.translation.getString('aboutDeveloperName1'); });
      const aboutDeveloperPosition1 = createElement('h3', 'card__context-subtitle', cardContext1);
      aboutDeveloperPosition1.textContent = this.translation.getString('aboutDeveloperPosition1');
      this.translation.regObserver(() => { aboutDeveloperPosition1.textContent = this.translation.getString('aboutDeveloperPosition1'); });
      const aboutDeveloperDiscription1 = createElement('p', 'card__context-text', cardContext1);
      aboutDeveloperDiscription1.textContent = this.translation.getString('aboutDeveloperDiscription1');
      this.translation.regObserver(() => { aboutDeveloperDiscription1.textContent = this.translation.getString('aboutDeveloperDiscription1'); });

      // about dev2
      const card2 = createElement('div', 'proposales__card', wrapper3);
      const cardLeft2 = createElement('div', 'card__left', card2);
      const cardImage2 = createElement('div', 'card__image', cardLeft2);
      this.setBackground(cardImage2, devImg2);
      const cardRight2 = createElement('div', 'card__right', card2);
      const cardContext2 = createElement('div', 'card__context', cardRight2);
      const cardContextCaption2 = createElement('h2', 'card__context-caption', cardContext2);
      const aboutDeveloperName2 = createElement('a', '', cardContextCaption2, ['href', 'https://github.com/annafeona'], ['target', '_blank']);
      aboutDeveloperName2.textContent = this.translation.getString('aboutDeveloperName2');
      this.translation.regObserver(() => { aboutDeveloperName2.textContent = this.translation.getString('aboutDeveloperName2'); });
      const aboutDeveloperPosition2 = createElement('h3', 'card__context-subtitle', cardContext2);
      aboutDeveloperPosition2.textContent = this.translation.getString('aboutDeveloperPosition2');
      this.translation.regObserver(() => { aboutDeveloperPosition2.textContent = this.translation.getString('aboutDeveloperPosition2'); });
      const aboutDeveloperDiscription2 = createElement('p', 'card__context-text', cardContext2);
      aboutDeveloperDiscription2.textContent = this.translation.getString('aboutDeveloperDiscription2');
      this.translation.regObserver(() => { aboutDeveloperDiscription2.textContent = this.translation.getString('aboutDeveloperDiscription2'); });

      // about dev3
      const card3 = createElement('div', 'proposales__card', wrapper3);
      const cardLeft3 = createElement('div', 'card__left', card3);
      const cardImage3 = createElement('div', 'card__image', cardLeft3);
      this.setBackground(cardImage3, devImg3);
      const cardRight3 = createElement('div', 'card__right', card3);
      const cardContext3 = createElement('div', 'card__context', cardRight3);
      const cardContextCaption3 = createElement('h3', 'card__context-caption', cardContext3);
      const aboutDeveloperName3 = createElement('a', '', cardContextCaption3, ['href', 'https://github.com/dikhorsun'], ['target', '_blank']);
      aboutDeveloperName3.textContent = this.translation.getString('aboutDeveloperName3');
      this.translation.regObserver(() => { aboutDeveloperName3.textContent = this.translation.getString('aboutDeveloperName3'); });
      const aboutDeveloperPosition3 = createElement('h3', 'card__context-subtitle', cardContext3);
      aboutDeveloperPosition3.textContent = this.translation.getString('aboutDeveloperPosition3');
      this.translation.regObserver(() => { aboutDeveloperPosition3.textContent = this.translation.getString('aboutDeveloperPosition3'); });
      const aboutDeveloperDiscription3 = createElement('p', 'card__context-text', cardContext3);
      aboutDeveloperDiscription3.textContent = this.translation.getString('aboutDeveloperDiscription3');
      this.translation.regObserver(() => { aboutDeveloperDiscription3.textContent = this.translation.getString('aboutDeveloperDiscription3'); });
    }
  }

  run(): void {
    this.render();
  }
}

export default AboutPage;
