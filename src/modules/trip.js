import {getTrip} from '../data';
import {prepareIconString} from './icons';

const tripElement = document.querySelector(`.trip`);

const prepareTripString = (trip) => `
    <div class="trip__schedule">
        <i class="trip-icon">${prepareIconString(`trip`)}️</i>
        <h1 class="trip__points">${trip.title}</h1>
        <p class="trip__dates">${trip.dates}</p>
      </div>
      <p class="trip__total">Total: <span class="trip__total-cost">&euro;&nbsp;${trip.cost}</span></p>
`;

export const mountTrip = () => {
  tripElement.innerHTML = ``;
  tripElement.insertAdjacentHTML(`beforeEnd`, prepareTripString(getTrip()));
};
