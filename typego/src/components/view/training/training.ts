import { createElement } from '../../helper';
import Keyboard from '../keyboard/keyboard';
import TextTraining from './textTraining';
import TextInput from './textInput';
import { Tag, TrainingStatus } from '../../types/enums';
import { TextResponse } from '../../types';

class Training {
  container;
  input;
  textTraining;
  keyboard;
  settings;

  constructor(response: TextResponse, parent: HTMLElement) {
    parent.innerHTML = '';
    this.container = createElement(Tag.div, 'level__container', parent);

    this.input = new TextInput();
    this.textTraining = new TextTraining(response);
    this.keyboard = new Keyboard(response.lang);
    this.settings = {};
  }

  render(): void {
    this.container.append(this.input.input);
    this.container.append(this.textTraining.container);
    this.container.append(this.keyboard.keyboard);

    this.input.listen(this.keyboard, this.textTraining);
    this.textTraining.updateProgress();
    this.textTraining.updateInstructions(TrainingStatus.start);
  }

  trainingRemove(): void {
    this.input.input.remove();
    this.textTraining.container.remove();
    this.keyboard.keyboard.remove();
  }
}

export default Training;
