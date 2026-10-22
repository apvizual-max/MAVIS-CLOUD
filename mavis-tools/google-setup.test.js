const { test, mock } = require('node:test');
const assert = require('node:assert/strict');
const child_process = require('child_process');
const { openBrowser } = require('./google-setup.js');

test('google-setup openBrowser fallback on exec error', () => {
  let execCalled = false;
  let execCommand = '';
  // Mock child_process.exec to throw an error
  mock.method(child_process, 'exec', (cmd, cb) => {
    execCalled = true;
    execCommand = cmd;
    throw new Error('Simulated exec failure');
  });

  // openBrowser should not throw an exception (it catches and ignores it)
  assert.doesNotThrow(() => {
    openBrowser('http://example.com');
  });

  // Verify it was called once
  assert.equal(execCalled, true);
  assert.ok(execCommand.includes('http://example.com'));

  mock.restoreAll();
});
