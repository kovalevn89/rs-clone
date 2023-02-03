/* eslint-disable no-param-reassign */
import { Lang } from '../../types';
import { svgKeyboard } from './svgKeyboard';
import { svgKeybordRu } from './svgKeyboardRu';

class Keyboard {
  keyboard;
  keys;

  constructor(lang = Lang.en) {
    // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
    const _keyboard = document.createElement('div');
    _keyboard.className = 'keyboard';
    _keyboard.innerHTML = lang === Lang.en ? svgKeyboard : svgKeybordRu;

    this.keyboard = _keyboard;
    this.keys = this.keyboard.querySelectorAll('.key');
  }

  init() {
    this.keys.forEach((key) => {
      key.classList.remove('active');
    });
  }

  activate(id: string): void {
    this.keys.forEach((key) => {
      if (key.id === id) {
        console.log(id, key.id);
        key.classList.add('active');
      }
    });
  }

  render(): void {
    console.log(this.keys);
    this.keys.forEach((key) => console.log(key.id));
  }
}

export default Keyboard;
