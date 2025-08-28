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
  const map = {
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
    'Kairat': 'assets/top-5-football-leagues/others/fckairat.png'
  };
  const candidates = [];
  if (map[team.name]) candidates.push(map[team.name]);
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  candidates.push(
    `assets/top-5-football-leagues/premier-league/${slug(team.name)}.png`,
    `assets/top-5-football-leagues/la-liga/${slug(team.name)}.png`,
    `assets/top-5-football-leagues/bundesliga/${slug(team.name)}.png`,
    `assets/top-5-football-leagues/serie-a/${slug(team.name)}.png`,
    `assets/top-5-football-leagues/french-ligue1/${slug(team.name)}.png`,
    `assets/top-5-football-leagues/others/${slug(team.name)}.png`
  );
  let idx = 0;
  const tryNext = () => {
    if (idx >= candidates.length) { img.style.display = 'none'; return; }
    img.src = candidates[idx++];
  };
  img.onerror = tryNext;
  tryNext();
  return img;
}

function renderWeek(result, weekNo) {
  const root = document.getElementById('general-content');
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

function main() {
  let result = null;
  try { result = JSON.parse(sessionStorage.getItem('cl_fast_result')); } catch {}
  if (!result) {
    const root = document.getElementById('general-content');
    root.textContent = 'Sonuç bulunamadı.';
    return;
  }
  let currentWeek = 1;
  renderWeek(result, currentWeek);
  document.getElementById('prev-week').addEventListener('click', () => { currentWeek = Math.max(1, currentWeek - 1); renderWeek(result, currentWeek); });
  document.getElementById('next-week').addEventListener('click', () => { currentWeek = Math.min(8, currentWeek + 1); renderWeek(result, currentWeek); });
}

document.addEventListener('DOMContentLoaded', main);


