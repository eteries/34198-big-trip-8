import {getTripPoints} from '../data';
import {TripPoint} from './trip-point';
import {TripPointEditor} from './trip-point-editor';
import {Component} from './common/component';

export class TripPoints extends Component {
  constructor() {
    super();

    this.tripPointsAll = getTripPoints();
    this.tripPointsVisible = this.tripPointsAll;

    this._onFilter = (event) => {
      this._filterPoints(event.target.id);
      const container = this._element.querySelector(`.trip-day__items`);
      container.innerHTML = ``;
      this.appendChildren();
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
    this.tripPointsVisible.forEach((item, index) => this._addPoint(item, index));
  }

  _addPoint(point, index) {
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
      point.offers = newTripPoint.selectedOffers;
      point.dateStart = newTripPoint.dateStart;
      point.dateEnd = newTripPoint.dateEnd;
      point.cost = newTripPoint.cost;

      tripPointComponent.update(point);

      tripPointComponent.create();
      container.replaceChild(tripPointComponent.element, tripPointEditorComponent.element);
      tripPointEditorComponent.destroy();
    };

    tripPointEditorComponent.onDelete = () => {
      this.tripPointsAll[index] = null;
      container.removeChild(tripPointEditorComponent.element);
      tripPointEditorComponent.destroy();
    };
  }

  _filterPoints(filterName) {
    switch (filterName) {
      case `filter-everything`:
        this.tripPointsVisible = this.tripPointsAll;
        break;

      case `filter-future`:
        this.tripPointsVisible = this.tripPointsAll
          .filter((point) => point.dateStart > Date.now());
        break;

      case `filter-past`:
        this.tripPointsVisible = this.tripPointsAll
          .filter((point) => point.dateEnd < Date.now());
        break;
    }
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
