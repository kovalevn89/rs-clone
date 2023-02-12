import Model from '../model/model';
import Controller from '../controller/controler';
import DropStartPage from '../view/drop-start-page';
import DropGamePage from '../view/drop-game-page';
import Main from '../view/main';
import WhacAMole from '../view/whacamole';
import AboutPage from '../view/about';

class App {
  model;
  controller;
  dropStartPage;
  dropGamePage;
  main;
  whac;
  aboutPage;

  constructor() {
    this.model = new Model();
    this.controller = new Controller();
    this.whac = new WhacAMole();
    this.main = new Main();
    this.dropStartPage = new DropStartPage();
    this.dropGamePage = new DropGamePage();
    this.aboutPage = new AboutPage();
  }

  run(): void {
    // this.dropStartPage.run();
    // this.main.run();
    // this.whac.run();
    this.aboutPage.run();
  }
}

export default App;
