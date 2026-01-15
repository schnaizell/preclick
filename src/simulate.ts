// Deterministic pseudo-random generator
// Seed is initialized from session start time to provide
// user-specific variation while keeping internal consistency.
// This is intentional: outcomes are not truly random, but reproducible.

let seed = Date.now() % 100000;

export function getDeterministicRandom() {
  seed = (seed * 48271) % 2147483647;
  return seed / 2147483647;
}