const BaseShape = require('./BaseShape');
const { createStar } = require('./ShapeFactory');

class Star extends BaseShape {
  constructor({ radiusOuter = 2, radiusInner = 1, depth = 0.5 } = {}) {
    super();
    this._outer = radiusOuter;
    this._inner = radiusInner;
    this._depth = depth;
    this.geometry = createStar(radiusOuter, radiusInner, depth, 5);
    this._initDimensions(radiusOuter * 2, depth, radiusOuter * 2);
  }

  _onDimensionsChanged() {
    const outer = (this._lengthA + this._lengthC) / 4;
    const inner = outer * 0.5;
    this._outer = outer;
    this._inner = inner;
    this._depth = this._lengthB;
    this.geometry = createStar(outer, inner, this._depth, 5);
  }
}

module.exports = Star;
