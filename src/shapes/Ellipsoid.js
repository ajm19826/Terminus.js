const BaseShape = require('./BaseShape');
const { createSphere } = require('./ShapeFactory');

class Ellipsoid extends BaseShape {
  constructor({ radiusX = 2, radiusY = 1, radiusZ = 1.5 } = {}) {
    super();
    this._rx = radiusX;
    this._ry = radiusY;
    this._rz = radiusZ;
    this._buildGeometry();
    this._initDimensions(radiusX * 2, radiusY * 2, radiusZ * 2);
  }

  _buildGeometry() {
    const sphere = createSphere(1, 16, 12);
    const vertices = sphere.vertices.map(v => v.clone().set(
      v.x * this._rx,
      v.y * this._ry,
      v.z * this._rz
    ));
    this.geometry = { vertices, normals: [], indices: [] };
  }

  _onDimensionsChanged() {
    this._rx = this._lengthA / 2;
    this._ry = this._lengthB / 2;
    this._rz = this._lengthC / 2;
    this._buildGeometry();
  }
}

module.exports = Ellipsoid;
