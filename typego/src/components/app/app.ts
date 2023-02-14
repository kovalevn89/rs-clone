import Model from '../model/model';
import Controller from '../controller/controler';
import Router from '../controller/router';
import Header from '../view/header';
import Footer from '../view/footer';
import AppConfig from '../model/appconfig';

class App {
  model;
  controller;
  header;
  footer;
  router;
  config;

  constructor() {
    this.config = new AppConfig();
    this.model = new Model();
    this.controller = new Controller();
    this.header = new Header();
    this.footer = new Footer();
    this.router = new Router();
  }

  run(): void {
    this.config.run();
    this.header.run();
    this.footer.run();
    // this.router.run();
  }
}

export default App;
