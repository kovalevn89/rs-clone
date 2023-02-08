// eslint-disable-next-line import/no-cycle
import DropGamePage from './drop-game-page';
import { removeChild } from '../helper/index';

function createPopup() {
  const body = document.querySelector('body') as HTMLBodyElement;
  const wrapPopup = body.querySelector('.popup-setting') as HTMLElement;
  const popupForm = wrapPopup.querySelector('.popup-form') as HTMLElement;
  const inputs = popupForm.querySelectorAll('input');
  const popupBack = body.querySelector('.popup_back') as HTMLElement;
  const popupClose = body.querySelector('.popup_close') as HTMLElement;

  wrapPopup.style.display = 'block';
  function popUpClose() {
    wrapPopup.style.display = 'none';
  }
  popupBack.addEventListener('click', popUpClose);
  popupClose.addEventListener('click', popUpClose);
  window.addEventListener('hashchange', popUpClose);

  function validateElem(elem: HTMLInputElement) {
    const nextElem = elem.nextElementSibling as Element;
    if (elem.name === 'duration') {
      console.log(elem.value);
      if (+elem.value >= 90 || (+elem.value < 20 && elem.value !== '')) {
        nextElem.textContent = 'Error';
      } else nextElem.textContent = '';
    }
    if (elem.name === 'speed') {
      if (+elem.value >= 10 || (+elem.value < 2 && elem.value !== '')) {
        nextElem.textContent = 'Error';
      } else nextElem.textContent = '';
    }
    if (elem.name === 'columns') {
      if (+elem.value >= 8 || (+elem.value < 4 && elem.value !== '')) {
        nextElem.textContent = 'Error';
      } else nextElem.textContent = '';
    }
  }

  function validateForm(even: Event): void {
    even.preventDefault();
    const form = document.querySelector('form') as HTMLFormElement;
    inputs.forEach((elem: HTMLInputElement) => {
      const nextElem = elem.nextElementSibling as Element;
      if (nextElem.textContent !== '') {
        return;
      }
      if (elem.value === '') {
        nextElem.textContent = 'This field is empty';
      } else {
        nextElem.textContent = '';
      }
    });

    if (
      Array.from(inputs).every(
        (elem: HTMLInputElement) => elem.value !== '' && (elem.nextElementSibling as Element).textContent === '',
      )
    ) {
      removeChild(body);

      const gamePage = new DropGamePage();
      const speed = +form.speed.value * 1000;
      const duration = +form.duration.value * 1000;
      const columns = +form.columns.value;
      console.log(speed, duration, columns);
      gamePage.createDropGamePage('0', speed, duration, columns);
    }
  }

  popupForm.addEventListener('submit', (even) => {
    validateForm(even);
  });
  inputs.forEach((elem: HTMLInputElement) => {
    elem.addEventListener('blur', () => {
      validateElem(elem);
    });
  });
}

export default createPopup;
