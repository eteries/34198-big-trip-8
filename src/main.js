import {mountFilter} from './modules/filters';
import {mountPoints} from './modules/points';
import {INITIAL_EVENTS_NUMBER} from './modules/common/constants';

mountFilter();
mountPoints(INITIAL_EVENTS_NUMBER);
