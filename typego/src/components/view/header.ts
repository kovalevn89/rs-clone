import PageView from './baseViewClass';
import { createElement } from '../helper';
import { Themes, Language } from '../types/enums';
import Sign from './sign';

class Header extends PageView {
  private sign: Sign;
  constructor() {
    super();

    this.sign = new Sign();
  }

  private changeTheme(): void {
    const header: HTMLElement | null = document.querySelector('.header');
    const main: HTMLElement | null = document.querySelector('.main');
    const footer: HTMLElement | null = document.querySelector('.footer');

    if (this.currentTheme === Themes.Light) {
      this.currentTheme = Themes.Dark;

      if (header !== null) header.classList.add('dark');
      if (main !== null) main.classList.add('dark');
      if (footer !== null) footer.classList.add('dark');
    } else {
      this.currentTheme = Themes.Light;

      if (header !== null) header.classList.remove('dark');
      if (main !== null) main.classList.remove('dark');
      if (footer !== null) footer.classList.remove('dark');
    }
  }

  private changeLang(): void {
    if (this.currentLang === Language.RU) {
      this.currentLang = Language.EN;
    } else {
      this.currentLang = Language.RU;
    }
  }

  private render(): void {
    const body: HTMLElement | null = document.querySelector('.body');

    if (body !== null) {
      let header: HTMLElement | null = document.querySelector('.header');

      if (header === null) {
        header = createElement('header', 'header');

        if (header !== null) {
          this.translation.cleanObserver(); // clear translate obserber hook

          if (this.config.getTheme() === Themes.Dark) {
            header.classList.add('dark');
          }

          // проверка авторизирован ли юзер.
          const userAuth = false;

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
          item1.textContent = this.translation.getString('headerManu1');
          this.translation.regObserverPermanent(() => { item1.textContent = this.translation.getString('headerManu1'); });
          item1.addEventListener('click', () => { window.location.hash = '#/test'; });
          const item2 = createElement('li', 'menu__item', list);
          item2.textContent = this.translation.getString('headerManu2');
          this.translation.regObserverPermanent(() => { item2.textContent = this.translation.getString('headerManu2'); });
          item2.addEventListener('click', () => { window.location.hash = '#/lern'; });
          const item3 = createElement('li', 'menu__item', list);
          item3.textContent = this.translation.getString('headerManu3');
          this.translation.regObserverPermanent(() => { item3.textContent = this.translation.getString('headerManu3'); });
          item3.addEventListener('click', () => { window.location.hash = '#/training'; });
          const item4 = createElement('li', 'menu__item', list);
          item4.textContent = this.translation.getString('headerManu4');
          this.translation.regObserverPermanent(() => { item4.textContent = this.translation.getString('headerManu4'); });
          item4.addEventListener('click', () => { window.location.hash = '#/games'; });
          const item5 = createElement('li', 'menu__item', list);

          if (userAuth) {
            item5.textContent = 'UserName';
            item5.addEventListener('click', () => {
              window.location.hash = '#/profile';
            });
          } else {
            item5.textContent = this.translation.getString('loginButton');
            item5.addEventListener('click', () => {
              this.sign.showIn();
            });
            this.translation.regObserverPermanent(() => { item5.textContent = this.translation.getString('loginButton'); });
          }

          const item6 = createElement('li', 'menu__item', list);
          item6.textContent = '';
          const themeBtn2 = createElement('div', 'theme__btn', item6);
          themeBtn2.addEventListener('click', () => {
            this.changeTheme();
            this.config.setTheme(this.currentTheme);
          });
          const langBtn1 = createElement('div', 'lang__btn', item6);
          langBtn1.textContent = `${Language[this.config.getLang()]}`;
          langBtn1.addEventListener('click', () => {
            this.changeLang();
            this.config.setLang(this.currentLang);
            document.querySelectorAll('.lang__btn').forEach((value) => {
              value.textContent = `${Language[this.config.getLang()]}`;
            });
            this.translation.setLang(this.currentLang);
          });

          // controls
          const controls = createElement('div', 'header__controls', wrapper);
          const themeBtn1 = createElement('div', 'theme__btn', controls);
          themeBtn1.addEventListener('click', () => {
            this.changeTheme();
            this.config.setTheme(this.currentTheme);
          });
          const langBtn = createElement('div', 'lang__btn', controls);
          langBtn.textContent = `${Language[this.config.getLang()]}`;
          langBtn.addEventListener('click', () => {
            this.changeLang();
            this.config.setLang(this.currentLang);
            document.querySelectorAll('.lang__btn').forEach((value) => {
              value.textContent = `${Language[this.config.getLang()]}`;
            });
            this.translation.setLang(this.currentLang);
          });

          if (userAuth) {
            const profileBtn = createElement('div', 'profile__btn', controls);
            profileBtn.textContent = 'UserName';

            // profile
            profileBtn.addEventListener('click', () => {
              window.location.hash = '#/profile';
            });
          } else {
            const signBtn = createElement('div', 'sign__btn', controls);
            signBtn.textContent = this.translation.getString('loginButton');
            this.translation.regObserverPermanent(() => { signBtn.textContent = this.translation.getString('loginButton'); });

            // login
            signBtn.addEventListener('click', () => {
              this.sign.showIn();
            });
          }

          // modal wrapper
          createElement('div', 'header__modal', wrapper);
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
