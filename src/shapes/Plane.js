const BaseShape = require('./BaseShape');
const { createPlane } = require('./ShapeFactory');

class Plane extends BaseShape {
  constructor({ width = 5, depth = 5, segmentsW = 10, segmentsD = 10 } = {}) {
    super();
    this._segmentsW = segmentsW;
    this._segmentsD = segmentsD;
    this.geometry = createPlane(width, depth, segmentsW, segmentsD);
    this._initDimensions(width, 0, depth);
  }

  _onDimensionsChanged() {
    this.geometry = createPlane(this._lengthA, this._lengthC, this._segmentsW, this._segmentsD);
  }
}

module.exports = Plane;
