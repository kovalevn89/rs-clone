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

export interface Progress {
  speed: number;
  accurancy: number;
}

export interface TextResponse {
  text: string;
  lang: 'en' | 'ru';
}
