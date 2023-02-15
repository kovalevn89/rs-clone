import PageView from '../baseViewClass';

import { createElement, removeChild } from '../../helper';
import { Lang, Tag, Themes } from '../../types/enums';

import cover1 from '../../../assets/png/cover1.png';
import cover2 from '../../../assets/png/cover2.png';
import cover3 from '../../../assets/png/cover3.png';
import cover4 from '../../../assets/png/cover4.png';
import cover5 from '../../../assets/png/cover5.png';
import cover6 from '../../../assets/png/cover6.png';
import Api from '../../controller/api';
import { Lessons } from '../../types';
import { LESSONS, LESSONS_RU } from '../../helper/constants';
import State from '../../model/state';

export default class TrainingLessons extends PageView {
  private state: State;

  constructor() {
    super();

    this.state = new State();
    console.log(this.state);
  }

  private async render(): Promise<void> {
    const main = document.querySelector<HTMLElement>('.app');

    if (!main) return;
    removeChild(main);
    const container = createElement(Tag.div, 'main', main);

    if (this.config.getTheme() === Themes.Dark) {
      container.classList.add('dark');
    } else {
      container.classList.remove('dark');
    }

    const wrapper = createElement(Tag.div, 'wrapper', container);
    createElement(Tag.h2, 'training__title', wrapper).textContent = 'Lessons';

    const lessonsWrapper = createElement(Tag.div, 'lessons__wrapper', wrapper);

    const cover = [cover1, cover2, cover3, cover4, cover5, cover6];

    const lessons = await this.getLessons(this.state.lang);

    lessons.map((lesson, i) => {
      const lev = createElement<HTMLDivElement>(Tag.div, 'training__level', lessonsWrapper, ['id', `level_${lesson.index}`]);
      createElement(Tag.h3, 'training__level__title', lev).textContent = lesson.name;
      createElement<HTMLImageElement>(Tag.img, 'training__img', lev, ['alt', `Lesson ${lesson.index} cover`]).src = cover[i];

      lev.addEventListener('click', () => {
        this.state.lesson = lesson.index;
        console.log(this.state);
        window.location.hash = `#/lesson?lang=${this.state.lang}&index=${this.state.lesson}&id=${this.state.level}`;
      });

      return lev;
    });
  }

  private async getLessons(lang: 'en' | 'ru'): Promise<Lessons> {
    const api = new Api();
    try {
      const result = await api.getLessons('', lang);
      return result;
    } catch (e) {
      console.log(e);
      return lang === Lang.en ? LESSONS : LESSONS_RU;
    }
  }

  run(lang: 'en' | 'ru'): void {
    this.state.lang = lang;
    this.render();
  }
}
