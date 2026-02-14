const Matrix4 = require('../utils/Matrix4');
const Vector3 = require('../utils/Vector3');
const CharRamp = require('./CharRamp');

class AsciiRenderer {
  constructor({
    width = process.stdout.columns || 80,
    height = (process.stdout.rows || 24) - 1,
    ramp = new CharRamp(),
    clearOnRender = true
  } = {}) {
    this.width = width;
    this.height = height;
    this.ramp = ramp;
    this.clearOnRender = clearOnRender;

    this._buffer = new Array(this.width * this.height);
    this._depth = new Array(this.width * this.height);
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    this._buffer = new Array(width * height);
    this._depth = new Array(width * height);
  }

  _clearBuffers() {
    const size = this.width * this.height;
    for (let i = 0; i < size; i++) {
      this._buffer[i] = ' ';
      this._depth[i] = Infinity;
    }
  }

  _projectVertex(v, viewProj) {
    const p = v.clone();
    viewProj.applyToVector3(p);

    // NDC to screen
    const x = Math.floor((p.x * 0.5 + 0.5) * (this.width - 1));
    const y = Math.floor((-p.y * 0.5 + 0.5) * (this.height - 1));
    return { x, y, z: p.z };
  }

  render(scene, camera) {
    this._clearBuffers();

    // Build view-projection matrix
    const vp = new Matrix4();
    vp.multiplyMatrices(camera.projectionMatrix, camera.viewMatrix);

    // Update world matrices
    scene.updateWorldMatrix(null);

    const objects = scene.getObjects();
    for (const obj of objects) {
      if (!obj.geometry || !obj.geometry.vertices) continue;

      const world = obj.worldMatrix;
      const worldViewProj = new Matrix4();
      worldViewProj.multiplyMatrices(vp, world);

      const vertices = obj.geometry.vertices;
      const normals = obj.geometry.normals || null;

      for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i].clone();
        worldViewProj.applyToVector3(v);

        if (v.z <= 0 || v.z >= 1) continue;

        const sx = Math.floor((v.x * 0.5 + 0.5) * (this.width - 1));
        const sy = Math.floor((-v.y * 0.5 + 0.5) * (this.height - 1));
        const idx = sy * this.width + sx;

        if (sx < 0 || sx >= this.width || sy < 0 || sy >= this.height) continue;

        if (v.z < this._depth[idx]) {
          this._depth[idx] = v.z;

          // Simple shading: closer = brighter
          const depthNorm = 1 - v.z; // 0..1
          const char = this.ramp.getChar(depthNorm);
          this._buffer[idx] = char;
        }
      }
    }

    if (this.clearOnRender) {
      process.stdout.write('\x1b[2J\x1b[0;0H');
    }

    let output = '';
    for (let y = 0; y < this.height; y++) {
      const start = y * this.width;
      output += this._buffer.slice(start, start + this.width).join('') + '\n';
    }
    process.stdout.write(output);
  }
}

module.exports = AsciiRenderer;
