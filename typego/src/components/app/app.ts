import Model from '../model/model';
import Controller from '../controller/controler';
import Header from '../view/header';
import Main from '../view/main';
import WhacAMole from '../view/whacamole';
import Footer from '../view/footer';

class App {
  model;
  controller;
  main;
  whac;
  header;
  footer;

  constructor() {
    this.model = new Model();
    this.controller = new Controller();
    this.whac = new WhacAMole();
    this.header = new Header();
    this.main = new Main();
    this.footer = new Footer();
  }

  run(): void {
    this.header.run();
    this.footer.run();
    this.main.run();
    // this.whac.run();
  }
}

export default App;
