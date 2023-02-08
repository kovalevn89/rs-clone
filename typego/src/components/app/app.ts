import Model from '../model/model';
import Controller from '../controller/controler';
import Main from '../view/main';

class App {
  model;
  controller;
  main;

  constructor() {
    this.model = new Model();
    this.controller = new Controller();
    this.main = new Main();
  }

  run(): void {
    this.main.run();
  }
}

export default App;
