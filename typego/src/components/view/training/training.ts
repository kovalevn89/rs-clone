import { createElement } from '../../helper';
import Keyboard from '../keyboard/keyboard';
import TextTraining from './textTraining';
import TextInput from './textInput';

class Training {
  container;

  constructor() {
    this.container = createElement('div', 'level__container', document.body);
  }

  render(): void {
    const input = new TextInput();
    const textTraining = new TextTraining();
    const keyboard = new Keyboard();

    this.container.append(input.input);
    this.container.append(textTraining.container);
    this.container.append(keyboard.keyboard);

    input.listen(keyboard);
    keyboard.render();
  }
}

export default Training;
