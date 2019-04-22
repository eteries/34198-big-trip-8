export class ModelPoint {
  constructor(data) {
    this.id = data.id;
    this.destination = data.destination;
    this.dateStart = new Date(data.date_from);
    this.dateEnd = new Date(data.date_to);
    this.offers = data.offers;
    this.type = data.type;
    this.cost = data.base_price;
    this.isFavorite = data.isFavorite;
  }

  static parsePoint(data) {
    return new ModelPoint(data);
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }
}
