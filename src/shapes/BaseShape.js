const Object3D = require('../scene/Object3D');

const TMeasurements = {
  Inches: 'in',
  Centimeters: 'cm',
  Meters: 'm',
  Units: 'u'
};

class BaseShape extends Object3D {
  constructor() {
    super();
    this.geometry = { vertices: [], normals: [], indices: [] };

    this._volumeUnit = TMeasurements.Units;
    this._volume = 0;

    this._lengthA = 1;
    this._lengthB = 1;
    this._lengthC = 1;

    this._defineVolumeAPI();
  }

  _defineVolumeAPI() {
    Object.defineProperty(this, 'Volume', {
      get: () => this._volume,
      set: (v) => {
        this._volume = v;
      }
    });

    Object.defineProperty(this, 'LengthA', {
      get: () => this._lengthA,
      set: (v) => {
        this._lengthA = v;
        this._onDimensionsChanged();
      }
    });

    Object.defineProperty(this, 'LengthB', {
      get: () => this._lengthB,
      set: (v) => {
        this._lengthB = v;
        this._onDimensionsChanged();
      }
    });

    Object.defineProperty(this, 'LengthC', {
      get: () => this._lengthC,
      set: (v) => {
        this._lengthC = v;
        this._onDimensionsChanged();
      }
    });
  }

  Volume(unit) {
    if (unit) {
      this._volumeUnit = unit;
    }
    return this._volume;
  }

  _initDimensions(a, b, c) {
    this._lengthA = a;
    this._lengthB = b;
    this._lengthC = c;
  }

  _onDimensionsChanged() {
    // Overridden by subclasses to rebuild geometry when LengthA/B/C change.
  }
}

BaseShape.TMeasurements = TMeasurements;

module.exports = BaseShape;
