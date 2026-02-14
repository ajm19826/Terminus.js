const BaseShape = require('./BaseShape');
const { createTorus } = require('./ShapeFactory');

class Torus extends BaseShape {
  constructor({ radius = 2, tube = 0.5 } = {}) {
    super();
    this._radius = radius;
    this._tube = tube;
    this.geometry = createTorus(radius, tube);
    this._initDimensions(radius * 2, tube * 2, radius * 2);
  }

  _onDimensionsChanged() {
    const radius = (this._lengthA + this._lengthC) / 4;
    const tube = this._lengthB / 4;
    this._radius = radius;
    this._tube = tube;
    this.geometry = createTorus(radius, tube);
  }
}

module.exports = Torus;
