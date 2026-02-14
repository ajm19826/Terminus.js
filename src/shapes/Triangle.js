const BaseShape = require('./BaseShape');
const Vector3 = require('../utils/Vector3');

class Triangle extends BaseShape {
  constructor({ size = 2 } = {}) {
    super();
    const h = size * Math.sqrt(3) / 2;
    const vertices = [
      new Vector3(-size / 2, 0, 0),
      new Vector3(size / 2, 0, 0),
      new Vector3(0, h, 0)
    ];
    this.geometry = { vertices, normals: [], indices: [] };
    this._initDimensions(size, h, 0.1);
  }

  _onDimensionsChanged() {
    const size = this._lengthA;
    const h = size * Math.sqrt(3) / 2;
    const vertices = [
      new Vector3(-size / 2, 0, 0),
      new Vector3(size / 2, 0, 0),
      new Vector3(0, h, 0)
    ];
    this.geometry = { vertices, normals: [], indices: [] };
  }
}

module.exports = Triangle;
