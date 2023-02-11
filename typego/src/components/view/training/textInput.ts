import { createElement } from '../../helper';
import { Tag, TrainingStatus } from '../../types/enums';
import Keyboard from '../keyboard/keyboard';
import { keyDowmHandler, keyUpHandler } from './keybordHandlers';
import TextTraining from './textTraining';

class TextInput {
  input;
  private status;

  constructor() {
    const input = createElement<HTMLInputElement>(Tag.input, 'level__input');
    input.id = 'main_input';
    input.type = 'text';
    input.autofocus = true;
    input.autocomplete = 'off';
    input.autocapitalize = 'off';
    input.ariaHidden = 'true';

    this.input = input;
    this.status = false;
  }

  listen(keyboard: Keyboard, training: TextTraining): void {
    const { text } = training;

    this.input.addEventListener('keydown', (e) => {
      if (e.code !== 'Escape' && !this.status) {
        text.setStartTime(Date.now());
        this.status = true;
        training.updateInstructions(TrainingStatus.pause);
        return;
      }
      if (e.code === 'Escape') {
        text.time += text.currenTime - text.startTime;
        this.status = false;
        keyboard.init();
        training.updateInstructions(TrainingStatus.continue);
        return;
      }
      keyDowmHandler(e, keyboard, text);
    });

    this.input.addEventListener('keyup', () => {
      if (this.status) {
        keyUpHandler(keyboard, training);
      }
    });

    this.input.addEventListener('blur', () => {
      this.input.focus();
    });
  }
}

export default TextInput;
