import { Themes, Language } from '../types/enums';
import AppConfig from '../model/appconfig';
import Translation from '../model/translation';

class PageView {
  config: AppConfig;
  currentLang: Language;
  currentTheme: Themes;
  translation: Translation;

  constructor() {
    this.config = new AppConfig();
    this.currentLang = this.config.getLang();
    this.currentTheme = this.config.getTheme();
    this.translation = new Translation();
  }
}

export default PageView;
