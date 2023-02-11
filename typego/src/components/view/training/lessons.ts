/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement } from '../../helper';
import { LESSONS, LESSONS_RU } from '../../helper/constants';
import { Tag } from '../../types/enums';
import TrainingLessons from './levels';
import Training from './training';
import selectRU from '../../../assets/png/selectRu.png';
import selectEN from '../../../assets/png/selectEn.png';
import Api from '../../../api';

export default class TrainingView {
  container: HTMLElement;
  lesson: TrainingLessons;
  private selectRu;
  private selectEn;

  constructor() {
    this.container = createElement(Tag.div, 'training');
    createElement(Tag.h2, 'training__title', this.container).textContent = 'Training';

    const selectContainer = createElement(Tag.div, 'select', this.container);

    this.selectEn = createElement(Tag.div, 'training__select', selectContainer, ['lang', 'en']);
    this.selectRu = createElement(Tag.div, 'training__select', selectContainer, ['lang', 'ru']);

    this.lesson = new TrainingLessons();
  }

  render(parent: HTMLElement): void {
    parent.innerHTML = '';
    parent.append(this.container);

    createElement(Tag.h3, 'select__title', this.selectEn).textContent = 'English Layout';
    createElement<HTMLImageElement>(Tag.img, 'select__img', this.selectEn, ['alt', 'English layout']).src = selectEN;

    createElement(Tag.h3, 'select__title', this.selectRu).textContent = 'Russian Layout';
    createElement<HTMLImageElement>(Tag.img, 'select__img', this.selectRu, ['alt', 'Russian layout']).src = selectRU;

    this.listen();
    this.lesson = new TrainingLessons(LESSONS);
  }

  async listen(): Promise<void> {
    const api = new Api();
    this.selectEn.addEventListener('click', async () => {
      try {
        const lessons = await api.getLessons();
        console.log(lessons);
      } catch (e) {
        console.log(e);
      }

      this.container.innerHTML = '';
      this.lesson = new TrainingLessons(LESSONS);
      this.lesson.render(this.container);
    });

    this.selectRu.addEventListener('click', () => {
      this.container.innerHTML = '';
      this.lesson = new TrainingLessons(LESSONS_RU);
      this.lesson.render(this.container);
    });
  }
}
