/* eslint-disable no-param-reassign */
import { createElement } from '../../helper';
// import { Lang } from '../../types';
// import { svgKeyboard } from './svgKeyboard';
import { svgKeybordRu } from './svgKeyboardRu';

class Keyboard {
  keyboard;
  keys;

  constructor() {
    // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
    const _keyboard = createElement('div', 'keyboard');
    _keyboard.innerHTML = svgKeybordRu;

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
      if (key.id.toLowerCase() === id) {
        // console.log(id, key.id);
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
