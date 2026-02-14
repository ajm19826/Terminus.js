const BaseShape = require('./BaseShape');
const { createCylinder } = require('./ShapeFactory');

class Tube extends BaseShape {
  constructor({ innerRadius = 0.8, outerRadius = 1, height = 3 } = {}) {
    super();
    this._inner = innerRadius;
    this._outer = outerRadius;
    this._height = height;
    this._buildGeometry();
    this._initDimensions(outerRadius * 2, height, outerRadius * 2);
  }

  _buildGeometry() {
    const outer = createCylinder(this._outer, this._outer, this._height, 16, 1);
    const inner = createCylinder(this._inner, this._inner, this._height, 16, 1);
    const vertices = [...outer.vertices, ...inner.vertices];
    this.geometry = { vertices, normals: [], indices: [] };
  }

  _onDimensionsChanged() {
    this._outer = (this._lengthA + this._lengthC) / 4;
    this._inner = this._outer * 0.7;
    this._height = this._lengthB;
    this._buildGeometry();
  }
}

module.exports = Tube;
