import { createElement } from '../../helper';
import Keyboard from '../keyboard/keyboard';
import { TextInput } from '../textInput/textInput';

export class Training {
  training;

  constructor() {
    this.training = createElement('div', 'level', document.body);
  }

  render(): void {
    const input = new TextInput();
    const keyboard = new Keyboard();

    this.training.append(input.input);

    input.listen(keyboard);
    keyboard.render();
  }
}

export default { Training };
