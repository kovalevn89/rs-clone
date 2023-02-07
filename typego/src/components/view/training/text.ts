import { createElement } from '../../helper';
import { Status } from '../../types';
import { KEYS_EN, KEYS_EN_SHIFT } from '../../types/constants';
import Keyboard from '../keyboard/keyboard';

export default class Text {
  container;
  words: HTMLElement[];
  index: number;
  mistakes: number;

  // todo add words

  constructor(content: string) {
    this.container = createElement('div', 'text__container');
    this.container.innerHTML = '';
    this.words = content.split('').map((letter, index) => {
      const id = KEYS_EN[letter];
      const ID = KEYS_EN_SHIFT[letter];
      const element = createElement('div', 'word__letter', this.container, ['id', id || ID], ['caps', ID ? 'true' : ''], ['index', `i_${index}`]);
      element.textContent = letter;

      this.container.append(element);
      return element;
    });
    this.index = 0;
    this.mistakes = 0;
  }

  updateActive() {
    this.words.forEach((el: HTMLElement) => {
      el.classList.remove(Status.active);
    });
    this.words[this.index].classList.add(Status.active);
  }

  updateIndex(i: number): void {
    this.index = i;
  }

  updateMistakes(m: number): void {
    this.mistakes = m;
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
  }

  keyboardHint(keyboard: Keyboard): void {
    const { id } = this.words[this.index];
    const ID = this.words[this.index].dataset.caps;
    console.log(this.words);
    console.log(ID, id);
    if (id) {
      keyboard.activate('shiftleft', Status.reset);
      keyboard.activate(id.toLowerCase(), Status.active);
    }
    if (ID) {
      keyboard.activate(ID.toLowerCase(), Status.active);
      keyboard.activate('shiftleft', Status.active);
    }
  }
}
