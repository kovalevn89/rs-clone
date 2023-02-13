import { createElement, removeChild } from '../helper';
import projectImg from '../../assets/png/project.png';
import devImg1 from '../../assets/png/dev1.png';
import devImg2 from '../../assets/png/dev2.png';
import devImg3 from '../../assets/png/dev3.png';

class AboutPage {
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
      const about = createElement('div', 'about', app);
      const wrapper = createElement('div', 'about_wrapper', about);

      // block2
      const proposalesBlock = createElement('div', 'block_proposales', wrapper);
      createElement('div', 'ellipse1', proposalesBlock);
      createElement('div', 'ellipse2', proposalesBlock);
      const wrapper2 = createElement('div', 'block_wrapper', proposalesBlock);
      const wrapper3 = createElement('div', 'block_wrapper-developers', proposalesBlock);

      // about project
      createElement('h2', 'card__context-caption', wrapper2).textContent = 'О проекте';
      const card0 = createElement('div', 'proposales__card', wrapper2);
      card0.style.marginTop = '47px';
      card0.style.marginLeft = '37px';
      const cardLeft0 = createElement('div', 'card__left', card0);
      const cardImage0 = createElement('div', 'card__image', cardLeft0);
      this.setBackground(cardImage0, projectImg);
      const cardRight0 = createElement('div', 'card__right', card0);
      cardRight0.style.order = '-1';
      const cardContext0 = createElement('div', 'card__context', cardRight0);
      createElement('div', 'card__context-text', cardContext0).textContent = `Проект разработан в рамках финального командного задания 
      RS Clone курса Frontend-разработки в Rolling Scopes School 2022Q3.`;
      createElement('div', 'card__context-text', cardContext0).innerHTML = `В рамках этого задания необходимо было собрать команду из 3-х человек и разработать клон популярного приложения или игры. 
      К выбору проекта команда подошла комплексно: в итоге получился тренажер слепой печати, схожий с такими приложениями как <a href="https://www.ratatype.ua/ru/" target="_blank">
      ratatype</a>, <a href="https://www.typingclub.com/" target="_blank">
      typingclub</a>, но с собственным дизайном, дополнительным функционалом и встроенными мини-играми.`;
      const contextLink0 = createElement('div', 'card__context-link', cardContext0);
      createElement('div', 'context-link__button', contextLink0).innerHTML = `<a href="https://github.com/kovalevn89/rs-clone/tree/main" target="_blank">
      Подробности о проекте</a>`;

      // about dev1
      createElement('h2', 'proposales__title', wrapper3).textContent = 'Наша команда';
      const card1 = createElement('div', 'proposales__card', wrapper3);
      const cardLeft1 = createElement('div', 'card__left', card1);
      const cardImage1 = createElement('div', 'card__image', cardLeft1);
      this.setBackground(cardImage1, devImg1);
      const cardRight1 = createElement('div', 'card__right', card1);
      const cardContext1 = createElement('div', 'card__context', cardRight1);
      createElement('h2', 'card__context-caption', cardContext1).innerHTML = `<a href="https://github.com/kovalevn89" target="_blank">
      Николай Ковалев</a>`;
      createElement('h3', 'card__context-subtitle', cardContext1).textContent = 'Руководитель команды, fullstack-разработчик';
      createElement('p', 'card__context-text', cardContext1).textContent = `Координация команды, разработка и поддержка архитектуры приложения, back-end, 
      верстка главной страницы, игра "Whacamole" `;

      // about dev2
      const card2 = createElement('div', 'proposales__card', wrapper3);
      const cardLeft2 = createElement('div', 'card__left', card2);
      const cardImage2 = createElement('div', 'card__image', cardLeft2);
      this.setBackground(cardImage2, devImg2);
      const cardRight2 = createElement('div', 'card__right', card2);
      const cardContext2 = createElement('div', 'card__context', cardRight2);
      createElement('h2', 'card__context-caption', cardContext2).innerHTML = `<a href="https://github.com/annafeona" target="_blank">
      Анна Главатских</a>`;
      createElement('h3', 'card__context-subtitle', cardContext2).textContent = 'Frontend-разработчик';
      createElement('p', 'card__context-text', cardContext2).textContent = `Реализация виртуальной 
      клавиатуры и уроков, дизайн`;

      // about dev3
      const card3 = createElement('div', 'proposales__card', wrapper3);
      const cardLeft3 = createElement('div', 'card__left', card3);
      const cardImage3 = createElement('div', 'card__image', cardLeft3);
      this.setBackground(cardImage3, devImg3);
      const cardRight3 = createElement('div', 'card__right', card3);
      const cardContext3 = createElement('div', 'card__context', cardRight3);
      createElement('h3', 'card__context-caption', cardContext3).innerHTML = `<a href="https://github.com/dikhorsun" target="_blank">
      Дмитрий Хорсун</a>`;
      createElement('h3', 'card__context-subtitle', cardContext3).textContent = 'Frontend-разработчик';
      createElement('p', 'card__context-text', cardContext3).textContent = `Разработка игры "Drop Food", 
      верстка страницы "О нас"`;
    }
  }

  run(): void {
    this.render();
  }
}

export default AboutPage;
