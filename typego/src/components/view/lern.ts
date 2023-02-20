import PageView from './baseViewClass';
import { Themes } from '../types/enums';
import { createElement, removeChild } from '../helper';
import lern1 from '../../assets/png/lern_1.png';
import lern2 from '../../assets/png/lern_2.png';
import lern3 from '../../assets/png/lern_3.png';
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
      blockTopCaption.textContent = 'Узнай, как печатать вслепую';
      const blockTopText = createElement('div', 'block__top-text', blockTop);
      blockTopText.textContent = 'Главная идея слепой печати в том, что за каждым пальцем закреплена своя зона клавиш. Это позволяет печатать не глядя на клавиатуру. Регулярно тренируйся и, благодаря мышечной памяти, все твои десять пальцев будут знать, куда нажать.';

      // middle 1
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

      // middle 2
      const blockMiddleWrapper1 = createElement('div', 'block__middle__wrapper', wrapper);
      const blockMiddle1 = createElement('div', 'block__middle', blockMiddleWrapper1);
      const blockMiddleCaption1 = createElement('div', 'block__middle-caption', blockMiddle1);
      blockMiddleCaption1.textContent = 'Исходная позиция';
      const blockMiddleContent1 = createElement('div', 'block__middle-content vertical', blockMiddle1);
      const blockMiddleContentText1 = createElement('div', 'block__middle-content__text', blockMiddleContent1);
      createElement('p', '', blockMiddleContentText1).textContent = 'Немного согни пальцы и положи их на клавиши ФЫВА и ОЛДЖ, которые находятся в среднем ряду. Эта строка называется ОСНОВНОЙ СТРОКОЙ, потому что ты всегда будешь начинать с этих клавиш и возвращаться к ним.';
      createElement('p', '', blockMiddleContentText1).textContent = 'На клавишах А и О, под указательными пальцами, находятся небольшие выступы. Они позволяют ориентироваться на клавиатуре вслепую.';
      const blockMiddleContentImage1 = createElement('div', 'block__middle-content__image', blockMiddleContent1);
      blockMiddleContentImage1.style.background = `url(${lern2}) center no-repeat`;
      blockMiddleContentImage1.style.backgroundSize = 'contain';

      // midle 3
      const blockMiddleWrapper2 = createElement('div', 'block__middle__wrapper', wrapper);
      const blockMiddle2 = createElement('div', 'block__middle', blockMiddleWrapper2);
      const blockMiddleCaption2 = createElement('div', 'block__middle-caption', blockMiddle2);
      blockMiddleCaption2.textContent = 'Схема клавиатуры';
      const blockMiddleContent2 = createElement('div', 'block__middle-content vertical', blockMiddle2);
      const blockMiddleContentText2 = createElement('div', 'block__middle-content__text', blockMiddleContent2);
      createElement('p', '', blockMiddleContentText2).textContent = 'Цвет клавиш на этой клавиатуре поможет тебе понять и запомнить, каким пальцем на какую клавишу нужно нажимать.';
      const contentTextList2 = createElement('ul', '', blockMiddleContentText2);
      createElement('li', '', contentTextList2).textContent = 'Нажимай клавиши только тем пальцем, который для них предназначен.';
      createElement('li', '', contentTextList2).textContent = 'Всегда возвращай пальцы в исходную позицию «ФЫВА – ОЛДЖ».';
      createElement('li', '', contentTextList2).textContent = 'Когда набираешь текст, представляй расположение клавиш.';
      createElement('li', '', contentTextList2).textContent = 'Установи ритм и соблюдай его, пока печатаешь. Нажимай на клавиши с одинаковым интервалом.';
      createElement('li', '', contentTextList2).textContent = 'Клавишу SHIFT всегда нажимает мизинец с противоположной стороны от нужной буквы.';
      createElement('li', '', contentTextList2).textContent = 'Пробел отбивай большим пальцем левой или правой руки, как тебе удобнее.';
      createElement('p', '', blockMiddleContentText2).textContent = 'Сначала такой метод печати может показаться неудобным. Но не останавливайся. Со временем все будет получаться быстро, легко и удобно. Чтобы добиться максимального результата, выбирай курс слепой печати для твоей раскладки клавиатуры и на нужном языке.';
      const blockMiddleContentImage2 = createElement('div', 'block__middle-content__image', blockMiddleContent2);
      blockMiddleContentImage2.style.background = `url(${lern3}) center no-repeat`;
      blockMiddleContentImage2.style.backgroundSize = 'contain';
      blockMiddleContentImage2.style.height = '16vw';

      // middle 4
      const blockMiddleWrapper3 = createElement('div', 'block__middle__wrapper', wrapper);
      const blockMiddle3 = createElement('div', 'block__middle', blockMiddleWrapper3);
      const blockMiddleCaption3 = createElement('div', 'block__middle-caption', blockMiddle3);
      blockMiddleCaption3.textContent = 'Движение пальцев';
      const blockMiddleContent3 = createElement('div', 'block__middle-content', blockMiddle3);
      const blockMiddleContentText3 = createElement('div', 'block__middle-content__text', blockMiddleContent3);
      createElement('p', '', blockMiddleContentText3).textContent = 'Не подглядывай на клавиатуру во время печати. Просто скользи пальцами по клавишам, пока не найдешь основную строку.';
      createElement('p', '', blockMiddleContentText3).textContent = 'Ограничь движение кистей и пальцев до минимума, только чтобы нажимать нужные клавиши. Держи руки и пальцы как можно ближе к исходной позиции. Это увеличит скорость набора текста и снизит нагрузку на кисти.';
      createElement('p', '', blockMiddleContentText3).textContent = 'Следи за безымянными пальцами и мизинцами, так как они часто остаются незадействованными.';
      const blockMiddleContentImage3 = createElement('div', 'block__middle-content__image', blockMiddleContent3);
      blockMiddleContentImage3.style.background = `url(${lern4}) center no-repeat`;
      blockMiddleContentImage3.style.backgroundSize = 'contain';
    }
  }

  run(): void {
    this.render();
  }
}

export default Lern;
