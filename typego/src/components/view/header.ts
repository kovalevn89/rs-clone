import { createElement } from '../helper'; // createElement, removeChild

class Header {
  // constructor() {
  // }

  private render(): void {
    const body: HTMLElement | null = document.querySelector('.body');

    if (body !== null) {
      let header: HTMLElement | null = document.querySelector('.header');

      if (header === null) {
        header = createElement('header', 'header');
        if (header !== null) {
          const wrapper = createElement('div', 'header__wrapper', header);

          // const burger =
          // createElement('div', 'header__burger', wrapper);
          // console.log(burger);
          // createElement('div', 'logo__caption', logo).textContent = 'TypeGo';
          // logo
          const logo = createElement('div', 'header__logo', wrapper);
          const burger = createElement('div', 'header__burger', logo);
          createElement('div', 'burger__line', burger);
          createElement('div', 'burger__line', burger);
          createElement('div', 'burger__line', burger);
          createElement('div', 'logo__caption', logo).textContent = 'TypeGo';

          burger.addEventListener('click', () => {
            const nav = document.querySelector('.nav');

            if (nav !== null) {
              nav.classList.toggle('hidden');
            }
          });

          window.addEventListener('click', (event) => {
            const element: HTMLElement = event.target as HTMLElement;
            if (!element.closest('.nav')) {
              if (!element.closest('.header__burger')) {
                const nav = document.querySelector('.nav');

                if (nav !== null) {
                  if (!nav.classList.contains('hidden')) {
                    nav.classList.add('hidden');
                  }
                }
              }
            }
          });

          // menu
          const menu = createElement('nav', 'header__menu', wrapper);
          const nav = createElement('nav', 'nav hidden', menu);
          const list = createElement('ul', 'menu__list', nav);
          const item1 = createElement('li', 'menu__item', list);
          item1.textContent = 'Тестирование';
          const item2 = createElement('li', 'menu__item', list);
          item2.textContent = 'Обучение';
          const item3 = createElement('li', 'menu__item', list);
          item3.textContent = 'Тренажер';
          const item4 = createElement('li', 'menu__item', list);
          item4.textContent = 'Игры';

          // controls
          const controls = createElement('div', 'header__controls', wrapper);
          const themeBtn = createElement('div', 'theme__btn', controls);
          themeBtn.textContent = '';
          const langBtn = createElement('div', 'lang__btn', controls);
          langBtn.textContent = 'RU';
          const signBtn = createElement('div', 'sign__btn', controls);
          signBtn.textContent = 'войти';

          body.prepend(header);
        }
      }
    }
  }

  run(): void {
    this.render();
  }
}

export default Header;
