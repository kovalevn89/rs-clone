import PageView from './baseViewClass';
import { Themes } from '../types/enums';
import { createElement, removeChild } from '../helper';
import lern1 from '../../assets/png/lern_1.png';
// import lern2 from '../../assets/png/lern_2.png';
// import lern3 from '../../assets/png/lern_3.png';
// import lern4 from '../../assets/png/lern_4.png';

class Lern extends PageView {
  private render() {
    const app: HTMLElement | null = document.querySelector('.app');

    if (app !== null) {
      removeChild(app);
      const about = createElement('div', 'main', app);

      this.translation.cleanObserver(); // clear translate obserber hook

      if (this.config.getTheme() === Themes.Dark) {
        about.classList.add('dark');
      } else {
        about.classList.remove('dark');
      }

      const wrapper = createElement('div', 'lern__wrapper', about);

      // top
      const blockTopWrapper = createElement('div', 'block__top__wrapper', wrapper);
      const blockTop = createElement('div', 'block__top', blockTopWrapper);
      const blockTopCaption = createElement('div', 'block__top-caption', blockTop);
      blockTopCaption.textContent = 'Узнай, как печатать вслепую';
      const blockTopText = createElement('div', 'block__top-text', blockTop);
      blockTopText.textContent = 'Главная идея слепой печати в том, что за каждым пальцем закреплена своя зона клавиш. Это позволяет печатать не глядя на клавиатуру. Регулярно тренируйся и, благодаря мышечной памяти, все твои десять пальцев будут знать, куда нажать.';

      // middle
      const blockMiddleWrapper = createElement('div', 'block__middle__wrapper', wrapper);
      const blockMiddle = createElement('div', 'block__middle', blockMiddleWrapper);
      const blockMiddleCaption = createElement('div', 'block__middle-caption', blockMiddle);
      blockMiddleCaption.textContent = 'Поза при печати текста';
      const blockMiddleContent = createElement('div', 'block__middle-content', blockMiddle);
      const blockMiddleContentText = createElement('div', 'block__middle-content__text', blockMiddleContent);
      const contentTextList = createElement('ul', '', blockMiddleContentText);
      createElement('li', '', contentTextList).textContent = 'Сиди ровно и держи спину прямой.';
      createElement('li', '', contentTextList).textContent = 'Локти держи согнутыми под прямым углом.';
      createElement('li', '', contentTextList).textContent = 'Голова должна быть немного наклонена вперед.';
      createElement('li', '', contentTextList).textContent = 'Расстояние от глаз до экрана должно быть 45-70 см.';
      createElement('li', '', contentTextList).textContent = 'Расслабь мышцы плеч, рук и кистей. Кисти могут немного касаться стола в нижней части клавиатуры, но не переноси вес тела на руки, чтобы не перенапрягать кисти.';
      const blockMiddleContentImage = createElement('div', 'block__middle-content__image', blockMiddleContent);
      blockMiddleContentImage.style.background = `url(${lern1}) center no-repeat`;
      blockMiddleContentImage.style.backgroundSize = 'contain';
    }
  }

  run(): void {
    this.render();
  }
}

export default Lern;
