import {mountFilter} from './modules/filters';
import {mountEvents} from './modules/events';
import {INITIAL_EVENTS_NUMBER} from './modules/common/constants';

mountFilter();
mountEvents(INITIAL_EVENTS_NUMBER);
