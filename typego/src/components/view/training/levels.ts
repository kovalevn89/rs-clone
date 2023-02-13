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
  // pagination;

  constructor(l = LESSONS) {
    const cover = [cover1, cover2, cover3, cover4, cover5, cover6];
    this.container = createElement(Tag.div, 'training__levels');

    this.progress = 0;

    this.lessons = l.map((lesson, i) => {
      const lev = createElement<HTMLDivElement>(Tag.div, 'training__level', this.container, ['id', `level_${lesson.index}`]);
      createElement(Tag.h3, 'training__level__title', lev).textContent = lesson.name;
      createElement<HTMLImageElement>(Tag.img, 'training__image', lev, ['alt', `Lesson ${lesson.index} cover`]).src = cover[i];

      return lev;
    });
  }

  private listen() {
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
    const response = {
      ...levels[this.progress],
      lang,
    };
    const trainingContainer = createElement(Tag.div, 'training__container', parent);

    this.updatePagination();
    this.renderTraining(response, lesson, trainingContainer);
  }

  renderTraining(response: TextResponse, lesson: Lesson, parent: HTMLElement): void {
    const { name, index } = response;

    parent.innerHTML = '';

    createElement(Tag.h3, 'training__title', parent).textContent = `${index}: ${name}`;
    const training = new Training(response, parent);
    training.render();
  }

  nextLevel(): void {
    this.progress += 1;
    this.updatePagination();
  }

  updatePagination(): void {
    const pagination = document.querySelectorAll('.level_');
    pagination.forEach((el, i) => {
      if (i < this.progress) {
        el.classList.add('done');
        el.classList.remove('active');
      }
      if (i === this.progress) {
        el.classList.add('active');
      }
    });
  }
}
