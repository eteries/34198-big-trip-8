export const getRandomInteger = (max) => Math.round(Math.random() * max);

const shuffle = (arr) => {
  arr.forEach((item, i) => {
    const j = getRandomInteger(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  });

  return arr;
};

export const spliceRandom = (arr, max) => shuffle([...arr]).splice(0, 1 + getRandomInteger(max - 1));

export const extractRandomSentences = (text, max) => spliceRandom(text.split(`. `), max).join(` .`);

export const formatDuration = (interval) => {
  const intervalInMinutes = interval / (1000 * 60);

  const hours = Math.floor(intervalInMinutes / 60);
  let minutes = Math.floor(intervalInMinutes % 60);

  if (minutes < 10) {
    minutes = `0` + minutes;
  }

  return `${hours}h ${minutes}m`;
};

export const formatTime = (date) => {
  const hours = new Date(date).getHours();
  let minutes = new Date(date).getMinutes();

  if (minutes < 10) {
    minutes = `0` + minutes;
  }

  return `${hours}:${minutes}`;
};

export const createElement = (templateString) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = templateString.trim();
  return newElement.firstChild;
};
