const BaseShape = require('./BaseShape');
const { createRing } = require('./ShapeFactory');

class Ring extends BaseShape {
  constructor({ innerRadius = 1, outerRadius = 2 } = {}) {
    super();
    this._inner = innerRadius;
    this._outer = outerRadius;
    this.geometry = createRing(innerRadius, outerRadius);
    this._initDimensions(outerRadius * 2, 0.1, outerRadius * 2);
  }

  _onDimensionsChanged() {
    const outer = (this._lengthA + this._lengthC) / 4;
    const inner = outer * 0.6;
    this._inner = inner;
    this._outer = outer;
    this.geometry = createRing(inner, outer);
  }
}

module.exports = Ring;
