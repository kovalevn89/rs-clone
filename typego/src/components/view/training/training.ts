import { createElement, removeChild } from '../../helper';
import { Lang, Tag, Themes } from '../../types/enums';

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

    this.translation.cleanObserver(); // clear translate obserber hook

    const wrapper = createElement(Tag.div, 'wrapper', container);

    const title = createElement(Tag.h2, 'training__title', wrapper);
    this.translation.translateField(title, 'training');

    const selectContainer = createElement(Tag.div, 'select', wrapper);

    const selectEn = createElement(Tag.div, 'training__select', selectContainer, ['lang', 'en']);
    selectEn.addEventListener('click', () => {
      this.state.current.lang = Lang.en;
      this.state.lang = Lang.en;
      window.location.hash = '#/training?lang=en';
    });
    const selectRu = createElement(Tag.div, 'training__select', selectContainer, ['lang', 'ru']);
    selectRu.addEventListener('click', () => {
      this.state.current.lang = Lang.ru;
      this.state.lang = Lang.ru;
      window.location.hash = '#/training?lang=ru';
    });

    const selectTitleEn = createElement(Tag.h3, 'select__title', selectEn);
    this.translation.translateField(selectTitleEn, 'layoutEn');

    const selectTitleRu = createElement(Tag.h3, 'select__title', selectRu);
    this.translation.translateField(selectTitleRu, 'layoutRu');

    createElement<HTMLImageElement>(Tag.img, 'select__img', selectEn, ['alt', 'English layout']).src = selectEN;
    createElement<HTMLImageElement>(Tag.img, 'select__img', selectRu, ['alt', 'Russian layout']).src = selectRU;

    app.append(container);
  }

  run(): void {
    this.render();
  }
}

export default Training;
