import { createElement, removeChild } from '../helper';
import { DEFAULT_RESPONSE, DEFAULT_RESPONSE_RU } from '../helper/constants';
// import TrainingState from '../model/trainingState';
import { LanguageStr } from '../types';
import {
  Lang, Tag, Themes, TrainingStatus,
} from '../types/enums';
import PageView from './baseViewClass';
import TrainingTask from './training/trainingTask';

export default class TypingTest extends PageView {
  // private state: TrainingState;

  // constructor() {
  //   super();

  //   this.state = new TrainingState();
  // }
  private async render(): Promise<void> {
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
    title.textContent = this.translation.getString('test');
    this.translation.regObserver(() => {
      title.textContent = this.translation.getString('test');
    });

    const selectContainer = createElement(Tag.div, 'select', wrapper);

    const selectEnBtn = createElement(Tag.div, 'test__select', selectContainer, ['lang', 'en']);
    const selectRuBtn = createElement(Tag.div, 'test__select', selectContainer, ['lang', 'ru']);

    const testContainer = createElement(Tag.div, 'test__container training__container', wrapper);

    selectEnBtn.addEventListener('click', () => {
      // window.location.hash = '#/test?lang=en';

      selectEnBtn.classList.add('active');
      selectRuBtn.classList.remove('active');

      // this.stopInput();
      this.renderTest(Lang.en, testContainer);
    });
    selectRuBtn.addEventListener('click', () => {
      // window.location.hash = '#/test?lang=ru';

      selectRuBtn.classList.add('active');
      selectEnBtn.classList.remove('active');

      // this.stopInput();
      this.renderTest(Lang.ru, testContainer);
    });

    selectEnBtn.textContent = this.translation.getString('layoutEn');
    this.translation.regObserver(() => {
      selectEnBtn.textContent = this.translation.getString('layoutEn');
    });

    selectRuBtn.textContent = this.translation.getString('layoutRu');
    this.translation.regObserver(() => {
      selectRuBtn.textContent = this.translation.getString('layoutRu');
    });
  }

  run(): void {
    this.state.isTest = true;
    this.render();
  }

  renderTest(lang: LanguageStr, parent: HTMLElement): void {
    parent.innerHTML = '';

    const test = new TrainingTask();
    const { input, keyboard, textTraining } = test;

    const response = lang === Lang.en ? DEFAULT_RESPONSE : DEFAULT_RESPONSE_RU;
    parent.append(input.input);
    input.startListen();
    input.listen(test);

    parent.append(textTraining.container);
    textTraining.render(response);
    keyboard.render(parent, lang);

    textTraining.updateProgress();
    textTraining.updateInstructions(TrainingStatus.start);
  }

  // stopInput(): void {
  //   this.test.input.stopListen();
  //   this.test.remove();
  // }
}
