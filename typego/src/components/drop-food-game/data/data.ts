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
  levelTitle: {
    en: 'Level',
    ru: 'Уровень',
  },
  resetButton: {
    en: 'Start all over again',
    ru: 'Начать все заново',
  },
  pointsTitle: {
    en: 'Statistics',
    ru: 'Статистика',
  },
  scoreTitle: {
    en: 'In total, delicious snacks were eaten:',
    ru: 'Всего скушано вкусняшек:',
  },
  accuracyTitle: {
    en: 'Average catch percentage:',
    ru: 'Средний процент ловли:',
  },
  ruleTitle: {
    en: 'Rules of the game',
    ru: 'Правила игры',
  },
  ruleText: {
    en: `The goal of this game is to catch all the falling food!
    Don't let them fall to the ground!
    Enjoy this game.
    You will get a lot of fun!
    Press the keys on the keyboard according to the letters indicated on the falling food.
    Collect all food to earn maximum points! It will also take into account the statistics of incorrect hits (your accuracy of typing letters).
    Depending on the selected difficulty level, the amount and speed of food falling, as well as the duration of the level, will change.`,
    ru: `Цель этой игры состоит в том, чтобы поймать всю падающую еду!
    Не дайте им упасть на землю!
    Наслаждайтесь этой игрой.
    Вы получите массу удовольствия!
    Нажимайте клавиши на клавиатуре в соответствии с буквами, указанными на падающей еде.
    Соберите всю еду, чтобы заработать максимальные очки! Также будет учитываться статистика неправильных попаданий (ваша точность набора букв).
    В зависимости от выбранного уровня сложности, будет меняться количество и скорость падения еды, а также продолжительность уровня.`,
  },
  personDetailsTitle: {
    en: 'SETTINGS',
    ru: 'НАСТРОЙКИ',
  },
  personDetailsText: {
    en: `
Tired of playing on factory settings?! Now you can customize the game according to your wishes. Choose the duration of the level, speed and amount of food and go!`,
    ru: 'Устали играть на заводских настройках?! Теперь вы можете настроить игру с учетом своих пожеланий. Выбирайте продолжительность уровня, скорость и количество еды и вперед!',
  },
  settingDuration: {
    en: 'Duration 20 to 90 s',
    ru: 'Продолжительность от 20 до 90 с',
  },
  settingSpeed: {
    en: 'Fall time 2 to 10 s',
    ru: 'Время падения от 2 до 10 с',
  },
  settingColumns: {
    en: 'Amount of food at a time from 4 to 8',
    ru: 'Количество еды за раз от 4 до 8',
  },
  errorMessageEr: {
    en: 'Error',
    ru: 'Ошибка',
  },
  errorMessageEmpty: {
    en: 'This field is empty',
    ru: 'Заполните поле',
  },
  btnStart: {
    en: 'Start',
    ru: 'Старт',
  },
  popupContent: {
    en: 'OM-NOM-NOM. Thanks for the food!',
    ru: 'НЯM-НЯМ. Спасибо за еду!',
  },
};
