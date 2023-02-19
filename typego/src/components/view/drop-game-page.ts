import { createElement, removeChild } from '../helper/index';
import { gameState, state } from '../helper/state';
import { GameData, Themes } from '../types/enums';
import { dataLang } from '../helper/data';
import PageView from './baseViewClass';

class DropGamePage extends PageView {
  container: HTMLElement;

  constructor() {
    super();
    this.container = document.body;
  }

  createDropGamePage(lvl: string, speed: number, duration: number, columnsNum: number) {
    const app = document.querySelector('.app') as HTMLElement;

    this.translation.cleanObserver(); // clear translate obserber hook

    removeChild(app);
    const main = createElement('div', 'main', app);
    if (this.config.getTheme() === Themes.Dark) {
      main.classList.add('dark');
    } else {
      main.classList.remove('dark');
    }
    const wrapper = createElement('div', 'drop-game-wrapper', main);
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
        <h3 class="drop-game-page-points-title">${this.translation.getString('pointsTitle')}</h3>
        <div class="drop-game-page-scores">
          <div class="score">
            <p class="score-title">${this.translation.getString('scoreTitle')}</p>
            <p class="score-points">0</p>
          </div>
          <div class="accuracy">
            <p class="accuracy-title">${this.translation.getString('accuracyTitle')}</p>
            <p class="accuracy-points">0%</p>
          </div>
        </div>
        <div class="drop-game-page-field-container">
        
        <div class="field-img-box-right"></div>
        <div class="field-img-box-left"></div>
        <div class="popup">
        <div class="popup-content">
        ${this.translation.getString('popupContent')}
        </div>
        <div class="popup_back"></div>
      </div>
      </div>
      </div>
    </div>
  </div>`;
    const pointsTitle = document.querySelector('.drop-game-page-points-title') as HTMLElement;
    const scoreTitle = document.querySelector('.score-title') as HTMLElement;
    const accuracyTitle = document.querySelector('.accuracy-title') as HTMLElement;
    const popupContent = document.querySelector('.popup-content') as HTMLElement;

    this.translation.regObserver(() => {
      pointsTitle.textContent = this.translation.getString('pointsTitle');
    });
    this.translation.regObserver(() => {
      scoreTitle.textContent = this.translation.getString('scoreTitle');
    });
    this.translation.regObserver(() => {
      accuracyTitle.textContent = this.translation.getString('accuracyTitle');
    });
    this.translation.regObserver(() => {
      popupContent.textContent = this.translation.getString('popupContent');
    });

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
      }, speed + 2000);
    }, duration);
    const backBtn = document.querySelector('.drop-game-page-btn') as HTMLElement;

    backBtn.addEventListener('click', () => {
      clearInterval(animInterval);
      clearTimeout(animEnd);
      window.removeEventListener('keypress', this.checkLetter);
      this.resetState();
      removeChild(app);
      window.location.hash = '';
      window.location.hash = '#/games?name=drop';
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
    const lang = localStorage.getItem('appLang');
    const stringLetterLang = lang === '1' ? dataLang.letters.ru : dataLang.letters.en;
    const randomLetterNum = this.randomNum(stringLetterLang.length);
    const randomLetter = stringLetterLang[randomLetterNum];
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
    let tempAccuracy;
    if (state.averageAccuracy === 0) {
      tempAccuracy = gameState.curAccuracy;
    } else {
      tempAccuracy = Math.round((state.averageAccuracy + gameState.curAccuracy) / 2);
    }
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
