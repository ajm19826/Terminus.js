const BaseShape = require('./BaseShape');
const { createSphere } = require('./ShapeFactory');

class Sphere extends BaseShape {
  constructor({ radius = 1, segments = 16, rings = 12 } = {}) {
    super();
    this._radius = radius;
    this._segments = segments;
    this._rings = rings;
    this.geometry = createSphere(radius, segments, rings);
    this._initDimensions(radius * 2, radius * 2, radius * 2);
  }

  _onDimensionsChanged() {
    const radius = (this._lengthA + this._lengthB + this._lengthC) / 6;
    this._radius = radius;
    this.geometry = createSphere(radius, this._segments, this._rings);
  }
}

module.exports = Sphere;
