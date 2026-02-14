class CharRamp {
  constructor(chars = ' .:-=+*#%@') {
    this.setRamp(chars);
  }

  setRamp(chars) {
    this.chars = chars;
    this.length = chars.length;
  }

  getChar(normalized) {
    const t = Math.max(0, Math.min(1, normalized));
    const index = Math.floor(t * (this.length - 1));
    return this.chars[index];
  }
}

module.exports = CharRamp;
