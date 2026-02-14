const Cube = require('./Cube');

class Box extends Cube {
  constructor(opts = {}) {
    super(opts);
  }
}

module.exports = Box;
