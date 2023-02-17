import { createElement } from '../../helper';
import TrainingState from '../../model/trainingState';
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
  private accurancy;
  private accurancyTitle;
  private accurancyValue;
  private accurancyDescription;
  private separator;
  private state;

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

    this.accurancy = createElement(Tag.div, 'accurancy__container', this.progress);
    this.accurancyTitle = createElement(Tag.span, 'accurancy__span', this.accurancy);
    this.accurancyValue = createElement(Tag.span, 'accurancy__span value', this.accurancy);
    this.accurancyDescription = createElement(Tag.span, 'accurancy__span descr', this.accurancy);

    this.speedTitle.textContent = this.translation.getString('speed');
    this.translation.regObserver(() => {
      this.speedTitle.textContent = this.translation.getString('speed');
    });

    this.speedDescription.textContent = this.translation.getString('WPM');
    this.translation.regObserver(() => {
      this.speedDescription.textContent = this.translation.getString('WPM');
    });

    this.accurancyTitle.textContent = this.translation.getString('accurancy');
    this.translation.regObserver(() => {
      this.accurancyTitle.textContent = this.translation.getString('accurancy');
    });
    this.accurancyDescription.textContent = '%';

    this.training = createElement(Tag.div, 'text__instructions', this.container);

    this.state = new TrainingState();
  }

  render(response: TextResponse): void {
    this.text.render(response);
  }

  updateProgress(): void {
    const { index, mistakes, speed } = this.text;
    const accurancy = index >= 3 ? Math.floor((1 - mistakes / index) * 100) : '';

    this.speedValue.textContent = `: ${speed} `;
    this.accurancyValue.textContent = `: ${accurancy}`;

    this.state.accurancy = accurancy as number;
    this.state.speed = speed;
    this.state.mistakes = mistakes;
  }

  updateInstructions(status: TrainingStatus) {
    this.training.textContent = this.translation.getString(status);
    this.translation.regObserver(() => {
      this.training.textContent = this.translation.getString(status);
    });
    if (status !== TrainingStatus.pause) {
      this.training.classList.add('pause');
    } else {
      this.training.classList.remove('pause');
    }
  }
}

export default TextTraining;
