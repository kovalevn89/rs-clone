import { State, GameState } from '../types';

const state: State = {
  totalScore: 0,
  averageAccuracy: 0,
  lib: {},
  keys: [],
};

export const gameState: GameState = {
  letterOnField: [],
  letterPressed: [],
  letterMatched: [],
};

export default state;
