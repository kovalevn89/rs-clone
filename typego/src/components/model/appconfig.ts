import { Themes, Language } from '../types/enums';

class AppConfig {
  private static instance: AppConfig;
  private appTheme: Themes;
  private appLang: Language;

  constructor() {
    this.appTheme = Themes.Light;
    this.appLang = Language.RU;

    // Singleton
    if (AppConfig.instance) {
      return AppConfig.instance;
    }

    AppConfig.instance = this;

    // read with first init
    this.loadLocalStorage();
  }

  private loadLocalStorage(): void {
    const tempTheme = localStorage.getItem('appTheme');
    if (tempTheme !== null) {
      switch (tempTheme) {
        case '1': this.appTheme = Themes.Light; break;
        case '2': this.appTheme = Themes.Dark; break;
        default: this.appTheme = Themes.Light;
      }
    }

    const tempLang = localStorage.getItem('appLang');
    if (tempLang !== null) {
      switch (tempLang) {
        case '1': this.appLang = Language.RU; break;
        case '2': this.appLang = Language.EN; break;
        default: this.appLang = Language.RU;
      }
    }
  }

  private saveLocalStorage(): void {
    localStorage.setItem('appTheme', `${this.appTheme}`);
    localStorage.setItem('appLang', `${this.appLang}`);
  }

  public setLang(lang: Language): void {
    this.appLang = lang;
    this.saveLocalStorage();
  }

  public getLang(): Language {
    return this.appLang;
  }

  public setTheme(theme: Themes): void {
    this.appTheme = theme;
    this.saveLocalStorage();
  }

  public getTheme(): Themes {
    return this.appTheme;
  }

  run(): void {
  }
}

export default AppConfig;
