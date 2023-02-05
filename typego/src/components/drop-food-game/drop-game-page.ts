import { createElement } from '../helper/index';

class DropGamePage {
  container: HTMLElement;
  // id: string;

  constructor() {
    // this.id = id;
    this.container = document.body;
  }
  // add param lvl: string, speed: number, duration: number, columnsNum: number
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
      </div>
      <div class="drop-game-page-field-container">
        <div class="field-column">
          <div class="field-letter">А</div>
        </div>
        <div class="field-column">
          <div class="field-letter">Б</div>
        </div>
        <div class="field-column">
          <div class="field-letter">В</div>
        </div>
        <div class="field-column">
          <div class="field-letter">Г</div>
        </div>
        <div class="field-column">
          <div class="field-letter">Д</div>
        </div>
        <div class="field-column">
          <div class="field-letter">Е</div>
        </div>
        <div class="field-column">
          <div class="field-letter">Ж</div>
        </div>
        <div class="field-img-box-right"></div>
        <div class="field-img-box-left"></div>
      </div>
    </div>
  </div>`;
    console.log(lvl, speed, duration, columnsNum);
  }

  // run(): void {
  //   this.createDropGamePage();
  //   // removeChild(this.container);
  // }
}

export default DropGamePage;
