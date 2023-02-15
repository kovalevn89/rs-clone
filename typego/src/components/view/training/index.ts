import { createElement, removeChild } from '../../helper';
import { Tag, Themes } from '../../types/enums';

import selectEN from '../../../assets/png/selectEN.png';
import selectRU from '../../../assets/png/selectRU.png';
import PageView from '../baseViewClass';

export class Training extends PageView {
  private render(): void {
    const app = document.querySelector<HTMLElement>('.app');
    if (!app) return;
    removeChild(app);
    const container = createElement(Tag.div, 'main', app);

    if (this.config.getTheme() === Themes.Dark) {
      container.classList.add('dark');
    } else {
      container.classList.remove('dark');
    }

    const wrapper = createElement(Tag.div, 'wrapper', container);

    createElement(Tag.h2, 'training__title', wrapper).textContent = 'Training';

    const selectContainer = createElement(Tag.div, 'select', wrapper);

    // todo this scope can be refactor
    const selectEn = createElement(Tag.div, 'training__select', selectContainer, ['lang', 'en']);
    selectEn.addEventListener('click', () => {
      window.location.hash = '#/training?lang=en';
    });
    const selectRu = createElement(Tag.div, 'training__select', selectContainer, ['lang', 'ru']);
    selectRu.addEventListener('click', () => {
      window.location.hash = '#/training?lang=ru';
    });

    createElement(Tag.h3, 'select__title', selectEn).textContent = 'English Layout';
    createElement<HTMLImageElement>(Tag.img, 'select__img', selectEn, ['alt', 'English layout']).src = selectEN;

    createElement(Tag.h3, 'select__title', selectRu).textContent = 'Russian Layout';
    createElement<HTMLImageElement>(Tag.img, 'select__img', selectRu, ['alt', 'Russian layout']).src = selectRU;

    app.append(container);
  }

  run(): void {
    this.render();
  }
}

export default Training;
