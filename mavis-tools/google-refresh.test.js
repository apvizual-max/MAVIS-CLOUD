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

test('readClientConfig should return parsed JSON on success', (t) => {
  const mockConfig = { client_id: 'test_client_id' };
  t.mock.method(fs, 'readFileSync', () => {
    return JSON.stringify(mockConfig);
  });

  const config = readClientConfig();
  assert.deepStrictEqual(config, mockConfig);
});

test('hasLiveToken should return false when no tokens are set', () => {
  const originalMavis = process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD;
  const originalNormal = process.env.GOOGLE_REFRESH_TOKEN;
  delete process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD;
  delete process.env.GOOGLE_REFRESH_TOKEN;

  assert.strictEqual(hasLiveToken(), false);

  if (originalMavis !== undefined) process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD = originalMavis;
  if (originalNormal !== undefined) process.env.GOOGLE_REFRESH_TOKEN = originalNormal;
});

test('hasLiveToken should return false when token length is 40 or less', () => {
  const originalMavis = process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD;
  const originalNormal = process.env.GOOGLE_REFRESH_TOKEN;

  process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD = 'a'.repeat(40);
  delete process.env.GOOGLE_REFRESH_TOKEN;
  assert.strictEqual(hasLiveToken(), false);

  delete process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD;
  process.env.GOOGLE_REFRESH_TOKEN = 'b'.repeat(40);
  assert.strictEqual(hasLiveToken(), false);

  if (originalMavis !== undefined) process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD = originalMavis;
  if (originalNormal !== undefined) process.env.GOOGLE_REFRESH_TOKEN = originalNormal;
});

test('hasLiveToken should return true when MAVIS_CLOUD token length > 40', () => {
  const originalMavis = process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD;
  const originalNormal = process.env.GOOGLE_REFRESH_TOKEN;

  process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD = 'c'.repeat(41);
  delete process.env.GOOGLE_REFRESH_TOKEN;
  assert.strictEqual(hasLiveToken(), true);

  if (originalMavis !== undefined) process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD = originalMavis;
  if (originalNormal !== undefined) process.env.GOOGLE_REFRESH_TOKEN = originalNormal;
});

test('hasLiveToken should return true when standard token length > 40', () => {
  const originalMavis = process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD;
  const originalNormal = process.env.GOOGLE_REFRESH_TOKEN;

  delete process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD;
  process.env.GOOGLE_REFRESH_TOKEN = 'd'.repeat(41);
  assert.strictEqual(hasLiveToken(), true);

  if (originalMavis !== undefined) process.env.GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD = originalMavis;
  if (originalNormal !== undefined) process.env.GOOGLE_REFRESH_TOKEN = originalNormal;
});
