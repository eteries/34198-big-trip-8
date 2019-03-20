import {prepareIconString} from './icons';
import {TripPoints} from './trip-points';
import {createElement} from './common/utils';

export class Trip {
  constructor(trip) {
    this._title = trip.title;
    this._dates = trip.dates;
    this._cost = trip.cost;

    this._element = null;
  }

  create() {
    if (this._element) {
      this.destroy();
    }

    this._element = createElement(this.template);
    this._appendChildren();
    return this._element;
  }

  destroy() {
    this._element = null;
  }

  _appendChildren() {
    const tripPoints = new TripPoints();
    document.querySelector(`.main`).appendChild(tripPoints.create());
  }

  get element() {
    return this._element;
  }

  get template() {
    return `
    <div class="trip">
      <div class="trip__schedule">
         <i class="trip-icon">${prepareIconString(`trip`)}</i>
         <h1 class="trip__points">${this._title}</h1>
         <p class="trip__dates">${this._dates}</p>
      </div>
      <p class="trip__total">Total: <span class="trip__total-cost">&euro;&nbsp;${this._cost}</span></p>
    </div>
    `;
  }
}
