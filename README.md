# js-sample-repo

A small JavaScript sample repository for RAG ingestion and query tests. It provides a few modules with clear functions so an agent can answer questions about behavior, usage, and TODOs.

## License

MIT. See [LICENSE](LICENSE).

## Modules and functions

### `src/math.js`

- **`add(a, b)`** — Returns the sum of two numbers.
- **`multiply(a, b)`** — Returns the product of two numbers.
- **`square(n)`** — Returns `n * n` (uses `multiply` internally).

### `src/greet.js`

- **`greet(name, salutation?)`** — Returns a greeting string. Optional `salutation` defaults to `'Hello'`. If `name` is missing or not a string, returns a "Hello, World!" style message.
- **`farewell(name)`** — Returns a goodbye message (uses `greet` with `'Goodbye'`).

### `src/utils.js`

- **`clamp(value, min, max)`** — Clamps `value` between `min` and `max` (inclusive).
- **`sum(arr)`** — Sums an array of numbers (uses `math.add`).
- **`isPositiveInteger(value)`** — Returns `true` if `value` is a positive integer.

### `src/index.js`

Re-exports all public functions from the above modules.

## Running tests and examples

- **Run tests:** `npm test` (runs `tests/run-tests.js`).
- **Run usage example:** `npm run example` (runs `examples/usage.js`).

No dependencies required; uses Node built-ins only.

## TODOs and issues

See [TODO.md](TODO.md) for planned improvements. Some in-code TODOs/FIXMEs are present in `src/utils.js`.
