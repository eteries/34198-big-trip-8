import {mountFilter} from './modules/filters';
import {mountTripPoints, TripPoints} from './modules/trip-points';
import {mountTrip} from './modules/trip';
import {INITIAL_EVENTS_NUMBER} from './modules/common/constants';

mountFilter();
mountTrip();
// mountTripPoints(INITIAL_EVENTS_NUMBER);

const tripPoints = new TripPoints();
document.querySelector(`.main`).appendChild(tripPoints.create());

