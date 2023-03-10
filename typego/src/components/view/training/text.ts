import { createElement } from '../../helper';
import {
  KEYS_EN, KEYS_RU, KEYS_EN_SHIFT, KEYS_RU_SHIFT,
} from '../../helper/constants';
import stringSplitter from '../../helper/stringSplitter';
import TrainingState from '../../model/trainingState';
import { TextResponse } from '../../types';
import { Lang, Status, Tag } from '../../types/enums';
import Keyboard from '../keyboard/keyboard';

export default class Text {
  container;
  letters: HTMLElement[];
  index: number;
  mistakes: number;
  accuracy: number;
  startTime: number;
  currenTime: number;
  time: number;
  speed: number;
  private state: TrainingState;

  constructor() {
    this.container = createElement(Tag.div, 'text__container');
    this.letters = [];
    this.container.innerHTML = '';

    this.index = 0;
    this.mistakes = 0;
    this.startTime = 0;
    this.currenTime = 0;
    this.time = 0;
    this.speed = 0;
    this.accuracy = 0;
    this.state = new TrainingState();
  }

  render(response: TextResponse): void {
    const content = response.text;
    const { lang } = response;

    this.container.innerHTML = '';

    const splitedContent = stringSplitter(content);
    splitedContent.map((word) => {
      const elem = createElement(Tag.div, 'word', this.container);
      word.map((letter) => {
        const id = lang === Lang.en ? KEYS_EN[letter] : KEYS_RU[letter];
        const ID = lang === Lang.en ? KEYS_EN_SHIFT[letter] : KEYS_RU_SHIFT[letter];

        const element = createElement(Tag.div, 'word__letter', elem, ['id', id || ID], ['caps', ID ? 'true' : '']);
        element.textContent = letter;
        this.letters.push(element);
        return element;
      });
      return elem;
    });
  }

  updateActive() {
    this.letters.forEach((el: HTMLElement) => {
      el.classList.remove(Status.active);
    });
    this.letters[this.index].classList.add(Status.active);
  }

  setIndex(i: number): void {
    this.index = i;
  }

  setMistakes(m: number): void {
    this.mistakes = m;
    this.state.current.mistakes = this.mistakes;
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
    this.state.current.speed = this.speed;
    this.state.current.time = Math.round(t * 60);
  }

  reset(): void {
    this.letters.forEach((el) => {
      el.classList.remove(Status.active);
      el.classList.remove(Status.fixed);
      el.classList.remove(Status.correct);
      el.classList.remove(Status.incorrect);
    });
    this.index = 0;
  }

  updateLetterStatus(i: number, status: Status): void {
    if (i >= this.letters.length) {
      return;
    }
    if (status === Status.reset) {
      this.letters[i].classList
        .remove(Status.active, Status.fixed, Status.correct, Status.incorrect);
    } else {
      this.letters[i].classList.add(status);
    }
  }

  keyboardHint(keyboard: Keyboard): void {
    const { id } = this.letters[this.index];
    const ID = this.letters[this.index].dataset.caps;
    if (id) {
      keyboard.activate(id.toLowerCase(), Status.active);
    }
    if (ID) {
      keyboard.activate(ID.toLowerCase(), Status.active);
      keyboard.activate('shiftleft', Status.active);
    }
  }
}
