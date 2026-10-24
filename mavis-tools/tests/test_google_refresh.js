const { test, describe, mock } = require('node:test');
const assert = require('node:assert/strict');
const child_process = require('child_process');
const { git } = require('../google-refresh.js');

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
