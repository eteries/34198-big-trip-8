import {getTripPoints} from '../data';
import {TripPoint} from './trip-point';
import {TripPointEditor} from './trip-point-editor';
import {Component} from './common/component';

export class TripPoints extends Component {
  constructor() {
    super();

    this._onFilter = () => {
      this._filterPoints();
    };
  }

  attachEventListeners() {
    document.querySelector(`.trip-filter`)
      .addEventListener(`change`, this._onFilter);
  }

  detachEventListeners() {
    document.querySelector(`.trip-filter`)
      .removeEventListener(`change`, this._onFilter);
  }

  appendChildren() {
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

    tripPointEditorComponent.onSubmit = (newTripPoint) => {
      point.type = newTripPoint.type;
      point.destination = newTripPoint.destination;
      point.offers = newTripPoint.offers;
      point.dateStart = newTripPoint.dateStart;
      point.cost = newTripPoint.cost;

      tripPointComponent.update(point);

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
