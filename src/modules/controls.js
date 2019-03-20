import {createElement} from './common/utils';

export class Controls {
  constructor() {
    this._element = null;
  }

  create() {
    if (this._element) {
      this.destroy();
    }

    this._element = createElement(this.template);
    return this._element;
  }

  destroy() {
    this._element = null;
  }

  get element() {
    return this._element;
  }

  get template() {
    return `
      <section class="trip-controls">
        <nav class="trip-controls__menus view-switch">
          <a href="#table" class="view-switch__item view-switch__item--active">Table</a>
          <a href="#stats" class="view-switch__item">Stats</a>
        </nav>
  
        <button class="trip-controls__new-event new-event">+ New Event</button>
      </section>
    `;
  }
}
