// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DEFAULT_RESPONSE } from '../helper/constants';
import Footer from './footer';
import Header from './header';
import TrainingView from './training/lessons';

class View {
  header;
  footer;
  training;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.training = new TrainingView();
  }

  run(): void {
  }
}

export default View;
