import {prepareIconString} from './icons';
import {TripPoints} from './trip-points';
import {Component} from './common/component';
import {api} from '../main';

export class Trip extends Component {
  constructor(trip) {
    super();

    this._title = trip.title;
    this._dates = trip.dates;
    this._cost = trip.cost;

    api.getTripPoints()
      .then((points) => {
        const tripPoints = new TripPoints(points);
        document.querySelector(`.main`).appendChild(tripPoints.create());
      });
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
