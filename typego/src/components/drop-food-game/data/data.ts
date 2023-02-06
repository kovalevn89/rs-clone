import { LvlParam, LvlMaxPoints } from '../types';

export const levelValues: LvlParam = {
  1: {
    speed: 4000,
    duration: 30000,
    columns: 6,
  },
  2: {
    speed: 4500,
    duration: 40000,
    columns: 6,
  },
  3: {
    speed: 4500,
    duration: 50000,
    columns: 7,
  },
  4: {
    speed: 5000,
    duration: 60000,
    columns: 7,
  },
  5: {
    speed: 5000,
    duration: 70000,
    columns: 8,
  },
};

export const levelMaxScore: LvlMaxPoints = {
  1: 450,
  2: 550,
  3: 800,
  4: 850,
  5: 1100,
};

export const arrRu: string[] = [
  'А',
  'Б',
  'В',
  'Г',
  'Д',
  'Е',
  'Ё',
  'Ж',
  'З',
  'И',
  'Й',
  'К',
  'Л',
  'М',
  'Н',
  'О',
  'П',
  'Р',
  'С',
  'Т',
  'У',
  'Ф',
  'Х',
  'Ц',
  'Ч',
  'Ш',
  'Щ',
  'Э',
  'Ю',
  'Я',
];
