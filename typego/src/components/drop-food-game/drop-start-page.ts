import { createElement, removeChild } from '../helper/index';

import { levelValues } from './data/data';
import { state } from './data/state';
// eslint-disable-next-line import/no-cycle
import DropGamePage from './drop-game-page';
import createPopup from './popupSetting';

class DropStartPage {
  container: HTMLElement;
  // id: string;

  constructor() {
    // this.id = id;
    this.container = document.body;
  }
  createDropStartPage() {
    const wrapper = createElement('div', 'drop-game-wrapper', this.container);
    wrapper.innerHTML = `
    <div class="drop-game-startpage-container">
    <div class="drop-game-startpage-header">
      <button class="drop-game-startpage-btn">&#8592;</button>
      <div class="drop-game-startpage-title-container">
        <p class="drop-game-startpage-main-title">Drop Food</p>
      </div>
      <button class="drop-game-startpage-btn setting-btn">&#9881</button>
    </div>
    <div class="drop-game-startpage-box-container">
      <div class="drop-game-startpage-left-container">
        <div class="drop-game-startpage-levels">
          <button class="level-btn">
            <p class="level-title">Уровень 1</p>
          </button>
          <button class="level-btn">
            <p class="level-title">Уровень 2</p>
          </button>
          <button class="level-btn">
            <p class="level-title">Уровень 3</p>
          </button>
          <button class="level-btn">
            <p class="level-title">Уровень 4</p>
          </button>
          <button class="level-btn">
            <p class="level-title">Уровень 5</p>
          </button>
        </div>
        <button class="drop-game-startpage-reset-button">Начать все заново</button>
      </div>
      <div class="drop-game-startpage-right-container">
        <div class="drop-game-startpage-points-container">
          <div class="drop-game-startpage-overall-points-container">
            <h3 class="drop-game-startpage-points-title">
              Статистика
            </h3>
            <div class="drop-game-startpage-scores">
              <div class="score">
                <p class="score-title">Всего скушано вкусняшек:</p>
                <p class="score-points">0</p>
              </div>
              <div class="accuracy">
                <p class="accuracy-title">Средний процент ловли:</p>
                <p class="accuracy-points">0%</p>
              </div>
            </div>
          </div>
          <div class="drop-game-startpage-rule-container">
            <h3 class="drop-game-startpage-rule-title">
              Правила игры
            </h3>
            <p class="drop-game-startpage-rule-text">Цель этой игры состоит в том, чтобы поймать всю падающую еду!
              Не дайте им упасть на землю!
              Наслаждайтесь этой игрой.
              Вы получите массу удовольствия!
              Нажимайте клавиши на клавиатуре в соответствии с буквами, указанными на падающей еде.
              Соберите всю еду, чтобы заработать максимальные очки! Также будет учитываться статистика неправильных попаданий (ваша точность набора букв).
              В зависимости от выбранного уровня сложности, будет меняться количество и скорость падения еды, а также продолжительность уровня.

              </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="popup popup-setting">
  <div class="popup-content popup-content-setting">
    <form class="popup-form">
      <div class="person-details">
        <h2>НАСТРОЙКИ</h2>
        <p class="">Устали играть на заводских настройках?! Теперь вы можете настроить игру с учетом своих пожеланий. Выбирайте продолжительность уровня, скорость и количество еды и вперед!</p>
        <div class="form-item">
          <input type="number" placeholder="Продолжительность от 20 до 90 с" name="duration" />
          <div class="error-message"></div>
        </div>
        <div class="form-item">
          <input type="number" placeholder="Время падения от 2 до 10 с" name="speed" />
          <div class="error-message"></div>
        </div>
        <div class="form-item">
          <input type="number" placeholder="Количество еды за раз от 4 до 8" name="columns" />
          <div class="error-message"></div>
        </div>
      </div>
      <button class="btn btn_confirm" type="submit">Старт</button>
    </form>
    <div><div class="popup_close"></div></div>
  </div>
  <div class="popup_back"></div>
</div>`;
    const levelBtns = document.querySelectorAll('.level-btn');
    levelBtns.forEach((levelBtn) => {
      levelBtn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const levelTitle = target.querySelector('.level-title') as HTMLElement;
        const currentLvl = levelTitle.textContent?.split(' ').reverse()[0] as string;
        console.log(currentLvl);
        removeChild(this.container);
        const gamePage = new DropGamePage();

        gamePage.createDropGamePage(
          currentLvl,
          levelValues[currentLvl].speed,
          levelValues[currentLvl].duration,
          levelValues[currentLvl].columns,
        );
      });
    });

    const backBtn = document.querySelector('.drop-game-startpage-btn') as HTMLElement;

    backBtn.addEventListener('click', () => {
      // this.resetState();
      removeChild(this.container);
    });

    const resetBtn = document.querySelector('.drop-game-startpage-reset-button') as HTMLElement;
    resetBtn.addEventListener('click', () => {
      this.resetProgress();
    });

    const settingBtn = document.querySelector('.setting-btn') as HTMLElement;
    settingBtn.addEventListener('click', () => {
      this.openSetting();
    });
  }
  changeAccuracy() {
    const scorePoints = document.querySelector('.score-points') as HTMLElement;
    const accuracyPoints = document.querySelector('.accuracy-points') as HTMLElement;
    accuracyPoints.textContent = `${state.averageAccuracy} %`;
    scorePoints.textContent = `${state.totalScore}`;
  }
  resetProgress() {
    const scorePoints = document.querySelector('.score-points') as HTMLElement;
    const accuracyPoints = document.querySelector('.accuracy-points') as HTMLElement;
    state.averageAccuracy = 0;
    state.totalScore = 0;
    accuracyPoints.textContent = `${state.averageAccuracy} %`;
    scorePoints.textContent = `${state.totalScore}`;
  }
  openSetting() {
    createPopup();
  }

  run(): void {
    this.createDropStartPage();
    this.changeAccuracy();
  }
}

export default DropStartPage;
