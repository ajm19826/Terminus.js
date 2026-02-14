const BaseShape = require('./BaseShape');
const { createSphere } = require('./ShapeFactory');

class Dome extends BaseShape {
  constructor({ radius = 2 } = {}) {
    super();
    this._radius = radius;
    this._buildGeometry();
    this._initDimensions(radius * 2, radius, radius * 2);
  }

  _buildGeometry() {
    const sphere = createSphere(this._radius, 16, 8);
    const vertices = sphere.vertices.filter(v => v.y >= 0);
    this.geometry = { vertices, normals: [], indices: [] };
  }

  _onDimensionsChanged() {
    const radius = (this._lengthA + this._lengthC) / 4;
    this._radius = radius;
    this._buildGeometry();
  }
}

module.exports = Dome;
