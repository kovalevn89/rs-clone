export interface State {
  totalScore: Number;
  averageAccuracy: Number;
  lib: Record<string, string>;
  keys: string[];
}

export interface LvlParam {
  [i: string]: Record<string, number>;
}

export interface LvlMaxPoints {
  [i: string]: number;
}

export interface GameState {
  letterOnField: (HTMLElement | null)[];
  letterPressed: string[];
  letterMatched: string[];
}
