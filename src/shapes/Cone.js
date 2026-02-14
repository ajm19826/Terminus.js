const BaseShape = require('./BaseShape');
const { createCone } = require('./ShapeFactory');

class Cone extends BaseShape {
  constructor({ radius = 1, height = 2, radialSegments = 16 } = {}) {
    super();
    this._radius = radius;
    this._height = height;
    this._radialSegments = radialSegments;
    this.geometry = createCone(radius, height, radialSegments);
    this._initDimensions(radius * 2, height, radius * 2);
  }

  _onDimensionsChanged() {
    const radius = (this._lengthA + this._lengthC) / 4;
    this._radius = radius;
    this._height = this._lengthB;
    this.geometry = createCone(this._radius, this._height, this._radialSegments);
  }
}

module.exports = Cone;
