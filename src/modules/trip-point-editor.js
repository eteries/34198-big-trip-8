import {createElement, formatDuration, formatTime} from './common/utils';
import {prepareIconString} from './icons';
import {collectPictures, getCityDescription, tripPointTypes} from '../data';

export class TripPointEditor {
  constructor(tripPoint) {
    this._type = tripPoint.type;
    this._dateStart = tripPoint.dateStart;
    this._title = tripPoint.title;
    this._duration = tripPoint.duration;
    this._cost = tripPoint.cost;
    this._offers = tripPoint.offers;
    this._groupedTypes = [[], []];

    this._onClick = null;

    this._element = null;
  }

  create() {
    if (this._element) {
      this.destroy();
    }
    this._groupTripTypes(tripPointTypes);
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

  _groupTripTypes(types) {
    return types.reduce((acc, type) =>
      (type === `sightseeing` || type === `checkIn`) ?
        this._groupedTypes[1].push(type) :
        this._groupedTypes[0].push(type),
    this._groupedTypes);
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  get element() {
    return this._element;
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
              <label class="travel-way__label" for="travel-way__toggle">✈️</label>
      
              <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
      
              <div class="travel-way__select">    
                  ${this._groupedTypes.map((group) => `
                    <div class="travel-way__select-group">
                      ${group.map((type) => `
                        <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${type}" name="travel-way" value="${type}">
                        <label class="travel-way__select-label" for="travel-way-taxi">${prepareIconString(type)} ${type}</label>
                      `).join(``)}
                    </div>
                  `).join(``)}
<!--
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travel-way" value="taxi">
                  <label class="travel-way__select-label" for="travel-way-taxi">🚕 taxi</label>
      
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travel-way" value="bus">
                  <label class="travel-way__select-label" for="travel-way-bus">🚌 bus</label>
      
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travel-way" value="train">
                  <label class="travel-way__select-label" for="travel-way-train">🚂 train</label>
      
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travel-way" value="train" checked>
                  <label class="travel-way__select-label" for="travel-way-flight">✈️ flight</label>
-->
      
                <!--<div class="travel-way__select-group">
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check-in">
                  <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>
      
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sight-seeing">
                  <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>-->
                </div>
              </div>
            </div>
      
            <div class="point__destination-wrap">
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
              <input class="point__input" type="text" value="00:00 — 00:00" name="time" placeholder="00:00 — 00:00">
            </label>
      
            <label class="point__price">
              write price
              <span class="point__price-currency">€</span>
              <input class="point__input" type="text" value="160" name="price">
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
              <p class="point__destination-text">${getCityDescription(this._title)}</p>
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
