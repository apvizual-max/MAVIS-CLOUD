const test = require('node:test');
const assert = require('node:assert/strict');

const { extractCode } = require('../google-connect.js');

test('extractCode - basic extraction', () => {
    assert.equal(extractCode('http://127.0.0.1:8976/callback?code=4/0Ad-something'), '4/0Ad-something');
    assert.equal(extractCode('http://127.0.0.1:8976/callback?code=some_code_123-'), 'some_code_123-');
    assert.equal(extractCode('https://example.com/?a=1&code=4/0Ad_something&b=2'), '4/0Ad_something');
});

test('extractCode - raw code', () => {
    // raw code matching /^[A-Za-z0-9._\-]+$/ or /^[A-Za-z0-9._\-/]+$/
    assert.equal(extractCode('4_0Ad-123_abc.'), '4_0Ad-123_abc.');
    assert.equal(extractCode('code123'), 'code123');
});

test('extractCode - empty and falsy inputs', () => {
    assert.equal(extractCode(''), null);
    assert.equal(extractCode('   '), null);
    assert.equal(extractCode(null), null);
    assert.equal(extractCode(undefined), null);
});

test('extractCode - missing code query or invalid URL', () => {
    assert.equal(extractCode('http://127.0.0.1:8976/callback'), null);
    assert.equal(extractCode('http://127.0.0.1:8976/callback?notcode=123'), null);
    assert.equal(extractCode('invalid url !'), null);
});

test('extractCode - URI decoding', () => {
    assert.equal(extractCode('http://localhost/?code=abc%20def'), 'abc def');
});
