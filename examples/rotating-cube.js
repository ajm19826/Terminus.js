const Terminus = require('../src');

function main() {
  const scene = new Terminus.Scene();

  const cube = Terminus.Cube();
  cube.Volume(Terminus.Cube.prototype.constructor.TMeasurements.Inches);
  cube.Volume = 50;

  cube.LengthA = 4;
  cube.LengthB = 4;
  cube.LengthC = 4;

  cube.position.set(0, 0, 0);
  cube.rotation.set(0, 0, 0);

  scene.add(cube);

  const aspect = (process.stdout.columns || 80) / ((process.stdout.rows || 24) - 1);
  const camera = new Terminus.OrbitCamera(60, aspect, 0.1, 100);
  camera.radius = 15;
  camera.setTarget(0, 0, 0);
  camera.updateCamera();

  const renderer = new Terminus.AsciiRenderer({
    width: process.stdout.columns || 80,
    height: (process.stdout.rows || 24) - 1,
    ramp: new Terminus.CharRamp(' .:-=+*#%@')
  });

  const controls = new Terminus.OrbitControls(camera, {
    rotateSpeed: 60,
    zoomSpeed: 1,
    panSpeed: 0.5
  });

  const engine = new Terminus.Engine({ scene, camera, renderer, controls });

  cube.update = function (delta) {
    this.rotation.y += 30 * delta;
    this.rotation.x += 15 * delta;
    this._matrixNeedsUpdate = true;
  };

  engine.start();
}

main();
