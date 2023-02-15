import { Status } from '../../types/enums';
import { isSpecial } from '../../helper/isSpecial';
import correctKey from '../../../assets/media/correctKey.mp3';
import incorrectKey from '../../../assets/media/incorrectKey.mp3';
import bacspaseKey from '../../../assets/media/backspaseKey.mp3';
// eslint-disable-next-line import/no-cycle
import TrainingTask from './trainingTask';
import FinishLevel from './finish';

export const keyDowmHandler = (
  e: KeyboardEvent,
  { keyboard, textTraining }: TrainingTask,
): void => {
  e.preventDefault();
  const id = e.code.toLowerCase();

  console.log(id);

  keyboard.activate(id, Status.active);
  const { text } = textTraining;
  let { index, mistakes } = text;
  const { letters } = text;
  const sound = new Audio(correctKey);
  sound.pause();
  sound.volume = 0.5;

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
    sound.volume = 0.3;
    sound.src = incorrectKey;
    sound.play();
  }

  text.setIndex(index);
  text.setMistakes(mistakes);
  text.updateActive();
};

export const keyUpHandler = (training: TrainingTask): void => {
  const { keyboard, textTraining, input } = training;
  const { text } = textTraining;

  keyboard.init();

  text.setCurrentTime(Date.now());
  text.updateSpeed();

  text.keyboardHint(keyboard);
  textTraining.updateProgress();
  if (text.index === text.letters.length - 1) {
    // const input = document.querySelector('#main_input');
    // if (!input) return;

    input.stopListen();
    // input?.remove();

    const finish = new FinishLevel();
    finish.renderComplete();
  }
};

export default { keyDowmHandler, keyUpHandler };
