import {prepareOfferString} from './offers';
import {createElement, formatDuration, formatTime, joinElements} from './common/utils';
import {prepareIconString} from './icons';
import {getTripPoint, getTripPoints} from '../data';
import {TripPoint} from './trip-point';
import {TripPointEditor} from './trip-point-editor';

export class TripPoints {
  constructor(tripPoints) {
    this._tripPoints = tripPoints;
    this._element = null;
  }

  create() {
    if (this._element) {
      this.destroy();
    }

    this._element = createElement(this.template);
    this._appendChildren();
    this.attachEventListeners();
    return this._element;
  }

  destroy() {
    this.detachEventListeners();
    this._element = null;
  }

  attachEventListeners() {
    //
  }

  detachEventListeners() {
    //
  }

  _appendChildren() {
    getTripPoints().forEach((item) => this._addPoint(item));
  }

  _addPoint(point) {
    const tripPointComponent = new TripPoint(point);
    // const tripPointEditorComponent = new TripPointEditor(task);

    const container = this._element.querySelector(`.trip-day__items`);
    container.appendChild(tripPointComponent.create());
  }

  get template() {
    return `
      <section class="trip-points">
        <section class="trip-day">
          <article class="trip-day__info">
            <span class="trip-day__caption">Day</span>
            <p class="trip-day__number">1</p>
            <h2 class="trip-day__title">Mar 18</h2>
          </article>
    
          <div class="trip-day__items">
          </div>
        </section>
      </section>
    `;
  }
}


/*
const prepareOneTripPointString = (tripPoint) => `
        <article class="trip-point">
          <i class="trip-icon">${prepareIconString(tripPoint.type)}</i>
          <h3 class="trip-point__title">${tripPoint.title}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">
              ${formatTime(tripPoint.dateStart)}&nbsp;&mdash;
              ${formatTime(tripPoint.dateStart + tripPoint.duration)}
            </span>
            <span class="trip-point__duration">${formatDuration(tripPoint.duration)}</span>
          </p>
          <p class="trip-point__price">&euro;&nbsp;${tripPoint.cost}</p>
          <ul class="trip-point__offers">
            ${joinElements(prepareOfferString, tripPoint.offers)}
          </ul>
        </article>
`;
*/

/*
export const mountTripPoints = (quantity) => {
  const tripPoints = [];
  const tripPointsQuantity = Number.isInteger(quantity) ? quantity : 0;

  for (let i = 0; i < tripPointsQuantity; i++) {
    tripPoints.push(prepareOneTripPointString(getTripPoint()));
  }

  const tripPointsString = tripPoints.join(``);

  const tripPointsElement = document.querySelector(`.trip-day__items`);
  tripPointsElement.innerHTML = ``;
  tripPointsElement.insertAdjacentHTML(`beforeEnd`, tripPointsString);
};*/
