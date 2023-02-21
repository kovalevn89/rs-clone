import PageView from './baseViewClass';
import { Language, Themes } from '../types/enums';
import { createElement, removeChild } from '../helper';
import lern1 from '../../assets/png/lern_1.png';
import lern2 from '../../assets/png/lern_2.png';
import lern2EN from '../../assets/png/lern_2_en.png';
import lern3 from '../../assets/png/lern_3.png';
import lern3EN from '../../assets/png/lern_3_en.png';
import lern4 from '../../assets/png/lern_4.png';

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
      this.translation.translateField(blockTopCaption, 'lernBottomCaption');
      const blockTopText = createElement('div', 'block__top-text', blockTop);
      this.translation.translateField(blockTopText, 'lernBottomText');

      // middle 1
      const blockMiddleWrapper = createElement('div', 'block__middle__wrapper', wrapper);
      const blockMiddle = createElement('div', 'block__middle', blockMiddleWrapper);
      const blockMiddleCaption = createElement('div', 'block__middle-caption', blockMiddle);
      this.translation.translateField(blockMiddleCaption, 'lernMiddle1Caption');
      const blockMiddleContent = createElement('div', 'block__middle-content', blockMiddle);
      const blockMiddleContentText = createElement('div', 'block__middle-content__text', blockMiddleContent);
      const contentTextList = createElement('ul', '', blockMiddleContentText);
      this.translation.translateField(createElement('li', '', contentTextList), 'lernMiddle1ContentLi1');
      this.translation.translateField(createElement('li', '', contentTextList), 'lernMiddle1ContentLi2');
      this.translation.translateField(createElement('li', '', contentTextList), 'lernMiddle1ContentLi3');
      this.translation.translateField(createElement('li', '', contentTextList), 'lernMiddle1ContentLi4');
      this.translation.translateField(createElement('li', '', contentTextList), 'lernMiddle1ContentLi5');
      const blockMiddleContentImage = createElement('div', 'block__middle-content__image', blockMiddleContent);
      blockMiddleContentImage.style.background = `url(${lern1}) center no-repeat`;
      blockMiddleContentImage.style.backgroundSize = 'contain';

      // middle 2
      const blockMiddleWrapper1 = createElement('div', 'block__middle__wrapper', wrapper);
      const blockMiddle1 = createElement('div', 'block__middle', blockMiddleWrapper1);
      const blockMiddleCaption1 = createElement('div', 'block__middle-caption', blockMiddle1);
      this.translation.translateField(blockMiddleCaption1, 'lernMiddle2Caption');
      const blockMiddleContent1 = createElement('div', 'block__middle-content vertical', blockMiddle1);
      const blockMiddleContentText1 = createElement('div', 'block__middle-content__text', blockMiddleContent1);
      this.translation.translateField(createElement('p', '', blockMiddleContentText1), 'lernMiddle2Content1');
      this.translation.translateField(createElement('p', '', blockMiddleContentText1), 'lernMiddle2Content2');
      const blockMiddleContentImage1 = createElement('div', 'block__middle-content__image', blockMiddleContent1);

      blockMiddleContentImage1.style.background = this.translation.getLang() === Language.RU ? `url(${lern2}) center no-repeat` : `url(${lern2EN}) center no-repeat`;
      blockMiddleContentImage1.style.backgroundSize = 'contain';

      this.translation.regObserver(() => {
        blockMiddleContentImage1.style.background = this.translation.getLang() === Language.RU ? `url(${lern2}) center no-repeat` : `url(${lern2EN}) center no-repeat`;
        blockMiddleContentImage1.style.backgroundSize = 'contain';
      });

      // midle 3
      const blockMiddleWrapper2 = createElement('div', 'block__middle__wrapper', wrapper);
      const blockMiddle2 = createElement('div', 'block__middle', blockMiddleWrapper2);
      const blockMiddleCaption2 = createElement('div', 'block__middle-caption', blockMiddle2);
      this.translation.translateField(blockMiddleCaption2, 'lernMiddle3Caption');
      const blockMiddleContent2 = createElement('div', 'block__middle-content vertical', blockMiddle2);
      const blockMiddleContentText2 = createElement('div', 'block__middle-content__text', blockMiddleContent2);
      this.translation.translateField(createElement('p', '', blockMiddleContentText2), 'lernMiddle3Content1');
      const contentTextList2 = createElement('ul', '', blockMiddleContentText2);
      this.translation.translateField(createElement('li', '', contentTextList2), 'lernMiddle3ContentLi1');
      this.translation.translateField(createElement('li', '', contentTextList2), 'lernMiddle3ContentLi2');
      this.translation.translateField(createElement('li', '', contentTextList2), 'lernMiddle3ContentLi3');
      this.translation.translateField(createElement('li', '', contentTextList2), 'lernMiddle3ContentLi4');
      this.translation.translateField(createElement('li', '', contentTextList2), 'lernMiddle3ContentLi5');
      this.translation.translateField(createElement('li', '', contentTextList2), 'lernMiddle3ContentLi6');
      this.translation.translateField(createElement('p', '', blockMiddleContentText2), 'lernMiddle3Content2');
      const blockMiddleContentImage2 = createElement('div', 'block__middle-content__image', blockMiddleContent2);

      blockMiddleContentImage2.style.background = this.translation.getLang() === Language.RU ? `url(${lern3}) center no-repeat` : `url(${lern3EN}) center no-repeat`;
      blockMiddleContentImage2.style.backgroundSize = 'contain';

      this.translation.regObserver(() => {
        blockMiddleContentImage2.style.background = this.translation.getLang() === Language.RU ? `url(${lern3}) center no-repeat` : `url(${lern3EN}) center no-repeat`;
        blockMiddleContentImage2.style.backgroundSize = 'contain';
      });

      blockMiddleContentImage2.style.height = '16vw';

      // middle 4
      const blockMiddleWrapper3 = createElement('div', 'block__middle__wrapper', wrapper);
      const blockMiddle3 = createElement('div', 'block__middle', blockMiddleWrapper3);
      const blockMiddleCaption3 = createElement('div', 'block__middle-caption', blockMiddle3);
      this.translation.translateField(blockMiddleCaption3, 'lernMiddle4Caption');
      const blockMiddleContent3 = createElement('div', 'block__middle-content', blockMiddle3);
      const blockMiddleContentText3 = createElement('div', 'block__middle-content__text', blockMiddleContent3);
      this.translation.translateField(createElement('p', '', blockMiddleContentText3), 'lernMiddle4Content1');
      this.translation.translateField(createElement('p', '', blockMiddleContentText3), 'lernMiddle4Content2');
      this.translation.translateField(createElement('p', '', blockMiddleContentText3), 'lernMiddle4Content3');
      const blockMiddleContentImage3 = createElement('div', 'block__middle-content__image', blockMiddleContent3);
      blockMiddleContentImage3.style.background = `url(${lern4}) center no-repeat`;
      blockMiddleContentImage3.style.backgroundSize = 'contain';

      // middle 5
      const blockMiddleWrapper4 = createElement('div', 'block__middle__wrapper', wrapper);
      const blockMiddle4 = createElement('div', 'block__middle', blockMiddleWrapper4);
      const blockMiddleCaption4 = createElement('div', 'block__middle-caption', blockMiddle4);
      this.translation.translateField(blockMiddleCaption4, 'lernMiddle5Caption');
      const blockMiddleContent4 = createElement('div', 'block__middle-content', blockMiddle4);
      const blockMiddleContentText4 = createElement('div', 'block__middle-content__text', blockMiddleContent4);
      blockMiddleContentText4.style.width = '98%';
      const contentTextList4 = createElement('ul', '', blockMiddleContentText4);
      this.translation.translateField(createElement('li', '', contentTextList4), 'lernMiddle5ContentLi1');
      this.translation.translateField(createElement('li', '', contentTextList4), 'lernMiddle5ContentLi2');
      this.translation.translateField(createElement('li', '', contentTextList4), 'lernMiddle5ContentLi3');
      this.translation.translateField(createElement('li', '', contentTextList4), 'lernMiddle5ContentLi4');
      const blockMiddleContentImage4 = createElement('div', 'block__middle-content__image', blockMiddleContent4);
      blockMiddleContentImage4.style.display = 'none';

      // middle 6
      const blockMiddleWrapper5 = createElement('div', 'block__middle__wrapper', wrapper);
      const blockMiddle5 = createElement('div', 'block__middle', blockMiddleWrapper5);
      const blockMiddleCaption5 = createElement('div', 'block__middle-caption', blockMiddle5);
      this.translation.translateField(blockMiddleCaption5, 'lernMiddle6Caption');
      const blockMiddleContent5 = createElement('div', 'block__middle-content', blockMiddle5);
      const blockMiddleContentText5 = createElement('div', 'block__middle-content__text', blockMiddleContent5);
      blockMiddleContentText5.style.width = '98%';
      this.translation.translateField(createElement('p', '', blockMiddleContentText5), 'lernMiddle6Content1');
      const blockMiddleContentImage5 = createElement('div', 'block__middle-content__image', blockMiddleContent5);
      blockMiddleContentImage5.style.display = 'none';

      // btn
      const blockControlsrapper5 = createElement('div', 'block__controls__wrapper', wrapper);
      const trainingBtn = createElement('div', 'training__button', blockControlsrapper5);
      this.translation.translateField(trainingBtn, 'lernBatton');
      trainingBtn.addEventListener('click', () => { window.location.hash = '#/training'; });
    }
  }

  run(): void {
    this.render();
  }
}

export default Lern;
