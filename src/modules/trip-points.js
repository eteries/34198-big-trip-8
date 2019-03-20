import {createElement} from './common/utils';
import {getTripPoints} from '../data';
import {TripPoint} from './trip-point';
import {TripPointEditor} from './trip-point-editor';

export class TripPoints {
  constructor() {
    this._element = null;

    this._onFilter = () => {
      this._filterPoints();
    };
  }

  create() {
    if (this._element) {
      this.destroy();
    }

    this._element = createElement(this.template);
    this._attachEventListeners();
    this._appendChildren();
    return this._element;
  }

  destroy() {
    this._detachEventListeners();
    this._element.parentNode.removeChild(this._element);
    this._element = null;
  }

  _attachEventListeners() {
    document.querySelector(`.trip-filter`)
      .addEventListener(`filter`, this._onFilter);
  }

  _detachEventListeners() {
    document.querySelector(`.trip-filter`)
      .removeEventListener(`filter`, this._onFilter);
  }

  _appendChildren() {
    getTripPoints().forEach((item) => this._addPoint(item));
  }

  _addPoint(point) {
    const tripPointComponent = new TripPoint(point);
    const tripPointEditorComponent = new TripPointEditor(point);

    const container = this._element.querySelector(`.trip-day__items`);
    container.appendChild(tripPointComponent.create());

    tripPointComponent.onClick = () => {
      tripPointEditorComponent.create();
      container.replaceChild(tripPointEditorComponent.element, tripPointComponent.element);
      tripPointComponent.destroy();
    };

    tripPointEditorComponent.onSubmit = () => {
      tripPointComponent.create();
      container.replaceChild(tripPointComponent.element, tripPointEditorComponent.element);
      tripPointEditorComponent.destroy();
    };
  }

  _filterPoints() {
    this.destroy();
    document.querySelector(`.main`).appendChild(this.create());
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
    
          <div class="trip-day__items"></div>
        </section>
      </section>
    `;
  }
}
