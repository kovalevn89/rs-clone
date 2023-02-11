import { createElement } from '../../helper';
import { Tag } from '../../types/enums';

export default class LessonView {
  container: HTMLElement;

  constructor() {
    this.container = createElement(Tag.div, 'lessons__container');
  }
}
