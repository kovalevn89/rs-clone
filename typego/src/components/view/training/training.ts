import { createElement } from '../../helper';
import Keyboard from '../keyboard/keyboard';
import TextTraining from './textTraining';
import TextInput from './textInput';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DEFAULT_RESPONSE, DEFAULT_RESPONSE_RU } from '../../types/constants';
import { TextResponse } from '../../types';

class Training {
  container;
  input;
  textTraining;
  keyboard;
  instructions;
  timeCounter;

  constructor(response: TextResponse) {
    this.container = createElement('div', 'level__container', document.body);
    this.container.innerHTML = '';

    this.input = new TextInput();
    this.textTraining = new TextTraining(response);
    this.instructions = createElement('div', 'instructions');
    this.keyboard = new Keyboard(response.lang);
    this.timeCounter = 0;
  }

  render(): void {
    this.container.append(this.input.input, this.instructions);
    this.instructions.textContent = 'to start training press ENTER, to pause press ESC';
    this.container.append(this.textTraining.container);
    this.container.append(this.keyboard.keyboard);

    this.input.listen(this.keyboard, this.textTraining);
    this.textTraining.updateProgress();
    this.keyboard.render();
  }
}

export default Training;
