import Model from '../model/model';
import Controller from '../controller/controler';
import View from '../view/view';

class App {
  model;
  controller;
  view;

  constructor() {
    this.model = new Model();
    this.controller = new Controller();
    this.view = new View();
  }

  run(): void {
    this.view.run();
  }
}

export default App;
