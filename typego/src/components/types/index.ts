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
  lang: 'en' | 'ru';
}

export interface LevelSettings {
  lang: 'en' | 'ru';
  font: 's' | 'm' | 'l';
  sound: boolean;
  skin: 'default' | 'custom';
}

export interface Lesson {
  index: number;
  name: string,
  lang: 'en' | 'ru';
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
  lang: 'en' | 'ru';
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

export interface IGameScore {
  _id: string,
  name: string,
  level: number,
  score: number,
  __v: number,
}

export interface IProgress {
  _id: string,
  lesson: number,
  lang: string,
  level: number,
  accuracy: number,
  speed: number,
  __v: number,
}

export interface IUser {
  _id: string,
  username: string,
  accuracy?: number,
  speed?: number,
  gamesScore: Array<IGameScore>,
  progress: Array<IProgress>,
}
