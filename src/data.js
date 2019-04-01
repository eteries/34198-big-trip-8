import {extractRandomSentences, getRandomInteger, spliceRandom} from './modules/common/utils';

export const tripPointTypes = [
  [`taxi`,
    `bus`,
    `ship`,
    `transport`,
    `drive`,
    `flight`],
  [`checkIn`,
    `sightseeing`,
    `restaurant`]
];

export const cities = [`Amsterdam`, `Geneva`, `Chamonix`];

const tripPointsTitles = [`Taxi to Airport`, `Flight to Geneva`, `Drive to Chamonix`, `Check into a hotel`];

export const INITIAL_EVENTS_NUMBER = 7;
export const MIN_EVENTS_NUMBER = 1;

const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const MAX_SENTENCES_IN_DESCRIPTION = 3;

const MAX_DURATION_IN_MIN = 180;
const MIN_DURATION_IN_MIN = 20;

const MAX_OFFERS_NUM = 2;

const PICTURES_NUM = 4;

const POINT_TYPES_NUMBER = 2;

const MAX_COST = 500;
const MIN_COST = 50;

const DAY = 24 * 60 * 60 * 1000;

export const offers = [
  {label: `Add luggage`, cost: 25},
  {label: `Switch to comfort class`, cost: 50},
  {label: `Add meal`, cost: 15},
  {label: `Choose seats`, cost: 15}
];

const getRandomRecentDate = () => Date.now() - DAY + Math.floor(Math.random() * DAY);

const getRandomPointType = () => {
  const group = tripPointTypes[getRandomInteger(POINT_TYPES_NUMBER - 1)];
  return group[getRandomInteger(group.length - 1)];
};

export const getTrip = () => ({
  id: 1,
  title: `Amsterdam&nbsp;&mdash; Geneva&nbsp;&mdash;  Chamonix`,
  dates: `Mar 17&nbsp;&mdash; 19`,
  cost: 1600
});

export const getTripPoint = () => (
  {
    type: getRandomPointType(),
    title: tripPointsTitles[getRandomInteger(tripPointsTitles.length - 1)],
    destination: cities[getRandomInteger(cities.length - 1)],
    dateStart: getRandomRecentDate(),
    dateEnd: getRandomRecentDate(),
    duration: 1000 * 60 * (getRandomInteger(MAX_DURATION_IN_MIN) + MIN_DURATION_IN_MIN),
    offers: spliceRandom(offers, MAX_OFFERS_NUM),
    cost: getRandomInteger(MAX_COST) + MIN_COST,
    isFavorite: false
  }
);

export const getCityDescription = (cityName) => {
  return `${cityName} is ${extractRandomSentences(LOREM_IPSUM, MAX_SENTENCES_IN_DESCRIPTION)}`;
};

export const collectPictures = () => new Array(PICTURES_NUM).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`);

export const getTripPoints = () => {
  return new Array(getRandomInteger(INITIAL_EVENTS_NUMBER) + MIN_EVENTS_NUMBER).fill(``).map(() => getTripPoint());
};
