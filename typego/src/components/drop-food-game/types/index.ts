export interface State {
  totalScore: Number;
  averageAccuracy: Number;
  lib: Record<string, string>;
}

export interface LvlParam {
  [i: string]: Record<string, number>;
}

export interface LvlMaxPoints {
  [i: string]: number;
}
