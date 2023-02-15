import { Lang } from '../types/enums';

export default class State {
  private static instance: State;
  lang!: 'en' | 'ru';
  progress!: number[];
  lesson!: number;
  lessons!: number;
  level!: number;
  levels!: number;
  speed!: number;
  accurancy!: number;
  time!: number;
  mistakes!: number;

  constructor() {
    if (State.instance) {
      return State.instance;
    }

    this.progress = [];
    this.lang = Lang.ru;
    this.lesson = 0;
    this.lessons = 0;
    this.level = 1;
    this.levels = 0;
    this.speed = 0;
    this.accurancy = 0;
    this.time = 0;
    this.mistakes = 0;

    State.instance = this;
  }
}
