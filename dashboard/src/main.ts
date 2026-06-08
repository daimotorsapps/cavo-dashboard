// ═══════════════════════════════════════
// CAVO DASHBOARD — Engine
// ═══════════════════════════════════════

interface RecentPost { url: string; }
interface ReelShot { shot: number; desc: string; }
interface ReelIdea {
  title: string;
  theme: string;
  shots: ReelShot[];
  copy: string;
  music: string;
  talent: string;
}
interface AccountReelIdeas {
  id: string;
  ideas: ReelIdea[];
}
interface Account {
  id: string; name: string; handle: string; bio: string;
  avatar: string; avatarBg: string;
  followers: number; following: number; posts: number;
  engagement: number; growth30d: number; avgLikes: number; avgComments: number;
  topHashtags: string[]; opportunities: string[];
  tone: string; models: string[]; location: string; since: string;
  garantia: string; financiamiento: string; grupo: string;
  recentPosts?: RecentPost[];
}

const accounts: Account[] = [
  {
    id: 'daimotorsmcbo', name: 'Dai Motors MCBO', handle: '@daimotorsmcbo',
    bio: 'Concesionario Autorizado Hyundai · Maracaibo',
    avatar: 'D', avatarBg: '#06b6d4',
    followers: 7408, following: 158, posts: 1264,
    engagement: 2.1, growth30d: 1.8, avgLikes: 28, avgComments: 3,
    topHashtags: ['#hyundaivenezuela', '#hyundaiaccent', '#hyundaimaracaibo', '#DaiMotorsmcbo', '#CTZFinancing'],
    opportunities: [
      'Engagement bajo (2.1%) — reactivar comunidad con contenido interactivo',
      'Sin storytelling consistente ni series de contenido',
      'Faltan video reviews y pruebas de modelos',
      'Colaboraciones con influencers automotrices del Zulia',
      'Historias de Instagram infrautilizadas para captura de leads'
    ],
    tone: 'Emocional, aspiracional, profesional', location: 'Av. 4 Bella Vista, Maracaibo',
    since: '2004', garantia: '5 años / 150,000 km', financiamiento: 'CTZ Financing',
    grupo: 'Dai Motors, S.A.',
    models: ['Hyundai Accent', 'Hyundai Tucson 4x2/4x4', 'Hyundai Elantra', 'Hyundai Santa Fe']
  },
  {
    id: 'cherymaracaibo', name: 'Chery Maracaibo', handle: '@cherymaracaibo',
    bio: 'Concesionario Autorizado Chery · Maracaibo · Dai Motors',
    avatar: 'C', avatarBg: '#f59e0b',
    followers: 420, following: 85, posts: 38,
    engagement: 4.8, growth30d: 12.5, avgLikes: 18, avgComments: 2,
    topHashtags: ['#CheryMaracaibo', '#GranInauguracion', '#CheryVenezuela', '#InnovacionAutomotriz', '#Himla'],
    opportunities: [
      'Cuenta en fase 0 — todo por construir desde base',
      'Cross-promo con @cheryvenezuela_ (118K seguidores)',
      'Himla pick-up tiene alto potencial en mercado zuliano',
      'Contenido de capacitación de asesores genera confianza',
      'Falta calendario editorial y estrategia de contenidos'
    ],
    tone: 'Moderno, fresco, juvenil', location: 'Av. 4 Bella Vista, Maracaibo',
    since: '2026', garantia: '5 años / 150,000 km', financiamiento: 'CTZ Financing',
    grupo: 'Dai Motors, S.A.',
    models: ['Chery Tiggo Pro', 'Chery Tiggo 8', 'Chery Himla Pick-Up']
  },
  {
    id: 'yantaimotors', name: 'Yantai Motors', handle: '@yantaimotors',
    bio: 'Jetour · Kaiyi · Karry · Alta Gama · Maracaibo',
    avatar: 'Y', avatarBg: '#ef4444',
    followers: 4770, following: 100, posts: 531,
    engagement: 1.5, growth30d: 0.9, avgLikes: 12, avgComments: 1,
    topHashtags: ['#Jetour', '#Kaiyi', '#Karry', '#YantaiMotors', '#Maracaibo'],
    opportunities: [
      'Engagement crítico (1.5%) — audiencia pasiva',
      'Contenido uni-direccional sin interacción con la comunidad',
      'Sin contenido educativo sobre marcas chinas (Jetour es poco conocida)',
      'Video reviews y comparativas con otras SUVs del mercado',
      'Linktree sin optimización para captura de leads'
    ],
    tone: 'Aspiracional, sofisticado, lujo accesible', location: 'Av. 4 Bella Vista, Maracaibo',
    since: '2023', garantia: '100,000 km / 5 años', financiamiento: 'BNC (12-24 meses)',
    grupo: 'Yantai Motors, S.A.',
    models: ['Jetour X70', 'Jetour X70 Plus', 'Jetour X3', 'Kaiyi', 'Karry Pick-Up 1TN']
  },
  {
    id: 'kyotomotorsmcbo', name: 'Kyoto Motors MCBO', handle: '@kyotomotorsmcbo',
    bio: 'Concesionario Autorizado Mitsubishi · Maracaibo',
    avatar: 'K', avatarBg: '#8b5cf6',
    followers: 5494, following: 1689, posts: 890,
    engagement: 1.2, growth30d: 0.3, avgLikes: 8, avgComments: 1,
    topHashtags: ['#Mitsubishi', '#KyotoMotors', '#Maracaibo', '#Zulia', '#L200'],
    opportunities: [
      'Engagement muy bajo — menos de 10 likes promedio',
      'Contenido mayormente estatico (fotos), faltan reels',
      'Sigue a 1,689 cuentas — ratio desbalanceado',
      'Potencial en videos de taller/mecanica',
      'Sin colaboraciones con otras cuentas del grupo'
    ],
    tone: 'Profesional, cercano, con humor', location: 'Av. Bella Vista, Maracaibo',
    since: '1999', garantia: '5 anos / 150,000 km', financiamiento: 'Varios',
    grupo: 'Kyoto Motors, S.A.',
    models: ['Mitsubishi L200', 'Mitsubishi Touring', 'Mitsubishi Montero', 'Mitsubishi ASX']
  },
  {
    id: 'repuestoskiamcbo', name: 'Repuestos Kia MCBO', handle: '@repuestoskiamcbo',
    bio: 'Centro de repuestos originales Kia · Maracaibo',
    avatar: 'R', avatarBg: '#10b981',
    followers: 520, following: 9, posts: 270,
    engagement: 2.8, growth30d: 1.1, avgLikes: 5, avgComments: 1,
    topHashtags: ['#repuestosoriginales', '#repuestoskiamcbo', '#repuestoskia', '#kia', '#maracaibo'],
    opportunities: [
      'Cuenta nicho, propuesta clara pero poco crecimiento',
      'Sin contenido de video — reels educativos posibles',
      'Podrian mostrar procesos de taller',
      'Sin competencia directa fuerte en IG en Maracaibo',
      'Potencial en contenido educativo: original vs falso'
    ],
    tone: 'Educativo, servicial, directo', location: 'Av. 4 Bella Vista, Maracaibo',
    since: '2023', garantia: 'Repuestos originales', financiamiento: 'No aplica',
    grupo: '—',
    models: ['Kia Picanto', 'Kia Cerato', 'Kia Optima', 'Kia Pregio', 'Kia Sportage']
  }
];

const reelIdeas: AccountReelIdeas[] = [
  {
    id: 'daimotorsmcbo',
    ideas: [
      {
        title: 'Las Llaves', theme: 'Día del Padre',
        shots: [
          { shot: 1, desc: 'Asesor entrega llaves a papá junto a Tucson azul en showroom' },
          { shot: 2, desc: 'Close-up manos recibiendo llaves' },
          { shot: 3, desc: 'Papá abre puerta, se sienta al volante, sonrisa' },
          { shot: 4, desc: 'Texto: "Este es tu regalo, papá."' }
        ],
        copy: '1 línea emocional', music: 'Acústica', talent: 'Papá + asesor'
      },
      {
        title: 'La Selección de Tu Papá', theme: 'Mundial',
        shots: [
          { shot: 1, desc: 'Asesor parado frente a 3 modelos (Accent, Tucson, Elantra)' },
          { shot: 2, desc: 'Cada modelo con sticker de país en el vidrio' },
          { shot: 3, desc: 'Texto: "¿Cuál te llevas para ver el partido?"' }
        ],
        copy: '1 línea promocional', music: 'Electrónica con beat de estadio', talent: 'Asesor'
      }
    ]
  },
  {
    id: 'cherymaracaibo',
    ideas: [
      {
        title: 'El Hijo Elige', theme: 'Día del Padre',
        shots: [
          { shot: 1, desc: 'Papá e hijo entran al showroom, ven Tiggo roja' },
          { shot: 2, desc: 'Niño señala el carro, papá ríe' },
          { shot: 3, desc: 'Asesor abre puerta, papá examina interior' },
          { shot: 4, desc: 'Texto: "Cuando tu hijo elige el próximo carro."' }
        ],
        copy: 'Tono divertido/familiar', music: 'Reggaeton suave, loop batería', talent: 'Papá + hijo + asesor'
      },
      {
        title: 'La Selección de Papá', theme: 'Mundial',
        shots: [
          { shot: 1, desc: 'Papá frente a Himla con bandera venezolana' },
          { shot: 2, desc: 'Plano abierto showroom' },
          { shot: 3, desc: 'Texto: "La selección de papá."' }
        ],
        copy: '1 línea', music: 'Guaracha / festiva', talent: 'Papá'
      }
    ]
  },
  {
    id: 'yantaimotors',
    ideas: [
      {
        title: 'El Que Sabe', theme: 'Día del Padre',
        shots: [
          { shot: 1, desc: 'Papá trajeado camina showroom, iluminación dirigida' },
          { shot: 2, desc: 'Se detiene frente a Jetour X70 negro' },
          { shot: 3, desc: 'Asesor abre puerta, papá asiente' },
          { shot: 4, desc: 'Texto: "Para el papá que sabe lo que quiere."' }
        ],
        copy: 'Sofisticado, aspiracional', music: 'Lo-fi / jazz minimal', talent: 'Papá + asesor'
      },
      {
        title: 'La Hinchada Cabe', theme: 'Mundial',
        shots: [
          { shot: 1, desc: 'Papá + amigos en showroom frente a Jetour' },
          { shot: 2, desc: 'Se toman selfie grupal' },
          { shot: 3, desc: 'Texto: "La hinchada cabe en un Jetour."' }
        ],
        copy: 'Grupal, divertido', music: 'Deep house ambiente', talent: 'Papá + 2 amigos'
      }
    ]
  }
];

interface ScrapedAccount { id: string; followers: number; posts: number; following: number; bio: string; recentPosts?: { url: string }[]; }

function sortAccounts() {
  accounts.sort((a, b) => b.followers - a.followers);
}

function buildSidebar() {
  const container = document.getElementById('nav-accounts')!;
  container.innerHTML = '';
  for (const a of accounts) {
    const btn = document.createElement('button');
    btn.className = 'nav-btn';
    btn.dataset.view = a.id;
    btn.innerHTML = `<span class="nav-dot" style="--dot-color:${a.avatarBg}"></span>${a.handle}`;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentView = a.id;
      document.getElementById('view-title')!.textContent = a.name;
      renderDetail(a.id);
    });
    container.append(btn);
  }
}

// ─── DOM helpers ───

function h(tag: string, attrs: Record<string, string> = {}, children: (string | HTMLElement)[] = []): HTMLElement {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  for (const c of children) e.append(typeof c === 'string' ? document.createTextNode(c) : c);
  return e;
}

function statRow(label: string, valueHTML: string): HTMLElement {
  const r = h('div', { class: 'stat-row' });
  r.append(h('span', { class: 'label' }, [label]));
  const val = h('span', { class: 'value' });
  val.innerHTML = valueHTML;
  r.append(val);
  return r;
}

function engBadge(v: number): string {
  const cls = v >= 3 ? 'green' : v >= 1.5 ? 'yellow' : 'red';
  return `<span class="badge badge-${cls}">${v.toFixed(1)}%</span>`;
}

function growBadge(v: number): string {
  const c = v >= 3 ? 'green' : v >= 1 ? 'yellow' : 'red';
  return `<span class="badge badge-${c}">${v >= 0 ? '+' : ''}${v.toFixed(1)}%</span>`;
}

// ─── Chart engine ───

function drawChart(
  canvas: HTMLCanvasElement,
  series: { data: number[]; color: string; label: string }[],
  months: string[],
  maxVal?: number
) {
  requestAnimationFrame(() => {
    const ctx = canvas.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width, h = rect.height;
    const pad = { t: 24, r: 16, b: 28, l: 40 };
    const cw = w - pad.l - pad.r, ch = h - pad.t - pad.b;
    ctx.clearRect(0, 0, w, h);

    if (!series.length || !series[0].data.length) return;

    const max = maxVal ?? Math.max(...series.flatMap(s => s.data), 1) * 1.2;
    const step = cw / (months.length - 1);

    // Grid
    ctx.strokeStyle = '#222639'; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.t + (ch / 4) * i;
      ctx.beginPath(); ctx.moveTo(pad.l - 4, y); ctx.lineTo(w - pad.r, y); ctx.stroke();
    }

    // Series
    series.forEach((s, si) => {
      ctx.beginPath();
      s.data.forEach((v, i) => {
        const x = pad.l + step * i;
        const y = pad.t + ch - (v / max) * ch;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.strokeStyle = s.color; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.stroke();

      // Dots
      s.data.forEach((v, i) => {
        const x = pad.l + step * i;
        const y = pad.t + ch - (v / max) * ch;
        ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = s.color; ctx.fill();
        ctx.strokeStyle = '#08090c'; ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Label
      if (series.length > 1 && s.data.length > 0) {
        const lx = pad.l + step * (s.data.length - 1);
        const ly = pad.t + ch - (s.data[s.data.length - 1] / max) * ch;
        ctx.fillStyle = s.color; ctx.font = '600 11px DM Sans, system-ui, sans-serif';
        ctx.textAlign = 'left';
        const offsetY = si === 0 ? -8 : si === 1 ? 8 : 0;
        ctx.fillText(s.label, lx + 8, ly + 4 + offsetY);
      }
    });

    // Y-axis
    ctx.fillStyle = '#4a4f63'; ctx.font = '10px DM Sans, system-ui, sans-serif'; ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const val = max - (max / 4) * i;
      ctx.fillText(val.toFixed(1) + '%', pad.l - 8, pad.t + (ch / 4) * i + 3);
    }

    // X-axis
    ctx.textAlign = 'center';
    months.forEach((m, i) => ctx.fillText(m, pad.l + step * i, h - 4));
  });
}

// ─── Views ───

function renderConsolidado() {
  const grid = h('div', { class: 'grid grid-3' });

  for (const a of accounts) {
    const card = h('div', { class: 'card', style: 'cursor:pointer' });
    card.addEventListener('click', () => {
      const btn = document.querySelector(`.nav-btn[data-view="${a.id}"]`) as HTMLElement;
      if (btn) btn.click();
    });
    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px">
        <h2 style="margin:0">${a.name}</h2>
        <span style="font-size:11px;color:var(--text-dim);font-family:'DM Sans',sans-serif">${a.handle}</span>
      </div>
      <div class="stat-group">
        <span class="stat-number" style="color:${a.avatarBg}">${a.followers.toLocaleString()}</span>
        <span class="stat-unit">seguidores</span>
      </div>
      <div style="margin-top:14px">
        <div class="stat-row"><span class="label">Posts</span><span class="value">${a.posts.toLocaleString()}</span></div>
        <div class="stat-row"><span class="label">Engagement</span><span class="value">${engBadge(a.engagement)}</span></div>
        <div class="stat-row"><span class="label">Crecimiento 30d</span><span class="value">${growBadge(a.growth30d)}</span></div>
        <div class="stat-row"><span class="label">Avg. Likes</span><span class="value">${a.avgLikes}</span></div>
      </div>
    `;
    grid.append(card);
  }

  // Chart card
  const chartCard = h('div', { class: 'card', style: 'grid-column:1/-1' });
  chartCard.innerHTML = `<h2>Evolución Engagement · últimos 6 meses</h2>`;
  const canvas = h('canvas') as HTMLCanvasElement;
  canvas.width = 300; canvas.height = 180;
  chartCard.append(canvas);
  grid.append(chartCard);

  const content = document.getElementById('content')!;
  content.innerHTML = '';
  content.append(grid);

  drawChart(canvas, [
    { data: [2.6, 2.4, 2.2, 2.0, 2.1, 2.1], color: '#06b6d4', label: 'Dai Motors' },
    { data: [0, 1.2, 2.8, 4.0, 4.5, 4.8], color: '#f59e0b', label: 'Chery MCBO' },
    { data: [2.0, 1.8, 1.7, 1.6, 1.5, 1.5], color: '#ef4444', label: 'Yantai Motors' },
    { data: [2.0, 1.8, 1.5, 1.4, 1.2, 1.2], color: '#8b5cf6', label: 'Kyoto Motors' },
    { data: [3.5, 3.2, 3.0, 2.9, 2.8, 2.8], color: '#10b981', label: 'Repuestos Kia' },
  ], ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']);
}

function renderDetail(id: string) {
  const a = accounts.find(x => x.id === id);
  if (!a) return;

  const c = h('div', { class: 'detail-grid' });

  // Profile card
  const prof = h('div', { class: 'card' });
  prof.innerHTML = `
    <div class="profile-header">
      <div class="profile-avatar" style="background:${a.avatarBg}20;color:${a.avatarBg};border-color:${a.avatarBg}40">${a.avatar}</div>
      <div class="profile-info">
        <h2>${a.name}</h2>
        <div class="handle">${a.handle} · ${a.bio}</div>
        <div class="profile-meta">
          <span>📍 ${a.location}</span>
          <span>📅 ${a.since}</span>
          <span>🏷️ ${a.grupo}</span>
        </div>
      </div>
    </div>
  `;
  c.append(prof);

  // Three metric cards
  const row = h('div', { class: 'grid grid-3', style: 'grid-column:1/-1' });

  const m1 = h('div', { class: 'card' });
  m1.innerHTML = `<h2>Audiencia</h2>
    <div class="stat-group"><span class="stat-number" style="color:${a.avatarBg}">${a.followers.toLocaleString()}</span><span class="stat-unit">seguidores</span></div>
    ${statRow('Siguiendo', a.following.toString()).outerHTML}
    ${statRow('Posts totales', a.posts.toLocaleString()).outerHTML}
    ${statRow('Crecimiento 30d', growBadge(a.growth30d)).outerHTML}
  `;
  row.append(m1);

  const m2 = h('div', { class: 'card' });
  m2.innerHTML = `<h2>Engagement</h2>
    <div class="stat-group"><span class="stat-number" style="color:${a.avatarBg}">${a.engagement.toFixed(1)}%</span><span class="stat-unit">tasa</span></div>
    ${statRow('Rating', engBadge(a.engagement)).outerHTML}
    ${statRow('Avg. Likes', a.avgLikes.toString()).outerHTML}
    ${statRow('Avg. Comments', a.avgComments.toString()).outerHTML}
  `;
  row.append(m2);

  const m3 = h('div', { class: 'card' });
  m3.innerHTML = `<h2>Modelos</h2>
    ${a.models.map(m => `<div class="model-item"><span class="name">${m}</span></div>`).join('')}
    <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border)">
      <div class="info-pill">🛡️ Garantía: <strong>${a.garantia}</strong></div>
      <div class="info-pill">💰 Financiamiento: <strong style="color:${a.avatarBg}">${a.financiamiento}</strong></div>
    </div>
  `;
  row.append(m3);
  c.append(row);

  // Tone + hashtags
  const extra = h('div', { class: 'grid grid-2', style: 'grid-column:1/-1' });

  const toneCard = h('div', { class: 'card' });
  toneCard.innerHTML = `<h2>Tono de marca</h2>
    <p style="font-size:14px;color:var(--text-muted);line-height:1.5">${a.tone}</p>
    <div class="tags">${a.topHashtags.map(h => `<span class="tag">${h}</span>`).join('')}</div>`;
  extra.append(toneCard);

  const oppCard = h('div', { class: 'card' });
  oppCard.innerHTML = `<h2>Oportunidades</h2>`;
  const ul = h('ul', { class: 'opp-list' });
  a.opportunities.forEach(o => ul.append(h('li', {}, [o])));
  oppCard.append(ul);
  extra.append(oppCard);
  c.append(extra);

  // Chart
  const chartCard = h('div', { class: 'card', style: 'grid-column:1/-1' });
  chartCard.innerHTML = `<h2>Evolución Engagement</h2>`;
  const canvas = h('canvas') as HTMLCanvasElement;
  canvas.width = 300; canvas.height = 180;
  chartCard.append(canvas);
  c.append(chartCard);

  // Recent posts
  if (a.recentPosts && a.recentPosts.length > 0) {
    const postsCard = h('div', { class: 'card', style: 'grid-column:1/-1' });
    postsCard.innerHTML = `<h2>Últimos posts</h2>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px">
        ${a.recentPosts.map(p =>
          `<a href="${p.url}" target="_blank" rel="noopener" style="flex:1;min-width:120px;padding:14px;background:var(--bg-surface2);border-radius:8px;border:1px solid var(--border);text-decoration:none;color:var(--text-muted);font-size:13px;text-align:center;transition:all var(--transition)" onmouseover="this.style.borderColor='var(--blue)'" onmouseout="this.style.borderColor=''">
            <span style="font-size:20px;display:block;margin-bottom:4px">📷</span>
            Ver post
          </a>`
        ).join('')}
      </div>`;
    c.append(postsCard);
  }

  const content = document.getElementById('content')!;
  content.innerHTML = '';
  content.append(c);

  const chartData: Record<string, number[]> = {
    daimotorsmcbo: [2.6, 2.4, 2.2, 2.0, 2.1, 2.1],
    cherymaracaibo: [0, 1.2, 2.8, 4.0, 4.5, 4.8],
    yantaimotors: [2.0, 1.8, 1.7, 1.6, 1.5, 1.5],
    kyotomotorsmcbo: [2.0, 1.8, 1.5, 1.4, 1.2, 1.2],
    repuestoskiamcbo: [3.5, 3.2, 3.0, 2.9, 2.8, 2.8]
  };
  const colorMap: Record<string, string> = {
    daimotorsmcbo: '#06b6d4', cherymaracaibo: '#f59e0b', yantaimotors: '#ef4444',
    kyotomotorsmcbo: '#8b5cf6', repuestoskiamcbo: '#10b981'
  };
  drawChart(canvas, [
    { data: chartData[id] || [], color: colorMap[id] || '#06b6d4', label: a.name }
  ], ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']);
}

// ─── Reels view ───

function renderReels() {
  const c = h('div', { style: 'display:flex;flex-direction:column;gap:24px' });

  for (const entry of reelIdeas) {
    const a = accounts.find(x => x.id === entry.id);
    if (!a) continue;
    const card = h('div', { class: 'card' });

    let html = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h2 style="margin:0;text-transform:none;font-size:20px;color:${a.avatarBg}">${a.name}</h2>
        <span style="font-size:12px;color:var(--text-dim)">${entry.ideas.length} ideas</span>
      </div>`;

    for (const idea of entry.ideas) {
      const themeBadge = idea.theme === 'Día del Padre'
        ? '<span style="background:rgba(251,191,36,0.1);color:#fbbf24;padding:2px 10px;border-radius:20px;font-size:11px;border:1px solid rgba(251,191,36,0.2)">👨 Día del Padre</span>'
        : '<span style="background:rgba(34,211,238,0.1);color:#22d3ee;padding:2px 10px;border-radius:20px;font-size:11px;border:1px solid rgba(34,211,238,0.2)">⚽ Mundial</span>';

      html += `
        <div style="background:var(--bg-surface2);border-radius:10px;padding:16px;margin-bottom:12px;border:1px solid var(--border)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
            <strong style="font-size:15px">${idea.title}</strong>
            ${themeBadge}
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr;gap:4px 12px;font-size:13px;color:var(--text-muted);margin-bottom:10px">`;

      for (const s of idea.shots) {
        html += `<span style="color:var(--text-dim);font-weight:600">${s.shot}.</span><span>${s.desc}</span>`;
      }

      html += `</div>
          <div style="display:flex;gap:16px;flex-wrap:wrap;font-size:12px;color:var(--text-dim);padding-top:10px;border-top:1px solid var(--border)">
            <span>🎵 ${idea.music}</span>
            <span>👤 ${idea.talent}</span>
            <span>📝 ${idea.copy}</span>
          </div>
        </div>`;
    }

    card.innerHTML = html;
    c.append(card);
  }

  const content = document.getElementById('content')!;
  content.innerHTML = '';
  content.append(c);
}

// ─── Refresh (inactivo — el scraper corre via GitHub Actions) ───

let currentView = 'consolidado';

// ─── Data loader ───

async function loadLiveData() {
  try {
    const res = await fetch('/data/instagram.json');
    if (!res.ok) throw new Error('Not found');
    const json = await res.json();
    const { accounts: scrapedData, scrapedAt } = json as { accounts: ScrapedAccount[]; scrapedAt: string };
    const scraped = new Map(scrapedData.map(a => [a.id, a]));

    for (const a of accounts) {
      const live = scraped.get(a.id) as ScrapedAccount | undefined;
      if (live) {
        if (live.followers > 0) a.followers = live.followers;
        if (live.posts > 0) a.posts = live.posts;
        if (live.following > 0) a.following = live.following;
        if (live.bio) a.bio = live.bio;
        if (live.recentPosts) a.recentPosts = live.recentPosts;
      }
    }

    sortAccounts();
    const time = document.getElementById('update-time')!;
    time.textContent = new Date(scrapedAt).toLocaleString('es-VE', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  } catch {
    // Fallback: keep hardcoded defaults
    document.getElementById('update-time')!.textContent = 'Datos locales (sin scrapeo)';
  }
}

// ─── Navigation ───

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentView = (btn as HTMLElement).dataset.view!;
    const title = currentView === 'consolidado' ? 'Consolidado'
      : currentView === 'reels' ? 'Reels'
      : accounts.find(a => a.id === currentView)?.name || currentView;
    document.getElementById('view-title')!.textContent = title;
    if (currentView === 'consolidado') renderConsolidado();
    else if (currentView === 'reels') renderReels();
    else renderDetail(currentView);
  });
});

// ─── Init ───

// Build ambient orbs
const ambient = document.getElementById('ambient')!;
for (let i = 0; i < 3; i++) {
  const orb = document.createElement('div');
  orb.className = 'ambient-orb';
  ambient.append(orb);
}
const noise = document.createElement('div');
noise.className = 'noise';
ambient.append(noise);

(async () => {
  await loadLiveData();
  sortAccounts();
  buildSidebar();
  const total = accounts.reduce((s, a) => s + a.followers, 0);
  document.querySelector('.header-meta')!.textContent =
    `5 cuentas · ${total.toLocaleString()} seguidores totales`;
  renderConsolidado();
})();
