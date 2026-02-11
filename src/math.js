/**
 * Simple math utilities for sample RAG scenarios.
 */

/**
 * Adds two numbers.
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function add(a, b) {
  return a + b;
}

/**
 * Multiplies two numbers.
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Product of a and b
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Returns the square of a number.
 * @param {number} n - Input number
 * @returns {number} n * n
 */
function square(n) {
  return multiply(n, n);
}

module.exports = { add, multiply, square };
