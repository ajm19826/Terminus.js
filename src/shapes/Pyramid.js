const BaseShape = require('./BaseShape');
const { createPrism } = require('./ShapeFactory');

class Pyramid extends BaseShape {
  constructor({ width = 2, height = 2, depth = 2 } = {}) {
    super();
    this.geometry = createPrism(width, height, depth, 4);
    this._initDimensions(width, height, depth);
  }

  _onDimensionsChanged() {
    this.geometry = createPrism(this._lengthA, this._lengthB, this._lengthC, 4);
  }
}

module.exports = Pyramid;
