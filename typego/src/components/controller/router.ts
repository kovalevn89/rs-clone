import { IPage, IParametr } from '../types/index';
import Main from '../view/main';
import WhacAMole from '../view/whacamole';
import Error from '../view/error';
import { Training } from '../view/training';
import TrainingLessons from '../view/training/lessons';

class Router {
  private validPage: Array<IPage>;
  private main;
  private training;
  private whac;
  private error;

  constructor() {
    this.validPage = new Array<IPage>();
    this.validPage.push({ page: 'main', params: [] });
    // this.validPage.push({ page: 'test', params: [] });
    // this.validPage.push({ page: 'learn', params: [] });
    this.validPage.push({ page: 'training', params: [] });
    this.validPage.push({ page: 'games', params: ['name'] });

    this.main = new Main();
    this.training = new Training();
    this.lessons = new TrainingLessons();
    this.whac = new WhacAMole();
    this.error = new Error();
  }

  private isPageValid(page: string): boolean {
    return this.validPage.some((item) => item.page === page);
  }

  private getValidParams(page: string, params: Array<string>): Array<IParametr> {
    let currentPage = new Array<IPage>();
    const validParams: Array<IParametr> = [];

    currentPage = this.validPage.filter((item) => item.page === page);

    if (currentPage.length === 1 && currentPage[0].params.length > 0) {
      if (params.length > 0) {
        params.forEach((param) => {
          const parametr = param.split('=')[0];
          let value = param.split('=')[1];

          if (value) {
            value = value.replace('%20', ' ');
          }

          if (currentPage[0].params.some((item) => item === parametr)) {
            validParams.push({ parametr, value });
          }
        });
      }
    }
    return validParams;
  }

  private render(page: string, params: Array<string>): void {
    if (this.isPageValid(page)) {
      const validParams = this.getValidParams(page, params);

      if (page === 'main') {
        this.main.run();
      }

      if (page === 'test') {
        // PLACE THIS RENDER TEST PAGE
      }

      if (page === 'lern') {
        // PLACE THIS RENDER LERN PAGE
      }

      if (page === 'training') {
        this.training.run();
      }

      if (page === 'games') {
        if (validParams.length > 0) {
          // render current game
          validParams.forEach((item) => {
            if (item.parametr === 'name') {
              switch (item.value) {
                case 'whac': this.whac.run(); break;
                case 'food': console.log('render food game'); break; // PLACE THIS RENDER FOOD GAME
                case 'shoter': console.log('render shooter game'); break; // PLACE THIS RENDER SHOOTER GAME
                default: {
                  this.error.run('GAME NOT FOUND (404)');
                  // console.log('RENDER 404');
                }
              }
            }
          });
        } else {
          // render game list
          console.log('render game list'); // PLACE THIS RENDER ERROR PAGE
        }
      }
    } else {
      // render 404
      this.error.run('PAGE NOT FOUND (404)');
      // console.log('RENDER 404');
      // this.error.render();
    }
  }

  private parseHash(hash: string): void {
    if (hash[0] === '#') {
      hash = hash.slice(1);
    }

    if (hash[0] === '/') {
      hash = hash.slice(1);
    }

    const page = hash.split('?')[0];
    const params = hash.split('?')[1] ? hash.split('?')[1].split('&') : [''];

    console.log({ page, params });
    this.render(page, params);
  }

  private regHashHendler(): void {
    window.addEventListener('hashchange', () => {
      this.parseHash(window.location.hash.replace('%20', ' '));
    });
  }

  run(): void {
    this.regHashHendler();

    if (window.location.hash === '') {
      window.location.hash = '#/main';
    }

    // first render
    this.parseHash(window.location.hash.replace('%20', ' '));
  }
}

export default Router;
