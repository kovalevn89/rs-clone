import PageView from './baseViewClass';
import { createElement } from '../helper';
import { Themes } from '../types/enums';

class Footer extends PageView {
  private render(): void {
    const body: HTMLElement | null = document.querySelector('.body');

    if (body !== null) {
      let footer: HTMLElement | null = document.querySelector('.footer');

      if (footer === null) {
        footer = createElement('footer', 'footer');
        if (footer !== null) {
          if (this.config.getTheme() === Themes.Dark) {
            footer.classList.add('dark');
          }
          const footerWrapper = createElement('div', 'footer__wrapper', footer);
          const footerTop = createElement('div', 'footer__top', footerWrapper);
          const logoBtn = createElement('div', 'footer__caption', footerTop);
          logoBtn.textContent = 'TypeGo';
          const aboutBtn = createElement('div', 'footer__about', footerTop);
          aboutBtn.textContent = 'О нас';

          aboutBtn.addEventListener('click', () => {
            window.location.hash = '#/about';
          });

          const footerBottom = createElement('div', 'footer__bottom', footerWrapper);
          createElement('div', 'footer__credits', footerBottom).textContent = '© 2023 TypeGo - Удобный и простой клавиатурный тренажер';
          createElement('div', 'footer__controls-discription', footerBottom).textContent = 'Разработано в рамках задания RSClone для RSSchool';

          body.append(footer);
        }
      }
    }
  }

  run(): void {
    this.render();
  }
}

export default Footer;
