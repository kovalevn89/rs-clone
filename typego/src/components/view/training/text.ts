import { createElement } from '../../helper';
import { Lang, Status, TextResponse } from '../../types';
import {
  KEYS_EN, KEYS_EN_SHIFT, KEYS_RU, KEYS_RU_SHIFT,
} from '../../types/constants';
import Keyboard from '../keyboard/keyboard';

export default class Text {
  container;
  words: HTMLElement[];
  index: number;
  mistakes: number;
  accurancy: number;
  startTime: number;
  currenTime: number;
  time: number;
  speed: number;

  // todo add words

  constructor(response: TextResponse) {
    const content = response.text;
    const { lang } = response;
    this.container = createElement('div', 'text__container');
    this.container.innerHTML = '';
    this.words = content.split('').map((letter, index) => {
      const id = lang === Lang.en ? KEYS_EN[letter] : KEYS_RU[letter];
      const ID = lang === Lang.en ? KEYS_EN_SHIFT[letter] : KEYS_RU_SHIFT[letter];

      const element = createElement('div', 'word__letter', this.container, ['id', id || ID], ['caps', ID ? 'true' : ''], ['index', `i_${index}`]);
      element.textContent = letter;

      this.container.append(element);
      return element;
    });
    this.index = 0;
    this.mistakes = 0;
    this.startTime = 0;
    this.currenTime = 0;
    this.time = 0;
    this.speed = 0;
    this.accurancy = 0;
  }

  updateActive() {
    this.words.forEach((el: HTMLElement) => {
      el.classList.remove(Status.active);
    });
    this.words[this.index].classList.add(Status.active);
  }

  setIndex(i: number): void {
    this.index = i;
  }

  setMistakes(m: number): void {
    this.mistakes = m;
  }

  setCurrentTime(t: number): void {
    this.currenTime = t;
  }

  setStartTime(t: number): void {
    this.startTime = t;
  }

  updateSpeed(): void {
    const t = (this.time + this.currenTime - this.startTime) / 1000 / 60;
    this.speed = t > 0 ? Math.ceil(this.index / t) : 0;
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
    if (id) {
      keyboard.activate(id.toLowerCase(), Status.active);
    }
    if (ID) {
      keyboard.activate(ID.toLowerCase(), Status.active);
      keyboard.activate('shiftleft', Status.active);
    }
  }
}
