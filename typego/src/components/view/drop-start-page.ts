import { createElement, removeChild } from '../helper/index';
import { levelValues } from '../helper/data';
import { state } from '../helper/state';
import DropGamePage from './drop-game-page';
import { Themes } from '../types/enums';
import PageView from './baseViewClass';

class DropStartPage extends PageView {
  container: HTMLElement;

  constructor() {
    super();
    this.container = document.body;
  }
  createDropStartPage() {
    const app = document.querySelector('.app') as HTMLElement;
    const header: HTMLElement | null = document.querySelector('.header');
    const footer: HTMLElement | null = document.querySelector('.footer');
    if (header) {
      header.style.display = 'none';
    }
    if (footer) {
      footer.style.display = 'none';
    }
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
            <p class="level-title">${this.translation.getString('levelTitle')} 1</p>
          </button>
          <button class="level-btn">
            <p class="level-title">${this.translation.getString('levelTitle')} 2</p>
          </button>
          <button class="level-btn">
            <p class="level-title">${this.translation.getString('levelTitle')} 3</p>
          </button>
          <button class="level-btn">
            <p class="level-title">${this.translation.getString('levelTitle')} 4</p>
          </button>
          <button class="level-btn">
            <p class="level-title">${this.translation.getString('levelTitle')} 5</p>
          </button>
        </div>
        <button class="drop-game-startpage-reset-button"> ${this.translation.getString('resetButton')} </button>
      </div>
      <div class="drop-game-startpage-right-container">
        <div class="drop-game-startpage-points-container">
          <div class="drop-game-startpage-overall-points-container">
            <h3 class="drop-game-startpage-points-title">
            ${this.translation.getString('pointsTitle')}
            </h3>
            <div class="drop-game-startpage-scores">
              <div class="score">
                <p class="score-title">${this.translation.getString('scoreTitle')}</p>
                <p class="score-points">0</p>
              </div>
              <div class="accuracy">
                <p class="accuracy-title">${this.translation.getString('accuracyTitle')}</p>
                <p class="accuracy-points">0%</p>
              </div>
            </div>
          </div>
          <div class="drop-game-startpage-rule-container">
            <h3 class="drop-game-startpage-rule-title">
            ${this.translation.getString('ruleTitle')}
            </h3>
            <p class="drop-game-startpage-rule-text">${this.translation.getString('ruleText')}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="popup popup-setting">
  <div class="popup-content popup-content-setting">
    <form class="popup-form">
      <div class="person-details">
        <h2>${this.translation.getString('personDetailsTitle')}</h2>
        <p class="">${this.translation.getString('personDetailsText')}</p>
        <div class="form-item">
          <input type="number" placeholder="${this.translation.getString('settingDuration')}" name="duration" />
          <div class="error-message"></div>
        </div>
        <div class="form-item">
          <input type="number" placeholder="${this.translation.getString('settingSpeed')}" name="speed" />
          <div class="error-message"></div>
        </div>
        <div class="form-item">
          <input type="number" placeholder="${this.translation.getString('settingColumns')}" name="columns" />
          <div class="error-message"></div>
        </div>
      </div>
      <button class="btn btn_confirm" type="submit">${this.translation.getString('btnStart')}</button>
    </form>
    <div><div class="popup_close"></div></div>
  </div>
  <div class="popup_back"></div>
</div>`;
    const levelTitles = document.querySelectorAll('.level-title');
    const resetButton = document.querySelector('.drop-game-startpage-reset-button') as HTMLElement;
    const pointsTitle = document.querySelector('.drop-game-startpage-points-title') as HTMLElement;
    const scoreTitle = document.querySelector('.score-title') as HTMLElement;
    const accuracyTitle = document.querySelector('.accuracy-title') as HTMLElement;
    const ruleTitle = document.querySelector('.drop-game-startpage-rule-title') as HTMLElement;
    const ruleText = document.querySelector('.drop-game-startpage-rule-text') as HTMLElement;
    const personDetailsTitle = document.querySelector('.person-details h2') as HTMLElement;
    const personDetailsText = document.querySelector('.person-details p') as HTMLElement;
    const form = document.querySelector('.popup-form') as HTMLFormElement;
    const settingDuration = form.duration;
    const settingSpeed = form.speed;
    const settingColumns = form.columns;
    const btnStart = document.querySelector('.btn_confirm') as HTMLElement;

    levelTitles.forEach((levelTitle, index) => {
      this.translation.regObserver(() => {
        levelTitle.textContent = `${this.translation.getString('levelTitle')} ${index + 1}`;
      });
    });
    this.translation.regObserver(() => {
      resetButton.textContent = this.translation.getString('resetButton');
    });
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
      ruleTitle.textContent = this.translation.getString('ruleTitle');
    });
    this.translation.regObserver(() => {
      ruleText.textContent = this.translation.getString('ruleText');
    });
    this.translation.regObserver(() => {
      personDetailsTitle.textContent = this.translation.getString('personDetailsTitle');
    });

    this.translation.regObserver(() => {
      personDetailsText.textContent = this.translation.getString('personDetailsText');
    });

    this.translation.regObserver(() => {
      settingDuration.placeholder = this.translation.getString('settingDuration');
    });

    this.translation.regObserver(() => {
      settingSpeed.placeholder = this.translation.getString('settingSpeed');
    });

    this.translation.regObserver(() => {
      settingColumns.placeholder = this.translation.getString('settingColumns');
    });

    this.translation.regObserver(() => {
      btnStart.textContent = this.translation.getString('btnStart');
    });

    const levelBtns = document.querySelectorAll('.level-btn');
    levelBtns.forEach((levelBtn) => {
      levelBtn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const levelTitle = target.querySelector('.level-title') as HTMLElement;
        const currentLvl = levelTitle.textContent?.split(' ').reverse()[0] as string;
        removeChild(app);
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
      window.location.hash = '#/games';
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
    this.createPopup();
  }
  createPopup() {
    const body = document.querySelector('body') as HTMLBodyElement;
    const wrapPopup = body.querySelector('.popup-setting') as HTMLElement;
    const popupForm = wrapPopup.querySelector('.popup-form') as HTMLElement;
    const inputs = popupForm.querySelectorAll('input');
    const popupBack = body.querySelector('.popup_back') as HTMLElement;
    const popupClose = body.querySelector('.popup_close') as HTMLElement;

    wrapPopup.style.display = 'block';
    function popUpClose() {
      wrapPopup.style.display = 'none';
    }
    popupBack.addEventListener('click', popUpClose);
    popupClose.addEventListener('click', popUpClose);
    window.addEventListener('hashchange', popUpClose);

    function validateElem(elem: HTMLInputElement) {
      const nextElem = elem.nextElementSibling as Element;
      if (elem.name === 'duration') {
        if (+elem.value >= 90 || (+elem.value < 20 && elem.value !== '')) {
          nextElem.textContent = 'Error';
        } else nextElem.textContent = '';
      }
      if (elem.name === 'speed') {
        if (+elem.value >= 10 || (+elem.value < 2 && elem.value !== '')) {
          nextElem.textContent = 'Error';
        } else nextElem.textContent = '';
      }
      if (elem.name === 'columns') {
        if (+elem.value >= 8 || (+elem.value < 4 && elem.value !== '')) {
          nextElem.textContent = 'Error';
        } else nextElem.textContent = '';
      }
    }

    function validateForm(even: Event): void {
      even.preventDefault();
      const form = document.querySelector('form') as HTMLFormElement;
      inputs.forEach((elem: HTMLInputElement) => {
        const nextElem = elem.nextElementSibling as Element;
        if (nextElem.textContent !== '') {
          return;
        }
        if (elem.value === '') {
          nextElem.textContent = 'Empty';
        } else {
          nextElem.textContent = '';
        }
      });

      if (
        Array.from(inputs).every(
          (elem: HTMLInputElement) => elem.value !== '' && (elem.nextElementSibling as Element).textContent === '',
        )
      ) {
        const app = document.querySelector('.app') as HTMLElement;
        removeChild(app);

        const gamePage = new DropGamePage();
        const speed = +form.speed.value * 1000;
        const duration = +form.duration.value * 1000;
        const columns = +form.columns.value;
        gamePage.createDropGamePage('0', speed, duration, columns);
      }
    }

    popupForm.addEventListener('submit', (even) => {
      validateForm(even);
    });
    inputs.forEach((elem: HTMLInputElement) => {
      elem.addEventListener('blur', () => {
        validateElem(elem);
      });
    });
  }

  run(): void {
    this.createDropStartPage();
    this.changeAccuracy();
  }
}

export default DropStartPage;
