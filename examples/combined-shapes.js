const Terminus = require('../src');

function main() {
  const scene = new Terminus.Scene();

  const cube = Terminus.Cube({ width: 2, height: 2, depth: 2 });
  cube.position.set(-3, 0, 0);

  const sphere = Terminus.Sphere({ radius: 1.5 });
  sphere.position.set(3, 0, 0);

  const torus = Terminus.Torus({ radius: 3, tube: 0.5 });
  torus.position.set(0, 0, 0);

  const group = Terminus.Group();
  group.add(cube);
  group.add(sphere);
  group.add(torus);

  scene.add(group);

  const aspect = (process.stdout.columns || 80) / ((process.stdout.rows || 24) - 1);
  const camera = new Terminus.OrbitCamera(60, aspect, 0.1, 100);
  camera.radius = 20;
  camera.setTarget(0, 0, 0);
  camera.updateCamera();

  const renderer = new Terminus.AsciiRenderer({
    width: process.stdout.columns || 80,
    height: (process.stdout.rows || 24) - 1
  });

  const controls = new Terminus.OrbitControls(camera);

  const engine = new Terminus.Engine({ scene, camera, renderer, controls });

  group.update = function (delta) {
    this.rotation.y += 20 * delta;
    this._matrixNeedsUpdate = true;
  };

  engine.start();
}

main();
