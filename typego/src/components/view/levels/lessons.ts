import { createElement } from '../../helper';
import { LESSONS } from '../../helper/constants';
import { Tag } from '../../types/enums';

export default class TrainingLessons {
  container;
  lessons;

  constructor(parent: HTMLElement, l = LESSONS) {
    this.container = createElement(Tag.div, 'training__levels', parent);
    this.lessons = l.map((lesson) => {
      const lev = createElement<HTMLDivElement>(Tag.div, 'treaining__level', this.container, ['id', `level_${lesson.index}`]);
      createElement(Tag.h3, 'training__level__title', lev).textContent = lesson.name;
      createElement<HTMLImageElement>(Tag.img, 'training__image', lev, ['alt', `Lesson ${lesson.index} cover`]).src = '';

      return lev;
    });
  }

  listen() {
    this.lessons.forEach((lesson) => {
      lesson.addEventListener('click', (e) => {
        const { target } = e;
        console.log(target);
      });
    });
  }

  render(): void {

  }
}
