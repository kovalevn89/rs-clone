import { createElement, removeChild } from '../helper/index';
import DropGamePage from './drop-game-page';
import { levelValues } from './data/data';
// import { levelValues, levelMaxScore } from './data/data';

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
      <button class="drop-game-startpage-btn">&#9881</button>
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
                <p class="accuracy-title">Средний процент попаданий:</p>
                <p class="accuracy-points">0</p>
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
              Нажимайте клавиши на клавиатуре в соответствии с буквами, указанными на падающей еде
              Соберите всю еду, чтобы заработать максимальные очки! Также будет учитываться статистика неправильных попаданий (ваша точность набора букв)

              </p>
          </div>
        </div>
      </div>
    </div>
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
  }

  run(): void {
    this.createDropStartPage();
  }
}

export default DropStartPage;
