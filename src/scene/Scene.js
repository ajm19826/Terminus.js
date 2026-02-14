const Object3D = require('./Object3D');

class Scene extends Object3D {
  constructor() {
    super();
    this._objects = [];
  }

  add(object) {
    super.add(object);
    this._objects.push(object);
  }

  remove(object) {
    super.remove(object);
    const i = this._objects.indexOf(object);
    if (i !== -1) this._objects.splice(i, 1);
  }

  getObjects() {
    return this._objects;
  }
}

module.exports = Scene;
