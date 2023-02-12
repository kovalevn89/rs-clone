export default class UserProgress {
  lesson: number;
  compliteLevels: number[];
  currentLevel: number;
  time: number;
  accurancy: number;
  speed: number;

  constructor() {
    this.lesson = 1;
    this.compliteLevels = [];
    this.currentLevel = 1;
    this.time = 0;
    this.accurancy = 0;
    this.speed = 0;
  }
}
