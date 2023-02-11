import Model from '../model/model';
import Controller from '../controller/controler';
import Main from '../view/main';
import WhacAMole from '../view/whacamole';

class App {
  model;
  controller;
  main;
  whac;

  constructor() {
    this.model = new Model();
    this.controller = new Controller();
    this.whac = new WhacAMole();
    this.main = new Main();
  }

  run(): void {
    this.main.run();
    // this.whac.run();
  }
}

export default App;
