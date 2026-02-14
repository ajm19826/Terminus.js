const BaseShape = require('./BaseShape');
const { createCylinder } = require('./ShapeFactory');

class Cylinder extends BaseShape {
  constructor({ radiusTop = 1, radiusBottom = 1, height = 2, radialSegments = 16 } = {}) {
    super();
    this._radiusTop = radiusTop;
    this._radiusBottom = radiusBottom;
    this._height = height;
    this._radialSegments = radialSegments;
    this.geometry = createCylinder(radiusTop, radiusBottom, height, radialSegments, 1);
    this._initDimensions(radiusBottom * 2, height, radiusBottom * 2);
  }

  _onDimensionsChanged() {
    const radius = (this._lengthA + this._lengthC) / 4;
    this._radiusTop = radius;
    this._radiusBottom = radius;
    this._height = this._lengthB;
    this.geometry = createCylinder(this._radiusTop, this._radiusBottom, this._height, this._radialSegments, 1);
  }
}

module.exports = Cylinder;
