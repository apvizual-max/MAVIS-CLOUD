const test = require('node:test');
const assert = require('node:assert/strict');
const { extractCode } = require('./google-connect.js');

test('extractCode handles empty and falsy inputs', () => {
  assert.equal(extractCode(null), null);
  assert.equal(extractCode(undefined), null);
  assert.equal(extractCode(''), null);
  assert.equal(extractCode('   '), null);
});

test('extractCode extracts code from URL with ?code=', () => {
  assert.equal(
    extractCode('http://localhost/?code=4/0AeaYSHB'),
    '4/0AeaYSHB'
  );
});

test('extractCode extracts code from URL with &code=', () => {
  assert.equal(
    extractCode('http://localhost/?state=xyz&code=4/0AeaYSHB&scope=email'),
    '4/0AeaYSHB'
  );
});

test('extractCode decodes URI components in the extracted code', () => {
  assert.equal(
    extractCode('http://localhost/?code=4%2F0AeaYSHB'),
    '4/0AeaYSHB'
  );
});

test('extractCode returns raw input if it matches the alphanumeric/URL-safe pattern', () => {
  assert.equal(extractCode('4/0AeaYSHB-xyz_123.abc'), '4/0AeaYSHB-xyz_123.abc');
});

test('extractCode returns null for URLs missing the code parameter', () => {
  assert.equal(
    extractCode('http://localhost/?state=xyz&scope=email'),
    null
  );
});
