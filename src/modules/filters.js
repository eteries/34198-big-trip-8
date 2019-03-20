import {createElement} from './common/utils';

const filters = [`everything`, `future`, `past`];

export class Filters {
  constructor() {
    this._element = null;
  }

  create() {
    if (this._element) {
      this.destroy();
    }

    this._element = createElement(this.template);
    this.attachEventListeners();
    return this._element;
  }

  destroy() {
    this._element = null;
    this.detachEventListeners();
  }

  get template() {
    return `
    <div class="trip-filter">
      ${filters
        .map((filter, index) => `
          <input type="radio" 
              id="filter-${filter}"
              name="filter"
              value="${filter}"
         ${index === 0 ? `checked` : ``}
        />
        <label class="trip-filter__item"
               for="filter-${filter}">
            ${filter}
        </label>`)
        .join(``)}
    </div>
      `;
  }

  attachEventListeners() {
    this._element.addEventListener(`click`, this._emitFilterEvent);
  }

  detachEventListeners() {
    this._element.removeEventListener(`click`, this._emitFilterEvent);
  }

  _emitFilterEvent(event) {
    if (!event.target ||
      event.target.tagName !== `LABEL` ||
      event.target.control.checked) {
      return;
    }
    this._element.dispatchEvent(new Event(`filter`));
  }
}
