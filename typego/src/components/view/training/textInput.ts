import Keyboard from '../keyboard/keyboard';
import { keyDowmHandler } from './keybordHandlers';
import Text from './text';

class TextInput {
  input;
  keys: Record<string, string>;

  constructor() {
    const input = document.createElement('input');
    input.className = 'level__input';
    input.type = 'text';
    input.autofocus = true;
    input.autocomplete = 'off';
    input.autocapitalize = 'off';
    input.ariaHidden = 'true';

    this.keys = {};
    this.input = input;
  }

  listen(keyboard: Keyboard, text: Text): void {
    const press = new Audio();
    // press.src = keyPressSound;
    text.keyboardHint(keyboard);
    this.input.addEventListener('keydown', (e) => {
      keyDowmHandler(e, keyboard, text);
      press.play();
      // this.keys[`${e.key}`] = e.code;
      // console.log(this.keys);
    });

    this.input.addEventListener('keyup', () => {
      keyboard.init();
      console.log(text.index);

      text.keyboardHint(keyboard);
    });

    this.input.addEventListener('blur', () => {
      this.input.focus();
    });
  }
}

export default TextInput;
