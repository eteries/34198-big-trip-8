/* eslint-disable camelcase */

export class ModelServerPoint {
  constructor(data) {
    this.id = data.id;
    this.destination = data.destination;
    this.date_from = data.dateStart;
    this.date_to = data.dateEnd;
    this.offers = data.offers;
    this.type = data.type;
    this.base_price = data.cost;
    this.isFavorite = data.isFavorite;
  }

  static parsePoint(data) {
    return new ModelServerPoint(data);
  }

  static parsePoints(data) {
    return data.map(ModelServerPoint.parsePoint);
  }
}
