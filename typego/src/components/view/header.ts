import { createElement } from '../helper';

class Header {
  private changeTheme(): void {
    const header: HTMLElement | null = document.querySelector('.header');
    const main: HTMLElement | null = document.querySelector('.main');
    const footer: HTMLElement | null = document.querySelector('.footer');

    if (header !== null) {
      header.classList.toggle('dark');
    }

    if (main !== null) {
      main.classList.toggle('dark');
    }

    if (footer !== null) {
      footer.classList.toggle('dark');
    }
  }

  private render(): void {
    const body: HTMLElement | null = document.querySelector('.body');

    if (body !== null) {
      let header: HTMLElement | null = document.querySelector('.header');

      if (header === null) {
        header = createElement('header', 'header');
        if (header !== null) {
          const wrapper = createElement('div', 'header__wrapper', header);

          // logo
          const logo = createElement('div', 'header__logo', wrapper);
          const burger = createElement('div', 'header__burger', logo);
          createElement('div', 'burger__line', burger);
          createElement('div', 'burger__line', burger);
          createElement('div', 'burger__line', burger);
          const logoBtn = createElement('div', 'logo__caption', logo);
          logoBtn.textContent = 'TypeGo';
          logoBtn.addEventListener('click', () => {
            window.location.hash = '#/main';
          });

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
          const item5 = createElement('li', 'menu__item', list);
          item5.textContent = 'Войти';
          const item6 = createElement('li', 'menu__item', list);
          item6.textContent = '';
          const themeBtn2 = createElement('div', 'theme__btn', item6);
          themeBtn2.addEventListener('click', this.changeTheme);
          createElement('div', 'lang__btn', item6).textContent = 'RU';

          // controls
          const controls = createElement('div', 'header__controls', wrapper);
          const themeBtn1 = createElement('div', 'theme__btn', controls);
          themeBtn1.addEventListener('click', this.changeTheme);
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
