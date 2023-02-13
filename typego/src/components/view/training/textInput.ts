// import { createElement } from '../../helper';
// import { Tag, TrainingStatus } from '../../types/enums';
// // eslint-disable-next-line import/no-cycle
// import { keyDowmHandler, keyUpHandler } from './keybordHandlers';
// import Training from '.';

// class TextInput {
//   input;
//   private status;
//   private isComplete;

//   private addFocus = () => {
//     this.input.focus();
//   };

//   constructor() {
//     const input = createElement<HTMLInputElement>(Tag.input, 'level__input');
//     input.id = 'main_input';
//     input.type = 'text';
//     input.autofocus = true;
//     input.autocomplete = 'off';
//     input.autocapitalize = 'off';
//     input.ariaHidden = 'true';

//     this.input = input;
//     this.status = false;
//     this.isComplete = false;
//   }

//   listen(training: Training): void {
//     const { textTraining, keyboard } = training;
//     const { text } = textTraining;

//     this.input.addEventListener('keydown', (e) => {
//       if (this.isComplete) return;
//       if (e.code !== 'Escape' && !this.status) {
//         text.setStartTime(Date.now());
//         this.status = true;
//         textTraining.updateInstructions(TrainingStatus.pause);
//         return;
//       }
//       if (e.code === 'Escape') {
//         text.time += text.currenTime - text.startTime;
//         this.status = false;
//         keyboard.init();
//         textTraining.updateInstructions(TrainingStatus.continue);
//         return;
//       }
//       keyDowmHandler(e, training);
//     });

//     this.input.addEventListener('keyup', () => {
//       if (this.status) {
//         keyUpHandler(training);
//       }
//     });

//     this.input.addEventListener('blur', () => {
//       if (!this.isComplete) {
//         this.input.focus();
//       }
//     });
//   }

//   stopListen(): void {
//     this.isComplete = true;
//     this.status = false;
//   }

//   startListen(): void {
//     this.isComplete = false;
//   }
// }

// export default TextInput;
