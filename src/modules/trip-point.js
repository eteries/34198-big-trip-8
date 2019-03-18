import {prepareIconString} from './icons';
import {createElement, formatDuration, formatTime, joinElements} from './common/utils';
import {prepareOfferString} from './offers';

export class TripPoint {
  constructor(tripPoint) {
    this._type = tripPoint.type;
    this._title = tripPoint.title;
    this._dateStart = tripPoint.type;
    this._duration = tripPoint.duration;
    this._cost = tripPoint.cost;
    this._offers = tripPoint.offers;

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
    //
  }

  get template() {
    return `
      <article class="trip-point">
        <i class="trip-icon">${prepareIconString(this._type)}</i>
        <h3 class="trip-point__title">${this._title}</h3>
        <p class="trip-point__schedule">
          <span class="trip-point__timetable">
            ${formatTime(this._dateStart)}&nbsp;&mdash; 
            ${formatTime(this._dateStart + this._duration)}
          </span>
          <span class="trip-point__duration">${formatDuration(this._duration)}</span>
        </p>
        <p class="trip-point__price">&euro;&nbsp;${this._cost}</p>
        <ul class="trip-point__offers">
          ${joinElements(prepareOfferString, this._offers)}
        </ul>
      </article>`;
  }
}
