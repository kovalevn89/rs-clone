import { LanguageStr } from '../types';
import { Lang } from '../types/enums';

export default class TrainingState {
  private static instance: TrainingState;
  lang!: LanguageStr;
  progress!: {
    lesson: number;
    level: number;
  }[];
  lesson!: number;
  complitedLessons!: number[];
  level!: number;
  levels!: number;
  speed!: number;
  accurancy!: number;
  time!: number;
  mistakes!: number;
  isTest!: boolean;
  testResult!: {
    speed: number,
    accurancy: number,
    time: number,
    mistakes: number,
  };
  isInputActive!: boolean;

  constructor() {
    if (TrainingState.instance) {
      return TrainingState.instance;
    }

    this.progress = [];
    this.lang = Lang.ru;
    this.lesson = 0;
    this.complitedLessons = [];
    this.level = 1;
    this.levels = 0;
    this.speed = 0;
    this.accurancy = 0;
    this.time = 0;
    this.mistakes = 0;
    this.isTest = false;
    this.testResult = {
      speed: 0,
      accurancy: 0,
      time: 0,
      mistakes: 0,
    };
    this.isInputActive = false;

    TrainingState.instance = this;

    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const json = localStorage.getItem('typeGoState');
    if (!json) return;
    const state = JSON.parse(json);

    this.progress = state.progress;
    this.lang = state.lang;
    this.lesson = state.lesson;
    this.complitedLessons = state.complitedLessons;
    this.level = state.level;
    this.levels = state.levels;
    this.speed = state.speed;
    this.accurancy = state.accurancy;
    this.time = state.time;
    this.mistakes = state.mistakes;
  }

  saveToStorage(): void {
    const state = JSON.stringify(this);

    localStorage.setItem('typeGoState', state);
  }
}
