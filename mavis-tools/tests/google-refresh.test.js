const { test, mock } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');

const { readClientConfig } = require('../google-refresh.js');

test('readClientConfig - success', () => {
    mock.method(fs, 'readFileSync', (path, enc) => {
        return JSON.stringify({ client_id: 'test_client_id' });
    });

    const cfg = readClientConfig();
    assert.deepEqual(cfg, { client_id: 'test_client_id' });

    mock.restoreAll();
});

test('readClientConfig - fails and returns null when fs throws', () => {
    mock.method(fs, 'readFileSync', (path, enc) => {
        throw new Error('File not found');
    });

    const cfg = readClientConfig();
    assert.equal(cfg, null);

    mock.restoreAll();
});

test('readClientConfig - fails and returns null on bad JSON', () => {
    mock.method(fs, 'readFileSync', (path, enc) => {
        return 'invalid json string';
    });

    const cfg = readClientConfig();
    assert.equal(cfg, null);

    mock.restoreAll();
});
