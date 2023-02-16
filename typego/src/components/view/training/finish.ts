import { createElement } from '../../helper';
import State from '../../model/state';
import { Tag } from '../../types/enums';

export default class FinishLevel {
  private state: State;
  private nextBtn;
  private backBtn;
  private message;
  constructor() {
    this.state = new State();
    this.backBtn = createElement<HTMLButtonElement>(Tag.btn, 'back__btn');
    this.nextBtn = createElement<HTMLButtonElement>(Tag.btn, 'next-lvl__btn');
    this.message = createElement(Tag.div, 'finish__message');
  }

  renderComplete(): void {
    const parent = document.querySelector('.training__container');
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
        window.location.hash = `#/lesson?lang=${lang}&index=${lesson}&id=${this.state.level}`;
      } else {
        this.state.level = 0;
        this.state.progress.push(this.state.lesson);
        window.location.hash = `#/training?lang=${lang}`;
      }
    });
  }

  private updateMessage(): void {
    const {
      accurancy, mistakes, speed, time,
    } = this.state;

    this.nextBtn.textContent = 'Next level';

    if (accurancy < 80) {
      this.message.textContent = `Too many mistakes ${mistakes}, try again`;
      this.nextBtn.disabled = true;
      this.backBtn.textContent = 'Try again';
    } else {
      this.message.textContent = `You have finished this level in ${time}s & ${mistakes} mistakes, speed: ${speed} letters per minute, accurancy: ${accurancy}`;
      this.nextBtn.disabled = false;
      this.backBtn.textContent = 'Back to menu';
    }
  }
}
