import Keyboard from '../keyboard/keyboard';
// import keyPressSound from '../../../assets/sounds/9.mp3';

class TextInput {
  input;
  // text;

  constructor() {
    const input = document.createElement('input');
    input.className = 'level__input';
    input.type = 'text';
    input.autofocus = true;
    input.autocomplete = 'off';
    input.autocapitalize = 'off';
    input.ariaHidden = 'true';

    this.input = input;
  }

  listen(keyboard: Keyboard): void {
    const press = new Audio();
    // press.src = keyPressSound;
    this.input.addEventListener('keydown', (e) => {
      keyboard.init();
      const id = e.key ? e.key.toLowerCase() : e.code;
      keyboard.activate(id);
      press.play();
    });

    this.input.addEventListener('blur', () => {
      this.input.focus();
    });
  }
}

export default TextInput;
