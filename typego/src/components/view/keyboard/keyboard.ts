import { createElement } from '../../helper';
import { Lang, Status, Tag } from '../../types/enums';
import { svgKeyboard } from './svgKeyboard';
import { svgKeybordRu } from './svgKeyboardRu';

class Keyboard {
  private keyboard;
  private keys;

  constructor() {
    this.keyboard = createElement(Tag.div, 'keyboard');

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

  render(parent: HTMLElement, lang: 'en' | 'ru'): void {
    parent.append(this.keyboard);
    this.keyboard.innerHTML = lang === Lang.en ? svgKeyboard : svgKeybordRu;
    this.keys = this.keyboard.querySelectorAll('.key');
  }

  remove(): void {
    this.keyboard.remove();
  }
}

export default Keyboard;
