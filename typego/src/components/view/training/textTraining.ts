import { createElement } from '../../helper';
import { TextResponse } from '../../types';
import { Tag, TrainingStatus } from '../../types/enums';
import Text from './text';

class TextTraining {
  container;
  text;
  training;
  private progress;
  private speed;
  private accurancy;
  private separator;

  constructor() {
    this.container = createElement(Tag.div, 'level__text__container');
    this.text = new Text();

    this.separator = createElement(Tag.div, 'separator', this.container);
    this.progress = createElement(Tag.div, 'text__progress', this.container);
    this.speed = createElement(Tag.div, 'speed__container', this.progress);
    this.accurancy = createElement(Tag.div, 'accurancy__container', this.progress);

    this.training = createElement(Tag.div, 'text__instructions', this.container);
  }

  render(response: TextResponse): void {
    this.container.append(this.text.init(response));
  }

  updateProgress(): void {
    const { index, mistakes, speed } = this.text;
    const accurancy = index >= 3 ? Math.floor((1 - mistakes / index) * 100) : '';
    this.speed.textContent = `Speed: ${speed} letters per minute`;
    this.accurancy.textContent = `Accurancy: ${accurancy}%`;
  }

  updateInstructions(status: TrainingStatus) {
    this.training.textContent = `Press ${status === TrainingStatus.pause ? 'Esc' : 'any key'} to ${status.toUpperCase()}`;
    if (status !== TrainingStatus.pause) {
      this.training.classList.add('pause');
    } else {
      this.training.classList.remove('pause');
    }
  }
}

export default TextTraining;
