import { Language } from '../types/enums';
import { ITranslation } from '../types';

const data: ITranslation = {
  // HEADER
  headerManu1: {
    en: 'testing',
    ru: 'тестирование',
  },
  headerManu2: {
    en: 'education',
    ru: 'обучение',
  },
  headerManu3: {
    en: 'training',
    ru: 'тренажер',
  },
  headerManu4: {
    en: 'games',
    ru: 'игры',
  },
  loginButton: {
    en: 'login',
    ru: 'войти',
  },

  // MAIN PAGE
  typigFasterCaption: {
    en: 'Type faster',
    ru: 'печатай быстрее',
  },
  typigFasterDescription: {
    en: 'Learn to type faster with <span>TypeGo</span> typing tutor. Take our typing lessons for free.',
    ru: 'Научись быстро печатать с клавиатурным тренажером <span>TypeGo</span>. Уроки слепой печати помогут тебе использовать все 10 пальцев.',
  },
  typigFasterButton: {
    en: 'Start typing now',
    ru: 'Начать печатать',
  },
  proposaleCaption1: {
    en: 'Learn Touch Typing',
    ru: 'Научись печатать вслепую',
  },
  proposaleText1: {
    en: 'Speed up your learning progress and develop valuable keyboarding skills!',
    ru: 'Ускорь прогресс обучения слепой печати и развивай ценные навыки набора текста.',
  },
  proposaleButton1: {
    en: 'Go to training',
    ru: 'Перейти к обучению',
  },
  proposaleCaption2: {
    en: 'Free Typing Test',
    ru: 'Пройди тест скорости печати',
  },
  proposaleText2: {
    en: 'Take an online typing test to find out your typing speed and impress friends or employers with your personal typing certificate.',
    ru: 'Узнай свою скорость печати и удиви приятелей или руководство полученным сертификатом.',
  },
  proposaleButton2: {
    en: 'Go to the speed test',
    ru: 'Перейти к тесту скоростной печати',
  },
  proposaleCaption3: {
    en: 'Learn by playing',
    ru: 'Учись играя',
  },
  proposaleText3: {
    en: 'Each game focuses on developing your typing technique. Play, follow your progress, get closer to your goal!',
    ru: 'Каждая игра направлена на развитие техники вашей печати. Играйте, следите за прогрессом, становитесь ближе к своей цели!',
  },
  proposaleButton3: {
    en: 'Go to games',
    ru: 'Перейти к играм',
  },
  registrationCaption: {
    en: 'Touch typing - easy',
    ru: 'Печатать вслепую - легко',
  },
  registrationText: {
    en: 'Register right now, take training and monitor your progress',
    ru: 'Регистрируйся прямо сейчас, проходи обучение и следи за своим прогрессом',
  },
  registrationButton: {
    en: 'Create account',
    ru: 'Создать аккаунт',
  },

  // FOOTER
  footerAboutButton: {
    en: 'About',
    ru: 'О нас',
  },
  footerCredits: {
    en: '© 2023 TypeGo - Comfortable and simple keyboard trainer',
    ru: '© 2023 TypeGo - Удобный и простой клавиатурный тренажер',
  },
  footerDescription: {
    en: 'Developed as part of the RSClone challenge for RSSchool',
    ru: 'Разработано в рамках задания RSClone для RSSchool',
  },
};

class Translation {
  private static instance: Translation;
  private currentLang;
  private data: ITranslation;
  private observer: Array<() => void>;
  private observerPermanent: Array<() => void>;

  constructor() {
    this.data = data;
    this.observer = [];
    this.observerPermanent = [];

    // Singleton
    if (Translation.instance) {
      return Translation.instance;
    }

    Translation.instance = this;

    this.currentLang = Language.RU;
  }

  setLang(lang: Language): void {
    this.currentLang = lang;

    this.observer.forEach((callback: () => void) => {
      callback();
    });

    this.observerPermanent.forEach((callback: () => void) => {
      callback();
    });
  }

  // getLang(): Language {
  //   return this.currentLang;
  // }

  getString(tag: string) {
    return this.currentLang === Language.RU ? this.data[tag].ru : this.data[tag].en;
  }

  cleanObserver(): void {
    this.observer = [];
  }

  regObserver(callback: () => void) {
    this.observer.push(callback);
  }

  // для страниц которые на протяжении всех жизни приложения не будут перерисовываться
  regObserverPermanent(callback: () => void) {
    this.observerPermanent.push(callback);
  }
}

export default Translation;
