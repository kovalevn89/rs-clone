import { Themes, Language } from '../types/enums';
import AppConfig from '../model/appconfig';
import Translation from '../model/translation';
import TrainingState from '../model/trainingState';
import Api from '../controller/api';

class PageView {
  config: AppConfig;
  currentLang: Language;
  currentTheme: Themes;
  translation: Translation;
  state: TrainingState;
  api: Api;

  constructor() {
    this.config = new AppConfig();
    this.currentLang = this.config.getLang();
    this.currentTheme = this.config.getTheme();
    this.translation = new Translation();
    this.state = new TrainingState();
    this.api = new Api();
  }
}

export default PageView;
