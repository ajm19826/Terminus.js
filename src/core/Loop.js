class Loop {
  constructor() {
    this._running = false;
    this._lastTime = 0;
    this._callbacks = new Set();
  }

  add(callback) {
    this._callbacks.add(callback);
  }

  remove(callback) {
    this._callbacks.delete(callback);
  }

  start() {
    if (this._running) return;
    this._running = true;
    this._lastTime = Date.now();
    this._tick();
  }

  stop() {
    this._running = false;
  }

  _tick() {
    if (!this._running) return;
    const now = Date.now();
    const delta = (now - this._lastTime) / 1000;
    this._lastTime = now;

    for (const cb of this._callbacks) {
      cb(delta);
    }

    setImmediate(() => this._tick());
  }
}

module.exports = Loop;
