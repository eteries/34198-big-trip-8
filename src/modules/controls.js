import {Component} from './common/component';

export class Controls extends Component {
  constructor() {
    super();
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
