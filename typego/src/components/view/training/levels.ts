import { createElement, removeChild } from '../../helper';
import { Lang, Tag, Themes } from '../../types/enums';
import PageView from '../baseViewClass';
import TrainingTask from './trainingTask';
import { Lesson } from '../../types';

export default class TrainingLevels extends PageView {
  private lesson!: Lesson;

  private async render(lang: Lang, index: number): Promise<void> {
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
    const lessonHeader = createElement(Tag.h2, 'training__title', wrapper);
    const lessonTitle = createElement(Tag.span, 'training__title__span', lessonHeader);
    const lessonDescription = createElement(Tag.span, 'training__title__span', lessonHeader);

    await this.getLesson(lang, index);

    this.translation.translateField(lessonTitle, 'level');
    lessonDescription.textContent = ` ${this.state.current.lesson}: ${this.lesson.name}`;

    const levelsWrapper = createElement(Tag.div, 'levels__wrapper', wrapper);

    this.renderLevels(levelsWrapper);

    const trainingContainer = createElement(Tag.div, 'training__container', levelsWrapper);
    this.renderTraining(trainingContainer);
  }

  private async getLesson(lang: Lang, index: number): Promise<void> {
    try {
      this.lesson = await this.api.getLesson(index, this.user.getToken(), lang);
      this.state.current.levels = this.lesson.levels?.length || 0;
      console.log(this.lesson);
    } catch (e) {
      console.log(e);

      // throw new Error(e as string);
    }
  }

  private renderLevels(parent: HTMLElement): void {
    const { index, lang, levels } = this.lesson;
    if (!levels) return;
    parent.innerHTML = '';
    const navigationContainer = createElement(Tag.div, 'levels__navigation', parent);
    levels.map((level) => {
      const response = {
        ...level,
        lang,
      };
      const element = createElement(Tag.div, `level_ _${index}`, navigationContainer);
      element.textContent = `${response.index} ${response.name.toUpperCase()}`;

      return element;
    });

    this.updatePagination();
  }

  private renderTraining(parent: HTMLElement): void {
    const {
      index,
      name,
      lang,
      levels,
    } = this.lesson;

    const { level } = this.state.current;

    if (!levels) return;
    const response = {
      ...levels[level],
      lang,
    };

    parent.innerHTML = '';

    createElement(Tag.h3, 'training__title', parent).textContent = `${index}: ${name}`;
    const training = new TrainingTask();
    training.render(response, parent);
  }

  updatePagination(): void {
    const pagination = document.querySelectorAll('.level_');
    const { level } = this.state.current;
    pagination.forEach((el, i) => {
      if (i < level) {
        el.classList.add('done');
        el.classList.remove('active');
      }
      if (i === level) {
        el.classList.add('active');
      }
    });
  }

  run(lang: Lang, index: number, id: number): void {
    this.state.current.level = id;
    this.state.current.lesson = index;
    this.state.lang = lang;
    this.state.isTest = false;
    this.render(lang, index);
  }
}
