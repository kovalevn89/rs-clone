import Keyboard from '../keyboard/keyboard';
import { keyDowmHandler } from './keybordHandlers';
import Text from './text';

class TextInput {
  input;

  constructor() {
    const input = document.createElement('input');
    input.className = 'level__input';
    input.type = 'text';
    input.autofocus = true;
    input.autocomplete = 'off';
    input.autocapitalize = 'off';
    input.ariaHidden = 'true';

    this.input = input;
  }

  listen(keyboard: Keyboard, text: Text): void {
    const press = new Audio();
    // press.src = keyPressSound;
    this.input.addEventListener('keydown', (e) => {
      keyDowmHandler(e, keyboard, text);
      press.play();
    });

    this.input.addEventListener('keyup', () => {
      keyboard.init();
    });

    this.input.addEventListener('blur', () => {
      this.input.focus();
    });
  }
}

export default TextInput;
