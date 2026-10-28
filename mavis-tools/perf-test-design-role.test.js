const test = require('node:test');
const assert = require('assert');
const { execSync } = require('child_process');
const fs = require('fs');

const tempFile = 'temp-benchmark.js';
const benchmarkTemplate = `
const DESIGN_KW = ['art director','creative director','creative lead','head of creative','brand director','advertising lead','campaign art director','ad conceptor','creative systems','art mid','senior creatives','creatives','art team',
  'graphic designer','visual designer','senior graphic','ui/ux','ux/ui','ux designer','ui designer','product designer','interaction designer','web designer','dtp designer','brand designer','identity designer','graphic design','visual design','content designer','content specialist','creative designer'];

// INJECT_IMPLEMENTATION

const start = performance.now();
for(let i=0; i<10000; i++) {
    isDesignRole('Senior ui/ux designer @ ACME');
    isDesignRole('Backend developer');
    isDesignRole('ux/ui expert');
    isDesignRole('Not a creative role');
    isDesignRole('art director full-time');
}
console.log(performance.now() - start);
`;

function bench(implCode) {
    fs.writeFileSync(tempFile, benchmarkTemplate.replace('// INJECT_IMPLEMENTATION', implCode));
    const output = execSync('node ' + tempFile).toString().trim();
    const ms = parseFloat(output);
    fs.unlinkSync(tempFile);
    return ms;
}

const origImpl = `
const _rxCache = new Map();
function hasWord(text, w) {
  let rx = _rxCache.get(w);
  if (!rx) {
    const esc = w.replace(/[.*+?^\\$\\{\\}()|\\[\\]\\\\\\\\/]/g, '\\\\$&');
    rx = new RegExp('(^|[^a-z0-9])' + esc + '($|[^a-z0-9])', 'i');
    _rxCache.set(w, rx);
  }
  return rx.test(text);
}
const isDesignRole = role => DESIGN_KW.some(k => hasWord(role || '', k));
`;

const optimizedImpl = `
const _designRegexStr = '(^|[^a-z0-9])(' + DESIGN_KW.map(k => k.replace(/[.*+?^\\$\\{\\}()|\\[\\]\\\\\\\\/]/g, '\\\\$&')).join('|') + ')($|[^a-z0-9])';
const _designRegex = new RegExp(_designRegexStr, 'i');
const isDesignRole = role => _designRegex.test(role || '');
`;

test('isDesignRole benchmark', async (t) => {
    await t.test('original implementation is slow (> 20ms)', () => {
        const ms = bench(origImpl);
        assert(ms > 20, "Original implementation was expected to be slow (>20ms), but took " + ms + "ms.");
    });

    await t.test('optimized RegExp implementation is fast (< 20ms)', () => {
        const ms = bench(optimizedImpl);
        assert(ms < 20, "Optimized implementation was expected to be fast (<20ms), but took " + ms + "ms.");
    });
});
