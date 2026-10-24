const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const { hasLiveToken } = require('../google-refresh.js');

describe('google-refresh.js', () => {
  describe('hasLiveToken', () => {
    let originalEnv;

    beforeEach(() => {
      originalEnv = { ...process.env };
      // Delete relevant keys to ensure a clean slate
      delete process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD;
      delete process.env.GOOGLE_REFRESH_TOKEN;
    });

    afterEach(() => {
      // Restore the environment
      process.env = { ...originalEnv };
    });

    test('returns true when GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD is valid (>40 chars)', () => {
      process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD = '1//0e1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_12345'; // length 73
      assert.strictEqual(hasLiveToken(), true);
    });

    test('returns true when GOOGLE_REFRESH_TOKEN is valid (>40 chars)', () => {
      process.env.GOOGLE_REFRESH_TOKEN = '1//0e1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_12345';
      assert.strictEqual(hasLiveToken(), true);
    });

    test('prioritizes GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD when both are present', () => {
      process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD = '1//0e1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_12345';
      process.env.GOOGLE_REFRESH_TOKEN = 'short';
      // It checks MAVIS_CLOUD first, which is valid, so it returns true
      assert.strictEqual(hasLiveToken(), true);
    });

    test('returns false when tokens are missing', () => {
      assert.strictEqual(hasLiveToken(), false);
    });

    test('returns false when GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD is too short (<=40 chars)', () => {
      process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD = '1//0eshort_token_value_less_than_40_chars'; // length 41
      assert.strictEqual(hasLiveToken(), true);

      process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD = '1//0eshort_token_value_less_than_40_char'; // length 40
      assert.strictEqual(hasLiveToken(), false);
    });

    test('returns false when GOOGLE_REFRESH_TOKEN is too short (<=40 chars)', () => {
      process.env.GOOGLE_REFRESH_TOKEN = '1//0eshort_token_value_less_than_40_char'; // length 40
      assert.strictEqual(hasLiveToken(), false);
    });
  });
});
