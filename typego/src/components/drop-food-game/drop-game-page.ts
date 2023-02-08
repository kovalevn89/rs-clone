// eslint-disable-next-line import/no-cycle
import DropStartPage from './drop-start-page';
import { createElement, removeChild } from '../helper/index';
import { gameState, state } from './data/state';
import GameData from './types/enum';

import { arrRu } from './data/data';

class DropGamePage {
  container: HTMLElement;

  constructor() {
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
            <p class="accuracy-title">Средний процент ловли:</p>
            <p class="accuracy-points">0%</p>
          </div>
        </div>
        <div class="drop-game-page-field-container">
        
        <div class="field-img-box-right"></div>
        <div class="field-img-box-left"></div>
        <div class="popup">
        <div class="popup-content">
          НЯЬ-НЯМ. Спасибо за еду!
        </div>
        <div class="popup_back"></div>
      </div>
      </div>
      </div>
    </div>
  </div>`;

    const сolumnsArr: HTMLElement[] = [];
    const fieldContainer = document.querySelector('.drop-game-page-field-container') as HTMLElement;
    for (let i = 0; i < columnsNum; i += 1) {
      const column = createElement('div', 'field-column', fieldContainer);
      сolumnsArr.push(column);
    }

    const animInterval = setInterval(() => {
      this.createFood(speed, сolumnsArr);
    }, speed);

    window.addEventListener('keypress', this.checkLetter);

    const animEnd = setTimeout(() => {
      clearInterval(animInterval);

      const popup = document.querySelector('.popup') as HTMLElement;
      setTimeout(() => {
        popup.style.display = 'block';
        this.setTotalScoreAccuracy();
        this.resetState();
        setTimeout(() => {
          popup.style.display = 'none';
        }, speed);
      }, 1.1 * speed);
    }, duration);
    const backBtn = document.querySelector('.drop-game-page-btn') as HTMLElement;

    backBtn.addEventListener('click', () => {
      clearInterval(animInterval);
      clearTimeout(animEnd);
      window.removeEventListener('keypress', this.checkLetter);
      this.resetState();
      removeChild(this.container);
      const startPage = new DropStartPage();
      startPage.run();
    });
    fieldContainer.append(...сolumnsArr);
  }

  checkLetter(e: KeyboardEvent) {
    const curLetter = e.key;
    const curBigLetter = e.key.toUpperCase();
    let keyCounter = 1;

    gameState.letterPressed.push(curLetter);

    gameState.letterOnField.forEach((key, index) => {
      if (key === null) return;

      if (key.classList.contains(curLetter) || key.classList.contains(curBigLetter)) {
        if (keyCounter === 1) {
          key.classList.add('right');
          gameState.letterMatched.push(curLetter);
          DropGamePage.changeScore();
          gameState.letterOnField.splice(index, 1);
          keyCounter += 1;
        }
      }
    });
    DropGamePage.changeAccuracy();
  }

  createFood(speed: number, columns: HTMLElement[]) {
    const foodBgrNum = 5;
    columns.forEach((col) => {
      setTimeout(() => {
        const fieldColumn = document.querySelector('.field-column') as HTMLElement;
        const food = createElement('div', 'field-letter', fieldColumn);
        const foodLetter = this.getFoodLetter();

        food.textContent = foodLetter;
        food.classList.add(`field-letter-${this.randomNum(foodBgrNum) + 1}`);

        food.classList.add(foodLetter);
        gameState.letterOnField.push(food);

        setTimeout(() => {
          food.style.transition = `margin ${speed}ms linear, color 500ms, background 500ms`;
          food.style.margin = `${GameData.margin}vh auto`;
        }, GameData.foodTime);

        food.addEventListener('transitionend', () => food.remove());

        setTimeout(() => {
          gameState.letterOnField = gameState.letterOnField.map((elem) => {
            if (elem === food) return null;
            return elem;
          });
          food.remove();
        }, speed);

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

  static changeScore() {
    const scorePoints = document.querySelector('.score-points') as HTMLElement;
    gameState.curScore += 1;
    scorePoints.textContent = gameState.curScore.toString();
  }

  static changeAccuracy() {
    const accuracyPoints = document.querySelector('.accuracy-points') as HTMLElement;
    const pressKeys = gameState.letterPressed.length;
    const keys = gameState.letterMatched.length;
    gameState.curAccuracy = Math.round((keys / pressKeys) * 100);
    accuracyPoints.textContent = `${gameState.curAccuracy} %`;
  }

  setTotalScoreAccuracy() {
    state.totalScore += gameState.curScore;
    // eslint-disable-next-line operator-linebreak
    const tempAccuracy =
      state.averageAccuracy === 0
        ? gameState.curAccuracy
        : Math.round((state.averageAccuracy + gameState.curAccuracy) / 2);
    state.averageAccuracy = tempAccuracy;
  }

  resetState() {
    gameState.letterOnField = [];
    gameState.letterPressed = [];
    gameState.letterMatched = [];
    gameState.curScore = 0;
    gameState.curAccuracy = 0;
  }
}

export default DropGamePage;
