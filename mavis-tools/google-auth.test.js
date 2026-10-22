const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');
const { readJson } = require('./google-auth.js');

test('readJson handles non-existent file', () => {
  const result = readJson(path.join(os.tmpdir(), 'this-file-will-never-exist-' + Date.now() + '.json'));
  assert.equal(result, null);
});

test('readJson successfully reads valid JSON', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'google-auth-test-'));
  const tempPath = path.join(tempDir, 'test-valid.json');
  fs.writeFileSync(tempPath, JSON.stringify({ key: 'value' }));

  try {
    const result = readJson(tempPath);
    assert.deepEqual(result, { key: 'value' });
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('readJson handles invalid JSON', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'google-auth-test-'));
  const tempPath = path.join(tempDir, 'test-invalid.json');
  fs.writeFileSync(tempPath, '{ key: value'); // Invalid JSON

  try {
    const result = readJson(tempPath);
    assert.equal(result, null);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});
