import Model from '../model/model';
import Controller from '../controller/controler';
import Main from '../view/main';
import WhacAMole from '../view/whacamole';
import View from '../view/view';

class App {
  model;
  controller;
  main;
  whac;
  view;

  constructor() {
    this.model = new Model();
    this.controller = new Controller();
    this.whac = new WhacAMole();
    this.view = new View();
    this.main = new Main();
  }

  run(): void {
    // this.main.run();
    // this.whac.run();
    this.view.run();
  }
}

export default App;
