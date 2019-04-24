import {ModelPoint} from './model-point';

const END_POINT = `https://es8-demo-srv.appspot.com/big-trip/`;
const KEY = `Basic dXNlc3kBwYXNzd29yZAo=${Math.random()}`;

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => {
  return response.json();
};

export const API = class {
  constructor({endPoint, authorization} = {endPoint: END_POINT, authorization: KEY}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getTripPoints() {
    return this._load({url: `points`})
      .then(toJSON)
      .then(ModelPoint.parsePoints);
  }

  getAvailableOffers() {
    return this._load({url: `offers`})
      .then(toJSON);
  }

  getAvailableDestinations() {
    return this._load({url: `destinations`})
      .then(toJSON);
  }

  getDestinationsInfo() {
    return this._load({url: `points`})
      .then(toJSON)
      .then((points) => points.reduce((acc, point) => acc.push(point.destination), []));
  }

  createTripPoint({tripPoint}) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(tripPoint),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON);
  }

  updateTripPoint({id, data}) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON);
  }

  deleteTripPoint({id}) {
    return this._load({url: `points/${id}`, method: Method.DELETE});
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};
