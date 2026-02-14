const BaseShape = require('./BaseShape');
const { createPrism } = require('./ShapeFactory');

class Prism extends BaseShape {
  constructor({ width = 2, height = 2, depth = 2, sides = 6 } = {}) {
    super();
    this._sides = sides;
    this.geometry = createPrism(width, height, depth, sides);
    this._initDimensions(width, height, depth);
  }

  _onDimensionsChanged() {
    this.geometry = createPrism(this._lengthA, this._lengthB, this._lengthC, this._sides);
  }
}

module.exports = Prism;
