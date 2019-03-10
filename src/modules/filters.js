import {mountTripPoints} from './trip-points';
import {getRandomInteger} from './common/utils';
import {INITIAL_EVENTS_NUMBER} from './common/constants';

const filters = [`everything`, `future`, `past`];

const filtersElement = document.querySelector(`.trip-filter`);

const prepareOneFilterString = (label, index) => `
    <input type="radio" 
           id="filter-${label}"
           name="filter"
           value="${label}"
           ${index === 0 ? `checked` : ``}
    />
    <label class="trip-filter__item"
           for="filter-${label}">
        ${label}
    </label>
`;

const filtersString = filters
  .map((filter, index) => prepareOneFilterString(filter, index))
  .join(``);

export const mountFilter = () => {
  filtersElement.innerHTML = ``;
  filtersElement.insertAdjacentHTML(`beforeEnd`, filtersString);

  filtersElement.addEventListener(`click`, (event) => {
    if (!event.target ||
      event.target.tagName !== `LABEL` ||
      event.target.control.checked) {
      return;
    }

    mountTripPoints(getRandomInteger(INITIAL_EVENTS_NUMBER));
  });
};
