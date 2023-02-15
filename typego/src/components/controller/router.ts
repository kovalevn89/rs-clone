import { IPage, IParametr } from '../types/index';
import WhacAMole from '../view/whacamole';
import Error from '../view/error';
import { Training } from '../view/training';
import TrainingLessons from '../view/training/lessons';
import AboutPage from '../view/about';
import DropStartPage from '../view/drop-start-page';
import Games from '../view/games';
import { Lang } from '../types/enums';
import TrainingLevels from '../view/training/levels';
import Main from '../view/main';
// import State from '../model/state';

class Router {
  private validPage: Array<IPage>;
  private main;
  private training;
  private lessons;
  private levels;
  private whac;
  private error;
  private about;
  private dropGame;
  private games;

  constructor() {
    this.validPage = new Array<IPage>();
    this.validPage.push({ page: 'main', params: [] });
    // this.validPage.push({ page: 'test', params: [] });
    // this.validPage.push({ page: 'learn', params: [] });
    this.validPage.push({ page: 'training', params: ['lang'] });
    this.validPage.push({ page: 'lesson', params: ['lang', 'index', 'id'] });
    // this.validPage.push({ page: 'lern', params: [] });
    // this.validPage.push({ page: 'lesson', params: [] });
    this.validPage.push({ page: 'about', params: [] });
    this.validPage.push({ page: 'games', params: ['name'] });

    this.main = new Main();
    this.training = new Training();
    this.lessons = new TrainingLessons();
    this.levels = new TrainingLevels();
    this.whac = new WhacAMole();
    this.error = new Error();
    this.about = new AboutPage();
    this.dropGame = new DropStartPage();
    this.games = new Games();
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
        // console.log(params);
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
    // console.log(validParams);
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

      if (page === 'learn') {
        // PLACE THIS RENDER LERN PAGE
      }

      if (page === 'training') {
        if (validParams.length > 0) {
          validParams.forEach((item) => {
            if (item.parametr === 'lang') {
              if (item.value !== Lang.en && item.value !== Lang.ru) {
                this.error.run('pageNotFound');
              } else {
                this.lessons.run(item.value);
              }
            }
          });
        } else {
          this.training.run();
        }
      }

      if (page === 'lesson') {
        const path = {
          lang: '',
          lesson: 0,
          id: 0,
        };
        if (validParams.length === 3) {
          validParams.forEach((item) => {
            switch (item.parametr) {
              case 'lang': {
                path.lang = item.value;
                break;
              }
              case 'index': {
                path.lesson = Number(item.value);
                break;
              }
              case 'id': {
                path.id = Number(item.value);
                break;
              }
              default: {
                this.error.run('pageNotFound');
                break;
              }
            }
          });
          if (path.lang !== Lang.en && path.lang !== Lang.ru) {
            this.error.run('pageNotFound');
          } else {
            this.levels.run(path.lang, path.lesson, path.id);
          }
        } else {
          this.error.run('pageNotFound');
        }
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
                case 'whac': this.whac.run(); break;
                case 'drop': this.dropGame.run(); break;
                case 'shoter': console.log('render shooter game'); break; // PLACE THIS RENDER SHOOTER GAME
                default: {
                  this.error.run('pageNotFound');
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
      this.error.run('pageNotFound');
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
