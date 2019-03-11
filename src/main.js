import {mountFilter} from './modules/filters';
import {mountTripPoints} from './modules/trip-points';
import {mountTrip} from './modules/trip';
import {INITIAL_EVENTS_NUMBER} from './modules/common/constants';

mountFilter();
mountTrip();
mountTripPoints(INITIAL_EVENTS_NUMBER);
