import PageView from './baseViewClass';
import { createElement, removeChild } from '../helper';
import { Themes } from '../types/enums';
import speedImg from '../../assets/png/speed.png';
import accuracyImg from '../../assets/png/accuracy.png';
import progressImg from '../../assets/png/progress.png';

import whacamoleGameLogo from '../../assets/png/whacamole.png';
import dropfoodGameLogo from '../../assets/png/drop-food.png';
import gunGameLogo from '../../assets/png/gun-game.png';

// import certTemplate from '../../assets/png/certificate-template.png';

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
  private render(currentUser: IUser): void {
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

      // cert generator
      // const canvas = document.createElement('canvas');
      // const ctx = canvas!.getContext('2d');
      // ctx!.canvas.width = 1024;
      // ctx!.canvas.height = 768;

      // const image = new Image();
      // image.crossOrigin = 'anonymous';
      // image.src = certTemplate;

      // const drawImage = () => {
      //   ctx!.drawImage(image, 0, 0, 1024, 768);
      //   ctx!.font = 'italic bold 48px Arial';
      //   ctx!.fillStyle = 'gray';
      //   ctx!.textAlign = 'center';
      //   ctx!.fillText('TypeGo', 512, 120);
      //   ctx!.font = 'bold 48px Arial';
      //   ctx!.fillStyle = 'black';
      //   ctx!.fillText('Nikolay Kovalev', 512, 320);
      //   ctx!.font = 'italic 26px Arial';
      //   ctx!.fillText('за скорость набора на русском 290 зн.мин с точностью 98.3%', 512, 400);

      //   ctx!.fillText('18.02.2023', 450, 620);

      //   document.getElementById('canvas')!.style.backgroundImage = `url(${canvas.toDataURL()})`;
      // };

      // image.onload = () => {
      //   drawImage();
      // };

      // document.querySelector('.cert-download')!.addEventListener('click', (event) => {
      //   const btn = event.target as HTMLAnchorElement;
      //   btn.href = canvas.toDataURL('image/jpg');
      //   btn.download = 'Certificate - name.jpg';
      // });

      // cert generator

      /*
      lang: 'ru',
      lesson: 1,
      level: 3,
      accuracy: 83,
      speed: 115,
      */

      /*
      <div class="user__block">
        <div class="user__profile-image"></div>
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
      */
      const userBlock = createElement('div', 'user__block', wrapper);
      createElement('div', 'user__profile-image', userBlock);
      const userProfileInfo = createElement('div', 'user__profile-info', userBlock);
      const userName = createElement('div', 'user__name', userProfileInfo);
      userName.textContent = currentUser.username;
      const userStatistics = createElement('div', 'user__statistics', userProfileInfo);
      // progress
      const statisticsBlock1 = createElement('div', 'statistics__block', userStatistics);
      if (currentUser.progress.length) {
        const statisticsLogo = createElement('div', 'statistics__logo', statisticsBlock1);
        statisticsLogo.style.background = `url(${progressImg}) center no-repeat`;
        const statisticsProgress = createElement('div', 'statistics__progress', statisticsBlock1);
        const userStatisticsTitle = createElement('span', 'user__statistics-title', statisticsProgress);
        userStatisticsTitle.textContent = 'Прогресс';
        const userStatisticsValue = createElement('span', 'user__statistics-value', statisticsProgress);
        userStatisticsValue.innerHTML = `<b>${currentUser.progress.length}</b> уроков`;
      }

      // speed
      const statisticsBlock2 = createElement('div', 'statistics__block', userStatistics);
      if (currentUser.speed) {
        const statisticsLogo = createElement('div', 'statistics__logo', statisticsBlock2);
        statisticsLogo.style.background = `url(${speedImg}) center no-repeat`;
        const statisticsAccuracy = createElement('div', 'statistics__accuracy', statisticsBlock2);
        const userStatisticsTitle = createElement('span', 'user__statistics-title', statisticsAccuracy);
        userStatisticsTitle.textContent = 'Скорость печати';
        const userStatisticsValue = createElement('span', 'user__statistics-value', statisticsAccuracy);
        userStatisticsValue.innerHTML = `<b>${currentUser.speed}</b> зн./мин`;
      }

      // accuracy
      const statisticsBlock3 = createElement('div', 'statistics__block', userStatistics);
      if (currentUser.accuracy) {
        const statisticsLogo = createElement('div', 'statistics__logo', statisticsBlock3);
        statisticsLogo.style.background = `url(${accuracyImg}) center no-repeat`;
        const statisticsSpeed = createElement('div', 'statistics__speed', statisticsBlock3);
        const userStatisticsTitle = createElement('span', 'user__statistics-title', statisticsSpeed);
        userStatisticsTitle.textContent = 'Точность';
        const userStatisticsValue = createElement('span', 'user__statistics-value', statisticsSpeed);
        userStatisticsValue.innerHTML = `<b>${currentUser.accuracy}</b>%`;
      }
    }
  }

  public run(): void {
    this.render(userData);
  }
}

export default Profile;
