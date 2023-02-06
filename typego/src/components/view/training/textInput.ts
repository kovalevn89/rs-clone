import { Status } from '../../types';
import Keyboard from '../keyboard/keyboard';
import Text from './text';
// import keyPressSound from '../../../assets/sounds/9.mp3';

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
    const { words } = text;
    let { index } = text;
    this.input.addEventListener('keydown', (e) => {
      e.preventDefault();
      keyboard.init();
      const id = e.code.toLowerCase();
      console.log(e.code);
      keyboard.activate(id, Status.active);
      press.play();

      if (e.code === 'ShiftRight' || e.code === 'CapsLock' || e.code === 'ShiftLeft') {
        text.updateIndex(index);
      } else if (e.code === 'Backspace') {
        text.updateLetterStatus(index, Status.reset);
        if (index > 0) {
          index -= 1;
          words[index].dataset.fix = 'true';
        }
        text.updateLetterStatus(index, Status.reset);
      } else if (words[index].textContent === e.key) {
        if (words[index].dataset.fix && !words[index].dataset.correct) {
          text.updateLetterStatus(index, Status.fixed);
        } else {
          text.updateLetterStatus(index, Status.correct);
          words[index].dataset.correct = 'true';
        }
        index += 1;
      } else {
        text.updateLetterStatus(index, Status.incorrect);
        words[index].dataset.correct = '';
        index += 1;
      }

      text.updateIndex(index);
      text.updateActive();
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
