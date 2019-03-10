const icons = {
  trip: `⛰`,
  taxi: `🚕`,
  bus: `🚌`,
  train: `🚂`,
  ship: `🛳️`,
  transport: `🚊`,
  drive: `🚗`,
  flight: `✈`,
  checkIn: `🏨`,
  sightseeing: `🏛️`,
  restaurant: `🍴`
};

export const prepareIconString = (key) => {
  return icons[key];
};
