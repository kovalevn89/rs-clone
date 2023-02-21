import { createElement, removeChild } from '../helper';
import { DEFAULT_RESPONSE, DEFAULT_RESPONSE_RU } from '../helper/constants';
// import TrainingState from '../model/trainingState';
import { LanguageStr } from '../types';
import {
  Lang, Tag, Themes, TrainingStatus,
} from '../types/enums';
import PageView from './baseViewClass';
import TrainingTask from './training/trainingTask';
import selectEN from '../../assets/png/selectEN.png';
import selectRU from '../../assets/png/selectRU.png';

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

    this.translation.cleanObserver();

    const wrapper = createElement(Tag.div, 'wrapper', container);

    const title = createElement(Tag.h2, 'training__title', wrapper);
    this.translation.translateField(title, 'test');

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

    selectEnBtn.style.background = `url(${selectEN}) center no-repeat`;
    selectEnBtn.style.backgroundSize = 'cover';

    selectRuBtn.addEventListener('click', () => {
      // window.location.hash = '#/test?lang=ru';

      selectRuBtn.classList.add('active');
      selectEnBtn.classList.remove('active');

      // this.stopInput();
      this.renderTest(Lang.ru, testContainer);
    });

    selectRuBtn.style.background = `url(${selectRU}) center no-repeat`;
    selectRuBtn.style.backgroundSize = 'cover';

    this.translation.translateField(selectEnBtn, 'layoutEn');
    this.translation.translateField(selectRuBtn, 'layoutRu');
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
