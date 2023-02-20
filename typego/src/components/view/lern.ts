import PageView from './baseViewClass';
import { Themes } from '../types/enums';
import { createElement, removeChild } from '../helper';

class Lern extends PageView {
  private render() {
    const app: HTMLElement | null = document.querySelector('.app');

    if (app !== null) {
      removeChild(app);
      const about = createElement('div', 'main', app);

      this.translation.cleanObserver(); // clear translate obserber hook

      if (this.config.getTheme() === Themes.Dark) {
        about.classList.add('dark');
      } else {
        about.classList.remove('dark');
      }

      const wrapper = createElement('div', 'lern_wrapper', about);
      console.log(wrapper);
    }
  }

  run(): void {
    this.render();
  }
}

export default Lern;
