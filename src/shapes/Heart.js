const BaseShape = require('./BaseShape');
const Vector3 = require('../utils/Vector3');

class Heart extends BaseShape {
  constructor({ scale = 1 } = {}) {
    super();
    const vertices = [];
    const steps = 80;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      vertices.push(new Vector3((x / 16) * scale, (y / 16) * scale, 0));
    }
    this.geometry = { vertices, normals: [], indices: [] };
    this._initDimensions(scale * 2, scale * 2, 0.1);
  }

  _onDimensionsChanged() {
    const scale = this._lengthA / 2;
    const vertices = [];
    const steps = 80;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      vertices.push(new Vector3((x / 16) * scale, (y / 16) * scale, 0));
    }
    this.geometry = { vertices, normals: [], indices: [] };
  }
}

module.exports = Heart;
