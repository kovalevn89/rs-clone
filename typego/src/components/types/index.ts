export interface IMole {
  moleElement: HTMLElement | null;
  isShowed: boolean;
  letterElement: HTMLElement | null;
  curentLetter: string;
  timer: NodeJS.Timeout | null;
}

export interface ILetter {
  letter: string;
  svg: string;
}

export interface Progress {
  speed: number;
  accurancy: number;
}

export interface TextResponse extends Level {
  lang: 'en' | 'ru';
}

export interface LevelSettings {
  lang: 'en' | 'ru';
  font: 's' | 'm' | 'l';
  sound: boolean;
  skin: 'default' | 'custom';
}

export interface Lesson {
  index: number;
  name: string,
  lang: 'en' | 'ru';
  levels?: Levels;
}

export type Lessons = Lesson[];

export interface Level {
  index: number;
  name: string;
  text: string;
}

export type Levels = Level[];

export interface Test {
  text: string;
  lang: 'en' | 'ru';
}
