import { createElement } from '../helper/index';
import { gameState } from './data/state';
import GameData from './types/enum';
import { arrRu } from './data/data';

class DropGamePage {
  container: HTMLElement;
  // id: string;

  constructor() {
    // this.id = id;
    this.container = document.body;
  }

  createDropGamePage(lvl: string, speed: number, duration: number, columnsNum: number) {
    const wrapper = createElement('div', 'drop-game-wrapper', this.container);
    wrapper.innerHTML = `
    <div class="drop-game-page-container">
    <div class="drop-game-page-header">
      <button class="drop-game-page-btn">&#8592;</button>
      <div class="drop-game-page-title-container">
        <p class="drop-game-page-main-title">Drop Food</p>
      </div>
    </div>
    <div class="drop-game-page-box-container">
      <div class="drop-game-page-overall-points-container">
        <h3 class="drop-game-page-points-title">Статистика</h3>
        <div class="drop-game-page-scores">
          <div class="score">
            <p class="score-title">Всего скушано вкусняшек:</p>
            <p class="score-points">0</p>
          </div>
          <div class="accuracy">
            <p class="accuracy-title">Средний процент попаданий:</p>
            <p class="accuracy-points">0</p>
          </div>
        </div>
        <div class="drop-game-page-field-container">
        
        <div class="field-img-box-right"></div>
        <div class="field-img-box-left"></div>
      </div>
      </div>
    </div>
  </div>`;
    console.log(lvl, speed, duration, columnsNum);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const сolumnsArr: HTMLElement[] = [];
    const fieldContainer = document.querySelector('.drop-game-page-field-container') as HTMLElement;
    for (let i = 0; i < columnsNum; i += 1) {
      const column = createElement('div', 'field-column', fieldContainer);
      сolumnsArr.push(column);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const animInterval = setInterval(() => {
      this.createFood(speed, сolumnsArr);
    }, speed);

    window.addEventListener('keypress', this.checkLetter);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const animEnd = setTimeout(() => {
      clearInterval(animInterval);

      // сохранить результат
      // добавить модалку
    }, duration);

    fieldContainer.append(...сolumnsArr);
  }

  checkLetter(e: KeyboardEvent) {
    const curLetter = e.key;
    const curBigLetter = e.key.toUpperCase();

    gameState.letterPressed.push(curLetter);

    gameState.letterOnField.forEach((key, index) => {
      if (key === null) return;

      if (key.classList.contains(curLetter) || key.classList.contains(curBigLetter)) {
        key.classList.add('right');
        gameState.letterMatched.push(curLetter);
        // поменять счет
        gameState.letterOnField.splice(index, 1);
        console.log(gameState.letterOnField);
      }
    });

    // поменять точность
  }

  createFood(speed: number, columns: HTMLElement[]) {
    columns.forEach((col) => {
      setTimeout(() => {
        const fieldColumn = document.querySelector('.field-column') as HTMLElement;
        const food = createElement('div', 'field-letter', fieldColumn);
        const foodLetter = this.getFoodLetter();

        // добавить бэкграунд

        food.textContent = foodLetter;
        food.classList.add(foodLetter);
        gameState.letterOnField.push(food);

        setTimeout(() => {
          food.style.transition = `margin ${speed}ms linear, color 500ms, background 500ms`;
          food.style.margin = `${GameData.margin}vh auto`;
        }, GameData.foodTime);

        food.addEventListener('transitionend', () => food.remove());

        // setTimeout(() => {
        //   gameState.letterOnField = gameState.letterOnField.map((arrKey) => {
        //     if (arrKey === food) return null;
        //     return arrKey;
        //   });
        //   console.log(44444);
        //   food.remove();
        // }, speed + 500);

        col.append(food);
      }, this.randomNum(speed));
    });
  }

  getFoodLetter() {
    const randomLetterNum = this.randomNum(arrRu.length);
    const randomLetter = arrRu[randomLetterNum];
    return randomLetter;
  }
  randomNum(num: number) {
    const randomNum = Math.floor(Math.random() * num);
    return randomNum;
  }

  // run(): void {
  //   this.createDropGamePage();
  //   // removeChild(this.container);
  // }
}

export default DropGamePage;
