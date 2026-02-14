const BaseShape = require('./BaseShape');
const Vector3 = require('../utils/Vector3');

class Wedge extends BaseShape {
  constructor({ width = 2, height = 2, depth = 2 } = {}) {
    super();
    this._buildGeometry(width, height, depth);
    this._initDimensions(width, height, depth);
  }

  _buildGeometry(width, height, depth) {
    const hw = width / 2;
    const hh = height / 2;
    const hd = depth / 2;

    const vertices = [
      new Vector3(-hw, -hh, -hd),
      new Vector3(hw, -hh, -hd),
      new Vector3(hw, -hh, hd),
      new Vector3(-hw, -hh, hd),
      new Vector3(-hw, hh, -hd),
      new Vector3(hw, hh, -hd)
    ];

    this.geometry = { vertices, normals: [], indices: [] };
  }

  _onDimensionsChanged() {
    this._buildGeometry(this._lengthA, this._lengthB, this._lengthC);
  }
}

module.exports = Wedge;
