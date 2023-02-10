export interface State {
  totalScore: number;
  averageAccuracy: number;
  lib: Record<string, string>;
  keys: string[];
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
