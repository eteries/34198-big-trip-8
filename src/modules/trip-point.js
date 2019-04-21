import {prepareIconString} from './icons';
import {formatDuration, makeIdFromTitle} from './common/utils';
import {Component} from './common/component';
import {offers} from '../data';
import moment from 'moment';

export class TripPoint extends Component {
  constructor(tripPoint) {
    super();

    this._type = tripPoint.type;
    this._destination = tripPoint.destination;
    this._dateStart = tripPoint.dateStart;
    this._dateEnd = tripPoint.dateEnd;
    this._cost = tripPoint.cost;
    this._offers = tripPoint.selectedOffers;

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
    this._cost = data.cost;
  }

  get template() {
    return `
      <article class="trip-point">
        <i class="trip-icon">${prepareIconString(this._type)}</i>
        <h3 class="trip-point__title">${this._type} to ${this._destination}</h3>
        <p class="trip-point__schedule">
          <span class="trip-point__timetable">
            ${moment(this._dateStart).format(`HH:mm`)} - ${moment(this._dateEnd).format(`HH:mm`)}
            </span>
            <span class="trip-point__duration">${formatDuration(this._dateStart, this._dateEnd)}</span>
        </p>
        <p class="trip-point__price">&euro;&nbsp;${this._cost}</p>
        <ul class="trip-point__offers">
          ${this._offers
          .map((selectedOffer) => {
            const selected = offers.find((offer) => selectedOffer === makeIdFromTitle(offer.label));
            return `
            <li>
                <button class="trip-point__offer">${selected.label} +&euro;&nbsp;${selected.cost}</button>
            </li>`;
          })
          .join(``)}
        </ul>
      </article>`;
  }
}
