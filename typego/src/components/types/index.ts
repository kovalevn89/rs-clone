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
