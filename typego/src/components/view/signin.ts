import PageView from './baseViewClass';
import { createElement, removeChild } from '../helper';
import { Themes } from '../types/enums'; // , Language

class Signin extends PageView {
  private isValidLogin(login: string) {
    return /^[\w]{6,}$/i.test(login);
  }

  private isValidPassword(login: string) {
    return /^[\w]{6,}$/i.test(login);
  }

  public show(): void {
    const modal: HTMLElement | null = document.querySelector('.header__modal');

    if (modal !== null) {
      removeChild(modal);

      if (this.config.getTheme() === Themes.Dark) {
        modal.classList.add('dark');
      } else {
        modal.classList.remove('dark');
      }

      const wrapper = createElement('div', 'signin_modal__wrapper', modal);

      wrapper.addEventListener('click', (event) => {
        if (event.target === wrapper) {
          this.hidden();
        }
      });

      const signin = createElement('div', 'signin__window', wrapper);
      createElement('p', '', signin).textContent = this.translation.getString('authCaption');
      const inputForm = createElement('div', 'input__form', signin);
      createElement('div', 'input__label', inputForm).textContent = this.translation.getString('authLogin');
      const inputName = createElement<HTMLInputElement>('input', 'input__name', inputForm, ['type', 'name']);
      const errorName = createElement('div', 'input__name-error', inputForm);
      errorName.textContent = this.translation.getString('authLoginError');
      createElement('div', 'input__label', inputForm).textContent = this.translation.getString('authPassword');
      const inputPassword = createElement<HTMLInputElement>('input', 'input__password', inputForm, ['type', 'password']);
      const errorPassword = createElement('div', 'input__password-error', inputForm);
      errorPassword.textContent = this.translation.getString('authPasswordError');
      const registrationBtn = createElement('div', 'go-reg_btn', inputForm);
      registrationBtn.textContent = this.translation.getString('authRegNow');
      const bottomLine = createElement('div', 'bottom__line', inputForm);
      const authBtn = createElement('div', 'auth-btn', bottomLine);
      authBtn.textContent = this.translation.getString('authButton');

      authBtn.addEventListener('click', () => {
        if (!this.isValidLogin(inputName.value)) {
          errorName.classList.add('visible');
        } else {
          errorName.classList.remove('visible');
        }

        if (!this.isValidPassword(inputPassword.value)) {
          errorPassword.classList.add('visible');
        } else {
          errorPassword.classList.remove('visible');
        }

        if (this.isValidLogin(inputName.value) && this.isValidPassword(inputPassword.value)) {
          // auth
          console.log(`Auth with ${inputName.value} - ${inputPassword.value}`);
        }
      });
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

export default Signin;
