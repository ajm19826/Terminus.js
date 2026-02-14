const Vector3 = require('../utils/Vector3');
const Matrix4 = require('../utils/Matrix4');
const { degToRad } = require('../utils/MathUtils');

class Object3D {
  constructor() {
    this.position = new Vector3();
    this.rotation = new Vector3(); // degrees
    this.scale = new Vector3(1, 1, 1);

    this.children = [];
    this.parent = null;

    this.matrix = new Matrix4();
    this.worldMatrix = new Matrix4();
    this._matrixNeedsUpdate = true;
  }

  add(child) {
    if (child.parent) {
      child.parent.remove(child);
    }
    child.parent = this;
    this.children.push(child);
  }

  remove(child) {
    const i = this.children.indexOf(child);
    if (i !== -1) {
      this.children.splice(i, 1);
      child.parent = null;
    }
  }

  updateMatrix() {
    const t = new Matrix4().makeTranslation(
      this.position.x,
      this.position.y,
      this.position.z
    );
    const rx = new Matrix4().makeRotationX(degToRad(this.rotation.x));
    const ry = new Matrix4().makeRotationY(degToRad(this.rotation.y));
    const rz = new Matrix4().makeRotationZ(degToRad(this.rotation.z));
    const s = new Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z);

    // M = T * Rz * Ry * Rx * S
    this.matrix.identity()
      .multiply(t)
      .multiply(rz)
      .multiply(ry)
      .multiply(rx)
      .multiply(s);

    this._matrixNeedsUpdate = false;
  }

  updateWorldMatrix(parentWorldMatrix) {
    if (this._matrixNeedsUpdate) {
      this.updateMatrix();
    }
    if (parentWorldMatrix) {
      this.worldMatrix.multiplyMatrices(parentWorldMatrix, this.matrix);
    } else {
      this.worldMatrix = this.matrix.clone();
    }

    for (const child of this.children) {
      child.updateWorldMatrix(this.worldMatrix);
    }
  }

  update(delta) {
    for (const child of this.children) {
      if (typeof child.update === 'function') {
        child.update(delta);
      }
    }
  }
}

module.exports = Object3D;
