import {
  LETTER_RU, LETTER_RU_SVG, LETTER_EN, LETTER_EN_SVG,
} from './constants';

export function createElement<T = HTMLElement>(
  tagName: string,
  classNames?: string,
  parent: HTMLElement | null = null,
  ...dataAttr: string[][]
): T {
  const el = document.createElement(tagName);

  if (classNames) {
    el.classList.add(...classNames.split(' '));
  }

  if (parent !== null) {
    parent.appendChild(el);
  }

  if (dataAttr.length > 0) {
    dataAttr.forEach(([attrName, attrValue]) => {
      if (attrValue === '') {
        el.setAttribute(attrName, '');
        return;
      }
      if (
        attrName.match(/value|id|href|target|src|alt|type|name|placeholder|tabindex|min|max|for|step|width|height|selected|spellcheck/i) !== null
      ) {
        el.setAttribute(attrName, attrValue);
      } else {
        el.dataset[attrName] = attrValue;
      }
    });
  }

  return el as T;
}

export function removeChild(element: HTMLElement): void {
  while (element.firstChild !== null) {
    if (element.lastChild !== null) {
      element.removeChild(element.lastChild);
    }
  }
}

function getLetterRU(position: number) {
  const letter: string = LETTER_RU[position];
  const svg: string = `<svg class="letter_img" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="600, 800, 3000, 3000" xmlns:xlink="http://www.w3.org/1999/xlink">${LETTER_RU_SVG[position]}</svg>`;

  return { letter, svg };
}

function getLetterEN(position: number) {
  const letter: string = LETTER_EN[position];
  const svg: string = `<svg class="letter_img" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="800, 800, 2500, 2500" xmlns:xlink="http://www.w3.org/1999/xlink">${LETTER_EN_SVG[position]}</svg>`;

  return { letter, svg };
}

function getRandomLetterIndex(letterArray: Array<string>): number {
  const maxLen: number = letterArray.length;

  if (maxLen > 0) {
    return Math.floor(Math.random() * maxLen);
  }

  return 0;
}

export function getLetter(language: string) {
  switch (language) {
    case 'ru': return getLetterRU(getRandomLetterIndex(LETTER_RU));
    case 'en': return getLetterEN(getRandomLetterIndex(LETTER_EN));
    default: return {
      letter: '-1',
      svg: '',
    };
  }
}

export function playSound(src: string, isSound = true): void {
  const sound = new Audio(src);
  if (isSound) {
    sound.play();
  }
}
