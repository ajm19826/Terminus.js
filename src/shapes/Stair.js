const BaseShape = require('./BaseShape');
const { createStair } = require('./ShapeFactory');

class Stair extends BaseShape {
  constructor({ width = 3, height = 3, depth = 5, steps = 10 } = {}) {
    super();
    this._steps = steps;
    this.geometry = createStair(width, height, depth, steps);
    this._initDimensions(width, height, depth);
  }

  _onDimensionsChanged() {
    this.geometry = createStair(this._lengthA, this._lengthB, this._lengthC, this._steps);
  }
}

module.exports = Stair;
