/**
 * General utility functions.
 */

const { add } = require('./math');

/**
 * Clamps a number between min and max (inclusive).
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum bound
 * @param {number} max - Maximum bound
 * @returns {number} Clamped value
 */
function clamp(value, min, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/**
 * Sums an array of numbers. Uses math.add for consistency.
 * TODO: Support bigint and avoid floating-point drift for long arrays.
 * @param {number[]} arr - Array of numbers
 * @returns {number} Sum
 */
function sum(arr) {
  if (!Array.isArray(arr)) return 0;
  return arr.reduce((acc, n) => add(acc, n), 0);
}

/**
 * FIXME: Consider moving to a dedicated validation module.
 * Checks if value is a positive integer.
 * @param {*} value - Value to check
 * @returns {boolean}
 */
function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

module.exports = { clamp, sum, isPositiveInteger };
