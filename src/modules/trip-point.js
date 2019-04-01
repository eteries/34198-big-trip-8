import {prepareIconString} from './icons';
import {formatDuration, formatTime} from './common/utils';
import {Component} from './common/component';

export class TripPoint extends Component {
  constructor(tripPoint) {
    super();

    this._type = tripPoint.type;
    this._title = tripPoint.title;
    this._dateStart = tripPoint.dateStart;
    this._duration = tripPoint.duration;
    this._cost = tripPoint.cost;
    this._offers = tripPoint.offers;

    this._onClick = null;

    this._onElementClick = () => {
      if (typeof this._onClick === `function`) {
        this._onClick();
      }
    };
  }

  attachEventListeners() {
    this._element.addEventListener(`click`, this._onElementClick);
  }

  detachEventListeners() {
    this._element.removeEventListener(`click`, this._onElementClick);
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  update(data) {
    this._type = data.type;
    this._destination = data.destination;
    this._offers = data.offers;
    this._dateStart = data.dateStart;
    this._dateEnd = data.dateEnd;
    this._duration = data.duration;
    this._cost = data.cost;
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
          ${this._offers
          .map((offer) => `
            <li>
                <button class="trip-point__offer">${offer.label} +&euro;&nbsp;${offer.cost}</button>
            </li>`)
          .join(``)}
        </ul>
      </article>`;
  }
}
