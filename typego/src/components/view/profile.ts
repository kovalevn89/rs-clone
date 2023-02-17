import PageView from './baseViewClass';
import { createElement, removeChild } from '../helper';
import { Themes } from '../types/enums';
import speedImg from '../../assets/png/speed.png';
import accuracyImg from '../../assets/png/accuracy.png';
import progressImg from '../../assets/png/progress.png';

// ! ГЕНЕРАЦИЯ СЕРТИФИКАТА НА КАНВЕ

interface IGameScore {
  _id: string,
  name: string,
  level: number,
  score: number,
  __v: number,
}

interface IProgress {
  _id: string,
  lesson: number,
  lang: string,
  level: number,
  accuracy: number,
  speed: number,
  __v: number,
}

interface IUser {
  _id: string,
  username: string,
  accuracy?: number,
  speed?: number,
  gamesScore: Array<IGameScore>,
  progress: Array<IProgress>,
}

const userData: IUser = {
  _id: '63dbaf9cdcfe2d760c226ccd',
  username: 'admin',
  accuracy: 99.4,
  speed: 134,
  gamesScore: [
    {
      _id: '63dcf0a66c9e5025efcb6c46',
      name: 'shooter',
      level: 14,
      score: 51,
      __v: 0,
    },
    {
      _id: '63dcf27bd4ee89b5744b1168',
      name: 'space',
      level: 1,
      score: 1,
      __v: 0,
    },
  ],
  progress: [
    {
      _id: '63dd6137632f2101530332af',
      lesson: 1,
      lang: 'ru',
      level: 3,
      accuracy: 83,
      speed: 115,
      __v: 0,
    },
    {
      _id: '63dd6186632f2101530332b8',
      lesson: 1,
      lang: 'ru',
      level: 4,
      accuracy: 90,
      speed: 135,
      __v: 0,
    },
    {
      _id: '63dd622e632f2101530332c1',
      lesson: 1,
      lang: 'ru',
      level: 5,
      accuracy: 91,
      speed: 115,
      __v: 0,
    },
    {
      _id: '63dd63279d692009a26e866f',
      lesson: 1,
      lang: 'ru',
      level: 7,
      accuracy: 90,
      speed: 99,
      __v: 0,
    },
  ],
};

class Profile extends PageView {
  private render(): void {
    const app: HTMLElement | null = document.querySelector('.app');

    if (app !== null) {
      removeChild(app);
      const main = createElement('div', 'main', app);
      this.translation.cleanObserver(); // clear translate obserber hook

      if (this.config.getTheme() === Themes.Dark) {
        main.classList.add('dark');
      } else {
        main.classList.remove('dark');
      }
      const wrapper = createElement('div', 'profile-wrapper', main);
      wrapper.innerHTML = `${wrapper} ${speedImg} ${accuracyImg}, ${progressImg}`;
      wrapper.innerHTML = `
      <div class="user__block">
        <div class="user__profile-image">
        </div>
        <div class="user__profile-info">
          <div class="user__name">NK</div>
          <div class="user__statistics">
            <div class="statistics__block">
              <div class="statistics__logo"></div>
              <div class="statistics__progress">
                <span class="user__statistics-title">Прогресс</span>
                <span class="user__statistics-value"><b>6</b> уроков</span>
              </div>
            </div>

            <div class="statistics__block">
            <div class="statistics__logo"></div>
              <div class="statistics__speed">
                <span class="user__statistics-title">Скорость печати</span>
                <span class="user__statistics-value"><b>188</b> зн./мин</span>
              </div>
            </div>

            <div class="statistics__block">
            <div class="statistics__logo"></div>
              <div class="statistics__accuracy">
                <span class="user__statistics-title">Точность</span>
                <span class="user__statistics-value"><b>97.1</b>%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="user__info">
        <div class="info__block">
          <h2>Сертификат</h2>
        </div>
        <div class="info__block">
          <h2>Уроки</h2>
        </div>
        <div class="info__block">
          <h2>Игры</h2>
        </div>
      </div>
      `;
    }
  }

  public run(): void {
    this.render();
    console.log(userData);
  }
}

export default Profile;
