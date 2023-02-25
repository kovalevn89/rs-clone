/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement } from '../../helper';
// import TrainingState from '../../model/trainingState';
import { Tag } from '../../types/enums';
import PageView from '../baseViewClass';

export default class FinishLevel extends PageView {
  private nextBtn;
  private backBtn;
  private message;
  constructor() {
    super();
    this.backBtn = createElement<HTMLButtonElement>(Tag.btn, 'back__btn');
    this.nextBtn = createElement<HTMLButtonElement>(Tag.btn, 'next-lvl__btn');
    this.message = createElement(Tag.div, 'finish__message');
  }

  async run(): Promise<void> {
    this.state.saveStatistic();
    if (this.state.isTest) {
      const { testResult } = this.state;
      try {
        await this.api.updateTestResults(testResult);
        console.log('update', testResult);
      } catch (e) {
        console.log(this.api.error);
        throw e;
      }
    } else {
      const { current } = this.state;
      try {
        await this.api.updateProgress(current);
        console.log('update', current);
      } catch (e) {
        console.log(this.api.error);
        throw e;
      }
    }
    console.log(this.state);
    this.renderComplete();
  }

  renderComplete(): void {
    const parent = document.querySelector('.training__container');

    if (!parent) return;

    parent.innerHTML = '';
    const container = createElement(Tag.div, 'finish__container');
    const { lang } = this.state;
    const {
      speed,
      accurancy,
      time,
      mistakes,
      lesson,
      level,
      levels,
    } = this.state.current;

    console.log(speed, accurancy, time, mistakes);

    parent.append(container);
    container.append(this.message);
    this.renderTable(container);

    const btnsContainer = createElement(Tag.div, 'btns__container', container);
    btnsContainer.append(this.backBtn, this.nextBtn);

    this.updateMessage();
    this.listenButtons();
  }

  listenButtons(): void {
    const {
      accurancy, level, levels, lesson,
    } = this.state.current;
    const { lang, isTest } = this.state;
    this.backBtn.addEventListener('click', () => {
      if (isTest) {
        window.location.hash = '#/main';
      } else if (accurancy < 80) {
        // window.location.hash = `#/lesson?lang=${lang}&index=${lesson}&id=${this.state.level}`;
        window.location.reload();
      } else {
        window.location.hash = `#/training?lang=${lang}`;
      }
    });

    this.nextBtn.addEventListener('click', () => {
      console.log('next level', this.state, isTest, levels);
      if (isTest) {
        this.state.isTest = false;
        window.location.hash = '#/training';
      } else if (level < levels - 1) {
        this.state.current.level += 1;
        console.log(this.state.current.level);
        this.state.saveToStorage();
        window.location.hash = `#/lesson?lang=${lang}&index=${lesson}&id=${this.state.current.level}`;
      } else {
        this.state.current.level = 0;
        this.state.current.complitedLessons.push(this.state.current.lesson);
        window.location.hash = `#/training?lang=${lang}`;
      }
    });
  }

  private renderTable(parent: HTMLElement): void {
    const {
      time, accurancy, speed, mistakes,
    } = this.state.current;
    const tableContainer = createElement(Tag.div, 'results__table', parent);

    const timeTitle = createElement(Tag.div, 'table__row table__time', tableContainer);
    const timeValue = createElement(Tag.div, 'table__row table__time value', tableContainer);
    const timeUnits = createElement(Tag.div, 'table__row table__time units', tableContainer);

    this.translation.translateField(timeTitle, 'time');
    timeValue.textContent = `${time}`;
    this.translation.translateField(timeUnits, 'seconds');

    const accurancyTitle = createElement(Tag.div, 'table__row table__accurancy', tableContainer);
    const accurancyValue = createElement(Tag.div, 'table__row table__accurancy value', tableContainer);
    const accurancyUnits = createElement(Tag.div, 'table__row table__accurancy units', tableContainer);

    this.translation.translateField(accurancyTitle, 'accurancy');
    accurancyValue.textContent = `${accurancy}`;
    accurancyUnits.textContent = '%';

    const speedTitle = createElement(Tag.div, 'table__row table__speed', tableContainer);
    const speedValue = createElement(Tag.div, 'table__row table__speed value', tableContainer);
    const speedUnits = createElement(Tag.div, 'table__row table__speed units', tableContainer);

    this.translation.translateField(speedTitle, 'speed');
    speedValue.textContent = `${speed}`;
    this.translation.translateField(speedUnits, 'WPM');

    const mistakesTitle = createElement(Tag.div, 'table__row table__mistakes', tableContainer);
    const mistakesValue = createElement(Tag.div, 'table__row table__mistakes value', tableContainer);
    const mistakesUnits = createElement(Tag.div, 'table__row table__mistakes units', tableContainer);
    this.translation.translateField(mistakesTitle, 'mistakes');
    mistakesValue.textContent = `${mistakes}`;
    mistakesUnits.textContent = '';
  }

  private updateMessage(): void {
    const { current, isTest } = this.state;
    const { accurancy } = current;

    this.translation.translateField(this.nextBtn, 'nextLvl');
    // this.translation.translateField(this.backBtn, 'backBtn');

    if (isTest) {
      console.log('test');
      this.messageContent('result');
      this.nextBtn.disabled = false;
      this.translation.translateField(this.nextBtn, 'startTraining');
      this.translation.translateField(this.backBtn, 'toMain');
    } else if (accurancy < 80) {
      this.messageContent('mistakeMsg');

      this.nextBtn.disabled = true;
      this.translation.translateField(this.backBtn, 'tryAgain');
    } else {
      this.messageContent('finishMsg');
      this.nextBtn.disabled = false;
      this.translation.translateField(this.backBtn, 'backBtn');
    }
  }

  private messageContent(text: string): void {
    this.message.innerHTML = '';

    const finishMessage = createElement(Tag.par, 'finish__message__span', this.message);
    this.translation.translateField(finishMessage, text);
  }
}
