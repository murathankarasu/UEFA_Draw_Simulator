// Data: Pots and teams with coefficients (katsayı)
const pots = [
  {
    name: '1. Torba',
    teams: [
      { name: 'Paris Saint-Germain', country: 'Fransa', city: 'Paris', coef: 118_500 },
      { name: 'Real Madrid', country: 'İspanya', city: 'Madrid', coef: 143_500 },
      { name: 'Manchester City', country: 'İngiltere', city: 'Manchester', coef: 137_750 },
      { name: 'Bayern München', country: 'Almanya', city: 'Münih', coef: 135_250 },
      { name: 'Liverpool', country: 'İngiltere', city: 'Liverpool', coef: 125_500 },
      { name: 'Internazionale', country: 'İtalya', city: 'Milano', coef: 116_250 },
      { name: 'Chelsea', country: 'İngiltere', city: 'Londra', coef: 109_000 },
      { name: 'Borussia Dortmund', country: 'Almanya', city: 'Dortmund', coef: 106_750 },
      { name: 'Barcelona', country: 'İspanya', city: 'Barselona', coef: 103_250 },
    ],
  },
  {
    name: '2. Torba',
    teams: [
      { name: 'Arsenal', country: 'İngiltere', city: 'Londra', coef: 98_000 },
      { name: 'Bayer Leverkusen', country: 'Almanya', city: 'Leverkusen', coef: 95_250 },
      { name: 'Atlético Madrid', country: 'İspanya', city: 'Madrid', coef: 93_500 },
      { name: 'Benfica', country: 'Portekiz', city: 'Lizbon', coef: 87_750, tag: 'FC' },
      { name: 'Atalanta', country: 'İtalya', city: 'Bergamo', coef: 82_000 },
      { name: 'Villarreal', country: 'İspanya', city: 'Villarreal', coef: 82_000 },
      { name: 'Juventus', country: 'İtalya', city: 'Torino', coef: 74_250 },
      { name: 'Eintracht Frankfurt', country: 'Almanya', city: 'Frankfurt', coef: 74_000 },
      { name: 'Club Brugge', country: 'Belçika', city: 'Brugge', coef: 71_750, tag: 'FC' },
    ],
  },
  {
    name: '3. Torba',
    teams: [
      { name: 'Tottenham Hotspur', country: 'İngiltere', city: 'Londra', coef: 70_250 },
      { name: 'PSV', country: 'Hollanda', city: 'Eindhoven', coef: 69_250 },
      { name: 'Ajax', country: 'Hollanda', city: 'Amsterdam', coef: 67_250 },
      { name: 'Napoli', country: 'İtalya', city: 'Napoli', coef: 61_000 },
      { name: 'Sporting', country: 'Portekiz', city: 'Lizbon', coef: 59_000 },
      { name: 'Olimpiakos', country: 'Yunanistan', city: 'Pire', coef: 56_500 },
      { name: 'Slavia Praha', country: 'Çekya', city: 'Prag', coef: 51_000 },
      { name: 'Bodø/Glimt', country: 'Norveç', city: 'Bodø', coef: 49_000, tag: 'FC' },
      { name: 'Marseille', country: 'Fransa', city: 'Marsilya', coef: 48_000 },
    ],
  },
  {
    name: '4. Torba',
    teams: [
      { name: 'Copenhagen', country: 'Danimarka', city: 'Kopenhag', coef: 44_875, tag: 'FC' },
      { name: 'Monaco', country: 'Fransa', city: 'Monako', coef: 41_000 },
      { name: 'Galatasaray', country: 'Türkiye', city: 'İstanbul', coef: 38_250 },
      { name: 'Union SG', country: 'Belçika', city: 'Brüksel', coef: 36_000 },
      { name: 'Karabağ', country: 'Azerbaycan', city: 'Ağdam/Bakü', coef: 32_000, tag: 'FC' },
      { name: 'Athletic Bilbao', country: 'İspanya', city: 'Bilbao', coef: 26_750 },
      { name: 'Newcastle United', country: 'İngiltere', city: 'Newcastle', coef: 22_982 },
      { name: 'Pafos', country: 'Kıbrıs Cumhuriyeti', city: 'Pafos', coef: 11_125, tag: 'FC' },
      { name: 'Kairat', country: 'Kazakistan', city: 'Almatı', coef: 5_500, tag: 'FC' },
    ],
  },
];

// Groups A–I (9 groups), each with 4 slots
const groupLabels = ['A','B','C','D','E','F','G','H','I'];

// Logo map to asset paths
const teamLogoMap = {
  'Real Madrid': 'assets/top-5-football-leagues/la-liga/real-madrid.png',
  'Atlético Madrid': 'assets/top-5-football-leagues/la-liga/atletico-madrid.png',
  'Barcelona': 'assets/top-5-football-leagues/la-liga/barcelona.png',
  'Athletic Bilbao': 'assets/top-5-football-leagues/la-liga/athletic.png',
  'Villarreal': 'assets/top-5-football-leagues/la-liga/villarreal.png',

  'Manchester City': 'assets/top-5-football-leagues/premier-league/manchester-city.png',
  'Liverpool': 'assets/top-5-football-leagues/premier-league/liverpool.png',
  'Chelsea': 'assets/top-5-football-leagues/premier-league/chelsea.png',
  'Arsenal': 'assets/top-5-football-leagues/premier-league/arsenal.png',
  'Tottenham Hotspur': 'assets/top-5-football-leagues/premier-league/tottenham-hotspur.png',
  'Newcastle United': 'assets/top-5-football-leagues/premier-league/newcastle-united.png',

  'Bayern München': 'assets/top-5-football-leagues/bundesliga/bayern.png',
  'Borussia Dortmund': 'assets/top-5-football-leagues/bundesliga/dortmund.png',
  'Eintracht Frankfurt': 'assets/top-5-football-leagues/bundesliga/frankfurt.png',
  'Bayer Leverkusen': 'assets/top-5-football-leagues/bundesliga/leverkusen.png',

  'Internazionale': 'assets/top-5-football-leagues/serie-a/inter.png',
  'Juventus': 'assets/top-5-football-leagues/serie-a/juventus.png',
  'Napoli': 'assets/top-5-football-leagues/serie-a/napoli.png',
  'Atalanta': 'assets/top-5-football-leagues/serie-a/atalanta.png',

  'Paris Saint-Germain': 'assets/top-5-football-leagues/french-ligue1/paris-saint-germain.png',
  'Marseille': 'assets/top-5-football-leagues/french-ligue1/olympique-de-marseille.png',
  'Monaco': 'assets/top-5-football-leagues/french-ligue1/as-monaco.png',
  'Benfica': 'assets/top-5-football-leagues/others/SL_Benfica.png',

  'Ajax': 'assets/top-5-football-leagues/others/AFC_Ajax_logo.png',
  'PSV': 'assets/top-5-football-leagues/others/PSV_Eindhoven.svg.png',
  'Club Brugge': 'assets/top-5-football-leagues/others/Club_Brugge_KV_logo.svg.png',
  'Copenhagen': 'assets/top-5-football-leagues/others/FC_København.png',
  'Galatasaray': 'assets/top-5-football-leagues/others/Galatasaray_SK_football_logo.png',
  'Karabağ': 'assets/top-5-football-leagues/others/karabağ.png',
  'Pafos': 'assets/top-5-football-leagues/others/pafos.png',
  'Slavia Praha': 'assets/top-5-football-leagues/others/Slavia-symbol-nowordmark-RGB.png',
  'Sporting': 'assets/top-5-football-leagues/others/Sporting_Lizbon_logo.png',
  'Bodø/Glimt': 'assets/top-5-football-leagues/others/FK_Bodo_Glimt_logo.svg.png',
  'Union SG': 'assets/top-5-football-leagues/others/Royale_Union_Saint-Gilloise_logo.png',
  'Olimpiakos': 'assets/top-5-football-leagues/others/Olympiakos_(futbol_takımı).png',
  'Kairat': 'assets/top-5-football-leagues/others/fckairat.png',
};

const state = {
  remainingPots: [], // array of arrays of teams
  groups: [], // [{label, teams:[]}] length 9
  history: [],
  busy: false,
};

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

function formatCoef(n) {
  const s = n.toString();
  return s.replace(/(\d+)(\d{3})$/, '$1,$2');
}

function createEl(tag, className, children) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (children) {
    if (Array.isArray(children)) children.forEach(c => el.append(c));
    else el.append(children);
  }
  return el;
}

function renderPots(container, dataPots) {
  container.innerHTML = '';
  dataPots.forEach((pot, potIdx) => {
    const potEl = createEl('div', 'pot fade-in');
    const title = createEl('div', 'pot-title');
    title.append(createEl('span', '', document.createTextNode(pot.name)));

    const list = createEl('div', 'team-list');
    pot.teams.forEach((t) => {
      const teamEl = createEl('div', 'team');
      const left = createEl('div', 'name');
      left.append(createLogoImg(t));
      left.append(document.createTextNode(` ${t.name}${t.tag ? ' ' + t.tag : ''}`));
      const right = createEl('div', 'coef');
      right.append(createFlagImg(t.country));
      teamEl.append(left, right);
      list.append(teamEl);
    });

    potEl.append(title, list);
    container.append(potEl);
  });
}

function renderGroups(container, groups) {
  container.innerHTML = '';
  groups.forEach(g => {
    const groupEl = createEl('div', 'group fade-in');
    const head = createEl('div', 'head');
    head.append(createEl('span', 'label', document.createTextNode(`Grup ${g.label}`)));
    head.append(createEl('span', 'status', document.createTextNode(`${g.teams.length}/4`)));
    const slots = createEl('div', 'slots');
    for (let i = 0; i < 4; i++) {
      const slot = createEl('div', 'slot');
      if (g.teams[i]) {
        slot.classList.add('filled');
        slot.append(createChip(g.teams[i]));
      } else {
        slot.append(document.createTextNode('—'));
      }
      slots.append(slot);
    }
    groupEl.append(head, slots);
    container.append(groupEl);
  });
}

function createChip(team) {
  const chip = createEl('span', 'chip');
  chip.append(createLogoImg(team));
  chip.append(` ${team.name}`);
  chip.append(createFlagImg(team.country));
  return chip;
}

function createLogoImg(team) {
  const img = new Image();
  img.width = 16; img.height = 16; img.className = 'mini-logo'; img.alt = team.name;
  const candidates = [];
  if (teamLogoMap[team.name]) candidates.push(teamLogoMap[team.name]);
  // additional naive guesses by league folders
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const guesses = [
    `assets/top-5-football-leagues/premier-league/${slug(team.name)}.png`,
    `assets/top-5-football-leagues/la-liga/${slug(team.name)}.png`,
    `assets/top-5-football-leagues/bundesliga/${slug(team.name)}.png`,
    `assets/top-5-football-leagues/serie-a/${slug(team.name)}.png`,
    `assets/top-5-football-leagues/french-ligue1/${slug(team.name)}.png`,
    `assets/top-5-football-leagues/others/${slug(team.name)}.png`,
  ];
  candidates.push(...guesses);
  let idx = 0;
  const tryNext = () => {
    if (idx >= candidates.length) { img.style.display = 'none'; return; }
    img.src = candidates[idx++];
  };
  img.onerror = tryNext;
  tryNext();
  return img;
}

// country flag images via emoji as default; you can later map to PNG if provided
const countryToFlag = {
  'Fransa': '🇫🇷',
  'İspanya': '🇪🇸',
  'İngiltere': '🇬🇧',
  'Almanya': '🇩🇪',
  'İtalya': '🇮🇹',
  'Portekiz': '🇵🇹',
  'Hollanda': '🇳🇱',
  'Yunanistan': '🇬🇷',
  'Çekya': '🇨🇿',
  'Norveç': '🇳🇴',
  'Danimarka': '🇩🇰',
  'Türkiye': '🇹🇷',
  'Belçika': '🇧🇪',
  'Azerbaycan': '🇦🇿',
  'Kıbrıs Cumhuriyeti': '🇨🇾',
  'Kazakistan': '🇰🇿',
};

function createFlagImg(country) {
  const span = createEl('span', 'flag');
  span.textContent = countryToFlag[country] || '🏳️';
  return span;
}

function initState() {
  state.remainingPots = deepClone(pots.map(p => p.teams));
  state.groups = groupLabels.map(label => ({ label, teams: [] }));
  state.history = [];
  state.busy = false;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function updateStatus(text, cls) {
  const el = document.getElementById('status');
  if (!el) return;
  el.textContent = text;
  el.className = cls || '';
}

// Banned political pairs (country-to-country)
const bannedPairs = new Set([
  'Ermenistan|Azerbaycan',
  'Cebelitarık|İspanya',
  'Kosova|Bosna-Hersek',
  'Kosova|Sırbistan',
  'Kosova|Rusya', // Rus takımları menli, yine de kural listede
  'Ukrayna|Rusya',
  'Ukrayna|Belarus',
]);

function isBannedCountryPair(a, b) {
  const key1 = `${a}|${b}`;
  const key2 = `${b}|${a}`;
  return bannedPairs.has(key1) || bannedPairs.has(key2);
}

// Strict constraint: no same-country in same group, and no banned pairs
function canPlace(team, group) {
  for (const t of group.teams) {
    if (t.country === team.country) return false;
    if (isBannedCountryPair(t.country, team.country)) return false;
  }
  return true;
}

function drawOne() {
  if (state.busy) return;
  // find first pot that still has teams
  const potIndex = state.remainingPots.findIndex(p => p.length > 0);
  if (potIndex === -1) return false;

  const pot = state.remainingPots[potIndex];
  // random team from this pot
  const teamIdx = Math.floor(Math.random() * pot.length);
  const [team] = pot.splice(teamIdx, 1);

  // find available groups (less than 4 teams) and try to avoid same-country
  const openGroups = state.groups
    .map((g, i) => ({ g, i }))
    .filter(({ g }) => g.teams.length < 4);

  const candidates = shuffle(openGroups.filter(({ g }) => canPlace(team, g)));
  if (candidates.length === 0) {
    // no legal placement; back off: put back the team to pot and try another team to avoid dead-end
    pot.push(team);
    if (pot.length === 1) return false; // nothing else to try
    return drawOne();
  }

  const target = candidates[0].g;
  target.teams.push(team);
  state.history.push({ team, potIndex, groupLabel: target.label });
  return { team, group: target };
}

function stepDrawAnimated() {
  if (state.busy) return;
  const result = drawOne();
  if (!result) {
    updateStatus('Kura tamamlandı', 'done');
    refreshUI();
    return;
  }
  state.busy = true;
  updateStatus(`${result.team.name} çekildi → Grup ${result.group.label}`, 'busy');
  refreshUI(result);
  setTimeout(() => {
    state.busy = false;
    updateStatus('Hazır', 'ready');
  }, 650);
}

function drawAll() {
  if (state.busy) return;
  updateStatus('Kura çekiliyor…', 'busy');
  while (drawOne()) {}
  updateStatus('Kura tamamlandı', 'done');
  refreshUI();
}

function resetDraw() {
  initState();
  updateStatus('Sıfırlandı', 'ready');
  refreshUI();
}

function refreshUI(highlight) {
  const potsEl = document.getElementById('pots');
  const dataPots = state.remainingPots.map((teams, i) => ({ name: pots[i].name.replace('Torba','Torbalar'), teams }));
  if (potsEl) renderPots(potsEl, dataPots);
  const groupsEl = document.getElementById('groups');
  if (groupsEl) renderGroups(groupsEl, state.groups);

  if (highlight) {
    // add animation to last placed chip
    const groupIndex = groupLabels.indexOf(highlight.group.label);
    const groupsCards = groupsEl.querySelectorAll('.group');
    const card = groupsCards[groupIndex];
    if (card) {
      const filledSlots = card.querySelectorAll('.slot.filled');
      const last = filledSlots[filledSlots.length - 1];
      if (last) last.classList.add('draw-anim');
    }
  }
}

function main() {
  initState();
  refreshUI();
  const btnFast = document.getElementById('btn-fast');
  const btnSim = document.getElementById('btn-sim');
  if (btnFast) btnFast.addEventListener('click', () => {
    // Pre-generate result so selection page has data available
    try { sessionStorage.setItem('cl_fast_result', JSON.stringify(fastGenerateLeague())); } catch {}
    window.location.href = 'select.html';
  });
  if (btnSim) btnSim.addEventListener('click', () => {
    updateStatus('Simülasyon modu yakında…', 'busy');
    setTimeout(() => updateStatus('Hazır', 'ready'), 800);
  });
}

document.addEventListener('DOMContentLoaded', main);

// Placeholder league view until full scheduler is implemented
function renderLeaguePlaceholder() {
  const root = document.getElementById('league-content');
  root.innerHTML = '';
  state.groups.forEach(g => {
    g.teams.forEach(t => {
      const fx = createEl('div', 'fixture');
      const head = createEl('div', 'head');
      const title = createEl('span', '');
      title.append(createLogoImg(t));
      title.append(document.createTextNode(` ${t.name}`));
      head.append(title);
      head.append(createEl('span', '', document.createTextNode('8 maç (taslak)')));
      fx.append(head);
      for (let i = 0; i < 2; i++) {
        const m = createEl('div', 'match');
        m.append(createEl('span', 'badge', document.createTextNode(i % 2 ? 'Çar' : 'Sal')));
        m.append(createEl('span', '', document.createTextNode('Rakip TBD')));
        m.append(createEl('span', 'badge', document.createTextNode(i % 2 ? 'D' : 'E')));
        fx.append(m);
      }
      root.append(fx);
    });
  });
}

// ---- Fast league-phase generation ----
function getAllTeams() {
  return pots.flatMap(p => p.teams.map(t => ({ ...t })));
}

function getPotsArrays() {
  return pots.map(p => p.teams.map(t => ({ ...t })));
}

const cityClusters = [
  ['Madrid', 'Real Madrid', 'Atlético Madrid'],
  ['Londra', 'Arsenal', 'Chelsea', 'Tottenham Hotspur'],
  ['Lizbon', 'Benfica', 'Sporting'],
];

function countryOpponentCountLimit(opponents) {
  const byCountry = {};
  opponents.forEach(o => { byCountry[o.country] = (byCountry[o.country] || 0) + 1; });
  const maxSame = Math.max(0, ...Object.values(byCountry));
  return maxSame <= 2; // same ülkeden toplam en fazla 2
}

function pickOpponentsFor(team, potsArrays) {
  const allOpp = [];
  for (let pi = 0; pi < potsArrays.length; pi++) {
    const pool = potsArrays[pi].filter(o => o.name !== team.name);
    const candidates = shuffle(pool).filter(o => !isBannedCountryPair(o.country, team.country));
    const chosen = [];
    for (const c of candidates) {
      if (c.country === team.country) continue; // aynı ülke yok
      if (chosen.find(x => x.name === c.name)) continue;
      chosen.push(c);
      if (chosen.length === 2) break;
    }
    // if not enough, relax slighty to allow same-country up to cap handled later
    let idx = 0;
    while (chosen.length < 2 && idx < candidates.length) {
      const c = candidates[idx++];
      if (c.name === team.name) continue;
      if (!chosen.find(x => x.name === c.name)) chosen.push(c);
    }
    allOpp.push(...chosen);
  }
  // ensure total 8
  const uniqueByName = [];
  const seen = new Set();
  for (const o of allOpp) {
    if (seen.has(o.name)) continue;
    uniqueByName.push(o); seen.add(o.name);
    if (uniqueByName.length === 8) break;
  }
  // enforce same-country max 2
  if (!countryOpponentCountLimit(uniqueByName)) {
    // crude fix: replace extra same-country with random from different country
    const byCountry = {};
    uniqueByName.forEach(o => { byCountry[o.country] = (byCountry[o.country] || 0) + 1; });
    for (let i = 0; i < uniqueByName.length; i++) {
      const o = uniqueByName[i];
      if (byCountry[o.country] > 2) {
        const alternativePool = getAllTeams().filter(x => x.name !== team.name && x.name !== o.name && x.country !== o.country && !isBannedCountryPair(x.country, team.country));
        const alt = alternativePool.find(x => !uniqueByName.find(y => y.name === x.name));
        if (alt) {
          byCountry[o.country]--; byCountry[alt.country] = (byCountry[alt.country] || 0) + 1;
          uniqueByName[i] = alt;
        }
      }
    }
  }
  // backfill to 8 if still short
  if (uniqueByName.length < 8) {
    const globalPool = getAllTeams().filter(x => x.name !== team.name && !seen.has(x.name) && x.country !== team.country && !isBannedCountryPair(x.country, team.country));
    for (const cand of shuffle(globalPool)) {
      const byCountry = uniqueByName.reduce((acc, t) => (acc[t.country] = (acc[t.country]||0)+1, acc), {});
      if ((byCountry[cand.country] || 0) >= 2) continue;
      uniqueByName.push(cand); seen.add(cand.name);
      if (uniqueByName.length === 8) break;
    }
  }
  return uniqueByName.slice(0, 8);
}

function buildFixtures(opponentsByTeam) {
  // create unique fixtures A vs B with home/away split for each team list
  const key = (a, b) => a < b ? `${a}|${b}` : `${b}|${a}`;
  const fixturesMap = new Map();
  for (const [, info] of opponentsByTeam) {
    const team = info.team;
    info.opponents.forEach((opp, idx) => {
      const k = key(team.name, opp.name);
      if (fixturesMap.has(k)) return;
      const homeFirst = idx % 2 === 0; // alternate
      fixturesMap.set(k, {
        a: team, b: opp,
        home: homeFirst ? team.name : opp.name,
        away: homeFirst ? opp.name : team.name,
      });
    });
  }
  // deterministic, but shuffled a bit to avoid clustering
  const all = shuffle(Array.from(fixturesMap.values()));

  // week assignment with strict one-match-per-team-per-week
  const weeks = Array.from({ length: 8 }, () => ({ fixtures: [], cityHomeCount: new Map(), dayCount: { Tue: 0, Wed: 0 }, teamsSet: new Set() }));
  const teamWeekUsed = new Map(); // name -> Set(week)
  const teamDayBalance = new Map();

  for (const fx of all) {
    const teams = [fx.a, fx.b];
    let placed = false;
    for (let attempt = 0; attempt < 16 && !placed; attempt++) {
      const weekIdx = attempt % 8; // scan weeks 0..7
      const week = weeks[weekIdx];
      const homeTeam = fx.home === fx.a.name ? fx.a : fx.b;
      const awayTeam = fx.home === fx.a.name ? fx.b : fx.a;
      // constraints
      const city = homeTeam.city || '';
      const homeCityCount = week.cityHomeCount.get(city) || 0;
      if (city && homeCityCount >= 1) continue;
      if (week.teamsSet.has(homeTeam.name) || week.teamsSet.has(awayTeam.name)) continue;
      const tWeeks = teamWeekUsed.get(homeTeam.name) || new Set();
      const oWeeks = teamWeekUsed.get(awayTeam.name) || new Set();
      if (tWeeks.has(weekIdx) || oWeeks.has(weekIdx)) continue;

      const day = (week.dayCount.Tue <= week.dayCount.Wed) ? 'Tue' : 'Wed';
      week.fixtures.push({ ...fx, week: weekIdx + 1, day });
      week.cityHomeCount.set(city, homeCityCount + 1);
      week.dayCount[day]++;
      week.teamsSet.add(homeTeam.name);
      week.teamsSet.add(awayTeam.name);
      teamWeekUsed.set(homeTeam.name, tWeeks.add(weekIdx));
      teamWeekUsed.set(awayTeam.name, oWeeks.add(weekIdx));
      const tBal = teamDayBalance.get(homeTeam.name) || { Tue: 0, Wed: 0 };
      const oBal = teamDayBalance.get(awayTeam.name) || { Tue: 0, Wed: 0 };
      teamDayBalance.set(homeTeam.name, { ...tBal, [day]: tBal[day] + 1 });
      teamDayBalance.set(awayTeam.name, { ...oBal, [day]: oBal[day] + 1 });
      placed = true;
    }
    if (!placed) {
      // last resort: push to the least loaded week ignoring city clash, but keeping one-per-week
      for (let weekIdx = 0; weekIdx < 8 && !placed; weekIdx++) {
        const week = weeks[weekIdx];
        if (week.teamsSet.has(fx.a.name) || week.teamsSet.has(fx.b.name)) continue;
        const day = (week.dayCount.Tue <= week.dayCount.Wed) ? 'Tue' : 'Wed';
        week.fixtures.push({ ...fx, week: weekIdx + 1, day });
        week.dayCount[day]++;
        week.teamsSet.add(fx.a.name); week.teamsSet.add(fx.b.name);
        placed = true;
      }
    }
  }

  return weeks.flatMap(wk => wk.fixtures).sort((a,b)=>a.week-b.week);
}

function fastGenerateLeague() {
  const potsArrays = getPotsArrays();
  const teams = getAllTeams();
  const opponentsByTeam = new Map();
  teams.forEach(team => {
    const opps = pickOpponentsFor(team, potsArrays);
    opponentsByTeam.set(team.name, { team, opponents: opps });
  });
  const fixtures = buildFixtures(opponentsByTeam);
  return { teams, opponentsByTeam, fixtures };
}

function renderLeague(result) {
  const root = document.getElementById('league-content');
  root.innerHTML = '';
  // Show unique fixtures grouped by week
  const byWeek = new Map();
  result.fixtures.forEach(f => {
    if (!byWeek.has(f.week)) byWeek.set(f.week, []);
    byWeek.get(f.week).push(f);
  });
  const weeksSorted = Array.from(byWeek.keys()).sort((a,b) => a-b);
  weeksSorted.forEach(weekNo => {
    const fx = createEl('div', 'fixture');
    const head = createEl('div', 'head');
    head.append(createEl('span', '', document.createTextNode(`Hafta ${weekNo}`)));
    head.append(createEl('span', '', document.createTextNode(`${byWeek.get(weekNo).length} maç`)));
    fx.append(head);
    byWeek.get(weekNo).forEach(m => {
      const row = createEl('div', 'match');
      row.append(createEl('span', 'badge', document.createTextNode(m.day === 'Tue' ? 'Sal' : 'Çar')));
      const left = createEl('span', ''); left.append(createLogoImg(m.a)); left.append(document.createTextNode(` ${m.a.name}`));
      const right = createEl('span', ''); right.append(createLogoImg(m.b)); right.append(document.createTextNode(` ${m.b.name}`));
      const vs = createEl('span', '', document.createTextNode(m.home === m.a.name ? ' (E) ' : ' (D) '));
      row.append(left);
      row.append(createEl('span', '', document.createTextNode(' vs ')));
      row.append(right);
      row.append(vs);
      fx.append(row);
    });
    root.append(fx);
  });
}


