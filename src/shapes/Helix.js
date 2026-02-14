const BaseShape = require('./BaseShape');
const { createHelix } = require('./ShapeFactory');

class Helix extends BaseShape {
  constructor({ radius = 1, height = 4, turns = 3 } = {}) {
    super();
    this._radius = radius;
    this._height = height;
    this._turns = turns;
    this.geometry = createHelix(radius, height, turns, 100);
    this._initDimensions(radius * 2, height, radius * 2);
  }

  _onDimensionsChanged() {
    this._radius = (this._lengthA + this._lengthC) / 4;
    this._height = this._lengthB;
    this.geometry = createHelix(this._radius, this._height, this._turns, 100);
  }
}

module.exports = Helix;
