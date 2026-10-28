const { test } = require('node:test');
const assert = require('node:assert/strict');
const { isDesignRole, DESIGN_KW } = require('./report-build.js');

// Old implementation for benchmark comparison
const _rxCache = new Map();
function hasWordOld(text, w) {
  let rx = _rxCache.get(w);
  if (!rx) {
    const esc = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    rx = new RegExp('(^|[^a-z0-9])' + esc + '($|[^a-z0-9])', 'i');
    _rxCache.set(w, rx);
  }
  return rx.test(text);
}
const isDesignRoleOld = role => DESIGN_KW.some(k => hasWordOld(role || '', k));

test('isDesignRole correctness check across edge cases', () => {
  const sampleRoles = [
    { role: 'Senior Art Director', expected: true },
    { role: 'Creative Director', expected: true },
    { role: 'UI/UX Designer & Lead', expected: true },
    { role: 'brand director', expected: true },
    { role: 'Graphic Design Specialist', expected: true },
    { role: 'Product Designer (Design Systems)', expected: true },
    { role: 'Software Engineer', expected: false },
    { role: 'Backend Developer / Java', expected: false },
    { role: 'artistic director', expected: false },
    { role: 'creative', expected: false },
    { role: '', expected: false },
    { role: null, expected: false },
  ];

  for (const { role, expected } of sampleRoles) {
    assert.equal(isDesignRoleOld(role), expected, `Old mismatch for: ${role}`);
    assert.equal(isDesignRole(role), expected, `New mismatch for: ${role}`);
  }
});

test('isDesignRole performance benchmark', () => {
  const testSet = [
    'Senior Visual & UI/UX Designer',
    'Software Engineer / Fullstack Developer',
    'Creative Director & Art Lead',
    'Product Marketing Specialist',
    'Graphic Designer & Brand Designer',
    'Data Analyst / Business Intelligence'
  ];

  const iterations = 100000;

  const t0 = performance.now();
  for (let i = 0; i < iterations; i++) {
    for (const r of testSet) isDesignRoleOld(r);
  }
  const tOld = performance.now() - t0;

  const t1 = performance.now();
  for (let i = 0; i < iterations; i++) {
    for (const r of testSet) isDesignRole(r);
  }
  const tNew = performance.now() - t1;

  console.log(`\nBenchmark (${iterations * testSet.length} calls):`);
  console.log(`  Old isDesignRole duration: ${tOld.toFixed(2)} ms`);
  console.log(`  New isDesignRole duration: ${tNew.toFixed(2)} ms`);
  console.log(`  Speedup: ${(tOld / tNew).toFixed(2)}x`);

  assert.ok(tNew < tOld, 'New implementation should be faster than old implementation');
});
