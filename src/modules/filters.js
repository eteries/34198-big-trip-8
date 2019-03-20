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
    return this._element;
  }

  destroy() {
    this._element = null;
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
}
