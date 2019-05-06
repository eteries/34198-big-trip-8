import {Component} from './common/component';

export class Cost extends Component {
  constructor(points) {
    super();
    this._cost = Cost.calculateCost(points);

    this._onUpdate = null;
  }

  static calculateCost(points) {
    return points.reduce((acc, point) => {
      if (!point) {
        return acc;
      }
      return acc + point.cost + point.offers.
        reduce((sum, offer) => {
          return offer.accepted ? sum + offer.price : sum;
        }, 0);
    }, 0);
  }

  update(points) {
    this._onUpdate(points);
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
