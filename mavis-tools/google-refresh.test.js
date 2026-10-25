const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const child_process = require('child_process');

const { git, readClientConfig } = require('./google-refresh.js');

test('readClientConfig should return null on fs.readFileSync error', (t) => {
  // mock fs.readFileSync to throw an error
  t.mock.method(fs, 'readFileSync', () => {
    throw new Error('Mock error');
  });

  const config = readClientConfig();
  assert.strictEqual(config, null);
});

test('git should return null when child_process.execFileSync throws an error', (t) => {
  t.mock.method(child_process, 'execFileSync', () => {
    throw new Error('Mock git error');
  });

  const result = git(['status']);
  assert.strictEqual(result, null);
});
