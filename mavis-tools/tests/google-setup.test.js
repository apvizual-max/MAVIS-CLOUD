const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');

const { credsFromEnv } = require('../google-setup.js');

describe('credsFromEnv', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  test('returns null when both GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are missing', () => {
    delete process.env.GOOGLE_CLIENT_ID;
    delete process.env.GOOGLE_CLIENT_SECRET;

    assert.equal(credsFromEnv(), null);
  });

  test('returns null when only GOOGLE_CLIENT_ID is present', () => {
    process.env.GOOGLE_CLIENT_ID = 'test-id';
    delete process.env.GOOGLE_CLIENT_SECRET;

    assert.equal(credsFromEnv(), null);
  });

  test('returns null when only GOOGLE_CLIENT_SECRET is present', () => {
    delete process.env.GOOGLE_CLIENT_ID;
    process.env.GOOGLE_CLIENT_SECRET = 'test-secret';

    assert.equal(credsFromEnv(), null);
  });

  test('returns correct object when both vars are present', () => {
    process.env.GOOGLE_CLIENT_ID = 'test-id';
    process.env.GOOGLE_CLIENT_SECRET = 'test-secret';

    const result = credsFromEnv();

    assert.deepEqual(result, {
      client_id: 'test-id',
      client_secret: 'test-secret',
      kind: 'env'
    });
  });

  test('returns null when vars are empty strings', () => {
    process.env.GOOGLE_CLIENT_ID = '';
    process.env.GOOGLE_CLIENT_SECRET = 'test-secret';
    assert.equal(credsFromEnv(), null, 'Empty string should be treated as missing due to falsy check');

    process.env.GOOGLE_CLIENT_ID = 'test-id';
    process.env.GOOGLE_CLIENT_SECRET = '';
    assert.equal(credsFromEnv(), null, 'Empty string should be treated as missing due to falsy check');
  });
});
