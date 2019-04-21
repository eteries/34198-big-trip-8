import {prepareIconString} from './icons';
import {makeIdFromTitle as makeId} from './common/utils';
import {cities, collectPictures, getCityDescription, offers, tripPointTypes} from '../data';
import {Component} from './common/component';

import flatpickr from 'flatpickr';
import moment from 'moment';

export class TripPointEditor extends Component {
  constructor(tripPoint) {
    super();

    this._dateStart = tripPoint.dateStart;
    this._destination = tripPoint.destination;
    this._cost = tripPoint.cost;
    this._type = tripPoint.type;
    this._isFavorite = tripPoint.isFavorite;

    this.datepicker = null;

    this._onSubmit = null;
    this._onDelete = null;

    this._onClickInsideMenu = this._onClickInsideMenu.bind(this);

    this._onSaveBtnClick = (event) => {
      event.preventDefault();

      const formData = new FormData(this._element.querySelector(`form`));
      const newData = this._processForm(formData);

      if (typeof this._onSubmit === `function`) {
        this._onSubmit(newData);
      }

      this.update(newData);
    };

    this._onDeleteBtnClick = (event) => {
      event.preventDefault();

      if (typeof this._onDelete === `function`) {
        this._onDelete();
      }
    };
  }

  attachEventListeners() {
    this._element.querySelector(`.point__button--save`)
      .addEventListener(`click`, this._onSaveBtnClick);
    this._element.querySelector(`.point__button--delete`)
      .addEventListener(`click`, this._onDeleteBtnClick);

    this.datepicker = flatpickr(
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
    );
    this._element.querySelector(`.travel-way__select`)
      .addEventListener(`change`, this._onClickInsideMenu);
  }

  detachEventListeners() {
    this._element.querySelector(`.point__button--save`)
      .removeEventListener(`click`, this._onSaveBtnClick);

    this._element.querySelector(`.point__button--delete`)
      .removeEventListener(`click`, this._onDeleteBtnClick);

    this.datepicker.destroy();
  }

  _onClickInsideMenu() {
    this._type = this._element.querySelector(`[name=type]:checked`).value;
    this._element.querySelector(`.travel-way__toggle`).checked = false;
    this.detachEventListeners();
    this._partialUpdate();
    this.attachEventListeners();
    [...this._element.querySelectorAll(`[name=type]`)].find((elem) => elem.value === this._type).checked = true;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
    this.appendChildren();
  }

  _processForm(formData) {
    const entry = {
      type: ``,
      destination: ``,
      dateStart: ``,
      duration: 0,
      selectedOffers: [],
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
    this._type = data.type;
    this._destination = data.destination;
    this._offers = data.selectedOffers;
    this._dateStart = data.dateStart;
    this._cost = data.cost;
    this._isFavorite = data.isFavorite;
  }

  static createMapper(target) {
    return {
      type: (value) => {
        target.type = value;
      },
      destination: (value) => {
        target.destination = value;
      },
      offer: (value) => {
        const selectedOffer = offers.find((offer) => makeId(offer.label) === value);
        if (selectedOffer) {
          target.selectedOffers.push(value);
        }
      },
      price: (value) => {
        target.cost = value;
      },
      time: (value) => {
        const dates = value.split(` — `);
        target.dateStart = [moment(dates[0]).valueOf(), moment(dates[1]).valueOf()];
      },
      favorite: (value) => {
        target.isFavorite = value;
      }
    };
  }

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
              <label class="travel-way__label" for="travel-way__toggle">${prepareIconString(this._type)}</label>
      
              <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
      
              <div class="travel-way__select">    
                  ${tripPointTypes.map((group) => `
                    <div class="travel-way__select-group">
                      ${group.map((type) => `
                        <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${type}" name="type" value="${type}" ${type === this._type ? `checked` : ``}>
                        <label class="travel-way__select-label" for="travel-way-${type}">${prepareIconString(type)} ${type}</label>
                      `).join(``)}
                    </div>
                  `).join(``)}
                </div>
              </div>
            </div>
      
            <div class="point__destination-wrap">
              <label class="point__destination-label" for="destination">${this._type} to </label>
              <input class="point__destination-input" list="destination-select" id="destination" value="${this._destination}" name="destination">
              <datalist id="destination-select">
                  ${cities.map((city) => `
                    <option value="${city}"></option>
                  `)}
              </datalist>
            </div>
      
            <label class="point__time">
              choose time
              <input class="point__input" 
                      type="text" 
                      value="${this._dateStart}"
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
              <button class="point__button point__button--delete" type="reset">Delete</button>
            </div>
      
            <div class="paint__favorite-wrap">
              <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite ? `checked` : ``}>
              <label class="point__favorite" for="favorite">favorite</label>
            </div>
          </header>
      
          <section class="point__details">
            <section class="point__offers">
              <h3 class="point__details-title">offers</h3>
      
              <div class="point__offers-wrap">              
                ${offers.map((offer) => `
                  <input class="point__offers-input visually-hidden" type="checkbox" id="${makeId(offer.label)}" name="offer" value="${makeId(offer.label)}" ${this._offers && this._offers.includes(makeId(offer.label)) ? `checked` : ``}>
                  <label for="${makeId(offer.label)}" class="point__offers-label">
                    <span class="point__offer-service">${offer.label}</span> + €<span class="point__offer-price">${offer.cost}</span>
                  </label>
                `).join(``)}
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
