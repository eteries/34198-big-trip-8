import * as moment from 'moment';

export const getRandomInteger = (max) => Math.round(Math.random() * max);

const shuffle = (arr) => {
  arr.forEach((item, i) => {
    const j = getRandomInteger(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  });

  return arr;
};

const ESCAPE_CODE = 27;

export const spliceRandom = (arr, max) => shuffle([...arr]).splice(0, 1 + getRandomInteger(max - 1));

export const extractRandomSentences = (text, max) => spliceRandom(text.split(`. `), max).join(` .`);

export const formatDuration = (date0, date1) => {
  const duration = moment.duration(date1 - date0);
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  return `${days ? `${days}d:` : ``}
          ${hours ? `${hours}h:` : ``}
          ${`${minutes}m`}`;
};

export const createElement = (templateString) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = templateString.trim();
  return newElement.firstChild;
};

export const isEscape = (event) => event.keyCode && event.keyCode === ESCAPE_CODE;
