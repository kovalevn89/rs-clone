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

export enum Lang {
  ru = 'ru',
  en = 'en',
}

export enum Status {
  active = 'active',
  correct = 'correct',
  incorrect = 'incorrect',
  fixed = 'fixed',
  reset = 'reset',
}

export enum TrainingStatus {
  start = 'start',
  pause = 'pause',
  continue = 'continue',
}

export interface Progress {
  speed: number;
  accurancy: number;
}

export interface TextResponse {
  text: string;
  lang: 'en' | 'ru';
}

export default { Lang };
