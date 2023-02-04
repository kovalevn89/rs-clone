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

export interface Progress {
  speed: number;
  accurancy: number;
}

export interface TextResponse {
  text: string;
  lang: 'en' | 'ru';
}

export default { Lang };
