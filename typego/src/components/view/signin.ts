import PageView from './baseViewClass';
import { createElement, removeChild } from '../helper';
import { Themes } from '../types/enums'; // , Language

class Signin extends PageView {
  private isValidLogin(login: string) {
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

      inputName.addEventListener('input', () => {
        console.log(inputName.value);
        console.log(this.isValidLogin(inputName.value));
      });

      createElement('div', 'input__label', inputForm).textContent = this.translation.getString('authPassword');
      const inputPassword = createElement<HTMLInputElement>('input', 'input__password', inputForm, ['type', 'password']);
      console.log(inputPassword); // validator
      const registrationBtn = createElement('div', 'go-reg_btn', inputForm);
      registrationBtn.textContent = this.translation.getString('authRegNow');
      const bottomLine = createElement('div', 'bottom__line', inputForm);
      const authBtn = createElement('div', 'auth-btn', bottomLine);
      authBtn.textContent = this.translation.getString('authButton');
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
