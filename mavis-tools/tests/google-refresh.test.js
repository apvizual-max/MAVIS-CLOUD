const test = require('node:test');
const assert = require('node:assert/strict');
const child_process = require('child_process');
const path = require('path');
const { git } = require('../google-refresh.js');

test('google-refresh git wrapper tests', async (t) => {
  const rootDir = path.join(__dirname, '..', '..');

  await t.test('git() should execute command successfully and return output', (t) => {
    const mockOutput = 'mock git output\n';
    const mockMethod = t.mock.method(child_process, 'execFileSync', (cmd, args, opts) => {
      assert.equal(cmd, 'git');
      assert.deepEqual(args, ['status']);
      assert.equal(opts.cwd, rootDir);
      assert.equal(opts.encoding, 'utf8');
      assert.deepEqual(opts.stdio, ['ignore', 'pipe', 'pipe']); // quiet defaults to true
      return mockOutput;
    });

    const result = git(['status']);

    assert.equal(result, mockOutput);
    assert.equal(mockMethod.mock.calls.length, 1);
  });

  await t.test('git() should handle quiet = false', (t) => {
    const mockOutput = 'mock git output\n';
    const mockMethod = t.mock.method(child_process, 'execFileSync', (cmd, args, opts) => {
      assert.equal(cmd, 'git');
      assert.deepEqual(args, ['add', '.']);
      assert.equal(opts.cwd, rootDir);
      assert.equal(opts.encoding, 'utf8');
      assert.equal(opts.stdio, 'inherit'); // quiet is false
      return mockOutput;
    });

    const result = git(['add', '.'], false);

    assert.equal(result, mockOutput);
    assert.equal(mockMethod.mock.calls.length, 1);
  });

  await t.test('git() should catch exceptions and return null', (t) => {
    const mockMethod = t.mock.method(child_process, 'execFileSync', (cmd, args, opts) => {
      throw new Error('Command failed');
    });

    const result = git(['pull']);

    assert.equal(result, null);
    assert.equal(mockMethod.mock.calls.length, 1);
  });
});
