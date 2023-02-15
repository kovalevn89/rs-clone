// import { createElement } from '../../helper';
// import { Tag } from '../../types/enums';
// import TrainingTask from './trainingTask';

// export default class FinishLevel {
//   container;
//   message;

//   constructor() {
//     this.container = createElement(Tag.div, 'finish__container');
//     this.message = createElement(Tag.div, 'finish__messqge', this.container);
//   }

//   render(training: TrainingTask, isFinished = true) {
//     const parent = document.querySelector('.main');
//     if (!parent) return;
//     parent.innerHTML = '';
//     console.log(parent);
//     training.input.stopListen();
//     training.remove();

//     const {
//       speed, accurancy, time, mistakes,
//     } = training.textTraining.text;
//     console.log(speed, accurancy, time, mistakes);
//     console.log(training.input);

//     parent.append(this.container);

//     this.message.textContent = isFinished
//       ? `Congrats! You have finished this level in ${time}s & ${mistakes} mistakes`
//       : `Too many mistakes ${mistakes}, try again`;

//     const backBtn = createElement<HTMLButtonElement>(Tag.btn, 'back__btn', this.container);
//     const nextBtn = createElement<HTMLButtonElement>(Tag.btn, 'next-level__btn', this.container);
//     backBtn.textContent = 'Back';
//     nextBtn.textContent = isFinished ? 'Start next level' : 'Try again';

//     backBtn.addEventListener('click', () => {
//       parent.innerHTML = '';
//     });

//     nextBtn.addEventListener('click', () => {

//     });
//   }
// }
