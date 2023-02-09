import { Status } from '../../types/enums';
import { isSpecial } from '../../helper/isSpecial';
import Keyboard from '../keyboard/keyboard';
import Text from './text';
import TextTraining from './textTraining';
import correctKey from '../../../assets/media/correctKey.mp3';
import incorrectKey from '../../../assets/media/incorrectKey.mp3';
import bacspaseKey from '../../../assets/media/backspaseKey.mp3';

export const keyDowmHandler = (e: KeyboardEvent, keyboard: Keyboard, text: Text): void => {
  e.preventDefault();
  const id = e.code.toLowerCase();

  keyboard.activate(id, Status.active);
  let { index, mistakes } = text;
  const { letters } = text;
  const sound = new Audio(correctKey);
  sound.pause();
  sound.volume = 0.3;

  if (isSpecial(e.code)) {
    text.setIndex(index);
    sound.pause();
    sound.play();
  } else if (e.code === 'Backspace') {
    text.updateLetterStatus(index, Status.reset);
    if (index > 0) {
      index -= 1;
      mistakes = mistakes > 0 ? mistakes - 1 : 0;
      letters[index].dataset.fix = 'true';
      sound.pause();
      sound.src = bacspaseKey;
      sound.play();
    }
    text.updateLetterStatus(index, Status.reset);
  } else if (letters[index].textContent === e.key) {
    if (letters[index].dataset.fix && !letters[index].dataset.correct) {
      text.updateLetterStatus(index, Status.fixed);
      keyboard.activate(id, Status.correct);
    } else {
      text.updateLetterStatus(index, Status.correct);
      letters[index].dataset.correct = 'true';
      keyboard.activate(id, Status.correct);
    }
    if (index < letters.length - 1) {
      index += 1;
    }
    sound.pause();
    sound.play();
  } else {
    text.updateLetterStatus(index, Status.incorrect);
    keyboard.activate(id, Status.incorrect);
    letters[index].dataset.correct = '';
    if (index < letters.length - 1) {
      index += 1;
    }
    mistakes += 1;
    sound.pause();
    sound.src = incorrectKey;
    sound.play();
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

  text.keyboardHint(keyboard);
  training.updateProgress();
  if (text.index === text.letters.length - 1) {
    // temporary solution

    // eslint-disable-next-line no-alert
    alert('Level done!');
    // todo finish level function
  }
};

export default { keyDowmHandler, keyUpHandler };
