export interface IMole {
  moleElement: HTMLElement | null;
  isShowed: boolean;
  letterElement: HTMLElement | null;
  curentLetter: string;
  timer: NodeJS.Timeout | null;
}

export interface ILetter {
  letter: string;
  svg: string;
}

export interface State {
  totalScore: number;
  averageAccuracy: number;
}

export interface LvlParam {
  [i: string]: Record<string, number>;
}

export interface GameState {
  letterOnField: (HTMLElement | null)[];
  letterPressed: string[];
  letterMatched: string[];
  curScore: number;
  curAccuracy: number;
}

export interface Lang {
  en: string;
  ru: string;
}
export type LanguageStr = 'en' | 'ru';

export interface DataLang {
  [tag: string]: Lang;
}

export interface IPage {
  page: string;
  params: Array<string>;
}

export interface IParametr {
  parametr: string;
  value: string;
}

export interface Progress {
  speed: number;
  accurancy: number;
}

export interface TextResponse extends Level {
  lang: LanguageStr;
}

// todo
export interface LevelSettings {
  lang: LanguageStr;
  font: 's' | 'm' | 'l';
  sound: boolean;
  skin: 'default' | 'custom';
}

export interface Lesson {
  index: number;
  name: string,
  lang: LanguageStr;
  levels?: Levels;
}

export type Lessons = Lesson[];

export interface Level {
  index: number;
  name: string;
  text: string;
}

export type Levels = Level[];

export interface Test {
  text: string;
  lang: LanguageStr;
}

export interface IShooter {
  shooterElement: HTMLElement | null;
  isShowed: boolean;
  wordElement: HTMLElement | null;
  curentword: string;
  timer: NodeJS.Timeout | null;
}

export interface User {
  username: string;
  password: string;
  token?: string;
}

export interface ITranslationData {
  en: string;
  ru: string;
}

export interface ITranslation {
  [key: string]: ITranslationData;
}
