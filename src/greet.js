/**
 * Greeting utilities.
 */

/**
 * Returns a greeting string for the given name.
 * @param {string} name - Name to greet
 * @param {string} [salutation='Hello'] - Optional salutation
 * @returns {string} Greeting message
 */
function greet(name, salutation = 'Hello') {
  if (typeof salutation !== 'string') {
    salutation = 'Hello';
  }
  if (!name || typeof name !== 'string') {
    return salutation + ', World!';
  }
  return `${salutation}, ${name.trim()}!`;
}

/**
 * Returns a farewell message.
 * @param {string} name - Name to say goodbye to
 * @returns {string} Farewell message
 */
function farewell(name) {
  return greet(name, 'Goodbye');
}

module.exports = { greet, farewell };
