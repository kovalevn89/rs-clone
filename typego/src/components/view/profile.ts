import PageView from './baseViewClass';
import { createElement, removeChild } from '../helper';
import { Language, Themes } from '../types/enums';
import { IUser } from '../types/index';
import speedImg from '../../assets/png/speed.png';
import accuracyImg from '../../assets/png/accuracy.png';
import progressImg from '../../assets/png/progress.png';
import whacamoleGameLogo from '../../assets/png/whacamole.png';
import dropfoodGameLogo from '../../assets/png/drop-food.png';
import gunGameLogo from '../../assets/png/gun-game.png';
import certTemplate from '../../assets/png/certificate-template.png';

// const userData: IUser = {
//   _id: '63dbaf9cdcfe2d760c226ccd',
//   username: 'admin',
//   accuracy: 99.4,
//   speed: 134,
//   gamesScore: [
//     {
//       _id: '63dcf0a66c9e5025efcb6c46',
//       name: 'shooter',
//       level: 14,
//       score: 51,
//       __v: 0,
//     },
//     {
//       _id: '63dcf0a66c9e5025efcb6c46',
//       name: 'whac',
//       level: 3,
//       score: 99,
//       __v: 0,
//     },
//     {
//       _id: '63dcf27bd4ee89b5744b1168',
//       name: 'space',
//       level: 1,
//       score: 1,
//       __v: 0,
//     },
//   ],
//   progress: [
//     {
//       _id: '63dd6137632f2101530332af',
//       lesson: 1,
//       lang: 'ru',
//       level: 3,
//       accuracy: 83,
//       speed: 115,
//       __v: 0,
//     },
//     {
//       _id: '63dd6137632f2101530332af',
//       lesson: 1,
//       lang: 'en',
//       level: 1,
//       accuracy: 11,
//       speed: 33,
//       __v: 0,
//     },
//     {
//       _id: '63dd6137632f2101530332af',
//       lesson: 1,
//       lang: 'en',
//       level: 2,
//       accuracy: 11,
//       speed: 44,
//       __v: 0,
//     },
//     {
//       _id: '63dd6137632f2101530332af',
//       lesson: 1,
//       lang: 'en',
//       level: 3,
//       accuracy: 11,
//       speed: 22,
//       __v: 0,
//     },
//     {
//       _id: '63dd6186632f2101530332b8',
//       lesson: 1,
//       lang: 'ru',
//       level: 4,
//       accuracy: 90,
//       speed: 135,
//       __v: 0,
//     },
//     {
//       _id: '63dd622e632f2101530332c1',
//       lesson: 1,
//       lang: 'ru',
//       level: 5,
//       accuracy: 91,
//       speed: 115,
//       __v: 0,
//     },
//     {
//       _id: '63dd63279d692009a26e866f',
//       lesson: 1,
//       lang: 'ru',
//       level: 1,
//       accuracy: 90,
//       speed: 99,
//       __v: 0,
//     },
//   ],
// };

class Profile extends PageView {
  private createCertificate(name: string, speed: number, accuracu: number) {
    // cert generator
    const canvas = document.createElement('canvas');
    const ctx = canvas!.getContext('2d');
    if (ctx) {
      ctx.canvas.width = 1024;
      ctx.canvas.height = 768;

      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = certTemplate;

      const drawImage = () => {
        ctx.drawImage(image, 0, 0, 1024, 768);
        ctx.font = 'italic bold 48px Arial';
        ctx.fillStyle = 'gray';
        ctx.textAlign = 'center';
        ctx.fillText('TypeGo', 512, 120);
        ctx.font = 'bold 48px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(name, 512, 320);
        ctx.font = 'italic 26px Arial';
        if (this.translation.getLang() === Language.RU) {
          ctx.fillText(`за скорость набора в ${speed} зн./мин с точностью ${accuracu}%`, 512, 400);
        } else {
          ctx.fillText(`for typing speed ${speed} ch./min with accuracy ${accuracu}%`, 512, 400);
        }
        const date1 = new Date();
        ctx.fillText(`${String(date1.getDate()).padStart(2, '0')}.${String(date1.getMonth() + 1).padStart(2, '0')}.${String(date1.getFullYear()).padStart(2, '0')}`, 450, 620);

        document.getElementById('canvas')!.style.backgroundImage = `url(${canvas.toDataURL()})`;
      };

      image.onload = () => {
        drawImage();
      };

      document.querySelector('.cert-download')!.addEventListener('click', (event) => {
        const btn = event.target as HTMLAnchorElement;
        btn.href = canvas.toDataURL('image/jpg');
        btn.download = `Certificate - ${name}.jpg`;
      });
    }
  }

  private async getUserData() {
    const userData1 = await this.api.getUser(this.user.getToken());
    console.log(`TEST = ${JSON.stringify(userData1)}`);
    return userData1;
  }

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

      const userBlock = createElement('div', 'user__block', wrapper);
      createElement('div', 'user__profile-image', userBlock);
      const userProfileInfo = createElement('div', 'user__profile-info', userBlock);
      const userName = createElement('div', 'user__name', userProfileInfo);
      userName.textContent = currentUser.username;
      const userStatistics = createElement('div', 'user__statistics', userProfileInfo);
      // progress
      if (currentUser.progress.length) {
        const statisticsBlock1 = createElement('div', 'statistics__block', userStatistics);
        const statisticsLogo = createElement('div', 'statistics__logo', statisticsBlock1);
        statisticsLogo.style.background = `url(${progressImg}) center no-repeat`;
        statisticsLogo.style.backgroundSize = 'cover';
        const statisticsProgress = createElement('div', 'statistics__progress', statisticsBlock1);
        const userStatisticsTitle = createElement('span', 'user__statistics-title', statisticsProgress);
        userStatisticsTitle.textContent = this.translation.getString('profileProgressLabel');
        this.translation.regObserver(() => { userStatisticsTitle.textContent = this.translation.getString('profileProgressLabel'); });
        const userStatisticsValue = createElement('span', 'user__statistics-value', statisticsProgress);
        userStatisticsValue.innerHTML = `<b>${currentUser.progress.length}</b> ${this.translation.getString('profileLevels')}`;
        this.translation.regObserver(() => { userStatisticsValue.innerHTML = `<b>${currentUser.progress.length}</b> ${this.translation.getString('profileLevels')}`; });
      }

      // speed
      if (currentUser.speed) {
        const statisticsBlock2 = createElement('div', 'statistics__block', userStatistics);
        const statisticsLogo = createElement('div', 'statistics__logo', statisticsBlock2);
        statisticsLogo.style.background = `url(${speedImg}) center no-repeat`;
        statisticsLogo.style.backgroundSize = 'cover';
        const statisticsAccuracy = createElement('div', 'statistics__accuracy', statisticsBlock2);
        const userStatisticsTitle = createElement('span', 'user__statistics-title', statisticsAccuracy);
        userStatisticsTitle.textContent = this.translation.getString('profileTypingSpeedLabel');
        this.translation.regObserver(() => { userStatisticsTitle.textContent = this.translation.getString('profileTypingSpeedLabel'); });
        const userStatisticsValue = createElement('span', 'user__statistics-value', statisticsAccuracy);
        userStatisticsValue.innerHTML = `<b>${currentUser.speed}</b> ${this.translation.getString('profileTypingSpeed')}`;
        this.translation.regObserver(() => { userStatisticsValue.innerHTML = `<b>${currentUser.speed}</b> ${this.translation.getString('profileTypingSpeed')}`; });
      }

      // accuracy
      if (currentUser.accuracy) {
        const statisticsBlock3 = createElement('div', 'statistics__block', userStatistics);
        const statisticsLogo = createElement('div', 'statistics__logo', statisticsBlock3);
        statisticsLogo.style.background = `url(${accuracyImg}) center no-repeat`;
        statisticsLogo.style.backgroundSize = 'cover';
        const statisticsSpeed = createElement('div', 'statistics__speed', statisticsBlock3);
        const userStatisticsTitle = createElement('span', 'user__statistics-title', statisticsSpeed);
        userStatisticsTitle.textContent = this.translation.getString('profileAccuracyLabel');
        this.translation.regObserver(() => { userStatisticsTitle.textContent = this.translation.getString('profileAccuracyLabel'); });
        const userStatisticsValue = createElement('span', 'user__statistics-value', statisticsSpeed);
        userStatisticsValue.innerHTML = `<b>${currentUser.accuracy}</b>%`;
      }

      // certificate
      const userInfo = createElement('div', 'user__info', wrapper);
      const infoBlock1 = createElement('div', 'info__block', userInfo);
      const caption1 = createElement('h2', '', infoBlock1);
      caption1.textContent = this.translation.getString('profileCertBlockCaption');
      this.translation.regObserver(() => { caption1.textContent = this.translation.getString('profileCertBlockCaption'); });
      const infoBlockCert = createElement('div', 'info__block-cert', infoBlock1);
      if (currentUser.accuracy && currentUser.speed) {
        const certBlock = createElement('div', 'cert-block', infoBlockCert);
        createElement('canvas', 'cert-preview', certBlock, ['id', 'canvas']);
        const certDownload = createElement('a', 'cert-download', certBlock);
        certDownload.textContent = this.translation.getString('profileDownloadCertificate');
        this.translation.regObserver(() => {
          certDownload.textContent = this.translation.getString('profileDownloadCertificate');
          this.createCertificate(
            currentUser.username,
            Number(currentUser.speed),
            Number(currentUser.accuracy),
          );
        });

        this.createCertificate(
          currentUser.username,
          Number(currentUser.speed),
          Number(currentUser.accuracy),
        );
      } else {
        const certMessage = createElement('div', 'cert-message', infoBlockCert);
        certMessage.textContent = this.translation.getString('profileCertificateError');
        this.translation.regObserver(() => { certMessage.textContent = this.translation.getString('profileCertificateError'); });
      }

      // lesson
      const infoBlock2 = createElement('div', 'info__block', userInfo);
      const caption2 = createElement('h2', '', infoBlock2);
      caption2.textContent = this.translation.getString('profileLessonBlockCaption');
      this.translation.regObserver(() => { caption2.textContent = this.translation.getString('profileLessonBlockCaption'); });
      const infoBlockLessons = createElement('div', 'info__block-lessons', infoBlock2);

      if (currentUser.progress.length) {
        ['ru', 'en'].forEach((lessonLanguage) => {
          const lessonsRu = currentUser.progress.filter((lesson) => lesson.lang === lessonLanguage);

          if (lessonsRu.length) {
            const lessonLang = createElement('div', 'lesson__lang', infoBlockLessons);
            const lessonLangCaption = createElement('div', 'lesson__lang-caption', lessonLang);
            if (lessonLanguage === 'ru') lessonLangCaption.innerHTML = this.translation.getString('profileLessonLangRUCaption');
            if (lessonLanguage === 'en') lessonLangCaption.innerHTML = this.translation.getString('profileLessonLangENGCaption');

            this.translation.regObserver(() => {
              if (lessonLanguage === 'ru') lessonLangCaption.innerHTML = this.translation.getString('profileLessonLangRUCaption');
              if (lessonLanguage === 'en') lessonLangCaption.innerHTML = this.translation.getString('profileLessonLangENGCaption');
            });

            const lessonLangLesson = createElement('div', 'lesson__lang-lesson', lessonLang);

            for (let i = 1; i <= 6; i += 1) {
              const currentLesson = lessonsRu.filter((lesson) => lesson.lesson === i);

              if (currentLesson.length) {
                const lessonLangLessonCaption = createElement('div', 'lesson__lang-lesson_caption', lessonLangLesson);
                lessonLangLessonCaption.innerHTML = `${this.translation.getString('profileLesson')} <b>${i}</b>:`;
                this.translation.regObserver(() => { lessonLangLessonCaption.innerHTML = `${this.translation.getString('profileLesson')} <b>${i}</b>:`; });
                const lessonLangLevels = createElement('table', 'lesson__lang-levels', lessonLangLesson);
                currentLesson.sort((a, b) => a.level - b.level).forEach((level) => {
                  const line = createElement('tr', 'lesson__lang-levels__line', lessonLangLevels);
                  const levelCaption = createElement('td', 'value__index', line);
                  levelCaption.innerHTML = `${this.translation.getString('profileLessonLevel')} <b>${level.level}</b>`;
                  this.translation.regObserver(() => { levelCaption.innerHTML = `${this.translation.getString('profileLessonLevel')} <b>${level.level}</b>`; });
                  // insert
                  const levelSpeed = createElement('td', 'value value__speed', line);
                  const levelSpeedValue = createElement('b', '', levelSpeed);
                  levelSpeedValue.textContent = String(level.speed);
                  const levelSpeedText = createElement('span', '', levelSpeed);
                  levelSpeedText.textContent = ` ${this.translation.getString('profileLessonTypingSpeed')}`;
                  const levelSpeedPercent = createElement('div', 'value__speed-percent', levelSpeed);
                  levelSpeedPercent.style.width = `${(level.speed / 200) * 100}%`;
                  this.translation.regObserver(() => { levelSpeedText.textContent = ` ${this.translation.getString('profileLessonTypingSpeed')}`; });

                  const levelAccuracy = createElement('td', 'value value__accuracy', line);
                  const levelAccuracyValue = createElement('b', '', levelAccuracy);
                  levelAccuracyValue.textContent = String(level.accuracy);
                  const levelAccuracyText = createElement('span', '', levelAccuracy);
                  levelAccuracyText.textContent = '%';
                  const levelAccuracyPercent = createElement('div', 'value__accuracy-percent', levelAccuracy);
                  levelAccuracyPercent.style.width = `${level.accuracy}%`;
                });
              }
            }
          }
        });
      } else {
        const lessonMessage = createElement('div', 'lesson-message', infoBlockLessons);
        lessonMessage.textContent = this.translation.getString('profileLessonError');
        this.translation.regObserver(() => { lessonMessage.textContent = this.translation.getString('profileLessonError'); });
      }

      // games
      const infoBlock3 = createElement('div', 'info__block', userInfo);
      const caption3 = createElement('h2', '', infoBlock3);
      caption3.textContent = this.translation.getString('profileGamesBlockCaption');
      this.translation.regObserver(() => { caption3.textContent = this.translation.getString('profileGamesBlockCaption'); });
      const infoBlockGames = createElement('div', 'info__block-games', infoBlock3);

      if (currentUser.gamesScore.length) {
        currentUser.gamesScore.forEach((game) => {
          const gameLine = createElement('div', 'game-line', infoBlockGames);
          const gameLineImage = createElement('div', 'game_line-image', gameLine);
          switch (game.name) {
            case 'whac': gameLineImage.style.background = `url(${whacamoleGameLogo}) center no-repeat`; break;
            case 'space': gameLineImage.style.background = `url(${dropfoodGameLogo}) center no-repeat`; break;
            case 'shooter': gameLineImage.style.background = `url(${gunGameLogo}) center no-repeat`; break;
            default:
          }
          gameLineImage.style.backgroundSize = 'cover';
          const gameInfo = createElement('div', 'game_line-info', gameLine);
          const gameName = createElement('div', 'game_line-info_gamename', gameInfo);
          switch (game.name) {
            case 'whac': gameName.textContent = 'Whac A Mole'; break;
            case 'space': gameName.textContent = 'Drop Food'; break;
            case 'shooter': gameName.textContent = 'Hogan\'s Alley'; break;
            default:
          }
          const gameResult = createElement('div', 'game_line-info_results', gameInfo);
          const resultLevel = createElement('div', 'game_line-info_results-level', gameResult);
          resultLevel.innerHTML = `<b>${game.level}</b> ${this.translation.getString('profileGamesLevel')}`;
          this.translation.regObserver(() => { resultLevel.innerHTML = `<b>${game.level}</b> ${this.translation.getString('profileGamesLevel')}.`; });

          const resultScore = createElement('div', 'game_line-info_results-score', gameResult);
          resultScore.innerHTML = `<b>${game.score}</b> ${this.translation.getString('profileGamesScore')}.`;
          this.translation.regObserver(() => { resultScore.innerHTML = `<b>${game.score}</b> ${this.translation.getString('profileGamesScore')}.`; });
        });
      } else {
        const gamesMessage = createElement('div', 'games-message', infoBlockGames);
        gamesMessage.textContent = this.translation.getString('profileGamesError');
        this.translation.regObserver(() => { gamesMessage.textContent = this.translation.getString('profileGamesError'); });
      }

      // administration
      const infoBlock4 = createElement('div', 'info__block', userInfo);
      const caption4 = createElement('h2', '', infoBlock4);
      caption4.textContent = this.translation.getString('profileAdminBlockCaption');
      this.translation.regObserver(() => { caption4.textContent = this.translation.getString('profileAdminBlockCaption'); });
      // выйти
      // удалить
      const infoBlockAdministration = createElement('div', 'info__block-administration', infoBlock4);
      const administrationControls = createElement('div', 'administration-controls', infoBlockAdministration);
      const logoutBtn = createElement('div', 'control__logout', administrationControls);
      logoutBtn.textContent = this.translation.getString('profileAdminLogout');
      this.translation.regObserver(() => { logoutBtn.textContent = this.translation.getString('profileAdminLogout'); });
      const deletetBtn = createElement('div', 'control__delete', administrationControls);
      deletetBtn.textContent = this.translation.getString('profileAdminDelete');
      this.translation.regObserver(() => { deletetBtn.textContent = this.translation.getString('profileAdminDelete'); });

      logoutBtn.addEventListener('click', () => {
        this.user.setToken('');
        window.location.hash = '#/main';
        window.location.reload();
      });
    }
  }

  public async run() {
    const test = await this.getUserData();
    this.render(test); // userData);
  }
}

export default Profile;
