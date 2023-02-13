import Model from '../model/model';
import Controller from '../controller/controler';
import Router from '../controller/router';
import Header from '../view/header';
import Footer from '../view/footer';
import View from '../view/view';

class App {
  model;
  controller;
  header;
  footer;
  router;
  view;

  constructor() {
    this.model = new Model();
    this.controller = new Controller();
    this.header = new Header();
    this.footer = new Footer();
    this.router = new Router();
    this.view = new View();
  }

  run(): void {
    this.header.run();
    this.footer.run();
    this.router.run();
  }
}

export default App;
