const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');

const { readClientConfig, hasLiveToken } = require('./google-refresh.js');

test('readClientConfig should return null on fs.readFileSync error', (t) => {
  // mock fs.readFileSync to throw an error
  t.mock.method(fs, 'readFileSync', () => {
    throw new Error('Mock error');
  });

  const config = readClientConfig();
  assert.strictEqual(config, null);
});


test('hasLiveToken should return false if no token in env', () => {
  const originalMavis = process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD;
  const originalToken = process.env.GOOGLE_REFRESH_TOKEN;
  delete process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD;
  delete process.env.GOOGLE_REFRESH_TOKEN;
  assert.strictEqual(hasLiveToken(), false);
  if (originalMavis !== undefined) process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD = originalMavis;
  if (originalToken !== undefined) process.env.GOOGLE_REFRESH_TOKEN = originalToken;
});

test('hasLiveToken should return false if token is too short', () => {
  const originalMavis = process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD;
  process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD = 'short';
  assert.strictEqual(hasLiveToken(), false);
  if (originalMavis !== undefined) process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD = originalMavis;
  else delete process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD;
});

test('hasLiveToken should return true if token is > 40 chars', () => {
  const originalMavis = process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD;
  process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD = '1//0e-invalid-token-id-invalid-token-id-invalid-token-id';
  assert.strictEqual(hasLiveToken(), true);
  if (originalMavis !== undefined) process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD = originalMavis;
  else delete process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD;
});
