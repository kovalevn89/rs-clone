import { Status } from '../../types';
import { isSpecial } from '../../types/isSpecial';
import Keyboard from '../keyboard/keyboard';
import Text from './text';
import TextTraining from './textTraining';

export const keyDowmHandler = (e: KeyboardEvent, keyboard: Keyboard, text: Text): void => {
  e.preventDefault();
  const id = e.code.toLowerCase();

  keyboard.activate(id, Status.active);
  let { index, mistakes } = text;
  const { words } = text;

  if (isSpecial(e.code)) {
    text.setIndex(index);
  } else if (e.code === 'Backspace') {
    text.updateLetterStatus(index, Status.reset);
    if (index > 0) {
      index -= 1;
      mistakes = mistakes > 0 ? mistakes - 1 : 0;
      words[index].dataset.fix = 'true';
    }
    text.updateLetterStatus(index, Status.reset);
  } else if (words[index].textContent === e.key) {
    if (words[index].dataset.fix && !words[index].dataset.correct) {
      text.updateLetterStatus(index, Status.fixed);
      keyboard.activate(id, Status.correct);
    } else {
      text.updateLetterStatus(index, Status.correct);
      words[index].dataset.correct = 'true';
      keyboard.activate(id, Status.correct);
    }
    if (index < words.length - 1) {
      index += 1;
    }
  } else {
    text.updateLetterStatus(index, Status.incorrect);
    keyboard.activate(id, Status.incorrect);
    words[index].dataset.correct = '';
    if (index < words.length - 1) {
      index += 1;
    }
    mistakes += 1;
  }

  text.setIndex(index);
  text.setMistakes(mistakes);
  text.updateActive();
};

export const keyUpHandler = (keyboard: Keyboard, training: TextTraining): void => {
  keyboard.init();
  const { text } = training;
  text.setCurrentTime(Date.now());
  text.updateSpeed();
  console.log(text.currenTime, text.speed);

  text.keyboardHint(keyboard);
  training.updateProgress();
  if (text.index === text.words.length - 1) {
    // temporary solution

    // eslint-disable-next-line no-alert
    alert('Level done!');
    // todo finish level function
  }
};

export default { keyDowmHandler, keyUpHandler };
