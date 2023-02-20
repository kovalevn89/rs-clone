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
          this.translation.cleanObserver(); // clear translate obserber hook

          if (this.config.getTheme() === Themes.Dark) {
            footer.classList.add('dark');
          }
          const footerWrapper = createElement('div', 'footer__wrapper', footer);
          const footerTop = createElement('div', 'footer__top', footerWrapper);
          const logoBtn = createElement('div', 'footer__caption', footerTop);
          logoBtn.textContent = 'TypeGo';
          const aboutBtn = createElement('div', 'footer__about', footerTop);
          aboutBtn.textContent = this.translation.getString('footerAboutButton');
          this.translation.regObserverPermanent(() => { aboutBtn.textContent = this.translation.getString('footerAboutButton'); });

          aboutBtn.addEventListener('click', () => {
            window.location.hash = '#/about';
          });

          const footerBottom = createElement('div', 'footer__bottom', footerWrapper);
          const footerCredits = createElement('div', 'footer__credits', footerBottom);
          footerCredits.textContent = this.translation.getString('footerCredits');
          this.translation.regObserverPermanent(() => { footerCredits.textContent = this.translation.getString('footerCredits'); });

          const footerDescription = createElement('div', 'footer__controls-discription', footerBottom);
          footerDescription.textContent = this.translation.getString('footerDescription');
          this.translation.regObserverPermanent(() => { footerDescription.textContent = this.translation.getString('footerDescription'); });
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
