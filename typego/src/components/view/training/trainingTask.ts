import { createElement } from '../../helper';
import { TextResponse } from '../../types';
import { Tag, TrainingStatus } from '../../types/enums';
import Keyboard from '../keyboard/keyboard';
// eslint-disable-next-line import/no-cycle
import TextInput from './textInput';
import TextTraining from './textTraining';

export default class TrainingTask {
  container;
  input;
  textTraining;
  keyboard;
  settings;

  constructor() {
    this.container = createElement(Tag.div, 'level__container');

    this.input = new TextInput();
    this.textTraining = new TextTraining();
    this.keyboard = new Keyboard();
    this.settings = {};
  }

  render(response: TextResponse, parent: HTMLElement): void {
    const { lang } = response;
    parent.innerHTML = '';
    parent.append(this.container);

    this.container.append(this.input.input);
    this.input.startListen();
    this.input.listen(this);

    this.container.append(this.textTraining.container);
    this.textTraining.render(response);
    this.keyboard.render(this.container, lang);

    this.textTraining.updateProgress();
    this.textTraining.updateInstructions(TrainingStatus.start);
  }

  remove(): void {
    this.input.input.remove();
    this.textTraining.container.remove();
    this.keyboard.remove();
  }
}
