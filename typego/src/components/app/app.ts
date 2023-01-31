import Model from '../model/model';
import Controller from '../controller/controler';

class App {
  model;
  controller;

  constructor() {
    this.model = new Model();
    this.controller = new Controller();
  }

  run(): void {
  }
}

export default App;
