import { IPage, IParametr } from '../types/index';
import Main from '../view/main';

class Router {


  private regHashHendler(): void {
    window.addEventListener('hashchange', () => {
      // this.parseHash(window.location.hash.replace('%20', ' '));
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
