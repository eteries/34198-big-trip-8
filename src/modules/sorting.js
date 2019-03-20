import {createElement} from './common/utils';

const columns = [`event`, `time`, `price`];

export class Sorting {
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
      <form class="trip-sorting">
        ${columns
          .map((label) => `
            <input type="radio" name="trip-sorting" id="sorting-${label}" value="${label}" checked>
            <label class="trip-sorting__item trip-sorting__item--${label}" for="sorting-${label}">${label}</label>
            `)
          .join(``)}    
        <span class="trip-sorting__item trip-sorting__item--offers">Offers</span>
      </form>
    `;
  }
}
