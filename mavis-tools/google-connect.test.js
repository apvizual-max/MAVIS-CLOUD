const test = require('node:test');
const assert = require('node:assert/strict');
const { extractCode } = require('./google-connect.js');

test('extractCode', async (t) => {
  await t.test('extracts code from valid URL', () => {
    assert.equal(extractCode('http://127.0.0.1:8976/callback?code=4/0AX4XfWi...'), '4/0AX4XfWi...');
  });

  await t.test('extracts code and decodes URI components', () => {
    assert.equal(extractCode('http://127.0.0.1:8976/callback?code=4%2F0AX4XfWi...'), '4/0AX4XfWi...');
  });

  await t.test('extracts code when multiple query params exist', () => {
    assert.equal(extractCode('http://127.0.0.1:8976/callback?state=123&code=my_code&foo=bar'), 'my_code');
  });

  await t.test('returns code if input is raw valid string', () => {
    assert.equal(extractCode('4/0AX4XfWi-abc._'), '4/0AX4XfWi-abc._');
  });

  await t.test('returns null if input is missing code param', () => {
    assert.equal(extractCode('http://127.0.0.1:8976/callback?state=123'), null);
  });

  await t.test('returns null for empty/invalid inputs', () => {
    assert.equal(extractCode(''), null);
    assert.equal(extractCode(null), null);
    assert.equal(extractCode(undefined), null);
  });

  await t.test('returns null for raw code with invalid characters', () => {
    assert.equal(extractCode('invalid!code'), null);
  });
});
