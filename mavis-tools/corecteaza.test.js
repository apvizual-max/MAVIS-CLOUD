const test = require('node:test');
const assert = require('node:assert/strict');
const { classify } = require('./corecteaza.js');

test('classify', async (t) => {
  await t.test('classifies action correctly', () => {
    assert.equal(classify({ from: 'happyadv', subj: 'Follow-up' }), 'actiune');
    assert.equal(classify({ from: 'iqads', subj: 'aplicare job' }), 'actiune');
  });

  await t.test('classifies personal correctly', () => {
    assert.equal(classify({ from: 'happyadv', subj: 'Salut' }), 'personal');
    assert.equal(classify({ from: 'iqads', subj: 'Salut' }), 'personal');
  });

  await t.test('classifies facturi correctly', () => {
    assert.equal(classify({ from: 'someone', subj: 'Factura pe luna asta' }), 'facturi');
    assert.equal(classify({ from: 'someone', subj: 'Invoice 123' }), 'facturi');
  });

  await t.test('classifies finante correctly', () => {
    assert.equal(classify({ from: 'kraken', subj: 'Deposit' }), 'finante');
    assert.equal(classify({ from: 'someone', subj: 'trading update' }), 'finante');
  });

  await t.test('classifies joburi correctly', () => {
    assert.equal(classify({ from: 'jooble', subj: 'jobs' }), 'joburi');
    assert.equal(classify({ from: 'someone', subj: 'Interviu programat' }), 'joburi');
  });

  await t.test('classifies social correctly', () => {
    assert.equal(classify({ from: 'linkedin', subj: 'New message' }), 'social');
    assert.equal(classify({ from: 'facebook', subj: 'Notification' }), 'social');
  });

  await t.test('classifies ai correctly', () => {
    assert.equal(classify({ from: 'openai', subj: 'API' }), 'ai');
    assert.equal(classify({ from: 'someone', subj: 'chatgpt prompt' }), 'ai');
  });

  await t.test('classifies news by default', () => {
    assert.equal(classify({ from: 'random', subj: 'random' }), 'news');
  });

  await t.test('handles missing properties', () => {
    assert.equal(classify({}), 'news');
  });
});
