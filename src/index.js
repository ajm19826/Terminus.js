const Engine = require('./core/Engine');
const Scene = require('./scene/Scene');
const Group = require('./scene/Group');

const Cube = require('./shapes/Cube');
const Sphere = require('./shapes/Sphere');
const Cylinder = require('./shapes/Cylinder');
const Cone = require('./shapes/Cone');
const Pyramid = require('./shapes/Pyramid');
const Torus = require('./shapes/Torus');
const Plane = require('./shapes/Plane');
const Prism = require('./shapes/Prism');
const Capsule = require('./shapes/Capsule');
const Wedge = require('./shapes/Wedge');
const Dome = require('./shapes/Dome');
const Ellipsoid = require('./shapes/Ellipsoid');
const Frustum = require('./shapes/Frustum');
const Ring = require('./shapes/Ring');
const Stair = require('./shapes/Stair');
const Arch = require('./shapes/Arch');
const Helix = require('./shapes/Helix');
const Star = require('./shapes/Star');
const Gear = require('./shapes/Gear');
const Tube = require('./shapes/Tube');
const Box = require('./shapes/Box');
const Quad = require('./shapes/Quad');
const Triangle = require('./shapes/Triangle');
const Arrow = require('./shapes/Arrow');
const Cross = require('./shapes/Cross');
const PlusShape = require('./shapes/PlusShape');
const Heart = require('./shapes/Heart');
const Spiral = require('./shapes/Spiral');
const LShape = require('./shapes/LShape');
const TShape = require('./shapes/TShape');
const CustomMesh = require('./shapes/CustomMesh');

const PerspectiveCamera = require('./camera/PerspectiveCamera');
const OrbitCamera = require('./camera/OrbitCamera');
const OrbitControls = require('./controls/OrbitControls');
const AsciiRenderer = require('./ascii/AsciiRenderer');
const CharRamp = require('./ascii/CharRamp');

const Terminus = {
  Engine,
  Scene,
  Group: () => new Group(),

  Cube: (opts) => new Cube(opts),
  Sphere: (opts) => new Sphere(opts),
  Cylinder: (opts) => new Cylinder(opts),
  Cone: (opts) => new Cone(opts),
  Pyramid: (opts) => new Pyramid(opts),
  Torus: (opts) => new Torus(opts),
  Plane: (opts) => new Plane(opts),
  Prism: (opts) => new Prism(opts),
  Capsule: (opts) => new Capsule(opts),
  Wedge: (opts) => new Wedge(opts),
  Dome: (opts) => new Dome(opts),
  Ellipsoid: (opts) => new Ellipsoid(opts),
  Frustum: (opts) => new Frustum(opts),
  Ring: (opts) => new Ring(opts),
  Stair: (opts) => new Stair(opts),
  Arch: (opts) => new Arch(opts),
  Helix: (opts) => new Helix(opts),
  Star: (opts) => new Star(opts),
  Gear: (opts) => new Gear(opts),
  Tube: (opts) => new Tube(opts),
  Box: (opts) => new Box(opts),
  Quad: (opts) => new Quad(opts),
  Triangle: (opts) => new Triangle(opts),
  Arrow: (opts) => new Arrow(opts),
  Cross: (opts) => new Cross(opts),
  PlusShape: (opts) => new PlusShape(opts),
  Heart: (opts) => new Heart(opts),
  Spiral: (opts) => new Spiral(opts),
  LShape: (opts) => new LShape(opts),
  TShape: (opts) => new TShape(opts),
  CustomMesh: (opts) => new CustomMesh(opts),

  PerspectiveCamera,
  OrbitCamera,
  OrbitControls,
  AsciiRenderer,
  CharRamp
};

if (typeof global !== 'undefined') {
  global.Terminus = Terminus;
}

module.exports = Terminus;
