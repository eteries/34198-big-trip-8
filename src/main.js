import {Filters} from './modules/filters';
import {Trip} from './modules/trip';
import {getTrip} from './data';
import {Controls} from './modules/controls';
import {Sorting} from './modules/sorting';
import {Stats} from './modules/stats';
import {API} from './modules/common/api';

export const api = new API();

const sorting = new Sorting();
document.querySelector(`#table`).appendChild(sorting.create());

const filters = new Filters();
document.querySelector(`.header__wrap`).appendChild(filters.create());

const trip = new Trip(getTrip());
document.querySelector(`.header__wrap`).appendChild(trip.create());

const controls = new Controls();
document.querySelector(`.header__wrap`).appendChild(controls.create());

const paintStats = () => {
  const stats = new Stats();
  document.querySelector(`#stats`).innerHTML = null;
  document.querySelector(`#stats`).appendChild(stats.create());
};

paintStats();
document.querySelector(`[href$=stats]`).addEventListener(`click`, paintStats);
