import {prepareIconString} from './icons';
import {collectPictures, tripPointTypes} from '../data';
import {Component} from './common/component';
import {api} from '../main';

import flatpickr from 'flatpickr';
import moment from 'moment';

export class TripPointEditor extends Component {
  constructor(tripPoint) {
    super();

    this._dateStart = tripPoint.dateStart;
    this._dateEnd = tripPoint.dateEnd;
    this._destination = tripPoint.destination;
    this._cost = tripPoint.cost;
    this._type = tripPoint.type;
    this._offers = tripPoint.offers;
    this._isFavorite = tripPoint.isFavorite;

    this.datepicker = null;

    this._onSubmit = null;
    this._onDelete = null;

    api.getAvailableOffers()
      .then((allOffers) => {
        this._offers = allOffers.find((offers) => offers.type === this._type)
          .offers
          .map((offer) => ({
            title: offer.name,
            price: offer.price,
            accepted: Boolean(this._offers.find((current) => {
              return (current.title === offer.name) && current.accepted
            }))
          }));
      });

    api.getAvailableDestinations()
      .then((destinations) => {
        this._destinationString = destinations
          .map((destination) => `
            <option value="${destination.name}"></option>
          `)
          .join(``);
      });

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

    this._onSelectOffer = this._onSelectOffer.bind(this);
  }

  attachEventListeners() {
    this._element.querySelector(`.point__button--save`)
      .addEventListener(`click`, this._onSaveBtnClick);
    this._element.querySelector(`.point__button--delete`)
      .addEventListener(`click`, this._onDeleteBtnClick);

    this.datepicker = flatpickr(
        this._element.querySelector(`[name="dateStart"]`),
        {
          altInput: true,
          enableTime: true,
          altFormat: `H:i`,
          defaultDate: this._dateStart
        }
    );

    this.datepicker = flatpickr(
        this._element.querySelector(`[name="dateEnd"]`),
        {
          altInput: true,
          enableTime: true,
          altFormat: `H:i`,
          defaultDate: this._dateEnd
        }
    );

    this._element.querySelector(`.travel-way__select`)
      .addEventListener(`change`, this._onClickInsideMenu);

    this._element.querySelector(`.point__offers-wrap`)
      .addEventListener(`change`, this._onSelectOffer);
  }

  detachEventListeners() {
    this._element.querySelector(`.point__button--save`)
      .removeEventListener(`click`, this._onSaveBtnClick);

    this._element.querySelector(`.point__button--delete`)
      .removeEventListener(`click`, this._onDeleteBtnClick);

    this._element.querySelector(`.travel-way__select`)
      .removeEventListener(`change`, this._onClickInsideMenu);

    this._element.querySelector(`.point__offers-wrap`)
      .removeEventListener(`change`, this._onSelectOffer);

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

  _onSelectOffer(event) {
    const selected = this._offers.find((offer) => offer.title === event.target.value);
    if (selected) {
      selected.accepted = !selected.accepted;
    }
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
      dateEnd: ``,
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

    entry.offers = this._offers;

    return entry;
  }

  update(data) {
    this._type = data.type;
    this._destination = data.destination;
    this._offers = data.offers;
    this._dateStart = data.dateStart;
    this._dateEnd = data.dateEnd;
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
      price: (value) => {
        target.cost = value;
      },
      dateStart: (value) => {
        target.dateStart = moment(value).valueOf();
      },
      dateEnd: (value) => {
        target.dateEnd = moment(value).valueOf();
      },
      favorite: (value) => {
        target.isFavorite = value;
      }
    };
  }

  appendChildren() {
    super.appendChildren();
    const select = this._element.querySelector(`#destination-select`);
    if (select) {
      select.insertAdjacentHTML(`beforeEnd`, this._destinationString);
    }
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
              <input class="point__destination-input" list="destination-select" id="destination" value="${this._destination.name}" name="destination">
              <datalist id="destination-select">
                  
              </datalist>
            </div>
            
            <div class="point__time">
              choose time
              <input class="point__input" type="text" value="${this._dateStart}" name="dateStart" placeholder="19:00">
              <input class="point__input" type="text" value="${this._dateEnd}" name="dateEnd" placeholder="21:00">
            </div>
      
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
                ${this._offers.map((offer, index) => `
                  <input class="point__offers-input visually-hidden" type="checkbox" id="offer-${index}" name="offer" value="${offer.title}" ${ offer.accepted ? `checked` : ``}>
                  <label for="offer-${index}" class="point__offers-label">
                    <span class="point__offer-service">${offer.title}</span> + €<span class="point__offer-price">${offer.price}</span>
                  </label>
                `).join(``)}
              </div>
      
            </section>
            <section class="point__destination">
              <h3 class="point__details-title">Destination</h3>
              <p class="point__destination-text">${this._destination.description}</p>
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
