import { createElement } from '../../helper';
import { LESSON, LESSONS } from '../../helper/constants';
import { Tag } from '../../types/enums';
import { Lesson, TextResponse } from '../../types';
import Training from './training';

import cover1 from '../../../assets/png/cover1.png';
import cover2 from '../../../assets/png/cover2.png';
import cover3 from '../../../assets/png/cover3.png';
import cover4 from '../../../assets/png/cover4.png';
import cover5 from '../../../assets/png/cover5.png';
import cover6 from '../../../assets/png/cover6.png';

export default class TrainingLessons {
  private container;
  lessons;
  private progress;
  // navigation;

  constructor(l = LESSONS) {
    const cover = [cover1, cover2, cover3, cover4, cover5, cover6];
    this.container = createElement(Tag.div, 'training__levels');

    this.lessons = l.map((lesson, i) => {
      const lev = createElement<HTMLDivElement>(Tag.div, 'training__level', this.container, ['id', `level_${lesson.index}`]);
      createElement(Tag.h3, 'training__level__title', lev).textContent = lesson.name;
      createElement<HTMLImageElement>(Tag.img, 'training__image', lev, ['alt', `Lesson ${lesson.index} cover`]).src = cover[i];

      return lev;
    });
    this.progress = 3;
  }

  listen() {
    this.lessons.forEach((lesson) => {
      lesson.addEventListener('click', () => {
        this.renderLevels(this.container, LESSON);
      });
    });
  }

  render(parent: HTMLElement): void {
    parent.innerHTML = '';
    createElement(Tag.h2, 'training__title', parent).textContent = 'Lessons';

    parent.append(this.container);
    this.listen();
  }

  renderLevels(parent: HTMLElement, lesson: Lesson): void {
    const { index, lang, levels } = lesson;
    if (!levels) return;
    parent.innerHTML = '';
    const navigationContainer = createElement(Tag.div, 'levels__navigation', parent);
    levels.map((level) => {
      const response = {
        ...level,
        lang,
      };
      const element = createElement(Tag.div, `level_ _${index}`, navigationContainer);
      element.textContent = `${response.index} ${response.name.toUpperCase()}`;

      return element;
    });
  }

  renderTraining(response: TextResponse, lesson: Lesson, parent: HTMLElement): void {
    const { name, index } = response;

    parent.innerHTML = '';

    createElement(Tag.h3, 'training__title', parent).textContent = `${index}: ${name}`;
    const trainingContainer = createElement(Tag.div, 'training__container', parent);

    const training = new Training(response, trainingContainer);
    training.render();
  }

  nextLevel(): void {

  }

  updateNavigation(): void {
    // if (i < this.progress) {
    //   element.classList.add('done');
    // }
    // if (i === this.progress) {
    //   element.classList.add('active');
    // }
  }
}
