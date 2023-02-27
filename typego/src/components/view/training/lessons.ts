import PageView from '../baseViewClass';

import { createElement, removeChild } from '../../helper';
import { Tag, Themes } from '../../types/enums';

import cover1 from '../../../assets/png/cover1.png';
import cover2 from '../../../assets/png/cover2.png';
import cover3 from '../../../assets/png/cover3.png';
import cover4 from '../../../assets/png/cover4.png';
import cover5 from '../../../assets/png/cover5.png';
import cover6 from '../../../assets/png/cover6.png';
import { LanguageStr, Lessons } from '../../types';

export default class TrainingLessons extends PageView {
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
    const lessonsTitle = createElement(Tag.h2, 'training__title', wrapper);
    this.translation.translateField(lessonsTitle, 'lessons');

    const lessonsWrapper = createElement(Tag.div, 'lessons__wrapper', wrapper);

    const cover = [cover1, cover2, cover3, cover4, cover5, cover6];

    const lessons = await this.getLessons(this.state.lang);

    lessons.map((lesson, i) => {
      const lev = createElement<HTMLDivElement>(Tag.div, 'training__level', lessonsWrapper, ['id', `level_${lesson.index}`]);
      createElement(Tag.h3, 'training__level__title', lev).textContent = lesson.name;
      createElement<HTMLImageElement>(Tag.img, 'training__img', lev, ['alt', `Lesson ${lesson.index} cover`]).src = cover[i];

      lev.addEventListener('click', async () => {
        this.state.current.lesson = lesson.index;
        await this.state.findLevel(lesson.index, this.user.getToken());

        this.state.isLevelComplete = false;
        window.location.hash = `#/lesson?lang=${this.state.lang}&index=${lesson.index}&id=${this.state.current.level}`;
      });

      return lev;
    });
  }

  private async getLessons(lang: LanguageStr): Promise<Lessons> {
    try {
      const result = await this.api.getLessons(lang, this.user.getToken());
      return result;
    } catch (e) {
      console.log(e);

      throw e;
    }
  }

  run(lang: LanguageStr): void {
    this.state.lang = lang;
    this.render();
  }
}
