function createEl(tag, className, children) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (children) {
    if (Array.isArray(children)) children.forEach(c => el.append(c));
    else el.append(children);
  }
  return el;
}

function createLogoImg(team) {
  const img = new Image();
  img.width = 22; img.height = 22; img.className = 'mini-logo'; img.alt = team.name;
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
  const candidates = [];
  if (teamLogoMap[team.name]) candidates.push(teamLogoMap[team.name]);
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

function renderLeague(result, opts = {}) {
  const root = opts.targetId ? document.getElementById(opts.targetId) : document.getElementById('league-content');
  root.innerHTML = '';
  const byWeek = new Map();
  result.fixtures.forEach(f => {
    if (!byWeek.has(f.week)) byWeek.set(f.week, []);
    byWeek.get(f.week).push(f);
  });
  const weeksSorted = Array.from(byWeek.keys()).sort((a,b) => a-b);
  const onlyTeam = opts.onlyTeam || null;
  weeksSorted.forEach(weekNo => {
    const fx = createEl('div', 'fixture fade-in');
    const head = createEl('div', 'head');
    const list = onlyTeam ? byWeek.get(weekNo).filter(m => m.a.name === onlyTeam || m.b.name === onlyTeam) : byWeek.get(weekNo);
    if (onlyTeam && list.length === 0) return; // skip empty weeks in team view
    head.append(createEl('span', '', document.createTextNode(`Hafta ${weekNo}`)));
    head.append(createEl('span', '', document.createTextNode(`${list.length} maç`)));
    fx.append(head);
    list.forEach(m => {
      const row = createEl('div', 'match pop');
      const left = createEl('span', ''); left.append(createLogoImg(m.a)); left.append(document.createTextNode(` ${m.a.name}`));
      const right = createEl('span', ''); right.append(createLogoImg(m.b)); right.append(document.createTextNode(` ${m.b.name}`));
      row.append(createEl('span', 'badge', document.createTextNode(m.day === 'Tue' ? 'Sal' : 'Çar')));
      row.append(left);
      row.append(createEl('span', '', document.createTextNode(' vs ')));
      row.append(right);
      row.append(createEl('span', 'badge', document.createTextNode(m.home === m.a.name ? 'E' : 'D')));
      fx.append(row);
    });
    root.append(fx);
  });
}

async function renderCommentary(result) {
  const key = localStorage.getItem('gemini_api_key');
  if (!key) return; // optional
  try {
    const pairs = result.fixtures.slice(0,8).map(m => `${m.a.name} vs ${m.b.name}`).join(', ');
    const prompt = `Aşağıdaki eşleşmeler için 2-3 cümle Türkçe kısa yorum yaz: ${pairs}`;
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + encodeURIComponent(key), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (text) {
      const wrap = createEl('div', 'fixture');
      wrap.append(createEl('div', 'head', createEl('span', '', document.createTextNode('Yorum (Gemini)'))));
      const p = createEl('div', 'match', document.createTextNode(text));
      wrap.append(p);
      document.querySelector('.layout').append(wrap);
    }
  } catch (e) {
    // ignore failures
  }
}

function main() {
  let result = null;
  try {
    result = JSON.parse(sessionStorage.getItem('cl_fast_result'));
  } catch {}
  // if result missing, we can't fully rebuild here without the algorithm; show message
  if (!result) {
    const root = document.getElementById('team-content') || document.getElementById('general-content') || document.body;
    if (root) {
      const msg = createEl('div', 'fixture', createEl('div', 'match', document.createTextNode('Sonuç bulunamadı. Lütfen ana sayfadan takım seçerek ilerleyin.')));
      root.append(msg);
    }
    return;
  }
  const selected = sessionStorage.getItem('cl_selected_team') || '';
  if (selected) {
    // team view
    const teamRoot = document.getElementById('team-content');
    const generalRoot = document.getElementById('general-content');
    if (teamRoot && generalRoot) {
      teamRoot.hidden = false; generalRoot.hidden = true;
      renderLeague(result, { onlyTeam: selected, targetId: 'team-content' });
    } else {
      renderLeague(result, { onlyTeam: selected });
    }
    // Always attempt AI commentary
    renderCommentaryPerWeek(result, selected);
  } else {
    renderLeague(result, {});
    renderCommentary(result);
  }
  setupToggle(result, selected);
}

function renderSelectedFirst(result, selectedName) {
  const root = document.getElementById('league-content');
  const wrap = document.createDocumentFragment();
  const fx = createEl('div', 'fixture');
  const head = createEl('div', 'head');
  head.append(createEl('span', '', document.createTextNode(`${selectedName} – 8 maç`)));
  fx.append(head);
  const me = result.fixtures.filter(f => f.a.name === selectedName || f.b.name === selectedName).slice(0,8);
  me.forEach(m => {
    const row = createEl('div', 'match');
    const left = createEl('span', ''); left.append(createLogoImg(m.a)); left.append(document.createTextNode(` ${m.a.name}`));
    const right = createEl('span', ''); right.append(createLogoImg(m.b)); right.append(document.createTextNode(` ${m.b.name}`));
    row.append(createEl('span', 'badge', document.createTextNode(m.day === 'Tue' ? 'Sal' : 'Çar')));
    row.append(left);
    row.append(createEl('span', '', document.createTextNode(' vs ')));
    row.append(right);
    row.append(createEl('span', 'badge', document.createTextNode(m.home === m.a.name ? 'E' : 'D')));
    fx.append(row);
  });
  root.prepend(fx);
}

function setupToggle(result, selected) {
  const btn = document.getElementById('btn-toggle');
  const weekNav = document.getElementById('week-nav');
  if (!btn) return;
  let mode = 'team'; // 'team' or 'general'
  let currentWeek = 1;
  const rerender = () => {
    if (mode === 'team') {
      weekNav.hidden = true;
      const teamRoot = document.getElementById('team-content');
      const generalRoot = document.getElementById('general-content');
      if (teamRoot && generalRoot) { teamRoot.hidden = false; generalRoot.hidden = true; }
      renderLeague(result, { onlyTeam: selected, targetId: 'team-content' });
    } else {
      weekNav.hidden = false;
      const teamRoot = document.getElementById('team-content');
      const generalRoot = document.getElementById('general-content');
      if (teamRoot && generalRoot) { teamRoot.hidden = true; generalRoot.hidden = false; }
      renderWeek(result, currentWeek);
    }
  };
  btn.addEventListener('click', () => {
    mode = mode === 'team' ? 'general' : 'team';
    btn.textContent = mode === 'team' ? 'Genel Fikstür' : 'Seçilen Takım';
    rerender();
  });
  document.getElementById('prev-week').addEventListener('click', () => { currentWeek = Math.max(1, currentWeek - 1); renderWeek(result, currentWeek); });
  document.getElementById('next-week').addEventListener('click', () => { currentWeek = Math.min(8, currentWeek + 1); renderWeek(result, currentWeek); });
  rerender();
}

function renderWeek(result, weekNo) {
  const root = document.getElementById('general-content') || document.getElementById('league-content');
  root.innerHTML = '';
  const label = document.getElementById('week-label');
  if (label) label.textContent = `Hafta ${weekNo}`;
  const list = result.fixtures.filter(f => f.week === weekNo);
  const fx = createEl('div', 'fixture');
  const head = createEl('div', 'head');
  head.append(createEl('span', '', document.createTextNode(`Hafta ${weekNo}`)));
  head.append(createEl('span', '', document.createTextNode(`${list.length} maç`)));
  fx.append(head);
  list.forEach(m => {
    const row = createEl('div', 'match');
    const left = createEl('span', ''); left.append(createLogoImg(m.a)); left.append(document.createTextNode(` ${m.a.name}`));
    const right = createEl('span', ''); right.append(createLogoImg(m.b)); right.append(document.createTextNode(` ${m.b.name}`));
    row.append(createEl('span', 'badge', document.createTextNode(m.day === 'Tue' ? 'Sal' : 'Çar')));
    row.append(left);
    row.append(createEl('span', '', document.createTextNode(' vs ')));
    row.append(right);
    row.append(createEl('span', 'badge', document.createTextNode(m.home === m.a.name ? 'E' : 'D')));
    fx.append(row);
  });
  root.append(fx);
}

async function renderCommentaryPerWeek(result, selected) {
  const key = localStorage.getItem('gemini_api_key');
  if (!key) return;
  const weeks = [...new Set(result.fixtures.map(f => f.week))].sort((a,b)=>a-b);
  for (const w of weeks) {
    const my = result.fixtures.filter(f => f.week === w && (f.a.name === selected || f.b.name === selected));
    if (!my.length) continue;
    const m = my[0];
    const prompt = `Aşağıdaki tek maç için 2-3 cümle Türkçe kısa yorum yaz. Odak: seyahat mesafesi (stadyumlar arası), takım güç dengesi (katsayılar yerine genel güç), ve maç bağlamı. Maç: ${m.a.name} vs ${m.b.name}.`;
    try {
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + encodeURIComponent(key), {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (text) {
        const wrap = createEl('div', 'fixture');
        const head = createEl('div', 'head');
        head.append(createEl('span', '', document.createTextNode(`Hafta ${w} – Yorum (Gemini)`)));
        wrap.append(head);
        wrap.append(createEl('div', 'match', document.createTextNode(text)));
        document.querySelector('.layout').append(wrap);
      }
    } catch {}
  }
}

document.addEventListener('DOMContentLoaded', main);


