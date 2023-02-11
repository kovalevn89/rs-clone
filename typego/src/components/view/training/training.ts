import { createElement } from '../../helper';
import Keyboard from '../keyboard/keyboard';
import TextTraining from './textTraining';
import TextInput from './textInput';
import { Tag, TrainingStatus } from '../../types/enums';
import { TextResponse } from '../../types';
// import Api from '../../../api/api';

class Training {
  container;
  input;
  textTraining;
  keyboard;
  settings;

  constructor(response: TextResponse, parent: HTMLElement) {
    this.container = createElement(Tag.div, 'level__container', parent);
    this.container.innerHTML = '';

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

  renderStartTraining(): void {
    this.container.innerHTML = '';
  }
}

export default Training;
