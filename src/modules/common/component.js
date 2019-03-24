import {createElement} from './utils';

export class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }

    this._element = null;
  }

  create() {
    if (this._element) {
      this.destroy();
    }

    this._element = createElement(this.template);
    this._appendChildren();
    this.attachEventListeners();
    return this._element;
  }

  destroy() {
    this.detachEventListeners();
    this._element.remove();
    this._element = null;
  }

  attachEventListeners() {}

  detachEventListeners() {}

  _appendChildren() {}

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }
}
