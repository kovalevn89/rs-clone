/* eslint-disable @typescript-eslint/no-unused-vars */
import { createElement } from '../../helper';
// import TrainingState from '../../model/trainingState';
import { Tag } from '../../types/enums';
import PageView from '../baseViewClass';

export default class FinishLevel extends PageView {
  // private state: TrainingState;
  private nextBtn;
  private backBtn;
  private message;
  constructor() {
    super();
    // this.state = new TrainingState();
    this.backBtn = createElement<HTMLButtonElement>(Tag.btn, 'back__btn');
    this.nextBtn = createElement<HTMLButtonElement>(Tag.btn, 'next-lvl__btn');
    this.message = createElement(Tag.div, 'finish__message');
  }

  renderComplete(): void {
    // const parent = document.querySelector('.training__container');
    // eslint-disable-next-line no-bitwise
    const parent = createElement(Tag.div, 'training__container', document.querySelector<HTMLElement>('.app'));

    if (!parent) return;

    parent.innerHTML = '';
    const container = createElement(Tag.div, 'finish__container');

    const {
      speed,
      accurancy,
      time,
      mistakes,
      lang,
      lesson,
      level,
      levels,
    } = this.state;

    console.log(speed, accurancy, time, mistakes);

    parent.append(container);
    container.append(this.message);
    const btnsContainer = createElement(Tag.div, 'btns__container', container);
    btnsContainer.append(this.backBtn, this.nextBtn);

    this.updateMessage();

    this.backBtn.addEventListener('click', () => {
      if (accurancy < 80) {
        // window.location.hash = `#/lesson?lang=${lang}&index=${lesson}&id=${this.state.level}`;
        window.location.reload();
      } else {
        window.location.hash = `#/training?lang=${lang}`;
      }
    });

    this.nextBtn.addEventListener('click', () => {
      console.log('next level', this.state);

      if (level < levels - 1) {
        this.state.level += 1;
        this.state.saveToStorage();
        window.location.hash = `#/lesson?lang=${lang}&index=${lesson}&id=${this.state.level}`;
      } else {
        this.state.level = 0;
        this.state.complitedLessons.push(this.state.lesson);
        window.location.hash = `#/training?lang=${lang}`;
      }
    });
  }

  renderTestResult(): void {

  }

  private renderTable(parent: HTMLElement): void {
    const {
      time, accurancy, speed, mistakes,
    } = this.state;
    const tableContainer = createElement(Tag.div, 'results__table', parent);

    const timeTitle = createElement(Tag.div, 'table__row table__time', parent);
    const timeValue = createElement(Tag.div, 'table__row table__time value', parent);
    const timeUnits = createElement(Tag.div, 'table__row table__time units', parent);

    timeTitle.textContent = this.translation.getString('time');
    this.translation.regObserver(() => {
      timeTitle.textContent = this.translation.getString('time');
    });

    timeTitle.textContent = this.translation.getString('time');
    this.translation.regObserver(() => {
      timeTitle.textContent = this.translation.getString('time');
    });

    timeTitle.textContent = this.translation.getString('time');
    this.translation.regObserver(() => {
      timeTitle.textContent = this.translation.getString('time');
    });

    const accurancyTitle = createElement(Tag.div, 'table__row table__accurancy', parent);
    const accurancyValue = createElement(Tag.div, 'table__row table__accurancy value', parent);
    const accurancyUnits = createElement(Tag.div, 'table__row table__accurancy units', parent);

    accurancyTitle.textContent = this.translation.getString('accurancy');
    this.translation.regObserver(() => {
      accurancyTitle.textContent = this.translation.getString('accurancy');
    });

    accurancyTitle.textContent = this.translation.getString('accurancy');
    this.translation.regObserver(() => {
      accurancyTitle.textContent = this.translation.getString('accurancy');
    });

    accurancyTitle.textContent = this.translation.getString('accurancy');
    this.translation.regObserver(() => {
      accurancyTitle.textContent = this.translation.getString('accurancy');
    });

    const speedTitle = createElement(Tag.div, 'table__row table__speed', parent);
    const speedValue = createElement(Tag.div, 'table__row table__speed value', parent);
    const speedUnits = createElement(Tag.div, 'table__row table__speed units', parent);

    speedTitle.textContent = this.translation.getString('speed');
    this.translation.regObserver(() => {
      speedTitle.textContent = this.translation.getString('speed');
    });

    speedTitle.textContent = this.translation.getString('speed');
    this.translation.regObserver(() => {
      speedTitle.textContent = this.translation.getString('speed');
    });

    const mistakesTitle = createElement(Tag.div, 'table__row table__mistakes', parent);
    const mistakesValue = createElement(Tag.div, 'table__row table__mistakes value', parent);
    const mistakesUnits = createElement(Tag.div, 'table__row table__mistakes units', parent);

    mistakesTitle.textContent = this.translation.getString('mistakes');
    this.translation.regObserver(() => {
      mistakesTitle.textContent = this.translation.getString('mistakes');
    });
  }

  private updateMessage(): void {
    const { accurancy, isTest } = this.state;

    this.nextBtn.textContent = 'Next level';
    this.nextBtn.textContent = this.translation.getString('nextLvl');
    this.translation.regObserver(() => {
      this.nextBtn.textContent = this.translation.getString('nextLvl');
    });

    if (isTest) {
      console.log('test');
    }

    if (accurancy < 80) {
      this.messageContent('mistakeMsg');

      this.nextBtn.disabled = true;
      this.backBtn.textContent = this.translation.getString('tryAgain');
      this.translation.regObserver(() => {
        this.backBtn.textContent = this.translation.getString('tryAgain');
      });
    } else {
      this.messageContent('finishMsg');
      this.nextBtn.disabled = false;
      // this.backBtn.textContent = this.translation.getString('backBtn');
      this.translation.translateField(this.backBtn, 'backBtn');
    }
  }
  private messageContent(text: string): void {
    this.message.innerHTML = '';

    const finishMessage = createElement(Tag.par, 'finish__message__span', this.message);
    finishMessage.textContent = this.translation.getString(text);
    this.translation.regObserver(() => {
      finishMessage.textContent = this.translation.getString(text);
    });

    const finishMessageTime = createElement(Tag.par, 'finish__message__span', this.message);
    finishMessageTime.textContent = this.translation.getString('time');
    this.translation.regObserver(() => {
      finishMessageTime.textContent = this.translation.getString('time');
    });
    createElement(Tag.span, 'finish__message__span', finishMessageTime).textContent = `: ${this.state.time}`;

    const finishMessageSpeed = createElement(Tag.par, 'finish__message__span', this.message);
    finishMessageSpeed.textContent = this.translation.getString('speed');
    this.translation.regObserver(() => {
      finishMessageSpeed.textContent = this.translation.getString('speed');
    });
    createElement(Tag.span, 'finish__message__span', finishMessageSpeed).textContent = `: ${this.state.speed}`;

    const finishMessageAccurancy = createElement(Tag.par, 'finish__message__span', this.message);
    finishMessageAccurancy.textContent = this.translation.getString('accurancy');
    this.translation.regObserver(() => {
      finishMessageAccurancy.textContent = this.translation.getString('accurancy');
    });
    createElement(Tag.span, 'finish__message__span', finishMessageAccurancy).textContent = `: ${this.state.accurancy}`;

    const finishMessageMistakes = createElement(Tag.par, 'finish__message__span', this.message);
    finishMessageMistakes.textContent = this.translation.getString('mistakes');
    this.translation.regObserver(() => {
      finishMessageMistakes.textContent = this.translation.getString('mistakes');
    });
    createElement(Tag.span, 'finish__message__span', finishMessageMistakes).textContent = `: ${this.state.mistakes}`;
  }
}
