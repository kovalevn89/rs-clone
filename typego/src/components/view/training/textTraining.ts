import { createElement } from '../../helper';
import { Progress, TextResponse } from '../../types';
import Text from './text';

class TextTraining {
  container;
  text;
  progress;
  speed;
  accurancy;
  separator;

  constructor(response: TextResponse) {
    this.container = createElement('div', 'level__text__container');
    this.text = new Text(response.text);
    this.container.append(this.text.container);

    this.separator = createElement('div', 'separator', this.container);
    this.progress = createElement('div', 'text__progress', this.container);
    this.speed = createElement('div', 'speed__container', this.progress);
    this.accurancy = createElement('div', 'accurancy__container', this.progress);
  }

  updateProgress(progress: Progress): void {
    this.speed.textContent = `Speed: ${progress.speed} wpm`;
    this.accurancy.textContent = `Accurancy: ${progress.accurancy}%`;
  }
}

export default TextTraining;
