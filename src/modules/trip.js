import {prepareIconString} from './icons';
import {TripPoints} from './trip-points';
import {Component} from './common/component';
import {api} from '../main';
import {Cost} from './cost';

export class Trip extends Component {
  constructor(trip) {
    super();

    this._title = trip.title;
    this._dates = trip.dates;

    this._appendPoints();
  }

  _appendCost(points) {
    let cost = new Cost(points);
    cost.create();
    this._element.appendChild(cost.element);

    cost.onUpdate = (newPoints) => {
      const newCost = new Cost(newPoints);
      newCost.create();
      this._element.replaceChild(newCost.element, cost.element);
      cost = newCost;
    };

    return cost;
  }

  _appendPoints() {
    const targetElement = document.querySelector(`.main`);

    const loadingMessage = document.createElement(`p`);
    loadingMessage.innerText = `Loading`;
    loadingMessage.style.textAlign = `center`;
    loadingMessage.style.color = `navy`;
    loadingMessage.style.marginTop = `30px`;

    const errorMessage = document.createElement(`p`);
    errorMessage.innerText = `Something went wrong while loading your route info. Check your connection or try again later`;
    errorMessage.style.textAlign = `center`;
    errorMessage.style.color = `red`;
    errorMessage.style.marginTop = `30px`;

    targetElement.appendChild(loadingMessage);
    return api.getTripPoints()
      .then((points) => {
        const cost = this._appendCost(points);
        const tripPoints = new TripPoints(points, cost);
        document.querySelector(`.main`).appendChild(tripPoints.create());
        targetElement.removeChild(loadingMessage);
      })
      .catch(() => {
        targetElement.removeChild(loadingMessage);
        targetElement.appendChild(errorMessage);
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
    </div>
    `;
  }
}
