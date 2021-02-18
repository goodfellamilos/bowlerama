const generateArrFromN = (n) =>
  Array.apply(null, { length: n }).map(Number.call, Number);

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { generateArrFromN, getRandomInt };
