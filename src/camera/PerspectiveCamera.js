const Object3D = require('../scene/Object3D');
const Matrix4 = require('../utils/Matrix4');
const Vector3 = require('../utils/Vector3');

class PerspectiveCamera extends Object3D {
  constructor(fov = 60, aspect = 1, near = 0.1, far = 100) {
    super();
    this.fov = fov;
    this.aspect = aspect;
    this.near = near;
    this.far = far;

    this.projectionMatrix = new Matrix4();
    this.viewMatrix = new Matrix4();
    this.target = new Vector3(0, 0, 0);

    this.updateProjectionMatrix();
  }

  updateProjectionMatrix() {
    const fovRad = this.fov * Math.PI / 180;
    const f = 1.0 / Math.tan(fovRad / 2);
    const nf = 1 / (this.near - this.far);
    const e = this.projectionMatrix.elements;

    e[0] = f / this.aspect;
    e[1] = 0;
    e[2] = 0;
    e[3] = 0;

    e[4] = 0;
    e[5] = f;
    e[6] = 0;
    e[7] = 0;

    e[8] = 0;
    e[9] = 0;
    e[10] = (this.far + this.near) * nf;
    e[11] = -1;

    e[12] = 0;
    e[13] = 0;
    e[14] = (2 * this.far * this.near) * nf;
    e[15] = 0;
  }

  lookAt(target) {
    this.target.copy(target);
    const zAxis = this.position.clone().sub(target).normalize();
    const xAxis = new Vector3(0, 1, 0).clone().cross(zAxis).normalize();
    const yAxis = zAxis.clone().cross(xAxis).normalize();

    const e = this.viewMatrix.elements;
    e[0] = xAxis.x; e[4] = xAxis.y; e[8]  = xAxis.z; e[12] = -xAxis.x * this.position.x - xAxis.y * this.position.y - xAxis.z * this.position.z;
    e[1] = yAxis.x; e[5] = yAxis.y; e[9]  = yAxis.z; e[13] = -yAxis.x * this.position.x - yAxis.y * this.position.y - yAxis.z * this.position.z;
    e[2] = zAxis.x; e[6] = zAxis.y; e[10] = zAxis.z; e[14] = -zAxis.x * this.position.x - zAxis.y * this.position.y - zAxis.z * this.position.z;
    e[3] = 0;       e[7] = 0;       e[11] = 0;       e[15] = 1;
  }
}

module.exports = PerspectiveCamera;
