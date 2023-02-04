import { createElement } from '../../helper';
import Keyboard from '../keyboard/keyboard';
import TextTraining from './textTraining';
import TextInput from './textInput';
import { DEFAULT_RESPONSE } from '../../types/constants';

class Training {
  container;

  constructor() {
    this.container = createElement('div', 'level__container', document.body);
    this.container.innerHTML = '';
  }

  render(): void {
    const input = new TextInput();
    const textTraining = new TextTraining(DEFAULT_RESPONSE);
    const keyboard = new Keyboard();

    this.container.append(input.input);
    this.container.append(textTraining.container);
    this.container.append(keyboard.keyboard);

    input.listen(keyboard);
    keyboard.render();
    textTraining.updateProgress({ speed: 5, accurancy: 62 });
  }
}

export default Training;
