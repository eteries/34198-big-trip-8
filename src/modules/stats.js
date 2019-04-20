import {Component} from './common/component';
import {config} from './common/chart-default-config';
import Chart from 'chart.js';
import * as cloneDeep from 'lodash.clonedeep';
import {getTripPoints, tripPointTypes} from '../data';

const types = [`money`, `transport`, `time-spend`];

export class Stats extends Component {
  constructor() {
    super();
    this.stats = {};
  }

  getStats(points) {
    return points.reduce((acc, cur) => {
      acc.money[cur.type] = acc.money[cur.type] ? acc.money[cur.type] + cur.cost : cur.cost;

      if (tripPointTypes[0].includes(cur.type)) {
        acc.transport[cur.type] = acc.transport[cur.type] ? ++acc.transport[cur.type] : 1;
      }

      acc.time[cur.type] = acc.time[cur.type] ? acc.time[cur.type] + cur.duration : cur.duration;

      return acc;
    }, {
      money: {},
      transport: {},
      time: {}
    });
  }

  appendChildren() {
    const moneyCtx = this._element.querySelector(`.statistic__money`);
    const transportCtx = this._element.querySelector(`.statistic__transport`);
    const timeSpendCtx = this._element.querySelector(`.statistic__time-spend`);

    const stats = this.getStats(getTripPoints());

    // Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * 6;
    transportCtx.height = BAR_HEIGHT * 4;
    timeSpendCtx.height = BAR_HEIGHT * 4;

    const moneyConfig = cloneDeep(config);
    const transportConfig = cloneDeep(config);
    const timeSpendConfig = cloneDeep(config);

    const moneyChart = new Chart(moneyCtx, Object.assign(moneyConfig, {
      data: Object.assign(moneyConfig.data, {
        labels: Object.keys(stats.money),
        datasets: [Object.assign(moneyConfig.data.datasets, {
          data: Object.values(stats.money)
        })],
        title: Object.assign(moneyConfig.options.title, {
          text: `MONEY`
        })
      })
    }));

    const transportChart = new Chart(transportCtx, Object.assign(transportConfig, {
      data: Object.assign(transportConfig.data, {
        labels: Object.keys(stats.transport),
        datasets: [Object.assign(transportConfig.data.datasets, {
          data: Object.values(stats.transport)
        })],
        title: Object.assign(transportConfig.options.title, {
          text: `TRANSPORT`
        })
      })
    }));

    const timeSpendChart = new Chart(timeSpendCtx, Object.assign(timeSpendConfig, {
      data: Object.assign(timeSpendConfig.data, {
        labels: Object.keys(stats.time),
        datasets: [Object.assign(timeSpendConfig.data.datasets, {
          data: Object.values(stats.time)
        })],
        title: Object.assign(timeSpendConfig.options.title, {
          text: `TIME SPENT`
        })
      })
    }));

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
