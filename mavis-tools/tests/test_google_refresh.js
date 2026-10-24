const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('fs');
const { mock } = require('node:test');

test('google-refresh: readClientConfig throws exception returns null', (t) => {
    // Require the module first before mocking fs, since require uses fs
    const googleRefresh = require('../google-refresh.js');

    // Now we mock fs.readFileSync to throw
    mock.method(fs, 'readFileSync', () => {
        throw new Error('File not found');
    });

    const result = googleRefresh.readClientConfig();

    assert.equal(result, null);

    // Restore mock is handled by node:test after the test completes
});
