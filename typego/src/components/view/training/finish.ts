import { createElement } from '../../helper';
import State from '../../model/state';
import { Tag } from '../../types/enums';

export default class FinishLevel {
  private state: State;
  constructor() {
    this.state = new State();
  }

  renderComplete(): void {
    console.log(this.state);
    const parent = document.querySelector('.training__container');
    if (!parent) return;

    parent.innerHTML = '';
    const container = createElement(Tag.div, 'finish__container');
    const message = createElement(Tag.div, 'finish__messqge', container);

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

    const isFinished = true;

    message.textContent = isFinished
      ? `Congrats! You have finished this level in ${time}s & ${mistakes} mistakes`
      : `Too many mistakes ${mistakes}, try again`;

    const backBtn = createElement<HTMLButtonElement>(Tag.btn, 'back__btn', container);
    const nextBtn = createElement<HTMLButtonElement>(Tag.btn, 'next-level__btn', container);
    backBtn.textContent = 'Back';
    nextBtn.textContent = isFinished ? 'Start next level' : 'Try again';

    backBtn.addEventListener('click', () => {
      console.log('menu');
      window.location.hash = `#/training?lang=${lang}`;
    });

    nextBtn.addEventListener('click', () => {
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
}
