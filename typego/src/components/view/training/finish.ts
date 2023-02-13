import { createElement } from '../../helper';
import { Tag } from '../../types/enums';
// eslint-disable-next-line import/no-cycle
import Training from './training';

export default class FinishLevel {
  container;
  message;

  constructor() {
    this.container = createElement(Tag.div, 'finish__container');
    this.message = createElement(Tag.div, 'finish__messqge', this.container);
  }

  render(training: Training, parent: HTMLElement) {
    // parent.innerHTML = '';
    console.log(parent);
    training.input.stopListen();
    training.remove();

    const {
      speed, accurancy, time, mistakes,
    } = training.textTraining.text;
    console.log(speed, accurancy, time, mistakes);
    console.log(training.input);

    parent.append(this.container);

    this.message.textContent = `Congrats! You have finished this level in ${time}s & ${mistakes} mistakes`;
    const backBtn = createElement<HTMLButtonElement>(Tag.btn, 'back__btn', this.container);
    const nextBtn = createElement<HTMLButtonElement>(Tag.btn, 'next-level__btn', this.container);
    backBtn.textContent = 'Back';
    nextBtn.textContent = 'Start next level';

    backBtn.addEventListener('click', () => {
      parent.innerHTML = '';
    });

    nextBtn.addEventListener('click', () => {

    });
  }
}
