import { createElement } from '../../helper';
import { Lang, Status } from '../../types';
import { svgKeyboard } from './svgKeyboard';
import { svgKeybordRu } from './svgKeyboardRu';

class Keyboard {
  keyboard;
  keys;

  constructor(lang: 'en' | 'ru') {
    this.keyboard = createElement('div', 'keyboard');
    this.keyboard.innerHTML = lang === Lang.en ? svgKeyboard : svgKeybordRu;

    this.keys = this.keyboard.querySelectorAll('.key');
  }

  init(): void {
    this.keys.forEach((key) => {
      key.classList.remove(Status.active, Status.correct, Status.incorrect);
    });
  }

  activate(id: string, status: Status): void {
    if (status === Status.reset) {
      this.init();
      return;
    }
    this.keys.forEach((key) => {
      if (key.id.toLowerCase() === id) {
        key.classList.add(status);
      }
    });
  }
}

export default Keyboard;
