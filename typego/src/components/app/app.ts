import Model from '../model/model';
import Controller from '../controller/controler';
import WhacAMole from '../view/whacamole';

class App {
  model;
  controller;
  whac;

  constructor() {
    this.model = new Model();
    this.controller = new Controller();
    this.whac = new WhacAMole();
  }

  run(): void {
    this.whac.render();
  }
}

export default App;
