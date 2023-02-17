import { LvlParam, DataLang } from '../types';

export const levelValues: LvlParam = {
  1: {
    speed: 5500,
    duration: 30000,
    columns: 5,
  },
  2: {
    speed: 5000,
    duration: 40000,
    columns: 6,
  },
  3: {
    speed: 4500,
    duration: 50000,
    columns: 6,
  },
  4: {
    speed: 5000,
    duration: 60000,
    columns: 7,
  },
  5: {
    speed: 4500,
    duration: 70000,
    columns: 7,
  },
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

export const dataLang: DataLang = {
  letters: {
    en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    ru: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
  },
};
