const DEG2RAD = Math.PI / 180;

function degToRad(deg) {
  return deg * DEG2RAD;
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

module.exports = {
  degToRad,
  clamp
};
