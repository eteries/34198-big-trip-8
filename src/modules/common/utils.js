export const getRandomInteger = (max) => Math.round(Math.random() * max);

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = getRandomInteger(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const spliceRandom = (arr, max) => shuffle([...arr]).splice(0, 1 + getRandomInteger(max - 1));

export const extractRandomSentences = (text, max) => spliceRandom(text.split(`. `), max).join(` .`);

export const joinElements = (cb, data) => {
  if (!data.length) {
    return ``;
  }
  return [...data]
    .map((item) => cb(item))
    .join(``);
};

export const getDuration = (dateStart, dateEnd) => {
  const duration = dateEnd - dateStart;
  if (duration < 0) {
    return ``;
  }
  const hours = Math.floor(duration / (60 * 60));
  let minutes = Math.floor((duration % (60 * 60)) / 60);

  if (minutes < 10) {
    minutes = `0` + minutes;
  }

  return `${hours}h : ${minutes}m`;
};
