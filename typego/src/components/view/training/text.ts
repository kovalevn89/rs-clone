import { createElement } from '../../helper';
import { Status } from '../../types';

export default class Text {
  container;
  words;

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
  }

  reset(): void {
    this.words.forEach((el) => {
      el.classList.remove('active');
      el.classList.remove('fixed');
      el.classList.remove('correct');
      el.classList.remove('incorrect');
    });
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
