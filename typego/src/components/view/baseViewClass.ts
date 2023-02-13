import { Themes, Language } from '../types/enums';
import AppConfig from '../model/appconfig';

class PageView {
  config: AppConfig;
  currentLang: Language;
  currentTheme: Themes;

  constructor() {
    this.config = new AppConfig();
    this.currentLang = this.config.getLang();
    this.currentTheme = this.config.getTheme();
  }
}

export default PageView;
