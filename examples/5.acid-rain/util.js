export function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx ** 2 + dy ** 2);
}
