import { IPage, IParametr } from '../types/index';
import Main from '../view/main';
import WhacAMole from '../view/whacamole';
import Error from '../view/error';
import AboutPage from '../view/about';
import DropStartPage from '../view/drop-start-page';
import Games from '../view/games';
import GunGame from '../view/gun';

class Router {
  private validPage: Array<IPage>;
  private main;
  private whac;
  private error;
  private about;
  private dropGame;
  private games;
  private gunGame;

  constructor() {
    this.validPage = new Array<IPage>();
    this.validPage.push({ page: 'main', params: [] });
    // this.validPage.push({ page: 'test', params: [] });
    // this.validPage.push({ page: 'lern', params: [] });
    // this.validPage.push({ page: 'lesson', params: [] });
    this.validPage.push({ page: 'about', params: [] });
    this.validPage.push({ page: 'games', params: ['name'] });

    this.main = new Main();
    this.whac = new WhacAMole();
    this.error = new Error();
    this.about = new AboutPage();
    this.dropGame = new DropStartPage();
    this.games = new Games();
    this.gunGame = new GunGame();
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

      if (page === 'lesson') {
        // PLACE THIS RENDER LESSON
      }

      if (page === 'about') {
        this.about.run();
      }

      if (page === 'games') {
        if (validParams.length > 0) {
          // render current game
          validParams.forEach((item) => {
            if (item.parametr === 'name') {
              switch (item.value) {
                case 'whac':
                  this.whac.run();
                  break;
                case 'drop':
                  this.dropGame.run();
                  break;
                case 'shooter':
                  this.gunGame.run();
                  break;
                default: {
                  this.error.run('GAME NOT FOUND (404)');
                  // console.log('RENDER 404');
                }
              }
            }
          });
        } else {
          // render game list
          this.games.run();
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
