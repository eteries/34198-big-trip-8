export const prepareOfferString = (offer) => `
    <li>
      <button class="trip-point__offer">${offer.label} +&euro;&nbsp;${offer.cost}</button>
    </li>
`;
