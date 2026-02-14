const PerspectiveCamera = require('./PerspectiveCamera');
const Vector3 = require('../utils/Vector3');
const { clamp, degToRad } = require('../utils/MathUtils');

class OrbitCamera extends PerspectiveCamera {
  constructor(fov = 60, aspect = 1, near = 0.1, far = 100) {
    super(fov, aspect, near, far);
    this.radius = 10;
    this.minRadius = 2;
    this.maxRadius = 50;
    this.theta = 45; // horizontal angle (deg)
    this.phi = 30;   // vertical angle (deg)
    this.minPhi = -85;
    this.maxPhi = 85;
    this.target = new Vector3(0, 0, 0);
  }

  setTarget(x, y, z) {
    this.target.set(x, y, z);
  }

  orbit(deltaTheta, deltaPhi) {
    this.theta += deltaTheta;
    this.phi = clamp(this.phi + deltaPhi, this.minPhi, this.maxPhi);
  }

  zoom(deltaRadius) {
    this.radius = clamp(this.radius + deltaRadius, this.minRadius, this.maxRadius);
  }

  pan(dx, dy) {
    // Simple pan in camera-local X/Y
    const radTheta = degToRad(this.theta);
    const right = new Vector3(Math.cos(radTheta), 0, -Math.sin(radTheta));
    const up = new Vector3(0, 1, 0);

    this.target.add(right.multiplyScalar(dx));
    this.target.add(up.multiplyScalar(dy));
  }

  updateCamera() {
    const r = this.radius;
    const thetaRad = degToRad(this.theta);
    const phiRad = degToRad(this.phi);

    const x = this.target.x + r * Math.cos(phiRad) * Math.cos(thetaRad);
    const y = this.target.y + r * Math.sin(phiRad);
    const z = this.target.z + r * Math.cos(phiRad) * Math.sin(thetaRad);

    this.position.set(x, y, z);
    this.lookAt(this.target);
  }
}

module.exports = OrbitCamera;
