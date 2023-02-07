import { Status } from '../../types';
import Keyboard from '../keyboard/keyboard';
import Text from './text';

export const keyDowmHandler = (e: KeyboardEvent, keyboard: Keyboard, text: Text): void => {
  e.preventDefault();
  const id = e.code.toLowerCase();

  keyboard.activate(id, Status.active);
  let { index } = text;
  const { words } = text;

  if (e.code === 'ShiftRight' || e.code === 'CapsLock' || e.code === 'ShiftLeft') {
    text.updateIndex(index);
  } else if (e.code === 'Backspace') {
    text.updateLetterStatus(index, Status.reset);
    if (index > 0) {
      index -= 1;
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
    index += 1;
  } else {
    text.updateLetterStatus(index, Status.incorrect);
    keyboard.activate(id, Status.incorrect);
    words[index].dataset.correct = '';
    index += 1;
  }

  text.updateIndex(index);
  text.updateActive();
};

// export const keyUpHandler = (e: )

export default keyDowmHandler;
