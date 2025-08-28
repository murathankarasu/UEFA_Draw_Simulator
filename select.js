function createEl(tag, className, children) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (children) {
    if (Array.isArray(children)) children.forEach(c => el.append(c));
    else el.append(children);
  }
  return el;
}

// Reuse logo mapping logic as a minimal copy for this page
function createLogoImg(team) {
  const img = new Image();
  img.width = 40; img.height = 40; img.alt = team.name;
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
    'Kairat': 'assets/top-5-football-leagues/others/fckairat.png',
  };
  const candidates = [];
  if (map[team.name]) candidates.push(map[team.name]);
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

function main() {
  let teams = [];
  try {
    const data = JSON.parse(sessionStorage.getItem('cl_fast_result'));
    if (data?.teams?.length) teams = data.teams;
  } catch {}
  // Fallback: ask index to build available team list from pots quickly
  if (!teams.length) {
    // minimal list known from assets (subset) if session missing
    teams = [
      { name: 'Real Madrid' }, { name: 'Barcelona' }, { name: 'Atlético Madrid' }, { name: 'Athletic Bilbao' }, { name: 'Villarreal' },
      { name: 'Manchester City' }, { name: 'Liverpool' }, { name: 'Chelsea' }, { name: 'Arsenal' }, { name: 'Tottenham Hotspur' }, { name: 'Newcastle United' },
      { name: 'Bayern München' }, { name: 'Borussia Dortmund' }, { name: 'Eintracht Frankfurt' }, { name: 'Bayer Leverkusen' },
      { name: 'Internazionale' }, { name: 'Juventus' }, { name: 'Napoli' }, { name: 'Atalanta' },
      { name: 'Paris Saint-Germain' }, { name: 'Marseille' }, { name: 'Monaco' }, { name: 'Benfica' }, { name: 'Ajax' }, { name: 'PSV' },
      { name: 'Club Brugge' }, { name: 'Copenhagen' }, { name: 'Galatasaray' }, { name: 'Karabağ' }, { name: 'Pafos' }, { name: 'Slavia Praha' }, { name: 'Sporting' }, { name: 'Bodø/Glimt' }, { name: 'Union SG' }, { name: 'Olimpiakos' }, { name: 'Kairat' },
    ];
  }
  const grid = document.getElementById('team-grid');
  teams.forEach(t => {
    const card = createEl('div', 'team-card');
    card.append(createLogoImg(t));
    card.append(createEl('div', 'name', document.createTextNode(t.name)));
    card.addEventListener('click', () => {
      try { sessionStorage.setItem('cl_selected_team', t.name); } catch {}
      const ov = document.getElementById('overlay');
      const ovLogo = document.getElementById('overlay-logo');
      if (ovLogo) ovLogo.src = (function(){ const img = createLogoImg(t); return img.src; })();
      ov?.classList.add('show');
      startInfoRotator();
      // ensure overlay paints before navigation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => { window.location.href = 'result.html'; }, 1400);
        });
      });
    });
    grid.append(card);
  });
}

document.addEventListener('DOMContentLoaded', main);

function startInfoRotator() {
  const infos = [
    'yasak eşleşmeler kontrol ediliyor…',
    'aynı ülke karşılaşmaları engelleniyor…',
    'şehir çakışmaları çözümleniyor…',
    'Salı/Çarşamba dengelemesi yapılıyor…',
    'her torbadan 2 rakip seçiliyor…',
    '8 maçlık fikstür üretiliyor…',
  ];
  const el = document.getElementById('overlay-info');
  if (!el) return;
  let i = 0;
  const tick = () => {
    el.classList.remove('fade');
    // force reflow
    void el.offsetWidth;
    el.textContent = infos[i % infos.length];
    el.classList.add('fade');
    i++;
  };
  tick();
  setInterval(tick, 1100);
}


