import {Filters} from './modules/filters';
import {Trip} from './modules/trip';
import {getTrip} from './data';
import {Controls} from './modules/controls';
import {Sorting} from './modules/sorting';

const sorting = new Sorting();
document.querySelector(`#table`).appendChild(sorting.create());

const filters = new Filters();
document.querySelector(`.header__wrap`).appendChild(filters.create());

const trip = new Trip(getTrip());
document.querySelector(`.header__wrap`).appendChild(trip.create());

const controls = new Controls();
document.querySelector(`.header__wrap`).appendChild(controls.create());
