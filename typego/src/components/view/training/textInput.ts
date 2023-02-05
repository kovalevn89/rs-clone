import { Status } from '../../types';
import Keyboard from '../keyboard/keyboard';
import Text from './text';
// import keyPressSound from '../../../assets/sounds/9.mp3';

class TextInput {
  input;
  // text;

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
      keyboard.init();
      const id = e.code.toLowerCase();
      // console.log(e.code, e.key);
      keyboard.activate(id);
      press.play();
      const word = text.words.find((item) => item.textContent === e.key);
      word?.classList.add(Status.correct);
    });

    this.input.addEventListener('blur', () => {
      this.input.focus();
    });
  }
}

export default TextInput;
