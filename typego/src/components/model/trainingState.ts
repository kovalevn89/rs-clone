import { LanguageStr } from '../types';
import { Lang } from '../types/enums';

export default class TrainingState {
  private static instance: TrainingState;
  lang!: LanguageStr;
  progressEn!: {
    lesson: number;
    level: number;
  }[];
  progressRu!: {
    lesson: number;
    level: number;
  }[];
  current!: {
    lesson: number;
    complitedLessons: number[];
    level: number;
    levels: number;
    speed: number;
    accurancy: number;
    time: number;
    mistakes: number;
    lang: LanguageStr;
  };
  best!: {
    speed: number;
    accurancy: number;
    time: number;
    mistakes: number;
  };

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

    this.progressRu = [];
    this.progressEn = [];
    this.lang = Lang.ru;

    this.current = {
      lesson: 0,
      complitedLessons: [],
      level: 1,
      levels: 0,
      speed: 0,
      accurancy: 0,
      time: 0,
      mistakes: 0,
      lang: this.lang,
    };

    this.best = {
      speed: 0,
      accurancy: 0,
      time: 1000,
      mistakes: 1000,
    };

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

  progressPush():void {
    if (this.lang === Lang.en) {
      this.progressEn.push({ lesson: this.current.lesson, level: this.current.level });
    } else {
      this.progressRu.push({ lesson: this.current.lesson, level: this.current.level });
    }
  }

  findLevel(index: number): void {
    if (this.lang === Lang.en) {
      this.current.level = this.progressEn
        .find((item) => item.lesson === index)?.level || 0;
    } else {
      this.current.level = this.progressRu
        .find((item) => item.lesson === index)?.level || 0;
    }
    console.log(this.lang, this.current.lesson, this.current.level);
    this.saveToStorage();
  }

  private loadFromStorage(): void {
    const json = localStorage.getItem('typeGoState');
    if (!json) return;
    const state = JSON.parse(json);

    this.progressRu = state.progressRu;
    this.progressEn = state.progressEn;

    this.lang = state.lang;
    this.current = state.current;
    this.best = state.best;
    this.testResult = state.testResult;
  }

  saveToStorage(): void {
    const state = JSON.stringify(this);

    localStorage.setItem('typeGoState', state);
  }

  saveStatistic(): void {
    if (this.isTest) {
      this.testResult.accurancy = this.current.accurancy;
      this.testResult.speed = this.current.speed;
      this.testResult.mistakes = this.current.mistakes;
      this.testResult.time = this.current.time;
    }
    if (this.current.accurancy > this.best.accurancy) {
      this.best.accurancy = this.current.accurancy;
    }
    if (this.current.speed > this.best.speed) {
      this.best.speed = this.current.speed;
    }
    if (this.current.mistakes < this.best.mistakes) {
      this.best.mistakes = this.current.mistakes;
    }
    if (this.best.time < this.current.time) {
      this.best.time = this.current.time;
    }
  }
}
