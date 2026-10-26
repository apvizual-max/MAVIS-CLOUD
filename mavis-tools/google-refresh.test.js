const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const child_process = require('child_process');

const { readClientConfig, git } = require('./google-refresh.js');

test('readClientConfig should return null on fs.readFileSync error', (t) => {
  // mock fs.readFileSync to throw an error
  t.mock.method(fs, 'readFileSync', () => {
    throw new Error('Mock error');
  });

  const config = readClientConfig();
  assert.strictEqual(config, null);
});

test('readClientConfig should return parsed JSON on success', (t) => {
  const mockConfig = { client_id: 'test_client_id' };
  t.mock.method(fs, 'readFileSync', () => {
    return JSON.stringify(mockConfig);
  });

  const config = readClientConfig();
  assert.deepStrictEqual(config, mockConfig);
});

test('git should return null on execFileSync error', (t) => {
  t.mock.method(child_process, 'execFileSync', () => {
    throw new Error('Mock error');
  });

  const result = git(['status']);
  assert.strictEqual(result, null);
});
