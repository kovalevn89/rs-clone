import Footer from './footer';
import Header from './header';
import Keyboard from './keyboard/keyboard';

export class View {
  header;
  footer;
  keybord;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.keybord = new Keyboard();
  }

  run(): void {
    this.keybord.render();
  }
}

export default View;
