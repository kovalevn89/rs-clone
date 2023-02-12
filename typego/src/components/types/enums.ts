export enum Tag {
  div = 'div',
  link = 'a',
  btn = 'button',
  img = 'img',
  par = 'p',
  span = 'span',
  nav = 'nav',
  input = 'input',
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  main = 'main',
  header = 'header',
  footer = 'footer',
  section = 'section',
  label = 'label',
  list = 'ul',
  listItem = 'li',
  audio = 'audio',
}

export enum Lang {
  ru = 'ru',
  en = 'en',
}

export enum Status {
  active = 'active',
  correct = 'correct',
  incorrect = 'incorrect',
  fixed = 'fixed',
  reset = 'reset',
}

export enum TrainingStatus {
  start = 'start',
  pause = 'pause',
  continue = 'continue',
  stop = 'stop',
}

export default {
  Tag,
  Lang,
  Status,
  TrainingStatus,
};
