let seed = Date.now() % 100000;

export function getDeterministicRandom() {
  seed = (seed * 48271) % 2147483647;
  return seed / 2147483647;
}