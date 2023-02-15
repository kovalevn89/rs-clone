/* eslint-disable import/no-cycle */
import { createElement } from '../../helper';
import State from '../../model/state';
import { Tag, TrainingStatus } from '../../types/enums';
import { keyDowmHandler, keyUpHandler } from './keybordHandlers';
import TrainingTask from './trainingTask';

export default class TextInput {
  input;
  private status;
  private isComplete;
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
    this.state = new State();
  }

  listen(training: TrainingTask): void {
    const { textTraining, keyboard } = training;
    const { text } = textTraining;
    console.log(this.status, this.isComplete, this.state);

    this.input.addEventListener('blur', () => {
      console.log('blur');

      if (!this.isComplete) {
        this.input.focus();
        console.log('focus');
      }
    });

    this.input.addEventListener('keydown', (e) => {
      console.log(this.isComplete);
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
      console.log(this.status);

      if (this.status) {
        keyUpHandler(training);
      }
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
