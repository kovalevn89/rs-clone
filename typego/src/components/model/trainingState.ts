import Api from '../controller/api';
import {
  CurrentTrainingProgress, Progress, LanguageStr, TestResults,
} from '../types';
import { Lang } from '../types/enums';

export default class TrainingState {
  private static instance: TrainingState;
  token!: string;
  lang!: LanguageStr;
  progress!: Progress[];
  current!: CurrentTrainingProgress;
  best!: {
    speed: number;
    accuracy: number;
    time: number;
    mistakes: number;
  };
  isLevelComplete!: boolean;

  isTest!: boolean;
  testResult!: TestResults;
  isInputActive!: boolean;

  constructor() {
    if (TrainingState.instance) {
      return TrainingState.instance;
    }

    this.token = '';
    this.progress = [];
    this.lang = Lang.ru;

    this.current = {
      lesson: 1,
      complitedLessons: [],
      level: 1,
      levels: 0,
      speed: 0,
      accuracy: 0,
      time: 0,
      mistakes: 0,
      lang: this.lang,
    };

    this.isLevelComplete = false;

    this.best = {
      speed: 0,
      accuracy: 0,
      time: 1000,
      mistakes: 1000,
    };

    this.isTest = false;
    this.testResult = {
      speed: 0,
      accuracy: 0,
      time: 0,
      mistakes: 0,
    };
    this.isInputActive = false;

    TrainingState.instance = this;
  }

  progressPush():void {
    const {
      lesson, level, lang, speed, accuracy,
    } = this.current;
    if (this.isLevelComplete) {
      this.progress.push({
        lesson,
        level,
        lang,
        speed,
        accuracy,
      });
    }
  }

  async findLevel(index: number, token: string): Promise<void> {
    const api = new Api();

    this.progress = (await api.getUser(token)).progress;

    if (!this.progress) {
      this.progress = [];
    }

    const complited = this.progress
      .filter((item) => item.lesson === index && item.lang === this.lang)
      .sort((a, b) => b.level - a.level);

    this.current.level = complited.length ? complited[0].level + 1 : 1;
  }

  saveStatistic(): void {
    if (this.isTest) {
      this.testResult.accuracy = this.current.accuracy;
      this.testResult.speed = this.current.speed;
      this.testResult.mistakes = this.current.mistakes;
      this.testResult.time = this.current.time;
    }
    if (this.current.accuracy > this.best.accuracy) {
      this.best.accuracy = this.current.accuracy;
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
