import Model from '../model/model';
import Controller from '../controller/controler';
import WhacAMole from '../view/whacamole';
import View from '../view/view';

class App {
  model;
  controller;
  whac;
  view;

  constructor() {
    this.model = new Model();
    this.controller = new Controller();
    this.whac = new WhacAMole();
    this.view = new View();
  }

  run(): void {
    // this.whac.run();
    this.view.run();
  }
}

export default App;
