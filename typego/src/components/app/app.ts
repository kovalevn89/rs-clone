import Model from '../model/model';
import Controller from '../controller/controler';
import Header from '../view/header';
import Main from '../view/main';
import WhacAMole from '../view/whacamole';

class App {
  model;
  controller;
  main;
  whac;
  header;

  constructor() {
    this.model = new Model();
    this.controller = new Controller();
    this.whac = new WhacAMole();
    this.header = new Header();
    this.main = new Main();
  }

  run(): void {
    this.header.run();
    this.main.run();
    // this.whac.run();
  }
}

export default App;
