/**
 * Usage examples for the sample JS repo. Run with: npm run example
 */

const { add, square, greet, clamp, sum } = require('../src/index.js');

console.log('Math:', add(10, 20), square(7));
console.log('Greet:', greet('RAG'));
console.log('Clamp 15 to [0,10]:', clamp(15, 0, 10));
console.log('Sum [1,2,3,4,5]:', sum([1, 2, 3, 4, 5]));
