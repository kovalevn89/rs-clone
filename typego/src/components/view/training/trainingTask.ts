/* eslint-disable import/no-cycle */
import { createElement } from '../../helper';
import { TextResponse } from '../../types';
import { Tag, TrainingStatus } from '../../types/enums';
import Keyboard from '../keyboard/keyboard';
import TextInput from './textInput';
import TextTraining from './textTraining';

export default class TrainingTask extends TextTraining {
  container;
  input;
  textTraining;
  keyboard;
  settings;

  constructor(response: TextResponse, parent: HTMLElement) {
    super(response);
    parent.innerHTML = '';
    this.container = createElement(Tag.div, 'level__container', parent);

    this.input = new TextInput();
    this.textTraining = new TextTraining(response);
    this.keyboard = new Keyboard();
    this.settings = {};
  }

  render(response: TextResponse): void {
    this.container.append(this.input.input);
    this.container.append(this.textTraining.container);
    this.keyboard.render(this.container, response.lang);

    this.input.listen(this);
    this.textTraining.updateProgress();
    this.textTraining.updateInstructions(TrainingStatus.start);
  }

  remove(): void {
    this.input.input.remove();
    this.textTraining.container.remove();
    this.keyboard.remove();
  }
}
