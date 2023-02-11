import { createElement } from '../../helper';
import { DEFAULT_RESPONSE } from '../../helper/constants';
import { Tag } from '../../types/enums';
import Training from './training';

export default class TrainingView {
  container: HTMLElement;
  lesson: Training;
  private selectRu;
  private selectEn;

  constructor() {
    this.container = createElement(Tag.div, 'training__container');

    this.selectEn = createElement(Tag.div, 'training__select', this.container, ['lang', 'en']);
    this.selectRu = createElement(Tag.div, 'training__select', this.container, ['lang', 'ru']);

    this.lesson = new Training(DEFAULT_RESPONSE, this.container);
  }

  render(): void {
    const main = document.querySelector('.main');
    main?.append(this.container);
    // this.container.

    this.listen();
  }

  listen(): void {
    this.selectEn.addEventListener('click', () => {
      this.container.innerHTML = '';
      this.lesson = new Training(DEFAULT_RESPONSE, this.container);
      this.lesson.render();
    });
  }
}
