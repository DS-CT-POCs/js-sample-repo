/**
 * Re-exports public API for the sample JS repo.
 */

const math = require('./math');
const greet = require('./greet');
const utils = require('./utils');

module.exports = {
  ...math,
  ...greet,
  ...utils,
};
