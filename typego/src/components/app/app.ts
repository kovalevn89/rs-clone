import Model from '../model/model';
import Controller from '../controller/controler';
import Header from '../view/header';
import Footer from '../view/footer';
import AppConfig from '../model/appconfig';
import Router from '../controller/router';
import Translation from '../model/translation';

class App {
  model;
  controller;
  header;
  footer;
  router;
  config;
  translate;

  constructor() {
    this.config = new AppConfig();
    this.model = new Model();
    this.controller = new Controller();
    this.header = new Header();
    this.footer = new Footer();
    this.router = new Router();
    this.translate = new Translation();
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
