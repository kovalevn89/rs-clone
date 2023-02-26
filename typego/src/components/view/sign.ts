/* eslint-disable @typescript-eslint/naming-convention */
import PageView from './baseViewClass';
import { createElement, removeChild } from '../helper';
import { Themes } from '../types/enums'; // , Language

class Sign extends PageView {
  private isValidLogin(login: string) {
    return /^[\w]{6,}$/i.test(login);
  }

  private isValidPassword(login: string) {
    return /^[\w]{6,}$/i.test(login);
  }

  public showIn(): void {
    const modal: HTMLElement | null = document.querySelector('.header__modal');

    this.state.isInputActive = false;

    if (modal !== null) {
      removeChild(modal);

      if (this.config.getTheme() === Themes.Dark) {
        modal.classList.add('dark');
      } else {
        modal.classList.remove('dark');
      }

      const wrapper = createElement('div', 'signin_modal__wrapper', modal);

      let modalRequestToClose = false;

      wrapper.addEventListener('mousedown', (event) => {
        if (event.target === wrapper) {
          modalRequestToClose = true;
        }
      });

      wrapper.addEventListener('click', (event) => {
        if (event.target === wrapper) {
          if (modalRequestToClose === true) {
            this.hidden();
          }
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
      const errorLogin = createElement('div', 'login__error', inputForm);
      errorPassword.textContent = this.translation.getString('authPasswordError');
      const registrationBtn = createElement('div', 'go-reg_btn', inputForm);
      registrationBtn.textContent = this.translation.getString('authRegNow');
      registrationBtn.addEventListener('click', () => {
        this.hidden();
        this.showUp();
      });
      const bottomLine = createElement('div', 'bottom__line', inputForm);
      const authBtn = createElement('div', 'auth-btn', bottomLine);
      authBtn.textContent = this.translation.getString('authButton');

      const loginFunc = async () => {
        errorLogin.classList.remove('visible');

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

          try {
            const { token } = await this.api.auth({
              username: inputName.value,
              password: inputPassword.value,
            });
            console.log(token);

            this.user.setToken(token);

            const header = document.querySelector('.header');

            if (header !== null) {
              const event = new Event('auth');
              header.dispatchEvent(event);
            }

            this.hidden();
          } catch (e) {
            console.log((e as Error).message);

            errorLogin.classList.add('visible');

            const errorMsg = JSON.parse((e as Error).message).message;

            switch (errorMsg) {
              case 'user not exists': errorLogin.textContent = this.translation.getString('authUserNotExist'); break;
              case 'invalid password': errorLogin.textContent = this.translation.getString('authInvalidPassword'); break;
              default: errorLogin.textContent = this.translation.getString('authOtherError');
            }
          }
        }
      };

      authBtn.addEventListener('click', async () => {
        loginFunc();
      });

      inputName.addEventListener('keypress', (Event) => {
        if (Event.keyCode === 13) {
          loginFunc();
        }
      });

      inputPassword.addEventListener('keypress', (Event) => {
        if (Event.keyCode === 13) {
          loginFunc();
        }
      });
    }
  }

  public showUp(): void {
    const modal: HTMLElement | null = document.querySelector('.header__modal');

    this.state.isInputActive = false;

    if (modal !== null) {
      removeChild(modal);

      if (this.config.getTheme() === Themes.Dark) {
        modal.classList.add('dark');
      } else {
        modal.classList.remove('dark');
      }

      const wrapper = createElement('div', 'signup_modal__wrapper', modal);

      let modalRequestToClose = false;

      wrapper.addEventListener('mousedown', (event) => {
        if (event.target === wrapper) {
          modalRequestToClose = true;
        }
      });

      wrapper.addEventListener('click', (event) => {
        if (event.target === wrapper) {
          if (modalRequestToClose === true) {
            this.hidden();
          }
        }
      });

      const signup = createElement('div', 'signup__window', wrapper);
      createElement('p', '', signup).textContent = this.translation.getString('regCaption');
      const inputForm = createElement('div', 'input__form', signup);
      createElement('div', 'input__label', inputForm).textContent = this.translation.getString('regLogin');
      const inputName = createElement<HTMLInputElement>('input', 'input__name', inputForm, ['type', 'name']);
      const errorName = createElement('div', 'input__name-error', inputForm);
      errorName.textContent = this.translation.getString('regLoginError');

      createElement('div', 'input__label', inputForm).textContent = this.translation.getString('regPassword');
      const inputPassword1 = createElement<HTMLInputElement>('input', 'input__password', inputForm, ['type', 'password']);
      const errorPassword1 = createElement('div', 'input__password-error', inputForm);
      errorPassword1.textContent = this.translation.getString('regPasswordError');

      createElement('div', 'input__label', inputForm).textContent = this.translation.getString('regRepeatPassword');
      const inputPassword2 = createElement<HTMLInputElement>('input', 'input__password', inputForm, ['type', 'password']);
      const errorPassword2 = createElement('div', 'input__password-error', inputForm);
      errorPassword2.textContent = this.translation.getString('regPasswordMatchError');

      const autBtn = createElement('div', 'go-reg_btn', inputForm);
      autBtn.textContent = this.translation.getString('regAuthNow');
      autBtn.addEventListener('click', () => {
        this.hidden();
        this.showIn();
      });
      const bottomLine = createElement('div', 'bottom__line', inputForm);
      const authBtn = createElement('div', 'auth-btn', bottomLine);
      authBtn.textContent = this.translation.getString('regButton');

      authBtn.addEventListener('click', async () => {
        if (!this.isValidLogin(inputName.value)) {
          errorName.classList.add('visible');
        } else {
          errorName.classList.remove('visible');
        }

        if (!this.isValidPassword(inputPassword1.value)) {
          errorPassword1.classList.add('visible');
        } else {
          errorPassword1.classList.remove('visible');
        }

        if (inputPassword1.value !== inputPassword2.value) {
          errorPassword2.classList.add('visible');
        } else {
          errorPassword2.classList.remove('visible');
        }

        if (this.isValidLogin(inputName.value)
        && this.isValidPassword(inputPassword1.value)
        && inputPassword1.value === inputPassword2.value
        ) {
          // auth
          console.log(`Registration with ${inputName.value} - ${inputPassword1.value} - ${inputPassword2.value}`);
          const { message } = await this.api.register({
            username: inputName.value,
            password: inputPassword1.value,
          });

          console.log(message);
        }
      });
    }
  }

  public hidden():void {
    const modal: HTMLElement | null = document.querySelector('.header__modal');

    if (modal !== null) {
      removeChild(modal);
    }
    this.state.isInputActive = true;
  }

  run(): void {
  }
}

export default Sign;
