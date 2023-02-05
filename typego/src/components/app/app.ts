import Model from '../model/model';
import Controller from '../controller/controler';
import DropStartPage from '../drop-food-game/drop-start-page';

class App {
  model;
  controller;
  dropStartPage;

  constructor() {
    this.model = new Model();
    this.controller = new Controller();
    this.dropStartPage = new DropStartPage();
  }

  run(): void {
    this.dropStartPage.run();
  }
}

export default App;
