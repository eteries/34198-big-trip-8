import {Component} from './common/component';
import {config} from './common/chart-default-config';
import Chart from 'chart.js';
import * as cloneDeep from 'lodash.clonedeep';
import {getTripPoints, tripPointTypes} from '../data';
import * as moment from 'moment';

const types = [`money`, `transport`, `time-spend`];

export class Stats extends Component {
  constructor() {
    super();
    this.stats = {
      money: {},
      transport: {},
      time: {}
    };
  }

  getStats(points) {
    return points.reduce((acc, cur, index) => {
      acc.money[cur.type] = acc.money[cur.type] ? acc.money[cur.type] + cur.cost : cur.cost;

      if (tripPointTypes[0].includes(cur.type)) {
        acc.transport[cur.type] = acc.transport[cur.type] ? ++acc.transport[cur.type] : 1;
      }

      acc.time[cur.type] = acc.time[cur.type] ? acc.time[cur.type] + cur.duration : cur.duration;
      if (index === points.length - 1) {
        Object.entries(acc.time).forEach((entry) => {
          acc.time[(entry[0])] = moment.duration(entry[1]).asMinutes();
        });
      }

      return acc;
    }, this.stats);
  }

  appendChildren() {
    const moneyCtx = this._element.querySelector(`.statistic__money`);
    const transportCtx = this._element.querySelector(`.statistic__transport`);
    const timeSpendCtx = this._element.querySelector(`.statistic__time-spend`);

    const stats = this.getStats(getTripPoints());

    const BAR_HEIGHT = 55;

    const moneyConfig = cloneDeep(config);
    moneyConfig.options.title.text = `MONEY`;
    moneyConfig.data.labels = Object.keys(stats.money);
    moneyConfig.data.datasets[0].data = Object.values(stats.money);
    moneyConfig.options.plugins.datalabels.formatter = (val) => `€ ${ val }`;
    moneyCtx.height = BAR_HEIGHT * moneyConfig.data.labels.length;
    this.moneyChart = new Chart(moneyCtx, moneyConfig);

    const transportConfig = cloneDeep(config);
    transportConfig.options.title.text = `TRANSPORT`;
    transportConfig.data.labels = Object.keys(stats.transport);
    transportConfig.data.datasets[0].data = Object.values(stats.transport);
    transportConfig.options.plugins.datalabels.formatter = (val) => `x${val}`;
    transportCtx.height = BAR_HEIGHT * transportConfig.data.labels.length;
    this.transportChart = new Chart(transportCtx, transportConfig);

    const timeConfig = cloneDeep(config);
    timeConfig.options.title.text = `TIME SPENT`;
    timeConfig.data.labels = Object.keys(stats.time);
    timeConfig.data.datasets[0].data = Object.values(stats.time);
    timeConfig.options.plugins.datalabels.formatter = (val) => `${val} min`;
    timeSpendCtx.height = BAR_HEIGHT * timeConfig.data.labels.length;
    this.timeChart = new Chart(timeSpendCtx, timeConfig);
  }

  destroy() {
    super.destroy();
    this.moneyChart = null;
    this.transportChart = null;
    this.timeChart = null;
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
