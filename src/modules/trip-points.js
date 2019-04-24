import {TripPoint} from './trip-point';
import {TripPointEditor} from './trip-point-editor';
import {Component} from './common/component';
import {api} from '../main';
import {ModelServerPoint} from './common/model-server-point';

export class TripPoints extends Component {
  constructor(points) {
    super();

    this.tripPointsAll = points;
    this.tripPointsVisible = points;

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
      api.updateTripPoint({id: newTripPoint.id, data: ModelServerPoint.parsePoint(newTripPoint)})
        .then(() => api.getTripPoints())
        .then((points) => {
          const loaded = points.find((item) => item.id === newTripPoint.id);
          tripPointComponent.update(loaded);
          tripPointComponent.create();
          container.replaceChild(tripPointComponent.element, tripPointEditorComponent.element);
          tripPointEditorComponent.destroy();
        });
    };

    tripPointEditorComponent.onDelete = () => {
      api.deleteTripPoint({id: point.id})
        .then(() => {
          this.tripPointsAll[point.id] = null;
          container.removeChild(tripPointEditorComponent.element);
          tripPointEditorComponent.destroy();
        });
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
