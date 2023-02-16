import PageView from './baseViewClass';
import { createElement, removeChild } from '../helper';
import { Themes } from '../types/enums';

const userData = {
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
      if (this.config.getTheme() === Themes.Dark) {
        main.classList.add('dark');
      } else {
        main.classList.remove('dark');
      }
      const wrapper = createElement('div', 'profile-wrapper', main);
      wrapper.innerHTML = `${wrapper}`;
    }
  }

  public run(): void {
    this.render();
    console.log(userData);
  }
}

export default Profile;
