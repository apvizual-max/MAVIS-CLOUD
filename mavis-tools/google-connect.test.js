const test = require('node:test');
const assert = require('node:assert/strict');
const { extractCode } = require('./google-connect.js');

test('extractCode handles falsy and empty inputs', () => {
  assert.equal(extractCode(undefined), null);
  assert.equal(extractCode(null), null);
  assert.equal(extractCode(''), null);
  assert.equal(extractCode('   '), null);
});

test('extractCode extracts code from url', () => {
  assert.equal(extractCode('http://localhost/?code=somecode'), 'somecode');
  assert.equal(extractCode('http://localhost/?foo=bar&code=somecode'), 'somecode');
  assert.equal(extractCode('http://localhost/?code=some%20code'), 'some code');
});

test('extractCode returns null for urls missing code query', () => {
  assert.equal(extractCode('http://localhost/?foo=bar'), null);
  assert.equal(extractCode('http://localhost/'), null);
});

test('extractCode returns plain code string', () => {
  assert.equal(extractCode('valid-code'), 'valid-code');
  assert.equal(extractCode('valid_code'), 'valid_code');
  assert.equal(extractCode('valid.code'), 'valid.code');
});

test('extractCode returns null for invalid string', () => {
  assert.equal(extractCode('invalid code!'), null);
  assert.equal(extractCode('code with spaces'), null);
});
