import { Language } from '../types/enums';
import { ITranslation } from '../types';
import data from './translation-data';

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

  getLang(): Language {
    if (this.currentLang) return this.currentLang;

    return Language.RU;
  }

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

  translateField(element: HTMLElement, content: string): void {
    element.textContent = this.getString(content);
    this.regObserver(() => {
      element.textContent = this.getString(content);
    });
  }
}

export default Translation;
