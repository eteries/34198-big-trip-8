import {Component} from './common/component';

const filters = [`everything`, `future`, `past`];

export class Filters extends Component {
  constructor() {
    super();
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
