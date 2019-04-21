import {Component} from './common/component';

const main = document.querySelector(`#table`);
const stats = document.querySelector(`#stats`);

export class Controls extends Component {
  constructor() {
    super();
  }

  attachEventListeners() {
    this._element.querySelector(`[href$=table]`).addEventListener(`click`, this._onTableClick);
    this._element.querySelector(`[href$=stats]`).addEventListener(`click`, this._onStatsClick);
  }

  detachEventListeners() {
    this._element.removeEventListener(`click`, this._onTableClick);
    this._element.removeEventListener(`click`, this._onStatsClick);
  }

  _onTableClick(event) {
    event.preventDefault();
    main.classList.remove(`visually-hidden`);
    stats.classList.add(`visually-hidden`);
  }

  _onStatsClick(event) {
    event.preventDefault();
    main.classList.add(`visually-hidden`);
    stats.classList.remove(`visually-hidden`);
  }

  get template() {
    return `
      <section class="trip-controls">
        <nav class="trip-controls__menus view-switch">
          <a href="#table" class="view-switch__item view-switch__item--active">Table</a>
          <a href="#stats" class="view-switch__item">Stats</a>
        </nav>
  
        <button class="trip-controls__new-event new-event">+ New Event</button>
      </section>
    `;
  }
}
