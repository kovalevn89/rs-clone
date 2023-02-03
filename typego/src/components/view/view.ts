import Footer from './footer';
import Header from './header';
import Training from './training/training';

class View {
  header;
  footer;
  training;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.training = new Training();
  }

  run(): void {
    this.training.render();
  }
}

export default View;
