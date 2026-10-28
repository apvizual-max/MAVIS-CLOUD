const fs = require('fs');

console.log("Measuring loop over regex...");
const start = performance.now();

const DESIGN_KW = ['art director','creative director','creative lead','head of creative','brand director','advertising lead','campaign art director','ad conceptor','creative systems','art mid','senior creatives','creatives','art team',
  'graphic designer','visual designer','senior graphic','ui/ux','ux/ui','ux designer','ui designer','product designer','interaction designer','web designer','dtp designer','brand designer','identity designer','graphic design','visual design','content designer','content specialist','creative designer'];

// current implementation
const _rxCache = new Map();
function hasWord(text, w) {
  let rx = _rxCache.get(w);
  if (!rx) {
    const esc = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    rx = new RegExp('(^|[^a-z0-9])' + esc + '($|[^a-z0-9])', 'i');
    _rxCache.set(w, rx);
  }
  return rx.test(text);
}
const isDesignRole = role => DESIGN_KW.some(k => hasWord(role || '', k));

// optimized implementation
const escapedKWs = DESIGN_KW.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
const designRx = new RegExp(`(^|[^a-z0-9])(${escapedKWs})($|[^a-z0-9])`, 'i');
const isDesignRoleOpt = role => designRx.test(role || '');

const roles = Array(100000).fill("Software Engineer at some company working on backend stuff and graphic design");

const start1 = performance.now();
for (const role of roles) {
    isDesignRole(role);
}
const end1 = performance.now();
console.log(`Current Exec time: ${end1 - start1} ms`);

const start2 = performance.now();
for (const role of roles) {
    isDesignRoleOpt(role);
}
const end2 = performance.now();
console.log(`Optimized Exec time: ${end2 - start2} ms`);
if (end2 - start2 >= end1 - start1) {
  console.log('Test failed: Optimized version was not faster');
  process.exit(1);
}
