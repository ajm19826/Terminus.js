const BaseShape = require('./BaseShape');
const Vector3 = require('../utils/Vector3');

class TShape extends BaseShape {
  constructor({ size = 2 } = {}) {
    super();
    const s = size;
    const vertices = [
      new Vector3(-s, s, 0),
      new Vector3(s, s, 0),
      new Vector3(0, s, 0),
      new Vector3(0, -s, 0)
    ];
    this.geometry = { vertices, normals: [], indices: [] };
    this._initDimensions(size * 2, size * 2, 0.1);
  }

  _onDimensionsChanged() {
    const s = this._lengthA / 2;
    const vertices = [
      new Vector3(-s, s, 0),
      new Vector3(s, s, 0),
      new Vector3(0, s, 0),
      new Vector3(0, -s, 0)
    ];
    this.geometry = { vertices, normals: [], indices: [] };
  }
}

module.exports = TShape;
