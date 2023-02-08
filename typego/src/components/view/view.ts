// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DEFAULT_RESPONSE, DEFAULT_RESPONSE_RU } from '../types/constants';
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
    this.training = new Training(DEFAULT_RESPONSE_RU);
  }

  run(): void {
    this.training.render();
  }
}

export default View;
