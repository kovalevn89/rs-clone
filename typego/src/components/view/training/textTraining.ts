import { createElement } from '../../helper';
import { TextResponse } from '../../types';
import Text from './text';

class TextTraining {
  container;
  text;
  private progress;
  private speed;
  private accurancy;
  private training;
  private separator;

  constructor(response: TextResponse) {
    this.container = createElement('div', 'level__text__container');
    this.text = new Text(response);
    this.container.append(this.text.container);

    this.separator = createElement('div', 'separator', this.container);
    this.progress = createElement('div', 'text__progress', this.container);
    this.training = createElement('div', 'precess__container', this.container);
    this.speed = createElement('div', 'speed__container', this.progress);
    this.accurancy = createElement('div', 'accurancy__container', this.progress);
  }

  updateProgress(): void {
    const { index, mistakes, speed } = this.text;
    const accurancy = index >= 3 ? Math.floor((1 - mistakes / index) * 100) : '';
    this.speed.textContent = `Speed: ${speed} letters per minute`;
    this.accurancy.textContent = `Accurancy: ${accurancy}%`;
    // this.training.textContent =
  }
}

export default TextTraining;
