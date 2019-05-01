import {Component} from './common/component';
import {api} from '../main';
import {TripPoints} from './trip-points';

export class Cost extends Component {
  constructor() {
    super();
    this._cost = 0;
    this._getCost();

    this._onUpdate = null;
  }

  _calculateCost(points) {
    return points.reduce((acc, point) => {
      return acc + point.cost + point.offers.
        reduce((sum, offer) => {
          return offer.accepted ? sum + offer.price : sum;
        }, 0);
    }, 0);
  }

  _getCost() {
    return api.getTripPoints()
      .then((points) => {
        this._cost = this._calculateCost(points);
        this.update();
      })
      .catch(() => {

      });
  }

  update() {
    this._onUpdate();
  }

  set onUpdate(fn) {
    this._onUpdate = fn;
  }

  get template() {
    return `
     <p class="trip__total">Total: <span class="trip__total-cost">&euro;&nbsp;${this._cost}</span></p>
      `;
  }
}
