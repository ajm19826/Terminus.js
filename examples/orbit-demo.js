const Terminus = require('../src');

function main() {
  const scene = new Terminus.Scene();

  const plane = Terminus.Plane({ width: 20, depth: 20 });
  plane.position.set(0, -3, 0);

  const gear = Terminus.Gear({ radius: 2, teeth: 16 });
  gear.position.set(0, 0, 0);

  const helix = Terminus.Helix({ radius: 1, height: 6, turns: 4 });
  helix.position.set(0, 0, 0);

  const group = Terminus.Group();
  group.add(gear);
  group.add(helix);

  scene.add(plane);
  scene.add(group);

  const aspect = (process.stdout.columns || 80) / ((process.stdout.rows || 24) - 1);
  const camera = new Terminus.OrbitCamera(60, aspect, 0.1, 100);
  camera.radius = 18;
  camera.setTarget(0, 0, 0);
  camera.updateCamera();

  const renderer = new Terminus.AsciiRenderer({
    width: process.stdout.columns || 80,
    height: (process.stdout.rows || 24) - 1,
    ramp: new Terminus.CharRamp(' .:-=+*#%@')
  });

  const controls = new Terminus.OrbitControls(camera, {
    rotateSpeed: 80,
    zoomSpeed: 1,
    panSpeed: 0.5
  });

  const engine = new Terminus.Engine({ scene, camera, renderer, controls });

  group.update = function (delta) {
    this.rotation.y += 25 * delta;
    this._matrixNeedsUpdate = true;
  };

  engine.start();
}

main();
