import { createElement, removeChild } from '../helper';

class Main {
  // constructor() {
  //   // console.log('tratata');
  // }

  private render() {
    const app: HTMLElement | null = document.querySelector('.app');

    if (app !== null) {
      removeChild(app);
      const main = createElement('main', 'main', app);
      console.log(main);
    }
  }

  run(): void {
    this.render();
  }
}

export default Main;
