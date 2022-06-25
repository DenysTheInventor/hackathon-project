export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

export function generateColor() {
  const color =
    "rgb(" +
    Math.round(Math.random() * 255) +
    "," +
    Math.round(Math.random() * 255) +
    "," +
    Math.round(Math.random() * 255) +
    ")";
  return color;
}