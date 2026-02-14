const { clamp } = require('../utils/MathUtils');

class OrbitControls {
  constructor(camera, {
    rotateSpeed = 60,
    zoomSpeed = 1,
    panSpeed = 0.5
  } = {}) {
    this.camera = camera;
    this.rotateSpeed = rotateSpeed;
    this.zoomSpeed = zoomSpeed;
    this.panSpeed = panSpeed;

    this._enabled = true;
    this._stdin = process.stdin;
    this._mouseEnabled = false;

    this._bindKeyboard();
    this._enableMouseTracking();
  }

  setEnabled(enabled) {
    this._enabled = enabled;
  }

  _bindKeyboard() {
    this._stdin.setRawMode(true);
    this._stdin.resume();
    this._stdin.setEncoding('utf8');

    this._stdin.on('data', (key) => {
      if (!this._enabled) return;

      // Ctrl+C
      if (key === '\u0003') {
        process.exit();
      }

      // Arrow keys and WASD
      if (key === '\u001b[A') { // up
        this.camera.orbit(0, this.rotateSpeed * 0.02);
      } else if (key === '\u001b[B') { // down
        this.camera.orbit(0, -this.rotateSpeed * 0.02);
      } else if (key === '\u001b[C') { // right
        this.camera.orbit(this.rotateSpeed * 0.02, 0);
      } else if (key === '\u001b[D') { // left
        this.camera.orbit(-this.rotateSpeed * 0.02, 0);
      } else if (key === '+') {
        this.camera.zoom(-this.zoomSpeed);
      } else if (key === '-') {
        this.camera.zoom(this.zoomSpeed);
      } else if (key === 'w') {
        this.camera.pan(0, this.panSpeed);
      } else if (key === 's') {
        this.camera.pan(0, -this.panSpeed);
      } else if (key === 'a') {
        this.camera.pan(-this.panSpeed, 0);
      } else if (key === 'd') {
        this.camera.pan(this.panSpeed, 0);
      }
    });
  }

  _enableMouseTracking() {
    // Enable xterm mouse tracking (button + motion)
    this._mouseEnabled = true;
    const stdout = process.stdout;
    stdout.write('\x1b[?1003h'); // enable all motion tracking

    this._stdin.on('data', (data) => {
      if (!this._enabled || !this._mouseEnabled) return;
      if (typeof data !== 'string') return;

      // Mouse events start with ESC [
      if (!data.startsWith('\x1b[')) return;

      // Very simple parser for SGR mouse mode: \x1b[<b;x;yM or m
      const match = /\x1b

\[<(\d+);(\d+);(\d+)([mM])/.exec(data);
      if (!match) return;

      const btn = parseInt(match[1], 10);
      const x = parseInt(match[2], 10);
      const y = parseInt(match[3], 10);

      // Use vertical movement for zoom, horizontal for orbit
      if (btn === 32) { // motion with left button
        const dx = (x - this._lastMouseX) || 0;
        const dy = (y - this._lastMouseY) || 0;
        this.camera.orbit(dx * 0.5, -dy * 0.5);
      } else if (btn === 64) { // wheel up
        this.camera.zoom(-this.zoomSpeed * 0.5);
      } else if (btn === 65) { // wheel down
        this.camera.zoom(this.zoomSpeed * 0.5);
      }

      this._lastMouseX = x;
      this._lastMouseY = y;
    });
  }

  update() {
    this.camera.updateCamera();
  }
}

module.exports = OrbitControls;
