import { createElement } from '../../helper';
import { Status } from '../../types';

export default class Text {
  container;
  words;
  index;

  // todo add words

  constructor(content: string) {
    this.container = createElement('div', 'text__container');
    this.container.innerHTML = '';
    this.words = content.split('').map((letter, index) => {
      const element = createElement('div', 'word__letter', this.container, ['id', letter], ['index', `i_${index}`]);
      element.textContent = letter;

      this.container.append(element);
      return element;
    });
    this.index = 0;
  }

  updateActive() {
    this.words.forEach((el) => {
      el.classList.remove(Status.active);
    });
    this.words[this.index].classList.add(Status.active);
  }

  updateIndex(i: number): void {
    this.index = i;
  }

  reset(): void {
    this.words.forEach((el) => {
      el.classList.remove(Status.active);
      el.classList.remove(Status.fixed);
      el.classList.remove(Status.correct);
      el.classList.remove(Status.incorrect);
    });
    this.index = 0;
  }

  updateLetterStatus(i: number, status: Status): void {
    if (i >= this.words.length) {
      return;
    }
    if (status === Status.reset) {
      this.words[i].classList
        .remove(Status.active, Status.fixed, Status.correct, Status.incorrect);
    } else {
      this.words[i].classList.add(status);
    }
    // const el = this.words.find((word) => words.dataset.index === `i_${i}`);
    // el?.classList.add(status);
  }
}
