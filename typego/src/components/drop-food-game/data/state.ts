import { State, GameState } from '../types';

export const state: State = {
  totalScore: 0,
  averageAccuracy: 0,
  lib: {},
  keys: [],
};

export const gameState: GameState = {
  letterOnField: [],
  letterPressed: [],
  letterMatched: [],
  curScore: 0,
  curAccuracy: 0,
};
