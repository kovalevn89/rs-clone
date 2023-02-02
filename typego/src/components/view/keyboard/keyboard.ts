/* eslint-disable no-param-reassign */
import { svgKeyboard } from './svgKeyboard';
// import { svgKeybordRu } from './svgKeyboardRu';

class Keyboard {
  keyboard;

  constructor() {
    // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
    const _keyboard = document.createElement('div');
    _keyboard.className = 'keyboard';
    _keyboard.innerHTML = svgKeyboard;

    this.keyboard = _keyboard;
  }

  render = (): void => {
    const root = document.querySelector('body');
    root?.append(this.keyboard);
  };
}

export default Keyboard;
