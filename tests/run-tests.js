/**
 * Simple test runner (no Jest dependency). Run with: node tests/run-tests.js
 * Used by RAG tests to verify behavior of this sample repo.
 */

const path = require('path');
const { add, multiply, square } = require('../src/math');
const { greet, farewell } = require('../src/greet');
const { clamp, sum, isPositiveInteger } = require('../src/utils');

function assert(condition, message, actual, expected) {
  if (!condition) {
    const detail = (actual !== undefined && expected !== undefined)
      ? ` Actual: ${actual}, Expected: ${expected}` : '';
    throw new Error('Assertion failed: ' + message + detail);
  }
}

function run() {
  // math
  assert(add(1, 2) === 3, 'add(1, 2) === 3', add(1, 2), 3);
  assert(multiply(3, 4) === 12, 'multiply(3, 4) === 12', multiply(3, 4), 12);
  assert(square(5) === 25, 'square(5) === 25', square(5), 25);
  assert(add(0, 0) === 0, 'add(0, 0) === 0');
  assert(multiply(-1, 3) === -3, 'multiply(-1, 3) === -3');
  assert(square(0) === 0, 'square(0) === 0');

  // greet
  assert(greet('Alice') === 'Hello, Alice!', 'greet("Alice")');
  assert(greet('Bob', 'Hi') === 'Hi, Bob!', 'greet with salutation');
  assert(greet() === 'Hello, World!', 'greet() default');

  // utils
  assert(clamp(10, 0, 5) === 5, 'clamp high');
  assert(clamp(-1, 0, 5) === 0, 'clamp low');
  assert(sum([1, 2, 3]) === 6, 'sum array');
  assert(isPositiveInteger(1) === true && isPositiveInteger(0) === false, 'isPositiveInteger');

  console.log('All tests passed.');
}

run();
