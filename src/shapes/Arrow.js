const BaseShape = require('./BaseShape');
const Vector3 = require('../utils/Vector3');

class Arrow extends BaseShape {
  constructor({ length = 4 } = {}) {
    super();
    const shaftLen = length * 0.7;
    const headLen = length * 0.3;
    const vertices = [
      new Vector3(0, -length / 2, 0),
      new Vector3(0, -length / 2 + shaftLen, 0),
      new Vector3(-0.5, -length / 2 + shaftLen, 0),
      new Vector3(0.5, -length / 2 + shaftLen, 0),
      new Vector3(0, length / 2, 0)
    ];
    this.geometry = { vertices, normals: [], indices: [] };
    this._initDimensions(1, length, 1);
  }

  _onDimensionsChanged() {
    const length = this._lengthB;
    const shaftLen = length * 0.7;
    const vertices = [
      new Vector3(0, -length / 2, 0),
      new Vector3(0, -length / 2 + shaftLen, 0),
      new Vector3(-0.5, -length / 2 + shaftLen, 0),
      new Vector3(0.5, -length / 2 + shaftLen, 0),
      new Vector3(0, length / 2, 0)
    ];
    this.geometry = { vertices, normals: [], indices: [] };
  }
}

module.exports = Arrow;
