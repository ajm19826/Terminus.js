const Loop = require('./Loop');

class Engine {
  constructor({ scene, camera, renderer, controls } = {}) {
    this.scene = scene || null;
    this.camera = camera || null;
    this.renderer = renderer || null;
    this.controls = controls || null;

    this.loop = new Loop();
    this._boundUpdate = this._update.bind(this);

    this.loop.add(this._boundUpdate);
  }

  setScene(scene) {
    this.scene = scene;
  }

  setCamera(camera) {
    this.camera = camera;
  }

  setRenderer(renderer) {
    this.renderer = renderer;
  }

  setControls(controls) {
    this.controls = controls;
  }

  start() {
    if (!this.scene || !this.camera || !this.renderer) {
      throw new Error('Engine requires scene, camera, and renderer before start().');
    }
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }

  _update(delta) {
    if (this.controls && typeof this.controls.update === 'function') {
      this.controls.update(delta);
    }
    if (this.scene && typeof this.scene.update === 'function') {
      this.scene.update(delta);
    }
    this.renderer.render(this.scene, this.camera);
  }
}

module.exports = Engine;
