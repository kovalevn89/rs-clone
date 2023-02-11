import { createElement } from '../../helper';
import Keyboard from '../keyboard/keyboard';
import TextTraining from './textTraining';
import TextInput from './textInput';
import { Lang, TrainingStatus } from '../../types/enums';
import { TextResponse } from '../../types';
import Api from '../../../api/api';

class Training {
  container;
  input;
  textTraining;
  keyboard;
  settings;

  constructor(response: TextResponse) {
    this.container = createElement('div', 'level__container', document.body);
    this.container.innerHTML = '';

    this.input = new TextInput();
    this.textTraining = new TextTraining(response);
    this.keyboard = new Keyboard(response.lang);
    this.settings = {};
  }

  async render(): Promise<void> {
    this.container.append(this.input.input);
    this.container.append(this.textTraining.container);
    this.container.append(this.keyboard.keyboard);

    this.input.listen(this.keyboard, this.textTraining);
    this.textTraining.updateProgress();
    this.textTraining.updateInstructions(TrainingStatus.start);
    const api = new Api();
    const lessons = await api.getLessons(Lang.en);
    console.log(lessons);
  }
}

export default Training;
