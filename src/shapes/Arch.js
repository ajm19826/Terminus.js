const BaseShape = require('./BaseShape');
const { createRing } = require('./ShapeFactory');

class Arch extends BaseShape {
  constructor({ radius = 2, thickness = 0.5 } = {}) {
    super();
    this._radius = radius;
    this._thickness = thickness;
    this._buildGeometry();
    this._initDimensions(radius * 2, radius, thickness);
  }

  _buildGeometry() {
    const inner = this._radius - this._thickness;
    const outer = this._radius;
    const ring = createRing(inner, outer, 32);
    const vertices = ring.vertices.filter(v => v.x >= 0); // half ring
    this.geometry = { vertices, normals: [], indices: [] };
  }

  _onDimensionsChanged() {
    this._radius = this._lengthA / 2;
    this._thickness = this._lengthC;
    this._buildGeometry();
  }
}

module.exports = Arch;
