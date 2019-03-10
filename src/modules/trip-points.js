import {prepareOfferString} from './offers';
import {getDuration, joinElements} from './common/utils';
import {prepareIconString} from './icons';
import {getTripPoint} from '../data';

const prepareOneTripPointString = (tripPoint) => `
        <article class="trip-point">
          <i class="trip-icon">${prepareIconString(tripPoint.type)}</i>
          <h3 class="trip-point__title">${tripPoint.title}</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">${tripPoint.dateStart}&nbsp;&mdash; ${tripPoint.dateEnd}</span>
            <span class="trip-point__duration">${getDuration(tripPoint.dateStart, tripPoint.dateEnd)}</span>
          </p>
          <p class="trip-point__price">&euro;&nbsp;${tripPoint.cost}</p>
          <ul class="trip-point__offers">
            ${joinElements(prepareOfferString, tripPoint.offers)}
          </ul>
        </article>
`;


export const mountTripPoints = (quantity) => {
  const tripPoints = [];
  const tripPointsQuantity = Number.isInteger(quantity) ? quantity : 0;

  for (let i = 0; i < tripPointsQuantity; i++) {
    tripPoints.push(prepareOneTripPointString(getTripPoint()));
  }

  const tripPointsString = tripPoints.join(``);

  const tripPointsElement = document.querySelector(`.trip-day__items`);
  tripPointsElement.innerHTML = ``;
  tripPointsElement.insertAdjacentHTML(`beforeEnd`, tripPointsString);
};
