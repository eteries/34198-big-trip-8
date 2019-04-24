const icons = {
  'trip': `🚗`,
  'taxi': `🚕`,
  'bus': `🚌`,
  'train': `🚂`,
  'ship': `🚢`,
  'transport': `🚊`,
  'drive': `🚗`,
  'flight': `✈`,
  'check-in': `🏨`,
  'sightseeing': `📷`,
  'restaurant': `🍴`
};

export const prepareIconString = (key) => {
  return icons[key];
};
