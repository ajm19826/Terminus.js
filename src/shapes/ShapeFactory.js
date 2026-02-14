const Vector3 = require('../utils/Vector3');

function createCube(width, height, depth) {
  const hw = width / 2;
  const hh = height / 2;
  const hd = depth / 2;

  const vertices = [
    new Vector3(-hw, -hh, -hd),
    new Vector3(hw, -hh, -hd),
    new Vector3(hw, hh, -hd),
    new Vector3(-hw, hh, -hd),
    new Vector3(-hw, -hh, hd),
    new Vector3(hw, -hh, hd),
    new Vector3(hw, hh, hd),
    new Vector3(-hw, hh, hd)
  ];

  return {
    vertices,
    normals: [],
    indices: []
  };
}

function createPlane(width, depth, segmentsW = 10, segmentsD = 10) {
  const vertices = [];
  for (let z = 0; z <= segmentsD; z++) {
    for (let x = 0; x <= segmentsW; x++) {
      const u = x / segmentsW - 0.5;
      const v = z / segmentsD - 0.5;
      vertices.push(new Vector3(u * width, 0, v * depth));
    }
  }
  return { vertices, normals: [], indices: [] };
}

function createSphere(radius, segments = 16, rings = 12) {
  const vertices = [];
  for (let y = 0; y <= rings; y++) {
    const v = y / rings;
    const phi = v * Math.PI;
    for (let x = 0; x <= segments; x++) {
      const u = x / segments;
      const theta = u * Math.PI * 2;
      const sx = -radius * Math.cos(theta) * Math.sin(phi);
      const sy = radius * Math.cos(phi);
      const sz = radius * Math.sin(theta) * Math.sin(phi);
      vertices.push(new Vector3(sx, sy, sz));
    }
  }
  return { vertices, normals: [], indices: [] };
}

function createCylinder(radiusTop, radiusBottom, height, radialSegments = 16, heightSegments = 1) {
  const vertices = [];
  const halfHeight = height / 2;

  for (let y = 0; y <= heightSegments; y++) {
    const v = y / heightSegments;
    const radius = radiusBottom + (radiusTop - radiusBottom) * v;
    const py = -halfHeight + v * height;

    for (let x = 0; x <= radialSegments; x++) {
      const u = x / radialSegments;
      const theta = u * Math.PI * 2;
      const px = radius * Math.cos(theta);
      const pz = radius * Math.sin(theta);
      vertices.push(new Vector3(px, py, pz));
    }
  }
  return { vertices, normals: [], indices: [] };
}

function createCone(radius, height, radialSegments = 16) {
  return createCylinder(0, radius, height, radialSegments, 1);
}

function createTorus(radius, tube, radialSegments = 16, tubularSegments = 24) {
  const vertices = [];
  for (let j = 0; j <= radialSegments; j++) {
    const v = j / radialSegments * Math.PI * 2;
    const cosV = Math.cos(v);
    const sinV = Math.sin(v);

    for (let i = 0; i <= tubularSegments; i++) {
      const u = i / tubularSegments * Math.PI * 2;
      const cosU = Math.cos(u);
      const sinU = Math.sin(u);

      const x = (radius + tube * cosV) * cosU;
      const y = (radius + tube * cosV) * sinU;
      const z = tube * sinV;
      vertices.push(new Vector3(x, z, y));
    }
  }
  return { vertices, normals: [], indices: [] };
}

function createPrism(width, height, depth, sides = 6) {
  const vertices = [];
  const hw = width / 2;
  const hh = height / 2;
  const hd = depth / 2;

  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2;
    const x = Math.cos(angle) * hw;
    const z = Math.sin(angle) * hd;
    vertices.push(new Vector3(x, -hh, z));
    vertices.push(new Vector3(x, hh, z));
  }
  return { vertices, normals: [], indices: [] };
}

function createRing(innerRadius, outerRadius, segments = 32) {
  const vertices = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);
    vertices.push(new Vector3(innerRadius * cos, 0, innerRadius * sin));
    vertices.push(new Vector3(outerRadius * cos, 0, outerRadius * sin));
  }
  return { vertices, normals: [], indices: [] };
}

function createHelix(radius, height, turns = 3, segments = 100) {
  const vertices = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const angle = t * Math.PI * 2 * turns;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = -height / 2 + t * height;
    vertices.push(new Vector3(x, y, z));
  }
  return { vertices, normals: [], indices: [] };
}

function createStair(width, height, depth, steps = 10) {
  const vertices = [];
  const stepHeight = height / steps;
  const stepDepth = depth / steps;
  const hw = width / 2;

  for (let i = 0; i <= steps; i++) {
    const y = -height / 2 + i * stepHeight;
    const z = -depth / 2 + i * stepDepth;
    vertices.push(new Vector3(-hw, y, z));
    vertices.push(new Vector3(hw, y, z));
  }
  return { vertices, normals: [], indices: [] };
}

function createStar(radiusOuter, radiusInner, depth, points = 5) {
  const vertices = [];
  const halfDepth = depth / 2;
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? radiusOuter : radiusInner;
    const angle = (i / (points * 2)) * Math.PI * 2;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    vertices.push(new Vector3(x, -halfDepth, z));
    vertices.push(new Vector3(x, halfDepth, z));
  }
  return { vertices, normals: [], indices: [] };
}

function createGear(radius, teeth = 12, toothDepth = 0.2, thickness = 0.5) {
  const vertices = [];
  const halfT = thickness / 2;
  for (let i = 0; i < teeth; i++) {
    const baseAngle = (i / teeth) * Math.PI * 2;
    const outerAngle = baseAngle + (Math.PI / teeth);
    const innerR = radius;
    const outerR = radius + toothDepth;

    const x1 = Math.cos(baseAngle) * innerR;
    const z1 = Math.sin(baseAngle) * innerR;
    const x2 = Math.cos(outerAngle) * outerR;
    const z2 = Math.sin(outerAngle) * outerR;

    vertices.push(new Vector3(x1, -halfT, z1));
    vertices.push(new Vector3(x1, halfT, z1));
    vertices.push(new Vector3(x2, -halfT, z2));
    vertices.push(new Vector3(x2, halfT, z2));
  }
  return { vertices, normals: [], indices: [] };
}

function createSpiral(radius, height, turns = 4, segments = 120) {
  return createHelix(radius, height, turns, segments);
}

module.exports = {
  createCube,
  createPlane,
  createSphere,
  createCylinder,
  createCone,
  createTorus,
  createPrism,
  createRing,
  createHelix,
  createStair,
  createStar,
  createGear,
  createSpiral
};
