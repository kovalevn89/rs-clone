import PageView from './baseViewClass';
import { createElement, removeChild } from '../helper';
import { Themes } from '../types/enums';
import speedImg from '../../assets/png/speed.png';
import accuracyImg from '../../assets/png/accuracy.png';
import progressImg from '../../assets/png/progress.png';

import whacamoleGameLogo from '../../assets/png/whacamole.png';
import dropfoodGameLogo from '../../assets/png/drop-food.png';
import gunGameLogo from '../../assets/png/gun-game.png';

import certTemplate from '../../assets/png/certificate-template.png';

// ! ГЕНЕРАЦИЯ СЕРТИФИКАТА НА КАНВЕ
console.log(whacamoleGameLogo, dropfoodGameLogo, gunGameLogo);

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
          <div class="info__block-cert">
            <div class="cert-message hidden">До получения сертификата осталось совсем чуть-чуть - пройти тест!</div>
            <div class="cert-block">
              <canvas class="cert-preview" id="canvas"></canvas>
              <a class="cert-download">Скачать сертификат</a>
            </div>
          </div>
        </div>
        <div class="info__block ">
          <h2>Уроки</h2>
          <div class="info__block-lessons">
            <div class="lesson__lang">
              <div class="lesson__lang-caption">Уроки на <i>русском</i> языке:</div>
              <div class="lesson__lang-lesson">
                <div class="lesson__lang-lesson_caption">Урок <b>1</b>:</div>
                <div class="lesson__lang-levels">
                  <div class="lesson__lang-levels__line">
                    <span>Уровень <b>1</b></span> -
                    <span>Точность: <b>83</b>%</span>
                    <span>Скорость: <b>115</b> зн/мин.</span>
                  </div>
                  <div class="lesson__lang-levels__line">
                    <span>Уровень <b>2</b></span> -
                    <span>Точность: <b>95</b>%</span>
                    <span>Скорость: <b>103</b> зн/мин.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="info__block">
          <h2>Игры</h2>
          <div class="info__block-games">
            <div class="game-line">
              <div class="game_line-image"></div>
              <div class="game_line-info">
                <div class="game_line-info_gamename">Ударь крота</div>
                <div class="game_line-info_results">
                  <div class="game_line-info_results-level"><b>3</b> уровень.</div>
                  <div class="game_line-info_results-score"><b>120</b> попаданий.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;

      const canvas = document.createElement('canvas');
      const ctx = canvas!.getContext('2d');
      ctx!.canvas.width = 1024;
      ctx!.canvas.height = 768;

      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = certTemplate;

      const drawImage = () => {
        ctx!.drawImage(image, 0, 0, 1024, 768);
        ctx!.font = 'italic bold 48px Arial';
        ctx!.fillStyle = 'gray';
        ctx!.textAlign = 'center';
        ctx!.fillText('TypeGo', 512, 120);
        ctx!.font = 'bold 48px Arial';
        ctx!.fillStyle = 'black';
        ctx!.fillText('Nikolay Kovalev', 512, 320);
        ctx!.font = 'italic 26px Arial';
        ctx!.fillText('за скорость набора на русском 290 зн.мин с точностью 98.3%', 512, 400);

        ctx!.fillText('18.02.2023', 450, 620);

        document.getElementById('canvas')!.style.backgroundImage = `url(${canvas.toDataURL()})`;
      };

      image.onload = () => {
        drawImage();
      };

      document.querySelector('.cert-download')!.addEventListener('click', (event) => {
        const btn = event.target as HTMLAnchorElement;
        btn.href = canvas.toDataURL('image/jpg');
        btn.download = 'Certificate - name.jpg';
      });

      /*
      lang: 'ru',
      lesson: 1,
      level: 3,
      accuracy: 83,
      speed: 115,
      */
    }
  }

  public run(): void {
    this.render();
    console.log(userData);
  }
}

export default Profile;
