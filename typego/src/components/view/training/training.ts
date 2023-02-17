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

    const title = createElement(Tag.h2, 'training__title', wrapper);
    title.textContent = this.translation.getString('training');
    this.translation.regObserver(() => {
      title.textContent = this.translation.getString('training');
    });

    const selectContainer = createElement(Tag.div, 'select', wrapper);

    const selectEn = createElement(Tag.div, 'training__select', selectContainer, ['lang', 'en']);
    selectEn.addEventListener('click', () => {
      window.location.hash = '#/training?lang=en';
    });
    const selectRu = createElement(Tag.div, 'training__select', selectContainer, ['lang', 'ru']);
    selectRu.addEventListener('click', () => {
      window.location.hash = '#/training?lang=ru';
    });

    const selectTitleEn = createElement(Tag.h3, 'select__title', selectEn);
    selectTitleEn.textContent = this.translation.getString('layoutEn');
    this.translation.regObserver(() => {
      selectTitleEn.textContent = this.translation.getString('layoutEn');
    });
    createElement<HTMLImageElement>(Tag.img, 'select__img', selectEn, ['alt', 'English layout']).src = selectEN;

    const selectTitleRu = createElement(Tag.h3, 'select__title', selectRu);
    selectTitleRu.textContent = this.translation.getString('layoutRu');
    this.translation.regObserver(() => {
      selectTitleRu.textContent = this.translation.getString('layoutRu');
    });
    createElement<HTMLImageElement>(Tag.img, 'select__img', selectRu, ['alt', 'Russian layout']).src = selectRU;

    app.append(container);
  }

  run(): void {
    this.render();
  }
}

export default Training;
