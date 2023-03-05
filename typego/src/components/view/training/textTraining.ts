import { createElement } from '../../helper';
import { TextResponse } from '../../types';
import { Tag, TrainingStatus } from '../../types/enums';
import PageView from '../baseViewClass';
import Text from './text';

class TextTraining extends PageView {
  container;
  text;
  training;
  private progress;
  private speed;
  private speedTitle;
  private speedValue;
  private speedDescription;
  private accuracy;
  private accuracyTitle;
  private accuracyValue;
  private accuracyDescription;
  private separator;

  constructor() {
    super();

    this.container = createElement(Tag.div, 'level__text__container');
    this.container.innerHTML = '';
    this.text = new Text();

    this.container.append(this.text.container);

    this.separator = createElement(Tag.div, 'separator', this.container);
    this.progress = createElement(Tag.div, 'text__progress', this.container);
    this.speed = createElement(Tag.div, 'speed__container', this.progress);

    this.speedTitle = createElement(Tag.span, 'speed__span', this.speed);
    this.speedValue = createElement(Tag.span, 'speed__span value', this.speed);
    this.speedDescription = createElement(Tag.span, 'speed__span descr', this.speed);

    this.accuracy = createElement(Tag.div, 'accuracy__container', this.progress);
    this.accuracyTitle = createElement(Tag.span, 'accuracy__span', this.accuracy);
    this.accuracyValue = createElement(Tag.span, 'accuracy__span value', this.accuracy);
    this.accuracyDescription = createElement(Tag.span, 'accuracy__span descr', this.accuracy);

    this.translation.translateField(this.speedTitle, 'speed');
    this.translation.translateField(this.speedDescription, 'WPM');
    this.translation.translateField(this.accuracyTitle, 'accuracy');

    this.accuracyDescription.textContent = '%';

    this.training = createElement(Tag.div, 'text__instructions', this.container);
  }

  render(response: TextResponse): void {
    this.text.render(response);
  }

  updateProgress(): void {
    const { index, mistakes, speed } = this.text;

    const accuracy = index > 0 ? Math.floor((1 - mistakes / index) * 100) : 0;

    this.speedValue.textContent = `: ${speed} `;
    this.accuracyValue.textContent = `: ${accuracy}`;

    this.state.current.accuracy = accuracy;
    this.state.current.speed = speed;
    this.state.current.mistakes = mistakes;
  }

  updateInstructions(status: TrainingStatus) {
    this.translation.translateField(this.training, status);

    if (status !== TrainingStatus.pause) {
      this.training.classList.add('pause');
    } else {
      this.training.classList.remove('pause');
    }
  }
}

export default TextTraining;
