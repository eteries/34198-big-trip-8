import {extractRandomSentences, getRandomInteger, spliceRandom} from './modules/common/utils';

const tripPointTypes = [
  `taxi`,
  `bus`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
  `checkIn`,
  `sightseeing`,
  `restaurant`
];

const cities = [`Amsterdam`, `Geneva`, `Chamonix`];

const tripPointsTitles = [`Taxi to Airport`, `Flight to Geneva`, `Drive to Chamonix`, `Check into a hotel`];

const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const MAX_SENTENCES_IN_DESCRIPTION = 3;

const offers = [
  {label: `Add luggage`, cost: 25},
  {label: `Switch to comfort class`, cost: 50},
  {label: `Add meal`, cost: 15},
  {label: `Choose seats`, cost: 15}
];

export const getTrip = () => ({
  id: 1,
  title: `Amsterdam&nbsp;&mdash; Geneva&nbsp;&mdash;  Chamonix`,
  dates: `Mar 17&nbsp;&mdash; 19`,
  cost: 1600
});

export const getTripPoint = () => (
  {
    type: tripPointTypes[getRandomInteger(tripPointTypes.length - 1)],
    title: tripPointsTitles[getRandomInteger(tripPointsTitles.length - 1)],
    destination: cities[getRandomInteger(cities.length - 1)],
    dateStart: 12345,
    dateEnd: 123456,
    offers: spliceRandom(offers, 2),
    cost: getRandomInteger(500) + 50
  }
);

export const getCityDescription = (cityName) => {
  return `${cityName} is ${extractRandomSentences(LOREM_IPSUM, MAX_SENTENCES_IN_DESCRIPTION)}`;
};
