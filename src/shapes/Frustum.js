const BaseShape = require('./BaseShape');
const { createCylinder } = require('./ShapeFactory');

class Frustum extends BaseShape {
  constructor({ radiusTop = 0.5, radiusBottom = 1, height = 2 } = {}) {
    super();
    this._radiusTop = radiusTop;
    this._radiusBottom = radiusBottom;
    this._height = height;
    this.geometry = createCylinder(radiusTop, radiusBottom, height, 16, 1);
    this._initDimensions(radiusBottom * 2, height, radiusBottom * 2);
  }

  _onDimensionsChanged() {
    const radiusBottom = (this._lengthA + this._lengthC) / 4;
    const radiusTop = radiusBottom * 0.5;
    this._radiusTop = radiusTop;
    this._radiusBottom = radiusBottom;
    this._height = this._lengthB;
    this.geometry = createCylinder(radiusTop, radiusBottom, this._height, 16, 1);
  }
}

module.exports = Frustum;
