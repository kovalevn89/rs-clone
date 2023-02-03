import Keyboard from '../keyboard/keyboard';
// import keyPressSound from '../../../assets/sounds/9.mp3';

export class TextInput {
  input;

  constructor() {
    const input = document.createElement('input');
    input.className = 'level__input';
    input.type = 'text';
    input.autofocus = true;
    input.autocomplete = 'off';
    input.autocapitalize = 'off';

    this.input = input;
  }

  render(): void {
    const level = document.querySelector<HTMLDivElement>('.level');
    level?.append(this.input);
  }

  listen(keyboard: Keyboard): void {
    const press = new Audio();
    // press.src = keyPressSound;
    this.input.addEventListener('keydown', (e) => {
      console.log(e.code.toLowerCase(), e.key);
      keyboard.init();
      keyboard.activate(e.key);
      press.play();
    });
  }
}

export default { TextInput };
