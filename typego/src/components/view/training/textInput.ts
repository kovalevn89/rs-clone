/* eslint-disable import/no-cycle */
import { createElement } from '../../helper';
import TrainingState from '../../model/trainingState';
import { Tag, TrainingStatus } from '../../types/enums';
import { keyDowmHandler, keyUpHandler } from './keybordHandlers';
import TrainingTask from './trainingTask';

export default class TextInput {
  input;
  private status;
  isComplete;
  private state;

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
    this.isComplete = false;
    this.state = new TrainingState();
  }

  listen(training: TrainingTask): void {
    const { textTraining, keyboard } = training;
    const { text } = textTraining;

    this.input.addEventListener('blur', () => {
      if (!this.isComplete) {
        this.input.focus();
      }
    });

    this.input.addEventListener('keydown', (e) => {
      if (!this.isComplete) {
        if (e.code !== 'Escape' && !this.status) {
          text.setStartTime(Date.now());
          this.status = true;
          textTraining.updateInstructions(TrainingStatus.pause);
          return;
        }
        if (e.code === 'Escape') {
          text.time += text.currenTime - text.startTime;
          this.status = false;
          keyboard.init();
          textTraining.updateInstructions(TrainingStatus.continue);
          return;
        }
        keyDowmHandler(e, training);
      }
    });

    this.input.addEventListener('keyup', () => {
      if (this.status) {
        keyUpHandler(training);
      }
    });

    const signBtn = document.querySelector('.sign__btn');
    signBtn?.addEventListener('click', () => {
      console.log('stop listen');
      this.stopListen();
    });
  }

  stopListen(): void {
    this.isComplete = true;
    this.status = false;
    this.input.blur();
  }

  startListen(): void {
    this.isComplete = false;
    this.input.focus();
  }
}
