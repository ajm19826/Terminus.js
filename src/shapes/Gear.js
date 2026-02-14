const BaseShape = require('./BaseShape');
const { createGear } = require('./ShapeFactory');

class Gear extends BaseShape {
  constructor({ radius = 2, teeth = 12, toothDepth = 0.4, thickness = 0.5 } = {}) {
    super();
    this._radius = radius;
    this._teeth = teeth;
    this._toothDepth = toothDepth;
    this._thickness = thickness;
    this.geometry = createGear(radius, teeth, toothDepth, thickness);
    this._initDimensions(radius * 2, thickness, radius * 2);
  }

  _onDimensionsChanged() {
    this._radius = (this._lengthA + this._lengthC) / 4;
    this._thickness = this._lengthB;
    this.geometry = createGear(this._radius, this._teeth, this._toothDepth, this._thickness);
  }
}

module.exports = Gear;
