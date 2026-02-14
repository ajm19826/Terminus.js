# Terminus – ASCII 3D Rendering Engine for the Terminal

Terminus is a modular, ASCII-based 3D rendering engine written in JavaScript for Node.js.  
It renders real-time 3D scenes directly into your terminal using character ramps, depth-based shading, and an orbit camera.

---

## How ASCII 3D works

Terminus projects 3D vertices into 2D screen space using a perspective camera.  
Each projected point is written into a character buffer with a z-buffer to keep the closest point per cell.

Shading is derived from depth: closer points map to brighter characters in a configurable ramp, e.g.:

```text
 .:-=+*#%@
The renderer:

Builds a view–projection matrix from the camera.

Updates world matrices for all scene objects.

Projects vertices into normalized device coordinates.

Converts them to terminal coordinates.

Uses a z-buffer to resolve visibility.

Writes characters into a 2D buffer and flushes it to stdout.

Installation
bash
git clone https://github.com/ajm19826/terminus.js.git
cd terminus.js
npm install
Run examples:

bash
npm run example:rotating-cube
npm run example:combined-shapes
npm run example:orbit-demo
Basic usage
js
const Terminus = require('./src');

const scene = new Terminus.Scene();

const cube = Terminus.Cube();
cube.Volume(Terminus.Cube.prototype.constructor.TMeasurements.Inches);
cube.Volume = 50;

cube.LengthA = 10;
cube.LengthB = 10;
cube.LengthC = 10;

cube.position.set(0, 0, 0);
cube.rotation.set(0, 45, 0);

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

const controls = new Terminus.OrbitControls(camera);

const engine = new Terminus.Engine({ scene, camera, renderer, controls });
engine.start();
Keyboard controls:

Arrow keys: orbit around target

+ / -: zoom in/out

W, A, S, D: pan

Ctrl+C: exit

Mouse (in compatible terminals):

Drag: orbit

Wheel: zoom

Shape list
Terminus ships with 30+ shapes:

Cube

Box

Sphere

Cylinder

Cone

Pyramid

Torus

Plane

Quad

Prism

Capsule

Wedge

Dome

Ellipsoid

Frustum

Ring

Stair

Arch

Helix

Spiral

Star

Gear

Tube

Triangle

Arrow

Cross

PlusShape

Heart

LShape

TShape

CustomMesh (user-defined vertices)

All shapes:

Expose dimensions via LengthA, LengthB, LengthC.

Support translation, rotation, scaling via position, rotation, scale.

Render as ASCII using the shared renderer.

API examples
Creating and grouping shapes
js
const cube = Terminus.Cube({ width: 2, height: 2, depth: 2 });
const sphere = Terminus.Sphere({ radius: 1.5 });

cube.position.set(-3, 0, 0);
sphere.position.set(3, 0, 0);

const group = Terminus.Group();
group.add(cube);
group.add(sphere);

scene.add(group);
Custom character ramp
js
const ramp = new Terminus.CharRamp(' .,:;ox%#@');
const renderer = new Terminus.AsciiRenderer({
  width: 120,
  height: 40,
  ramp
});
Custom mesh
js
const custom = Terminus.CustomMesh({
  vertices: [
    { x: -1, y: 0, z: 0 },
    { x: 1, y: 0, z: 0 },
    { x: 0, y: 2, z: 0 }
  ]
});

custom.position.set(0, 0, 0);
scene.add(custom);
Camera & controls
OrbitCamera

radius, theta, phi

setTarget(x, y, z)

orbit(deltaTheta, deltaPhi)

zoom(deltaRadius)

pan(dx, dy)

updateCamera()

OrbitControls

Keyboard + mouse support

Configurable rotateSpeed, zoomSpeed, panSpeed

update(delta) called each frame by the engine

Engine & scene graph
Engine

Manages the main loop.

Calls controls.update(delta), scene.update(delta), renderer.render(scene, camera).

Scene

Root node for all objects.

Maintains a flat list of renderable objects.

Object3D

position, rotation, scale

add(child), remove(child)

Parent/child transforms via worldMatrix.

Roadmap
Planned improvements:

Triangle rasterization for filled surfaces.

Multiple lights and basic Lambert shading.

Per-object materials (different ramps, density).

Off-screen rendering and frame capture.

Higher-level primitives (text labels, HUD overlays).

TypeScript typings and ESM build.

Style rules
Clean, modular architecture (core, scene, camera, controls, ascii, shapes, utils).

No placeholders or pseudo-implementations.

Inline comments only where they clarify math or terminal behavior.

Beginner-friendly API, engine-level internals.