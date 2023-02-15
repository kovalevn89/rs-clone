import { createElement, removeChild } from '../../helper';
import { Lesson, TextResponse } from '../../types';
import { Lang, Tag, Themes } from '../../types/enums';
import PageView from '../baseViewClass';
import Api from '../../controller/api';
import { LESSON } from '../../helper/constants';
import TrainingTask from './trainingTask';

export default class TrainingLevels extends PageView {
  private progress;

  constructor() {
    super();

    this.progress = 0;
  }

  setProgress(n: number): void {
    this.progress = n;
  }

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

    createElement(Tag.h2, 'training__title', wrapper).textContent = 'Levels';
    const levelsWrapper = createElement(Tag.div, 'levels__wrapper', wrapper);

    this.renderLevels(levelsWrapper, await this.getLesson(lang, index));
  }

  private async getLesson(lang: Lang, index: number): Promise<Lesson> {
    const api = new Api();
    try {
      return await api.getLesson('', index, lang);
    } catch (e) {
      console.log(e);

      return LESSON;
    }
  }

  private renderLevels(parent: HTMLElement, lesson: Lesson): void {
    const { index, lang, levels } = lesson;
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
    const response = {
      ...levels[this.progress],
      lang,
    };
    const trainingContainer = createElement(Tag.div, 'training__container', parent);

    this.updatePagination();
    this.renderTraining(response, lesson, trainingContainer);
  }

  private renderTraining(response: TextResponse, lesson: Lesson, parent: HTMLElement): void {
    const { name, index } = response;

    parent.innerHTML = '';

    createElement(Tag.h3, 'training__title', parent).textContent = `${index}: ${name}`;
    const training = new TrainingTask(response, parent);
    training.render(response);
  }

  nextLevel(): void {
    this.progress += 1;
    this.updatePagination();
  }

  updatePagination(): void {
    const pagination = document.querySelectorAll('.level_');
    pagination.forEach((el, i) => {
      if (i < this.progress) {
        el.classList.add('done');
        el.classList.remove('active');
      }
      if (i === this.progress) {
        el.classList.add('active');
      }
    });
  }

  run(lang: Lang, index: number): void {
    this.render(lang, index);
  }
}
// import { Tag } from '../../types/enums';
// import TrainingTask from './trainingTask';

// export default class FinishLevel {
//   container;
//   message;

//   constructor() {
//     this.container = createElement(Tag.div, 'finish__container');
//     this.message = createElement(Tag.div, 'finish__messqge', this.container);
//   }

//   render(training: TrainingTask, isFinished = true) {
//     const parent = document.querySelector('.main');
//     if (!parent) return;
//     parent.innerHTML = '';
//     console.log(parent);
//     training.input.stopListen();
//     training.remove();

//     const {
//       speed, accurancy, time, mistakes,
//     } = training.textTraining.text;
//     console.log(speed, accurancy, time, mistakes);
//     console.log(training.input);

//     parent.append(this.container);

//     this.message.textContent = isFinished
//       ? `Congrats! You have finished this level in ${time}s & ${mistakes} mistakes`
//       : `Too many mistakes ${mistakes}, try again`;

//     const backBtn = createElement<HTMLButtonElement>(Tag.btn, 'back__btn', this.container);
//     const nextBtn = createElement<HTMLButtonElement>(Tag.btn, 'next-level__btn', this.container);
//     backBtn.textContent = 'Back';
//     nextBtn.textContent = isFinished ? 'Start next level' : 'Try again';

//     backBtn.addEventListener('click', () => {
//       parent.innerHTML = '';
//     });

//     nextBtn.addEventListener('click', () => {

//     });
//   }
// }
