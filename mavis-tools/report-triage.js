#!/usr/bin/env node
/**
 * CLASIFICATOR DE MESAJE — ce cere cu adevărat răspuns de la om.
 *
 * READ-ONLY: nu atinge Gmail. Lucrează doar pe rândurile deja aduse de
 * report-simulate-sort.js (care are snippet + subject + from + date).
 *
 * PATRUL: 4 clase, derivate din DATE, nu din hardcoding.
 *   A. needs-reply  — cer un răspuns explicit (de la o persoană, nu de la un robot)
 *   B. needs-action — cer o decizie (alerte de job care chiar bat cu profilul)
 *   C. fyi           — newsletter / promoție / noutate, fără acțiune
 *   D. noise        — zgomot din pipeline-ul propriu (bot-uri de pe repo-uri)
 *
 * Semnalele sunt scrise ca reguli, ca să funcționeze și mâine, pe alte mesaje.
 */
const fs = require('fs');

// ---- profilul de căutare al lui Alex (rol + piață) ----
// MĂSURAT 2026-11-11: alerta LinkedIn „Uzum Team is hiring: Графический дизайнер"
// era clasificată „nu atinge profilul de design" — motiv FALS: rolul E un graphic
// designer, dar anunțul e în rusonește, iar lista de cuvinte-cheie era doar engleză.
// Regula: semnalul decisiv e în SUBIECT, deci detectorul trebuie să acopere și
// limba în care e scris rolul — altfel regula ratează exact rolurile de design.
//
// MĂSURAT 2026-11-12: detectorul era MULT mai îngust decât motorul de scoring.
// `scoring.gs` are tier 3 „Media Production" (photographer, video editor, motion
// designer, content creator) și tier 4 „Emerging Sectors" (ai designer, prompt
// engineer), iar lista de aici le ignora ⇒ alertele cu roluri foto/video (Alex: 5
// ani foto/video) și pe cele în română („Digital & Graphic Production Specialist",
// „Grafică / Webdesign / DTP") erau clasificate „nu atinge profilul de design".
// ⇒ detectorul trebuie să cuprindă ACELAȘI discipline pe care le punctează motorul,
// plus formele românești ale titlurilor de rol.
const DESIGN_KW = [
  'art director', 'creative director', 'creative lead', 'art mid', 'head of creative',
  'graphic design', 'graphic designer', 'senior graphic', 'visual design', 'visual designer',
  'brand designer', 'product designer', 'ui/ux', 'ux/ui', 'ux designer', 'ui designer',
  'content designer', 'creative designer', 'design', 'creativ',
  // tier 3 — Media Production (aceleași discipline ca scoring.gs)
  'photographer', 'photography', 'fotograf', 'videograf', 'video editor',
  'motion designer', 'motion graphics', 'content creator', 'ugc',
  // tier 4 — Emerging Sectors (AI, direcția lui Alex)
  'ai designer', 'ai creative', 'prompt engineer',
  // forme românești / titluri de rol din alertele locale
  'grafică', 'grafica', 'webdesign', 'dtp', 'graphic production',
  // rusonește (LinkedIn Job Alerts vin în limba anunțului)
  'графический дизайнер', 'графического дизайнера',
];
const LOC_KW = ['bucuresti', 'bucharest', 'ilfov', 'remote', 'cluj', 'iasi', 'timisoara', 'brasov'];

// ---- zgomot cunoscut ----
const NOISE_FROM = /github|jules|google-labs|actions@|sentinel|dependabot|coderabbit/i;
// ---- promotii / marketing ----
const PROMO_FROM = /goatacademy|mercor\.com|marketing|promo|sale|deal/i;
const PROMO_TEXT = /last seats|sign up|spectaculo|black friday|discount|reducere|free trial|join us|inregistreaza/i;
// ---- newsletter / digest ----
const NEWS_FROM = /newsletter|substack|news@|digest|mailchimp|beehiiv|twine|medium\.com/i;
const NEWS_TEXT = /weekly|newsletter|edition|ed\.\s*$|dumitrascu|smart city/i;
// ---- robot: local-part de tip no-reply ----
const ROBOT_LOCAL = /^(no-?reply|do-?not-?reply|donotreply|noreply|notify|notifications?|alerts?|automated|mailer|newsletter|newsletters|news|bounce|postmaster)/i;
// ---- CERERE DE CONFIRMARE DE IDENTITATE: trebuie omul, nu automatul ----
// MĂSURAT 2026-11-04: Academia.edu — „Yes / no — Alexandru, your name is on a
// paper" (o lucrare din 2010 potrivita pe numele „Alexandru Popescu"). E o cerere
// legitima de confirmare, dar numele e comun => „Yes, It's Mine" ar pune lucrarea
// pe profilul altcuiva. Deci cere omul, dar NU e alerta de securitate.
const IDENTITY_CHECK = /your name is on a paper|confirm (this|that) (paper|is)|is this (yours|you)|it'?s mine|this is not me|confirm (your|this) (email|phone|identity)/i;

// ---- ALERTA DE SECURITATE: cere verificare umana, chiar daca vine de la robot ----
// MĂSURAT 2026-10-29: „Notice of Security Incident" (Scribd, prin Epiq) — un
// incident real de date, dar de la alt expeditor decât Google. Deci NU
// condiționăm alerta doar de expeditor: și SUBIECTUL poate spune "incident".
// MĂSURAT 2026-11-02: trei cazuri noi, toate ratate de regula veche:
//   • „we noticed a new sign in to your Dropbox account" — fără cratime
//     („new sign in", nu „new sign-in") ⇒ nu se potriva.
//   • „Cloud Governance Center: 1 Critical Risk(s) – Action Required" (Alibaba
//     Cloud) ⇒ nici „security", nici „new device". ȘI era clasificat PROMO,
//     pentru că pagina de alertă conține „Free Trial" în meniu ⇒ o alertă
//     critică ajungea la „promoție". ⇒ regula trebuie să se declanșeze pe
//     acțiunea cerută, nu pe vocabular.
//   • „You've connected a new app to Dropbox" ⇒ grant OAuth nou.
const SECURITY_FROM = /accounts\.google\.com|@google\.com|security|alert@/i;
const SECURITY_SUBJECT = /security alert|security incident|incident de securitate|alerta de securitate|new sign[ -]?in|new device|dispozitiv nou|someone may be trying|acces neautorizat|action required|critical risk|connected a new app|mfa is disabled|immediate remediation/i;
const SECURITY_TEXT = /security alert|security incident|alerta de securitate|new sign[ -]?in|new device|dispozitiv nou|someone may be trying|acces neautorizat|verifica.*activit|check activity|secure your account|gained access to certain user data|may have affected your data|is this you|immediate remediation|mfa is disabled/i;
// ---- CONTUL/ABONAMENTUL CERE ACȚIUNE (facturare, suspendare) ----
// MĂSURAT 2026-11-12: „Your Project: Sentinel Prime is at risk of suspension"
// (Google Cloud, 11.11 19:05 UTC) a fost clasificat `fyi` — „fara semnal de
// actiune" — deși corpul începe cu „Action required" și spune că proiectul poate
// fi suspendat. Motivul: SUBIECTUL nu conține cuvintele din SECURITY_SUBJECT
// („action required" era în corp), deci regula nu s-a declanșat. Emailul pereche
// („Action required: your billing account … is past due") a fost prins, dar cu
// motivul greșit („alerta de securitate" — e facturare, nu incident de securitate).
// ⇒ regula se declanșează pe ACȚIUNEA cerută, pe oricare dintre cele două forme.
const ACCOUNT_CRITICAL_SUBJECT = /at risk of suspension|risk of suspension|will be suspended|is past due|past due|billing account|account (is|has been) (suspended|deactivated)|subscription (will|is) (expire|cancel)|project .* (suspended|deactivated)/i;
// ---- CI / workflow esuat: cere actiune, chiar daca e "zgomot de pipeline" ----
const CI_FAIL_SUBJECT = /\brun failed\b|workflow.*fail|\bfailed\b|\bfailure\b|build failed|eroare/i;
const CI_FROM = /notifications@github\.com|githubactions|@github\.com/i;
// ---- CONTUL CERE O ACTIUNE (parola noua, confirmare, reset) ----
const ACCOUNT_TEXT = /trebuie sa (aleg|schimb|confirm|setez|verific)|aleg(e|eti) o parola|schimb(a|i) parola|parola noua|new password|reset your password|confirm(a|ati) (contul|adresa|email)|verifica(i) adresa|completeaz(a) profilul|verificati adresa/i;
// ---- semnale ca un mesaj sa ceara raspuns ----
const REPLY_TEXT = /action requested|opportunity|interview|invitatie|invitație|raspuns|răspuns|your application|aplicatia ta|aplicatia ta a fost|reply to|confirm|accept|offer|contract|negotiat|trebuie sa|urgent|deadline|scadenta/i;
// ---- semnale ca un mesaj sa ceara o decizie legata de joburi ----
// MĂSURAT 2026-11-02: „DuckDuckGo is hiring for Remote" (LinkedIn) conținea un
// rol REAL de design („Senior Product Designer — DuckDuckGo — Romania (Remote)")
// și totuși a ajuns în fyi: expresia cerea „linkedin job" sau „job alert",
// iar subiectul spune „is hiring". ⇒ recunoaștem și formularea de anunț de
// angajare, și domeniul eJobs.
const JOB_ALERT = /bestjobs|jooble|indeed|hipo|ejobs|jobleads|recruit|linkedin job|job alert|joburi|locuri de munca|job openings/i;
// MĂSURAT 2026-11-09: alerta LinkedIn „New jobs similar to Lead Product Designer
// at Scrambly" a fost clasificată needs-reply - expresia REPLY_TEXT a potrivit pe
// cuvântul „Opportunity" din corpul unui anunț, iar „LinkedIn" a trecut de
// testul „de la o persoană". ⇒ platformele de job nu cer niciodată răspuns
// de la om.
const JOB_PLATFORMS = /linkedin|glassdoor|indeed|jooble|bestjobs|hipo|ejobs|jobrack|intch|monster|totaljobs|careerbuilder|stepstone|recruit\.com|linkedin\.com/i;
// marcajul efectiv de „alerta de job" din corpul emailului (nu doar numele
// platformei): altfel „134 people viewed your profile" de la LinkedIn ar fi
// clasificat ca job.
const JOB_MARKER = /jobs you might be interested in|new jobs similar to|job alert|job recommendations|your job alert/i;
// anunt de angajare in subiect („X is hiring for Y") — verificat SI pe rol de design
const JOB_HIRING = /\bis hiring\b|\bhiring for\b/i;
// MĂSURAT 2026-11-10: 13 emailuri de la eJobs („Confirmare aplicare") au intrat
// in needs-action doar pentru ca „eJobs.ro" se potriveste cu JOB_ALERT, iar
// corpul lor contine „Graphic Designer". Dar o confirmare de aplicare este un
// RECEIPT — nu cere nicio decizie. La fel, „your application was sent to X"
// (LinkedIn) si „Thanks for applying" (broadbean). Regula: confirmarea de
// aplicare se clasifica inaintea regulilor de alerta de job.
const APPLIED_CONFIRM = /confirmare aplicare|application-confirmation|ai aplicat cu succes|your application was sent to|your application (was|has been) (sent|received|received by)|thanks for applying|we(?:'ve| have) got it/i;

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
function hasAny(text, list) { return list.some(k => hasWord(text, k)); }

/** Extrage numele de afisare din headerul From. */
function displayName(from) {
  const m = (from || '').match(/^\s*"?([^"<]*?)"?\s*</);
  return (m ? m[1] : from || '').replace(/\s+/g, ' ').trim();
}
function localPart(from) {
  const m = (from || '').match(/<([^>]+)>/);
  return (m ? m[1] : from || '').split('@')[0].toLowerCase();
}
/** Nume propriu: 2+ cuvinte capitalizate (sau 1 cuvant lung, ex. "Chloe"). */
function looksLikePerson(name) {
  const n = (name || '').replace(/[@_].*$/, '').trim();
  if (!n || /\d/.test(n)) return false;
  const words = n.split(/\s+/).filter(w => /^[A-ZĂÂÎȘȚŞŢ]/.test(w));
  return words.length >= 1 && words.join(' ').length >= 4 && !/newsletter|jobs|alerts?|no-?reply/i.test(n);
}

/**
 * @param {Array} rows rânduri din report-simulate-sort.js
 * @returns {{buckets:Object, counts:Object, all:Array}}
 */
/**
 * Imparte „ROL ANGAJATOR" in doua. Semnalul: rolul e Title Case, angajatorul
 * e de obicei SCAPS (STIFT LUX DESIGN SRL, LPP, IKEA ROMANIA S.A.).
 * Daca primul cuvant e deja SCAPS (ex. „DESIGN ENGINEER - ..."), impartirea
 * nu e sigura -> se pastreaza textul integral, fara inventat.
 */
function splitRoleCompany(raw) {
  const parts = raw.split(' ').filter(Boolean);
  let i = 0;
  while (i < parts.length) {
    const letters = parts[i].replace(/[^A-Za-zĂÂÎȘȚăâîșț]/g, '');
    if (!letters) { i++; continue; }
    const allCaps = letters.length > 1 && letters === letters.toUpperCase();
    if (allCaps) break;
    i++;
  }
  if (i === 0 || i >= parts.length) return { role: raw, employer: '' };
  return { role: parts.slice(0, i).join(' ').trim(), employer: parts.slice(i).join(' ').trim() };
}

/**
 * Extrage rolul si angajatorul dintr-un email de CONFIRMARE DE APLICARE.
 * Best-effort: textul vine din corpul confirmarii, nu dintr-o baza de date.
 * @returns {{role:string, employer:string}|null}
 */
function extractAppliedRole(r, subj, body) {
  // \u034f (COMBINING GRAPHEME JOINER) si similare: LinkedIn le pune peste tot
  // in corp si ar strica orice potrivire bazata pe text.
  const b = (body || '').replace(/[͏᠎-‏﻿]/g, ' ').replace(/&#8202;/g, ' ').replace(/\s+/g, ' ').trim();
  // eJobs: „Felicitări! Ai aplicat cu succes la următorul job: {ROL} {COMPANIE} Vezi job"
  let m = b.match(/aplicat cu succes la urm[ăa]torul job:\s*(.+?)\s+Vezi job/i);
  if (m) return splitRoleCompany(m[1].trim());
  // LinkedIn: subiectul „Alexandru, your application was sent to {COMPANIE}"; in corp,
  // intre acea fraza si „Applied on" se afla rolul + localizarea.
  m = subj.match(/your application was sent to\s+(.+)$/i);
  if (m) {
    const employer = m[1].trim();
    const mm = b.match(/your application was sent to\s+(.+?)\s+Applied on/i);
    let role = '';
    if (mm) {
      // LinkedIn repeta fraza de 2 ori in corp (antet + continut)
      let rest = mm[1].trim().replace(/your application was sent to/gi, ' ');
      rest = rest.replace(/\s+/g, ' ').trim();
      // numele angajatorului apare de 1-2 ori -> il scoatem
      let guard = 0;
      while (guard++ < 3) {
        const i = rest.toLowerCase().indexOf(employer.toLowerCase());
        if (i < 0) break;
        rest = (rest.slice(0, i) + ' ' + rest.slice(i + employer.length)).trim();
      }
      // localizarea: „Bucharest, Romania (On-site)", „United Kingdom (Remote)", „London"
      const loc = rest.match(/^(.*?)\s+((?:[A-Z][a-z]+(?:,\s*[A-Z][a-z]+)?)(?:\s+[A-Z][a-z]+)?\s*\((?:Remote|On-site|Hybrid)\)|Remote|On-site|Hybrid)$/);
      let place = '';
      if (loc) { rest = loc[1].trim(); place = loc[2]; }
      else {
        const bare = rest.match(/^(.*?)\s+([A-Z][a-z]+(?:,\s*[A-Z][a-z]+)?)$/);
        if (bare) { rest = bare[1].trim(); place = bare[2]; }
      }
      role = place ? rest + ' — ' + place : rest;
    }
    return { role, employer };
  }
  return null;
}

function triage(rows) {
  const out = [];
  for (const r of rows) {
    const from = r.from || '';
    const subj = r.subject || '';
    const snip = r.snippet || '';
    // CORPUL intra in decizie. Fragmentul de text e trunchiat la ~200 de
    // caractere si contine doar antetul; corpul e cel care arata ca un email
    // de alerta cere de fapt confirmare/verificare. (Cost: 0 cereri in plus —
    // corpul vine deja in raspunsul format=full al simulate-sort.)
    //
    // DAR: semnalul "acum cere raspuns" se citeste DOAR din antet+fragment.
    // Un disclaimer legal ("does not constitute an offer to purchase") contine
    // cuvintele-cheie si transforma o reclamatie comerciala intr-un mesaj
    // care "cere raspuns". Antetul + fragmentul spun intentia reala.
    const body = r.body || '';
    const headText = subj + ' ' + snip;              // intentia mesajului
    const text = headText + ' ' + body;              // intentia + continutul
    const dn = displayName(from);
    const lp = localPart(from);
    const isRobot = ROBOT_LOCAL.test(lp);
    // RELEVANTA se judeca pe SUBIECT cand acesta numeste un job anume: corpul
    // alertelor Jooble e o lista generica de 100+ joburi (contine si roluri de
    // design), deci daca am judeca dupa corp, orice alerta Jooble ar parea de
    // design. Măsurat 2026-11-09: „PRIM-AUDIT caută Auditor Financiar" era
    // clasificat „alerta de job cu rol de design" din cauza listei din corp.
    // ATENTIE: fără \\b după „caută" — \\b e bazat pe ASCII, deci nu există
    // graniță de cuvânt între „ă" și spațiu, și expresia nu s-ar potrivi NICIODATĂ.
    const namesSpecificJob = /caut[ăa]|is hiring|new jobs similar to|job (you may be|at) |you may be interested/i.test(subj);
    const designText = namesSpecificJob ? subj : text;
    const isDesign = hasAny(designText, DESIGN_KW);
    const isLoc = hasAny(text, LOC_KW);
    // Orice email de la o platforma de job e alerta de job (si NICIODATA
    // needs-reply). Măsurat 2026-11-09: alerta LinkedIn „New jobs similar to
    // Lead Product Designer at Scrambly" contine roluri reale de design
    // (UserWise, Raiffeisen Bank, Proxify) si trebuie clasificat ca job.
    // Dar „134 people viewed your profile" de la aceeasi platforma NU e job -
    // de aceea ne bazam pe marcajul efectiv de alerta de job, nu pe nume.
    const isJobAlert = JOB_ALERT.test(from) || JOB_ALERT.test(subj) || JOB_HIRING.test(subj)
      || JOB_MARKER.test(headText + ' ' + body);

    let cls, why;
    if (IDENTITY_CHECK.test(headText) && !SECURITY_SUBJECT.test(subj)) {
      cls = 'needs-action'; why = 'cer confirmare umana de identitate — verifica inainte sa raspunzi';
    } else if (ACCOUNT_CRITICAL_SUBJECT.test(subj)) {
      // facturare / suspendare / inchidere de cont-proiect: cere omul, dar NU e
      // incident de securitate (motivul „alerta de securitate" era imprecis).
      cls = 'needs-action'; why = 'contul/proiectul cere o actiune (facturare / suspendare)';
    } else if ((SECURITY_FROM.test(from) && SECURITY_TEXT.test(text)) || SECURITY_SUBJECT.test(subj)) {
      cls = 'needs-action'; why = 'alerta de securitate — cere verificare umana';
    } else if (CI_FROM.test(from) && CI_FAIL_SUBJECT.test(subj)) {
      cls = 'needs-action'; why = 'workflow CI esuat — cere actiune';
    } else if (APPLIED_CONFIRM.test(subj + ' ' + headText)) {
      // receipt de aplicare: NU cere decizie. Se clasifica INAINTE de regula
      // de alerta de job, ca un receipt al unei aplicari sa nu devina sarcina.
      cls = 'fyi'; why = 'confirmare de aplicare — nu cere actiune';
    } else if (ACCOUNT_TEXT.test(headText) || (!isJobAlert && ACCOUNT_TEXT.test(body))) {
      // MĂSURAT 2026-11-11: alerta Hipo.ro („Alex - 36 Joburi noi adaugate")
      // era clasificata „contul cere o actiune (parola / confirmare)" — motiv
      // FALS: expresia se potrivea pe link-ul de footer din newsletter
      // („Trebuie sa alegi o parola noua"), nu pe o cerere reala de cont.
      // Corect: semnalul de cont din CORP conteaza doar daca mesajul NU e
      // alerta de job (cazul HiRo, 28.10 — body-only, firma, nu platforma).
      // In antet+fragment semnalul de cont ramane dominant, oricand.
      cls = 'needs-action'; why = 'contul cere o actiune (parola / confirmare)';
    } else if (NOISE_FROM.test(from)) {
      cls = 'noise'; why = 'zgomot din pipeline-ul propriu';
    } else if (isJobAlert && isDesign) {
      cls = 'needs-action'; why = 'alerta de job cu rol de design';
    } else if (isJobAlert) {
      cls = 'job-alert-other'; why = 'alerta de job, dar nu atinge profilul de design';
    } else if (NEWS_FROM.test(from) || NEWS_TEXT.test(subj)) {
      // newsletter INAINTE de semnalul de raspuns: un digest poate conține
      // cuvinte ca "interview" fara sa ceara nimic (ex. "Interview with ...")
      cls = 'fyi'; why = 'newsletter';
    } else if (PROMO_FROM.test(from) || PROMO_TEXT.test(text)) {
      // promo INAINTE de semnalul de raspuns: o casa de newslettere/promotii
      // scrie cu numele omului, dar nu cere raspuns de la om.
      cls = 'fyi'; why = 'promotie / oferta';
    } else if (REPLY_TEXT.test(headText) && !isRobot && !JOB_PLATFORMS.test(from + ' ' + subj) && looksLikePerson(dn)) {
      cls = 'needs-reply'; why = 'cere raspuns explicit, de la o persoana';
    } else if (isRobot) {
      cls = 'fyi'; why = 'robot, fara cerere de actiune';
    } else {
      cls = 'fyi'; why = 'fara semnal de actiune';
    }
    out.push({ ...r, cls, why, displayName: dn, isDesign, isLoc, isJobAlert, appliedRole: extractAppliedRole(r, subj, body) });
  }
  const buckets = { 'needs-reply': [], 'needs-action': [], 'job-alert-other': [], fyi: [], noise: [] };
  for (const r of out) buckets[r.cls].push(r);
  const order = { 'needs-reply': 0, 'needs-action': 1, 'job-alert-other': 2, fyi: 3, noise: 4 };
  for (const k of Object.keys(buckets)) buckets[k].sort((a, b) => new Date(b.date) - new Date(a.date));
  const counts = Object.fromEntries(Object.keys(buckets).map(k => [k, buckets[k].length]));
  return { buckets, counts, all: out.sort((a, b) => order[a.cls] - order[b.cls] || new Date(b.date) - new Date(a.date)) };
}

module.exports = { triage, DESIGN_KW, LOC_KW };

if (require.main === module) {
  const src = process.argv[2] || '/workspace/Mavis/mavis-tools/report-simulate-sort.json';
  const rows = JSON.parse(fs.readFileSync(src, 'utf8')).rows || [];
  const t = triage(rows);
  console.log('COUNTS: ' + JSON.stringify(t.counts));
  for (const cls of ['needs-reply', 'needs-action', 'job-alert-other', 'fyi', 'noise']) {
    console.log(`\n=== ${cls} (${t.buckets[cls].length}) ===`);
    t.buckets[cls].slice(0, 12).forEach(r =>
      console.log(`  ${r.date.slice(0, 22)} | ${(r.displayName || r.from).slice(0, 34).padEnd(34)} | ${(r.subject || '').slice(0, 56).padEnd(56)} | ${r.why}`));
  }
}
