const fs = require('fs');

console.log("Măsurătoare pe isDesignRole() din report-build.js");

const DESIGN_KW = ['art director','creative director','creative lead','head of creative','brand director','advertising lead','campaign art director','ad conceptor','creative systems','art mid','senior creatives','creatives','art team',
  'graphic designer','visual designer','senior graphic','ui/ux','ux/ui','ux designer','ui designer','product designer','interaction designer','web designer','dtp designer','brand designer','identity designer','graphic design','visual design','content designer','content specialist','creative designer'];

// Original implementation
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
const isDesignRoleOrig = role => DESIGN_KW.some(k => hasWord(role || '', k));

// New optimized equivalent implementation
const DESIGN_KW_REGEX_STR = DESIGN_KW.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
const DESIGN_KW_REGEX = new RegExp('(^|[^a-z0-9])(' + DESIGN_KW_REGEX_STR + ')($|[^a-z0-9])', 'i');
const isDesignRoleNew = role => DESIGN_KW_REGEX.test(role || '');

// Generate mock data
const rolesToTest = [
  "Senior Art Director",
  "Product Manager",
  "UI/UX Designer",
  "Software Engineer",
  "Junior Graphic Designer",
  "Motion Graphics Artist",
  "Content Creator",
  "Lead Visual Designer",
  "Fullstack Developer",
  "Creative Lead EMEA",
  "Marketing Intern",
  "Product Designer (Remote)",
  "Frontend Engineer",
  "Web Designer Intern",
  "Data Scientist"
];

const largeList = [];
for (let i = 0; i < 2000; i++) {
  largeList.push(...rolesToTest);
}

const RUNS = 100;
console.log(`Testez ${largeList.length} de roluri simulate pe ${RUNS} iterații.`);

let t0 = process.hrtime.bigint();
for(let i=0; i<RUNS; i++) {
  largeList.filter(isDesignRoleOrig);
}
let t1 = process.hrtime.bigint();
const timeOriginal = Number(t1-t0) / 1000000;
console.log(`Varianta originală (array.some + map cache): ${timeOriginal.toFixed(2)}ms (${(timeOriginal/RUNS).toFixed(2)}ms per rulare)`);

t0 = process.hrtime.bigint();
for(let i=0; i<RUNS; i++) {
  largeList.filter(isDesignRoleNew);
}
t1 = process.hrtime.bigint();
const timeOpt = Number(t1-t0) / 1000000;
console.log(`Varianta optimizată (regex combinat din report-build.js): ${timeOpt.toFixed(2)}ms (${(timeOpt/RUNS).toFixed(2)}ms per rulare)`);

if (timeOpt >= timeOriginal) {
    console.error("Optimizarea nu a fost confirmata! Noua varianta e mai lenta sau egala.");
    process.exit(1);
}

console.log(`Optimizarea este de ${(timeOriginal/timeOpt).toFixed(2)}x ori mai rapidă.`);
