import { createElement, removeChild } from '../helper';
import { LanguageStr } from '../types';
import {
  Lang, Language, Tag, Themes, TrainingStatus,
} from '../types/enums';
import PageView from './baseViewClass';
import TrainingTask from './training/trainingTask';

export default class TypingTest extends PageView {
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

    if (this.currentLang === Language.EN) {
      selectEnBtn.classList.add('active');
    } else {
      selectRuBtn.classList.add('active');
    }

    const testContainer = createElement(Tag.div, 'test__container training__container', wrapper);

    const lang = this.currentLang === Language.EN ? Lang.en : Lang.ru;

    selectEnBtn.addEventListener('click', () => {
      selectEnBtn.classList.add('active');
      selectRuBtn.classList.remove('active');

      this.renderTest(Lang.en, testContainer);
    });
    selectRuBtn.addEventListener('click', () => {
      selectRuBtn.classList.add('active');
      selectEnBtn.classList.remove('active');

      this.renderTest(Lang.ru, testContainer);
    });

    this.translation.translateField(selectEnBtn, 'layoutEn');
    this.translation.translateField(selectRuBtn, 'layoutRu');

    this.renderTest(lang, testContainer);
  }

  run(): void {
    this.state.isTest = true;
    this.render();
  }

  async renderTest(lang: LanguageStr, parent: HTMLElement): Promise<void> {
    parent.innerHTML = '';

    const test = new TrainingTask();
    const { input, keyboard, textTraining } = test;

    const testResponse = await this.api.getTest(lang);
    const response = {
      name: 'test',
      index: 0,
      ...testResponse,
    };
    parent.append(input.input);
    input.startListen();
    input.listen(test);

    parent.append(textTraining.container);
    textTraining.render(response);
    keyboard.render(parent, lang);

    textTraining.updateProgress();
    textTraining.updateInstructions(TrainingStatus.start);
  }
}
