const prepareOneEventString = () => `
        <article class="trip-point">
          <i class="trip-icon">🚕</i>
          <h3 class="trip-point__title">Taxi to Airport</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">10:00&nbsp;&mdash; 11:00</span>
            <span class="trip-point__duration">1h 30m</span>
          </p>
          <p class="trip-point__price">&euro;&nbsp;20</p>
          <ul class="trip-point__offers">
            <li>
              <button class="trip-point__offer">Order UBER +&euro;&nbsp;20</button>
            </li>
            <li>
              <button class="trip-point__offer">Upgrade to business +&euro;&nbsp;20</button>
            </li>
          </ul>
        </article>
`;


export const mountEvents = (quantity) => {
  const events = [];
  const eventsQuantity = Number.isInteger(quantity) ? quantity : 0;

  for (let i = 0; i < eventsQuantity; i++) {
    events.push(prepareOneEventString(i));
  }

  const eventsString = events.join(``);

  const eventsElement = document.querySelector(`.trip-day__items`);
  eventsElement.innerHTML = ``;
  eventsElement.insertAdjacentHTML(`beforeEnd`, eventsString);
};
