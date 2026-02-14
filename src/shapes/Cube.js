const BaseShape = require('./BaseShape');
const { createCube } = require('./ShapeFactory');

class Cube extends BaseShape {
  constructor({ width = 1, height = 1, depth = 1 } = {}) {
    super();
    this.geometry = createCube(width, height, depth);
    this._initDimensions(width, height, depth);
  }

  _onDimensionsChanged() {
    this.geometry = createCube(this._lengthA, this._lengthB, this._lengthC);
  }
}

module.exports = Cube;
