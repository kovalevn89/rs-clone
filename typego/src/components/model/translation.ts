import { Language } from '../types/enums';
import { ITranslation } from '../types';

const data: ITranslation = {
  homeLink: {
    en: 'Home',
    ru: 'Главная',
  },
  lessonsLink: {
    en: 'Lessons',
    ru: 'Уроки',
  },
};

class Translation {
  private static instance: Translation;
  private currentLang;
  private data: ITranslation;
  private observer: Array<() => void>;

  constructor(lang: Language) {
    this.currentLang = lang;
    this.data = data;
    this.observer = [];

    // Singleton
    if (Translation.instance) {
      return Translation.instance;
    }

    Translation.instance = this;
  }

  setLang(lang: Language): void {
    this.currentLang = lang;

    this.observer.forEach((callback: () => void) => {
      callback();
    });
  }

  getLang(): Language {
    return this.currentLang;
  }

  getString(tag: string) {
    return this.currentLang === Language.RU ? this.data[tag].ru : this.data[tag].en;
  }

  regObserver(callback: () => void) {
    this.observer.push(callback);
  }
}

export default Translation;
