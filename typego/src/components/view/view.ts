import Footer from './footer';
import Header from './header';
import { Training } from './training.ts/training';

export class View {
  header;
  footer;
  level;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.level = new Training();
  }

  run(): void {
    this.level.render();
  }
}

export default View;
