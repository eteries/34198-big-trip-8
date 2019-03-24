import {Component} from './common/component';

const columns = [`event`, `time`, `price`];

export class Sorting extends Component {
  constructor() {
    super();
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
