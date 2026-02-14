// DOM refs
const gameScreen = document.getElementById("gameScreen");
const terminusScreen = document.getElementById("terminusScreen");

// ---------------------------------------------------------------------------
// ASCII PLATFORMER
// ---------------------------------------------------------------------------

const WIDTH = 40;
const HEIGHT = 30;

let worldWidth = 200;
let worldHeight = 60;

let player = { x: 10, y: 10, vx: 0, vy: 0, onGround: false };
let keys = {};

document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

// Build world
let world = [];
for (let y = 0; y < worldHeight; y++) {
  world[y] = [];
  for (let x = 0; x < worldWidth; x++) world[y][x] = " ";
}

// Ground
for (let x = 0; x < worldWidth; x++) {
  for (let y = worldHeight - 10; y < worldHeight; y++) {
    world[y][x] = "#";
  }
}

// Trees
for (let i = 0; i < 20; i++) {
  let x = Math.floor(Math.random() * worldWidth);
  world[worldHeight - 11][x] = "T";
}

function updatePlatformer(delta) {
  player.vy += 30 * delta;

  if (keys["a"]) player.vx = -10;
  else if (keys["d"]) player.vx = 10;
  else player.vx = 0;

  if (keys["w"] && player.onGround) {
    player.vy = -15;
    player.onGround = false;
  }

  player.x += player.vx * delta;
  player.y += player.vy * delta;

  if (player.y >= worldHeight - 11) {
    player.y = worldHeight - 11;
    player.vy = 0;
    player.onGround = true;
  }

  player.x = Math.max(0, Math.min(worldWidth - 1, player.x));
}

function renderPlatformer() {
  let output = "";
  let camX = Math.floor(player.x - WIDTH / 2);
  camX = Math.max(0, Math.min(worldWidth - WIDTH, camX));

  for (let y = 0; y < HEIGHT; y++) {
    let wy = y + (worldHeight - HEIGHT);

    for (let x = 0; x < WIDTH; x++) {
      let wx = x + camX;
      let char = world[wy][wx];

      if (Math.floor(player.x) === wx && Math.floor(player.y) === wy) {
        char = "@";
      }

      output += char;
    }
    output += "\n";
  }

  gameScreen.textContent = output;
}

// ---------------------------------------------------------------------------
// TERMINUS 3D VIEWPORT
// ---------------------------------------------------------------------------

const scene = new Terminus.Scene();

const cube = Terminus.Cube({ width: 2, height: 2, depth: 2 });
cube.position.set(0, 0, 0);
scene.add(cube);

const aspect = 1; // square viewport
const camera = new Terminus.OrbitCamera(60, aspect, 0.1, 100);
camera.radius = 10;
camera.setTarget(0, 0, 0);
camera.updateCamera();

const renderer = new Terminus.AsciiRenderer({
  width: 40,
  height: 30,
  clearOnRender: false,
  ramp: new Terminus.CharRamp(" .:-=+*#%@")
});

// Override renderer output to DOM instead of stdout
renderer.render = function(scene, camera) {
  this._clearBuffers();

  const vp = new Terminus.utils.Matrix4();
  vp.multiplyMatrices(camera.projectionMatrix, camera.viewMatrix);

  scene.updateWorldMatrix(null);

  const objects = scene.getObjects();
  for (const obj of objects) {
    if (!obj.geometry || !obj.geometry.vertices) continue;

    const world = obj.worldMatrix;
    const worldViewProj = new Terminus.utils.Matrix4();
    worldViewProj.multiplyMatrices(vp, world);

    const vertices = obj.geometry.vertices;

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
        const depthNorm = 1 - v.z;
        const char = this.ramp.getChar(depthNorm);
        this._buffer[idx] = char;
      }
    }
  }

  let output = "";
  for (let y = 0; y < this.height; y++) {
    const start = y * this.width;
    output += this._buffer.slice(start, start + this.width).join("") + "\n";
  }

  terminusScreen.textContent = output;
};

// ---------------------------------------------------------------------------
// MAIN LOOP
// ---------------------------------------------------------------------------

let last = performance.now();
function loop(now) {
  let delta = (now - last) / 1000;
  last = now;

  updatePlatformer(delta);

  cube.rotation.y += 30 * delta;
  cube.rotation.x += 15 * delta;
  cube._matrixNeedsUpdate = true;

  camera.updateCamera();

  renderPlatformer();
  renderer.render(scene, camera);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
