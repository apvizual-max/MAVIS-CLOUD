const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { detectPain } = require('./letter-engine.js');

describe('ALEX-KIT/letter-engine unit tests', () => {

  describe('detectPain', () => {
    test('handles empty inputs gracefully', () => {
      assert.deepEqual(detectPain(null, null), { key: 'system', line: 'coerența și scalabilitatea sistemului vizual' });
      assert.deepEqual(detectPain('', ''), { key: 'system', line: 'coerența și scalabilitatea sistemului vizual' });
    });

    test('detects "volume" pain correctly', () => {
      const expected = { key: 'volume', line: 'produce la volum fără să diluezi calitatea' };
      assert.deepEqual(detectPain('we need fast turnaround', 'designer'), expected);
      assert.deepEqual(detectPain('', 'High-volume production lead'), expected);
      assert.deepEqual(detectPain('speed is key', ''), expected);
    });

    test('detects "system" pain correctly', () => {
      const expected = { key: 'system', line: 'coerența brandului între pod-uri și echipe' };
      assert.deepEqual(detectPain('we lack brand system', 'designer'), expected);
      assert.deepEqual(detectPain('consistency across platforms', ''), expected);
      assert.deepEqual(detectPain('design governance is broken', ''), expected);
    });

    test('detects "conversion" pain correctly', () => {
      const expected = { key: 'conversion', line: 'câștigul comercial pe care designul îl susține' };
      assert.deepEqual(detectPain('increase conversion rate', ''), expected);
      assert.deepEqual(detectPain('focus on ROAS', ''), expected);
      assert.deepEqual(detectPain('grow revenue and sales', ''), expected);
      assert.deepEqual(detectPain('DTC performance marketing', ''), expected);
    });

    test('detects "complex" pain correctly', () => {
      const expected = { key: 'complex', line: 'traducerea conținutului complex în vizual limpede' };
      assert.deepEqual(detectPain('simplify complex data', ''), expected);
      assert.deepEqual(detectPain('technical content needs clarity', ''), expected);
      assert.deepEqual(detectPain('dense information', ''), expected);
    });

    test('detects "speed-ai" pain correctly', () => {
      const expected = { key: 'speed-ai', line: 'eliminarea latenței din fluxul de producție' };
      assert.deepEqual(detectPain('looking for AI automation', ''), expected);
      assert.deepEqual(detectPain('manual and repetitive workflow', ''), expected);
      assert.deepEqual(detectPain('improve our pipeline', ''), expected);
    });

    test('falls back to default system when no keywords match', () => {
      const expected = { key: 'system', line: 'coerența și scalabilitatea sistemului vizual' };
      assert.deepEqual(detectPain('we need a good graphic designer', 'designer'), expected);
      assert.deepEqual(detectPain('fairly standard job', ''), expected);
    });

    test('checks for exact word boundaries', () => {
      const expectedDefault = { key: 'system', line: 'coerența și scalabilitatea sistemului vizual' };
      // "fair" should not match "ai"
      assert.deepEqual(detectPain('fair game', ''), expectedDefault);
      // "salesperson" should not match "sales" if boundaries aren't matching
      assert.deepEqual(detectPain('salesperson', ''), expectedDefault);
    });

    test('evaluates in correct order (volume > system > conversion > complex > speed-ai)', () => {
      const volExpected = { key: 'volume', line: 'produce la volum fără să diluezi calitatea' };
      // Even with AI or conversion present, volume should win
      assert.deepEqual(detectPain('fast turnaround and AI automation for sales', ''), volExpected);

      const sysExpected = { key: 'system', line: 'coerența brandului între pod-uri și echipe' };
      assert.deepEqual(detectPain('consistency and AI', ''), sysExpected);
    });
  });

});
