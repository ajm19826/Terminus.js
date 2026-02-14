const BaseShape = require('./BaseShape');
const Vector3 = require('../utils/Vector3');

class CustomMesh extends BaseShape {
  constructor({ vertices = [] } = {}) {
    super();
    this.setVertices(vertices);
  }

  setVertices(vertices) {
    this.geometry.vertices = vertices.map(v => new Vector3(v.x, v.y, v.z));
    // Update dimensions from bounds
    if (this.geometry.vertices.length > 0) {
      let minX = Infinity, minY = Infinity, minZ = Infinity;
      let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
      for (const v of this.geometry.vertices) {
        if (v.x < minX) minX = v.x;
        if (v.y < minY) minY = v.y;
        if (v.z < minZ) minZ = v.z;
        if (v.x > maxX) maxX = v.x;
        if (v.y > maxY) maxY = v.y;
        if (v.z > maxZ) maxZ = v.z;
      }
      this._initDimensions(maxX - minX, maxY - minY, maxZ - minZ);
    }
  }

  _onDimensionsChanged() {
    // CustomMesh does not auto-rescale vertices; user controls geometry directly.
  }
}

module.exports = CustomMesh;
