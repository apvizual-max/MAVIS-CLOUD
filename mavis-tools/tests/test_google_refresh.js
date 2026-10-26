const { test, describe, mock } = require('node:test');
const assert = require('node:assert/strict');
const child_process = require('child_process');
const fs = require('fs');
const { git, readClientConfig } = require('../google-refresh.js');

describe('google-refresh.js git wrapper tests', () => {
  test('git function returns null when execFileSync throws an error', () => {
    mock.method(child_process, 'execFileSync', () => {
      throw new Error('Command failed');
    });

    const result = git(['status']);
    assert.equal(result, null);

    mock.reset();
  });

  test('git function returns output when execFileSync succeeds', () => {
    mock.method(child_process, 'execFileSync', () => {
      return 'success output';
    });

    const result = git(['status']);
    assert.equal(result, 'success output');

    mock.reset();
  });
});

describe('google-refresh.js readClientConfig tests', () => {
  test('readClientConfig returns null when fs.readFileSync throws an error', () => {
    mock.method(fs, 'readFileSync', () => {
      throw new Error('File not found');
    });

    const result = readClientConfig();
    assert.equal(result, null);

    mock.reset();
  });
});
