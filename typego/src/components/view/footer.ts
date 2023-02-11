import { createElement } from '../helper'; // createElement, removeChild

class Footer {
  // constructor() {
  // }

  private render(): void {
    const body: HTMLElement | null = document.querySelector('.body');

    if (body !== null) {
      let footer: HTMLElement | null = document.querySelector('.footer');

      if (footer === null) {
        footer = createElement('footer', 'footer');
        if (footer !== null) {
          body.append(footer);
        }
      }
    }
  }

  run(): void {
    this.render();
  }
}

export default Footer;
