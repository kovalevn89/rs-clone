// import Api from '../../../api';
import { createElement, removeChild } from '../../helper';
import { Lang, Tag, Themes } from '../../types/enums';

import selectEN from '../../../assets/png/selectEN.png';
import selectRU from '../../../assets/png/selectRU.png';
import PageView from '../baseViewClass';
import Api from '../../../api';

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

    const wrapper = createElement(Tag.div, 'wrapper__training', container);

    createElement(Tag.h2, 'training__title', wrapper).textContent = 'Training';

    const selectContainer = createElement(Tag.div, 'select', wrapper);

    const selectEn = createElement(Tag.div, 'training__select', selectContainer, ['lang', 'en']);
    selectEn.addEventListener('click', () => {

    });
    const selectRu = createElement(Tag.div, 'training__select', selectContainer, ['lang', 'ru']);
    selectRu.addEventListener('click', () => {

    });

    createElement(Tag.h3, 'select__title', selectEn).textContent = 'English Layout';
    createElement<HTMLImageElement>(Tag.img, 'select__img', selectEn, ['alt', 'English layout']).src = selectEN;

    createElement(Tag.h3, 'select__title', selectRu).textContent = 'Russian Layout';
    createElement<HTMLImageElement>(Tag.img, 'select__img', selectRu, ['alt', 'Russian layout']).src = selectRU;

    app.append(container);
  }

  async listen(lang: Lang): Promise<void> {
    const api = new Api();
    try {
      const lessons = await api.getLessons(lang);
      console.log(lessons);
    } catch (e) {
      console.log(e);
    }

    console.log('En training');
  }

  run(): void {
    window.location.hash = '#/training';
    this.render();
  }
}

export default Training;

// container;
//   input;
//   textTraining;
//   keyboard;
//   settings;

//   constructor(response: TextResponse, parent: HTMLElement) {
//     parent.innerHTML = '';
//     this.container = createElement(Tag.div, 'level__container', parent);

//     this.input = new TextInput();
//     this.textTraining = new TextTraining(response);
//     this.keyboard = new Keyboard();
//     this.settings = {};
//   }

//   render(): void {
//     this.container.append(this.input.input);
//     this.container.append(this.textTraining.container);
//     this.keyboard.render(this.container);

//     this.input.listen(this);
//     this.textTraining.updateProgress();
//     this.textTraining.updateInstructions(TrainingStatus.start);
//   }

//   remove(): void {
//     this.input.input.remove();
//     this.textTraining.container.remove();
//     this.keyboard.remove();
//   }
