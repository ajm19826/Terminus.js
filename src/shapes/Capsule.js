const BaseShape = require('./BaseShape');
const { createCylinder, createSphere } = require('./ShapeFactory');

class Capsule extends BaseShape {
  constructor({ radius = 1, height = 3 } = {}) {
    super();
    this._radius = radius;
    this._height = height;
    this._buildGeometry();
    this._initDimensions(radius * 2, height, radius * 2);
  }

  _buildGeometry() {
    const cyl = createCylinder(this._radius, this._radius, this._height - 2 * this._radius, 16, 1);
    const top = createSphere(this._radius, 12, 8);
    const bottom = createSphere(this._radius, 12, 8);

    const vertices = [];
    for (const v of cyl.vertices) vertices.push(v);
    for (const v of top.vertices) vertices.push(v.clone().set(v.x, v.y + (this._height / 2 - this._radius), v.z));
    for (const v of bottom.vertices) vertices.push(v.clone().set(v.x, v.y - (this._height / 2 - this._radius), v.z));

    this.geometry = { vertices, normals: [], indices: [] };
  }

  _onDimensionsChanged() {
    const radius = (this._lengthA + this._lengthC) / 4;
    const height = this._lengthB;
    this._radius = radius;
    this._height = height;
    this._buildGeometry();
  }
}

module.exports = Capsule;
