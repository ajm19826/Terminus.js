const screen = document.getElementById("screen");

const WIDTH = 80;
const HEIGHT = 30;

let worldWidth = 500;
let worldHeight = 60;

let player = {
  x: 10,
  y: 10,
  vx: 0,
  vy: 0,
  onGround: false
};

let keys = {};
document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

// --- WORLD GENERATION -----------------------------------------------------

let world = [];
for (let y = 0; y < worldHeight; y++) {
  world[y] = [];
  for (let x = 0; x < worldWidth; x++) {
    world[y][x] = " ";
  }
}

// Ground
for (let x = 0; x < worldWidth; x++) {
  for (let y = worldHeight - 10; y < worldHeight; y++) {
    world[y][x] = "#";
  }
}

// Trees
for (let i = 0; i < 40; i++) {
  let x = Math.floor(Math.random() * worldWidth);
  let y = worldHeight - 11;
  world[y][x] = "T";
}

// Rocks
for (let i = 0; i < 30; i++) {
  let x = Math.floor(Math.random() * worldWidth);
  let y = worldHeight - 11;
  world[y][x] = "O";
}

// Bouncing balls
let balls = [];
for (let i = 0; i < 10; i++) {
  balls.push({
    x: Math.random() * worldWidth,
    y: 5 + Math.random() * 10,
    vy: 0
  });
}

// --- GAME LOOP -------------------------------------------------------------

function update(delta) {
  // Player physics
  player.vy += 30 * delta; // gravity

  if (keys["a"]) player.vx = -10;
  else if (keys["d"]) player.vx = 10;
  else player.vx = 0;

  if (keys["w"] && player.onGround) {
    player.vy = -15;
    player.onGround = false;
  }

  // Apply movement
  player.x += player.vx * delta;
  player.y += player.vy * delta;

  // Collision with ground
  if (player.y >= worldHeight - 11) {
    player.y = worldHeight - 11;
    player.vy = 0;
    player.onGround = true;
  }

  // Clamp
  player.x = Math.max(0, Math.min(worldWidth - 1, player.x));

  // Update balls
  for (let b of balls) {
    b.vy += 20 * delta;
    b.y += b.vy * delta;

    if (b.y >= worldHeight - 11) {
      b.y = worldHeight - 11;
      b.vy = -10;
    }
  }
}

function render() {
  let output = "";

  // Camera follows player
  let camX = Math.floor(player.x - WIDTH / 2);
  camX = Math.max(0, Math.min(worldWidth - WIDTH, camX));

  for (let y = 0; y < HEIGHT; y++) {
    let wy = y + (worldHeight - HEIGHT);

    for (let x = 0; x < WIDTH; x++) {
      let wx = x + camX;

      let char = world[wy][wx];

      // Balls
      for (let b of balls) {
        if (Math.floor(b.x) === wx && Math.floor(b.y) === wy) {
          char = "o";
        }
      }

      // Player
      if (Math.floor(player.x) === wx && Math.floor(player.y) === wy) {
        char = "@";
      }

      output += char;
    }
    output += "\n";
  }

  screen.textContent = output;
}

let last = performance.now();
function loop(now) {
  let delta = (now - last) / 1000;
  last = now;

  update(delta);
  render();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
