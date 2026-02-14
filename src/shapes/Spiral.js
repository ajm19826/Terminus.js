const BaseShape = require('./BaseShape');
const { createSpiral } = require('./ShapeFactory');

class Spiral extends BaseShape {
  constructor({ radius = 1, height = 3, turns = 4 } = {}) {
    super();
    this._radius = radius;
    this._height = height;
    this._turns = turns;
    this.geometry = createSpiral(radius, height, turns, 120);
    this._initDimensions(radius * 2, height, radius * 2);
  }

  _onDimensionsChanged() {
    this._radius = (this._lengthA + this._lengthC) / 4;
    this._height = this._lengthB;
    this.geometry = createSpiral(this._radius, this._height, this._turns, 120);
  }
}

module.exports = Spiral;
