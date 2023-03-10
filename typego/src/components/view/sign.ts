/* eslint-disable @typescript-eslint/naming-convention */
import PageView from './baseViewClass';
import { createElement, removeChild } from '../helper';
import { Themes } from '../types/enums';

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

          try {
            const { token } = await this.api.auth({
              username: inputName.value,
              password: inputPassword.value,
            });

            this.user.setToken(token);

            const header = document.querySelector('.header');

            if (header !== null) {
              const event = new Event('auth');
              header.dispatchEvent(event);
            }

            this.hidden();
          } catch (e) {
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

      const errorReg = createElement('div', 'registration__error', inputForm);

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
        errorReg.classList.remove('visible');
        errorReg.classList.remove('successful');

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
          // reg

          try {
            // const { message } =
            await this.api.register({
              username: inputName.value,
              password: inputPassword1.value,
            });

            errorReg.classList.add('successful');
            errorReg.classList.add('visible');
            errorReg.textContent = this.translation.getString('regSuccessful');
          } catch (e) {
            errorReg.classList.add('visible');

            const errorMsg = JSON.parse((e as Error).message).message;

            switch (errorMsg) {
              case 'registration error': errorReg.textContent = this.translation.getString('regError'); break;
              case 'user exists': errorReg.textContent = this.translation.getString('regUserExistError'); break;
              case 'input validation error: invalid username length': errorReg.textContent = this.translation.getString('regUsernameLengthError'); break;
              case 'input validation error: invalid password length': errorReg.textContent = this.translation.getString('regPasswordLengthError'); break;
              default: errorReg.textContent = this.translation.getString('regError');
            }
          }
        }
      });

      inputName.addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
          authBtn.dispatchEvent(new Event('click'));
        }
      });

      inputPassword1.addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
          authBtn.dispatchEvent(new Event('click'));
        }
      });

      inputPassword2.addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
          authBtn.dispatchEvent(new Event('click'));
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
