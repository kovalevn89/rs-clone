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
    this.separator = createElement('div', 'separator');
    this.progress = createElement('div', 'text__progress');
    this.speed = createElement('div', 'speed__container');
    this.accurancy = createElement('div', 'accurancy__container');

    this.container.append(this.text.container, this.progress);
    this.progress.append(this.speed, this.accurancy);
  }

  updateProgress(progress: Progress): void {
    this.speed.textContent = `${progress.speed} wpm`;
    this.accurancy.textContent = `${progress.accurancy}%`;
  }
}

export default TextTraining;
