import Header from '../view/header';
import Footer from '../view/footer';
import AppConfig from '../model/appconfig';
import Router from '../controller/router';
import Translation from '../model/translation';
import State from '../model/trainingState';

class App {
  header;
  footer;
  router;
  config;
  translate;
  state;

  constructor() {
    this.config = new AppConfig();
    this.translate = new Translation();
    this.header = new Header();
    this.footer = new Footer();
    this.router = new Router();
    this.state = new State();
  }

  run(): void {
    this.config.run();
    this.translate.setLang(this.config.getLang());
    this.header.run();
    this.footer.run();
    this.router.run();
  }
}

export default App;
