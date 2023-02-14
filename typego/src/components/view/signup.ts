import PageView from './baseViewClass';
import { createElement, removeChild } from '../helper';
import { Themes } from '../types/enums'; // , Language

class Signup extends PageView {
  public show(): void {
    const modal: HTMLElement | null = document.querySelector('.header__modal');

    if (modal !== null) {
      removeChild(modal);

      if (this.config.getTheme() === Themes.Dark) {
        modal.classList.add('dark');
      } else {
        modal.classList.remove('dark');
      }

      const wrapper = createElement('div', 'signup_modal__wrapper', modal);

      wrapper.addEventListener('click', (event) => {
        if (event.target === wrapper) {
          this.hidden();
        }
      });

      const signup = createElement('div', 'signup__window', wrapper);
      signup.innerHTML = 'ОКНО РЕГИСТРАЦИИ';
    }
  }

  public hidden():void {
    const modal: HTMLElement | null = document.querySelector('.header__modal');

    if (modal !== null) {
      removeChild(modal);
    }
  }

  run(): void {
  }
}

export default Signup;
