import {Component} from './common/component';

const types = [`money`, `transport`, `time-spend`];

export class Stats extends Component {
  constructor() {
    super();
  }

  get template() {
    return `
    <div>
      ${types
        .map((type) => `
        <div class="statistic__item statistic__item--${type}">
          <canvas class="statistic__${type}" width="900"></canvas>
        </div>`)
        .join(``)}
     </div>
      `;
  }
}
