import {formatTime, getRandomInteger, spliceRandom} from './common/utils';
import {prepareIconString} from './icons';
import {cities, collectPictures, getCityDescription, offers, tripPointTypes} from '../data';
import {Component} from './common/component';

import flatpickr from 'flatpickr';
import moment from 'moment';

export class TripPointEditor extends Component {
  constructor(tripPoint) {
    super();

    this._dateStart = tripPoint.dateStart;
    this._destination = tripPoint.destination;
    this._duration = tripPoint.duration;
    this._cost = tripPoint.cost;

    this._onSubmit = null;

    this._onSaveBtnClick = (event) => {
      event.preventDefault();

      const formData = new FormData(this._element.querySelector(`form`));
      debugger
      const newData = this._processForm(formData);

      if (typeof this._onSubmit === `function`) {
        this._onSubmit(newData);
      }

      this.update(newData);
    };
  }

  attachEventListeners() {
    this._element.querySelector(`.point__button--save`)
      .addEventListener(`click`, this._onSaveBtnClick);

    flatpickr(
        this._element.querySelector(`[name="time"]`),
        {
          altInput: true,
          enableTime: true,
          altFormat: `H:i`,
          defaultDate: this._dateStart || [new Date(), new Date()],
          mode: `range`,
          locale: {
            rangeSeparator: ` — `
          }
        }
    );/*
    flatpickr(
        this._element.querySelector(`.card__time`),
        {enableTime: true, noCalendar: true, altInput: true, altFormat: `H:i`, dateFormat: `H:i`, defaultDate: this._dueDate || new Date()}
    );*/
  }

  detachEventListeners() {
    this._element.querySelector(`.point__button--save`)
      .removeEventListener(`click`, this._onSaveBtnClick);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  /*_onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.removeListeners();
    this._partialUpdate();
    this.createListeners();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this.removeListeners();
    this._partialUpdate();
    this.createListeners();
  }*/

  _partialUpdate() {
    this._element.innerHTML = this.template;
    this.appendChildren();
  }

  _processForm(formData) {
    const entry = {
      type: ``,
      title: ``,
      destination: ``,
      dateStart: ``,
      duration: 0,
      offers: [],
      cost: 0,
      isFavorite: false
    };

    const taskEditMapper = TripPointEditor.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

  update(data) {
    debugger
    this._type = data.type;
    this._destination = data.destination;
    this._offers = data.offers;
    this._dateStart = data.dateStart;
    this._dateEnd = data.dateEnd;
    this._duration = data.duration;
    this._cost = data.cost;
  }

  static createMapper(target) {
    return {
      type: (value) => {
        target.type = value
      },
      destination: (value) => {
        target.destination = value;
      },
      offer: (value) => {
        value.trim() && target.offers.push(value)
      },
      price: (value) => {
        target.cost = value;
      },
      time: (value) => {
        target.dateStart = value.split(` — `);
      }
    };
  }

/*  time: (value) => {
    const newDate = moment(target.dueDate, `DD MMMM`);
    newDate.set(`hours`, (moment(value, `h:mm`).hours()));
    newDate.set(`minutes`, (moment(value, `h:mm`).minutes()));
    target.dueDate = newDate.valueOf();
  }*/

  get template() {
    return `
      <article class="point">
        <form action="" method="get">
          <header class="point__header">
            <label class="point__date">
              choose day
              <input class="point__input" type="text" placeholder="MAR 18" name="day">
            </label>
      
            <div class="travel-way">
              <label class="travel-way__label" for="travel-way__toggle">✈️</label>
      
              <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
      
              <div class="travel-way__select">    
                  ${tripPointTypes.map((group) => `
                    <div class="travel-way__select-group">
                      ${group.map((type) => `
                        <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${type}" name="type" value="${type}">
                        <label class="travel-way__select-label" for="travel-way-taxi">${prepareIconString(type)} ${type}</label>
                      `).join(``)}
                    </div>
                  `).join(``)}
                </div>
              </div>
            </div>
      
            <div class="point__destination-wrap" style="overflow-x: hidden">
              <label class="point__destination-label" for="destination">Flight to</label>
              <input class="point__destination-input" list="destination-select" id="destination" value="Chamonix" name="destination">
              <datalist id="destination-select">
                <option value="airport"></option>
                <option value="Geneva"></option>
                <option value="Chamonix"></option>
                <option value="hotel"></option>
              </datalist>
            </div>
      
            <label class="point__time">
              choose time
              <input class="point__input" 
                      type="text" 
                      value="${formatTime(this._dateStart)}&nbsp;&mdash;${formatTime(this._dateStart + this._duration)}"
                      name="time"
                      placeholder="00:00 — 24:00">
            </label>
      
            <label class="point__price">
              write price
              <span class="point__price-currency">€</span>
              <input class="point__input" type="text" value="${this._cost}" name="price">
            </label>
      
            <div class="point__buttons">
              <button class="point__button point__button--save" type="submit">Save</button>
              <button class="point__button" type="reset">Delete</button>
            </div>
      
            <div class="paint__favorite-wrap">
              <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
              <label class="point__favorite" for="favorite">favorite</label>
            </div>
          </header>
      
          <section class="point__details">
            <section class="point__offers">
              <h3 class="point__details-title">offers</h3>
      
              <div class="point__offers-wrap">
                <input class="point__offers-input visually-hidden" type="checkbox" id="add-luggage" name="offer" value="add-luggage">
                <label for="add-luggage" class="point__offers-label">
                  <span class="point__offer-service">Add luggage</span> + €<span class="point__offer-price">30</span>
                </label>
      
                <input class="point__offers-input visually-hidden" type="checkbox" id="switch-to-comfort-class" name="offer" value="switch-to-comfort-class">
                <label for="switch-to-comfort-class" class="point__offers-label">
                  <span class="point__offer-service">Switch to comfort class</span> + €<span class="point__offer-price">100</span>
                </label>
      
                <input class="point__offers-input visually-hidden" type="checkbox" id="add-meal" name="offer" value="add-meal">
                <label for="add-meal" class="point__offers-label">
                  <span class="point__offer-service">Add meal </span> + €<span class="point__offer-price">15</span>
                </label>
      
                <input class="point__offers-input visually-hidden" type="checkbox" id="choose-seats" name="offer" value="choose-seats">
                <label for="choose-seats" class="point__offers-label">
                  <span class="point__offer-service">Choose seats</span> + €<span class="point__offer-price">5</span>
                </label>
              </div>
      
            </section>
            <section class="point__destination">
              <h3 class="point__details-title">Destination</h3>
              <p class="point__destination-text">${getCityDescription(this._destination)}</p>
              <div class="point__destination-images">
                ${collectPictures().map((src) => `
                  <img src="${src}" alt="picture from place" class="point__destination-image">
                `).join(``)}
              </div>
            </section>
            <input type="hidden" class="point__total-price" name="total-price" value="">
          </section>
        </form>
      </article>

`;
  }
}
