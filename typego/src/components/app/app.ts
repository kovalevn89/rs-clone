import Model from '../model/model';
import Controller from '../controller/controler';
import DropStartPage from '../drop-food-game/drop-start-page';
import DropGamePage from '../drop-food-game/drop-game-page';

class App {
  model;
  controller;
  dropStartPage;
  dropGamePage;

  constructor() {
    this.model = new Model();
    this.controller = new Controller();
    this.dropStartPage = new DropStartPage();
    this.dropGamePage = new DropGamePage();
  }

  run(): void {
    this.dropStartPage.run();
  }
}

export default App;
