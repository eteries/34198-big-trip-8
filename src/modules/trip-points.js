import {TripPoint} from './trip-point';
import {TripPointEditor} from './trip-point-editor';
import {Component} from './common/component';
import {api} from '../main';
import {ModelServerPoint} from './common/model-server-point';
import moment from 'moment';
import {tripPointTypes} from '../data';

export class TripPoints extends Component {
  constructor(points) {
    super();

    this.tripPointsAll = points;
    this.tripPointsVisible = points;

    this._onNewBtnClick = this._onNewBtnClick.bind(this);

    this._onFilter = (event) => {
      this._filterPoints(event.target.id);
      const container = this._element.querySelector(`.trip-day__items`);
      container.innerHTML = ``;
      this.appendChildren();
    };

    this._onSort = (event) => {
      this._sortPoints(event.target.id);
      const container = this._element.querySelector(`.trip-day__items`);
      container.innerHTML = ``;
      this.appendChildren();
    };
  }

  _createNewPoint() {
    const newPoint = {
      id: this.tripPointsAll.length,
      type: tripPointTypes[0][0],
      destination: {
        name: `Oslo`
      },
      dateStart: ``,
      dateEnd: ``,
      offers: [],
      cost: 0,
      isFavorite: false
    };
    this.tripPointsAll.push(newPoint);
    const components = this._addPoint(newPoint);
    components.tripPointEditorComponent.create();
    components.tripPointComponent.element.parentElement.replaceChild(components.tripPointEditorComponent.element, components.tripPointComponent.element);
    components.tripPointEditorComponent.element.scrollIntoView();
    components.tripPointComponent.destroy();
  }

  attachEventListeners() {
    document.querySelector(`.trip-filter`)
      .addEventListener(`change`, this._onFilter);
    document.querySelector(`.trip-sorting`)
      .addEventListener(`change`, this._onSort);
    document.querySelector(`.new-event`)
      .addEventListener(`click`, this._onNewBtnClick);
  }

  detachEventListeners() {
    document.querySelector(`.trip-filter`)
      .removeEventListener(`change`, this._onFilter);
    document.querySelector(`.trip-sorting`)
      .removeEventListener(`change`, this._onSort);
    document.querySelector(`.new-event`)
      .removeEventListener(`click`, this._onNewBtnClick);
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

    tripPointEditorComponent.onClose = () => {
      tripPointComponent.create();
      container.replaceChild(tripPointComponent.element, tripPointEditorComponent.element);
      tripPointEditorComponent.destroy();
    };

    tripPointEditorComponent.onSubmit = (newTripPoint) => {
      tripPointEditorComponent.lockForm();
      api.updateTripPoint({id: newTripPoint.id, data: ModelServerPoint.parsePoint(newTripPoint)})
        .then(() => api.getTripPoints())
        .then((points) => {
          const remotePoints = points.find((item) => item.id === newTripPoint.id);
          tripPointComponent.update(remotePoints);
          tripPointComponent.create();
          container.replaceChild(tripPointComponent.element, tripPointEditorComponent.element);
          tripPointEditorComponent.destroy();
        })
        .catch(() => {
          tripPointEditorComponent.unlockFormWithWarning();
        });
    };

    tripPointEditorComponent.onDelete = () => {
      tripPointEditorComponent.lockForm();
      api.deleteTripPoint({id: point.id})
        .then(() => {
          this.tripPointsAll[point.id] = null;
          container.removeChild(tripPointEditorComponent.element);
          tripPointEditorComponent.destroy();
        })
        .catch(() => {
          tripPointEditorComponent.unlockFormWithWarning();
        });
    };

    return {
      tripPointComponent,
      tripPointEditorComponent
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

  _sortPoints(sortName) {
    switch (sortName) {
      case `sorting-event`:
        this.tripPointsVisible = this.tripPointsAll;
        break;

      case `sorting-time`:
        this.tripPointsVisible.sort((point1, point2) => {
          const duration1 = moment.duration(moment(point1.dateEnd) - moment(point1.dateStart)).asMilliseconds();
          const duration2 = moment.duration(moment(point2.dateEnd) - moment(point2.dateStart)).asMilliseconds();
          return duration1 < duration2 ? 1 : -1;
        });
        break;

      case `sorting-price`:
        this.tripPointsVisible.sort((point1, point2) => {
          return point1.cost < point2.cost ? 1 : -1;
        });
        break;
    }
  }

  _onNewBtnClick(event) {
    event.preventDefault();
    this._createNewPoint();
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
        <style>
          @keyframes shake {
            0%,
            100% {
              transform: translateX(0);
            }
        
            10%, 30%, 50%, 70%, 90% {
              transform: translateX(-5px);
            }
        
            20%, 40%, 60%, 80% {
              transform: translateX(5px);
            }
          }
          .shake {
            animation: shake 0.6s;
          }
        </style>
      </section>
    `;
  }
}
