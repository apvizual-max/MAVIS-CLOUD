const assert = require('node:assert');
const { test } = require('node:test');
const { performance } = require('node:perf_hooks');
const { isDesignRole } = require('./report-build.js');

// Benchmark measuring the imported isDesignRole function from report-build.js
test('report-build isDesignRole performance benchmark', () => {
  const sampleTitles = [
    'Senior Art Director & Creative Lead',
    'Lead Product Designer (UI/UX)',
    'Graphic Designer and Visual Content Specialist',
    'Software Engineer - Full Stack Node.js',
    'Marketing Specialist & Community Manager',
    'Senior DTP Designer & Print Specialist',
    'Creative Systems Manager & Brand Director',
    'Account Manager / Client Service',
    'Junior Web Designer & Front-End Developer',
    'Head of Creative & Campaign Art Director'
  ];

  const iterations = 100000;
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    const title = sampleTitles[i % sampleTitles.length];
    isDesignRole(title);
  }
  const duration = performance.now() - start;
  console.log(`[BENCHMARK REPORT-BUILD] ${iterations} iterations executed in ${duration.toFixed(2)} ms`);
  // Performance threshold constraint: 100,000 iterations must complete within 150 ms (old unoptimized version took ~181.77 ms)
  assert.ok(duration < 150, `Expected duration under 150ms, got ${duration.toFixed(2)}ms`);
});
