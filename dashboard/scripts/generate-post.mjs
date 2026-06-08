import { createCanvas, loadImage } from 'canvas';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = join(__dirname, '..', '..');

// ── Brand palettes ──
const BRANDS = {
  daimotorsmcbo: {
    primary: '#003984', secondary: '#60605B', accent: '#BFBAAF',
    dark: '#001F4A', light: '#E8EDF5',
    logo: 'DAI MOTORS', subtitle: 'Concesionario Hyundai',
    ig: '@daimotorsmcbo', ctas: ['COMPRA TU HYUNDAI', 'FINANCIA YA', 'AGENDA TU TEST DRIVE'],
    models: ['Accent', 'Tucson', 'Elantra', 'Santa Fe'],
    unsplashQuery: 'hyundai-car'
  },
  cherymaracaibo: {
    primary: '#C30D23', secondary: '#B2B2B2', accent: '#373C42',
    dark: '#7A0816', light: '#FCE8EB',
    logo: 'CHERY', subtitle: 'Maracaibo',
    ig: '@cherymaracaibo', ctas: ['DESCUBRE CHERY', 'AGENDA TU PRUEBA', 'PIDE INFORMACIÓN'],
    models: ['Tiggo', 'Himla'],
    unsplashQuery: 'chery-car'
  },
  yantaimotors: {
    primary: '#000000', secondary: '#5C6264', accent: '#C8A951',
    dark: '#000000', light: '#F0F0F0',
    logo: 'YANTAI MOTORS', subtitle: 'Jetour · Kaiyi · Karry',
    ig: '@yantaimotors', ctas: ['EXCLUSIVO', 'AGENDA TU VISITA', 'FINANCIA AHORA'],
    models: ['X70', 'X70 Plus', 'X3', 'Kaiyi'],
    unsplashQuery: 'luxury-suv'
  },
  kyotomotorsmcbo: {
    primary: '#E60012', secondary: '#2B2B2B', accent: '#CCCCCC',
    dark: '#8F000B', light: '#FDE8EA',
    logo: 'KYOTO MOTORS', subtitle: 'Concesionario Mitsubishi',
    ig: '@kyotomotorsmcbo', ctas: ['REPUESTOS ORIGINALES', 'AGENDA TU TALLER', 'COTIZA AHORA'],
    models: ['L200', 'Touring'],
    unsplashQuery: 'mitsubishi-car'
  },
  repuestoskiamcbo: {
    primary: '#BB162C', secondary: '#7E8083', accent: '#05141F',
    dark: '#730D1B', light: '#FDE8EA',
    logo: 'REPUESTOS KIA', subtitle: 'McBo',
    ig: '@repuestoskiamcbo', ctas: ['PREGUNTA POR WHATSAPP', 'REPUESTOS ORIGINALES', 'COTIZA AHORA'],
    models: ['Picanto', 'Cerato', 'Optima', 'Sportage'],
    unsplashQuery: 'kia-car'
  }
};

const SIZE = 1080;
const UTM = '?utm_source=cavo-dashboard&utm_medium=referral';

// ── Unsplash helpers ──
async function fetchUnsplashImage(query) {
  const url = `https://source.unsplash.com/featured/1200x800/?${encodeURIComponent(query)}${UTM}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error(`Unsplash: ${res.status}`);
    return await res.arrayBuffer();
  } catch (e) {
    console.warn(`  ⚠ Unsplash fetch failed: ${e.message}. Using gradient fallback.`);
    return null;
  }
}

// ── Drawing helpers ──
function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawGlassCard(ctx, x, y, w, h, r = 30) {
  ctx.save();
  roundedRect(ctx, x, y, w, h, r);
  ctx.clip();
  const grad = ctx.createLinearGradient(x, y, x, y + h);
  grad.addColorStop(0, 'rgba(255,255,255,0.12)');
  grad.addColorStop(1, 'rgba(255,255,255,0.04)');
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 1.5;
  roundedRect(ctx, x, y, w, h, r);
  ctx.stroke();
  ctx.restore();
}

function drawBrandGradient(ctx, brand, w = SIZE, h = SIZE) {
  const grad = ctx.createRadialGradient(w * 0.3, h * 0.2, 0, w * 0.5, h * 0.5, w * 0.9);
  grad.addColorStop(0, brand.primary);
  grad.addColorStop(0.4, brand.dark);
  grad.addColorStop(1, '#0a0a0a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

function drawGeometricAccents(ctx, brand) {
  ctx.globalAlpha = 0.06;
  for (let i = 0; i < 6; i++) {
    const x = Math.random() * SIZE;
    const y = Math.random() * SIZE;
    const s = 80 + Math.random() * 200;
    ctx.fillStyle = brand.accent;
    ctx.beginPath();
    ctx.moveTo(x, y - s / 2);
    ctx.lineTo(x + s / 2, y + s / 2);
    ctx.lineTo(x - s / 2, y + s / 2);
    ctx.closePath();
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const w of words) {
    const test = current ? current + ' ' + w : w;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = w;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

// ── Templates ──

async function templatePromo(ctx, brand, imgBuffer, params) {
  const { title, subtitle, cta, model } = params;
  const W = SIZE, H = SIZE;

  // Background
  drawBrandGradient(ctx, brand);
  if (imgBuffer) {
    const img = await loadImage(Buffer.from(imgBuffer));
    ctx.globalAlpha = 0.35;
    ctx.drawImage(img, 0, -200, W, W + 400);
    ctx.globalAlpha = 1;
    // Darken overlay
    const over = ctx.createLinearGradient(0, 0, 0, H);
    over.addColorStop(0, 'rgba(0,0,0,0.3)');
    over.addColorStop(0.5, 'rgba(0,0,0,0.6)');
    over.addColorStop(1, 'rgba(0,0,0,0.9)');
    ctx.fillStyle = over;
    ctx.fillRect(0, 0, W, H);
  }
  drawGeometricAccents(ctx, brand);

  // Top brand bar
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.fillRect(0, 0, W, 100);
  ctx.fillStyle = brand.light;
  ctx.font = '36px Impact';
  ctx.fillText(brand.logo, 50, 70);
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '22px "Segoe UI"';
  ctx.textAlign = 'right';
  ctx.fillText(brand.ig, W - 50, 70);

  // Main headline
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const headline = title || `NUEVO ${model || brand.models[0]}`;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '96px Impact';
  const headlineLines = wrapText(ctx, headline, W - 200);
  let yPos = 380;
  for (const line of headlineLines) {
    ctx.fillText(line, W / 2, yPos);
    yPos += 90;
  }

  // Subtitle
  if (subtitle) {
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '32px "Segoe UI"';
    ctx.fillText(subtitle, W / 2, yPos + 40);
  }

  // Glass CTA card
  const cardW = 500, cardH = 80;
  const cardX = (W - cardW) / 2, cardY = H - 180;
  drawGlassCard(ctx, cardX, cardY, cardW, cardH, 40);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '36px Impact';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(cta || brand.ctas[0], W / 2, cardY + cardH / 2);

  // Bottom accent line
  ctx.fillStyle = brand.primary;
  ctx.fillRect(340, H - 60, 400, 4);
}

async function templateDelivery(ctx, brand, imgBuffer, params) {
  const { title, model } = params;
  const W = SIZE, H = SIZE;

  // Full-bleed image
  if (imgBuffer) {
    const img = await loadImage(Buffer.from(imgBuffer));
    ctx.drawImage(img, -100, -100, W + 200, H + 200);
  } else {
    drawBrandGradient(ctx, brand);
  }
  const over = ctx.createLinearGradient(0, 0, 0, H);
  over.addColorStop(0, 'rgba(0,0,0,0.15)');
  over.addColorStop(0.6, 'rgba(0,0,0,0.5)');
  over.addColorStop(1, 'rgba(0,0,0,0.85)');
  ctx.fillStyle = over;
  ctx.fillRect(0, 0, W, H);

  // Ribbon "ENTREGADO"
  ctx.save();
  ctx.translate(W / 2, 180);
  ctx.rotate(-0.05);
  const ribbonW = 520, ribbonH = 80;
  roundedRect(ctx, -ribbonW / 2, -ribbonH / 2, ribbonW, ribbonH, 8);
  ctx.fillStyle = brand.primary;
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 30;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '48px Impact';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🚛 ENTREGADO', 0, 4);
  ctx.restore();

  // Car model
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '110px Impact';
  ctx.fillText(model || title || 'NUEVA UNIDAD', W / 2, 380);

  // Congrats subtext
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = '28px "Segoe UI"';
  ctx.fillText('¡Felicidades! Disfruta tu nuevo vehículo', W / 2, 460);

  // Bottom info bar
  drawGlassCard(ctx, 140, H - 170, 800, 100, 16);
  ctx.fillStyle = brand.light;
  ctx.font = '26px "Segoe UI"';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`📍 Av. Bella Vista · ${brand.logo}`, W / 2, H - 120);
}

async function templateLaunch(ctx, brand, imgBuffer, params) {
  const { title, subtitle, specs, model } = params;
  const W = SIZE, H = SIZE;

  // Dark dramatic background
  const bg = ctx.createRadialGradient(W / 2, 100, 0, W / 2, H / 2, W);
  bg.addColorStop(0, brand.dark);
  bg.addColorStop(0.5, brand.dark);
  bg.addColorStop(1, '#050505');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Light leak
  const leak = ctx.createRadialGradient(800, -100, 0, 800, -100, 600);
  leak.addColorStop(0, brand.primary + '40');
  leak.addColorStop(1, 'transparent');
  ctx.fillStyle = leak;
  ctx.fillRect(0, 0, W, H);

  // Car image bottom 60%
  if (imgBuffer) {
    const img = await loadImage(Buffer.from(imgBuffer));
    ctx.globalAlpha = 0.8;
    ctx.drawImage(img, -50, 320, W + 100, 700);
    ctx.globalAlpha = 1;
    const fade = ctx.createLinearGradient(0, 320, 0, 500);
    fade.addColorStop(0, 'rgba(5,5,5,1)');
    fade.addColorStop(1, 'rgba(5,5,5,0)');
    ctx.fillStyle = fade;
    ctx.fillRect(0, 320, W, 200);
  }

  // Tag: LAUNCH
  ctx.fillStyle = brand.accent;
  ctx.font = '28px "Segoe UI"';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('✦ NUEVO LANZAMIENTO', 60, 60);

  // Model name big
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '130px Impact';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(model || title || 'NUEVO MODELO', 60, 120);

  // Specs pills
  const specsList = specs || ['Tecnología de punta', 'Diseño renovado', 'Mayor rendimiento'];
  ctx.textBaseline = 'middle';
  let sx = 60, sy = 300;
  for (const s of specsList) {
    const sw = ctx.measureText(s).width + 40;
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    roundedRect(ctx, sx, sy - 25, sw, 50, 25);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '22px "Segoe UI"';
    ctx.textAlign = 'center';
    ctx.fillText(s, sx + sw / 2, sy);
    sx += sw + 16;
  }

  // CTA bottom right
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillStyle = brand.primary;
  ctx.font = '44px Impact';
  ctx.fillText(subtitle || brand.ctas[1] || 'AGENDA TU VISITA', W - 60, H - 60);
}

async function templateEducational(ctx, brand, imgBuffer, params) {
  const { title, subtitle, tips } = params;
  const W = SIZE, H = SIZE;

  // Clean gradient background
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, brand.primary);
  grad.addColorStop(1, brand.dark);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Subtle pattern
  ctx.globalAlpha = 0.04;
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(100 + i * 35, 80 + (i % 7) * 140, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Side image
  if (imgBuffer) {
    const img = await loadImage(Buffer.from(imgBuffer));
    ctx.globalAlpha = 0.2;
    ctx.drawImage(img, 600, 0, 600, H);
    ctx.globalAlpha = 1;
    const sideFade = ctx.createLinearGradient(500, 0, 700, 0);
    sideFade.addColorStop(0, 'rgba(0,0,0,1)');
    sideFade.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sideFade;
    ctx.fillRect(500, 0, 200, H);
  }

  // Icon
  ctx.fillStyle = brand.accent;
  ctx.font = '60px Impact';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('⏐ ' + (subtitle || 'CONSEJO DEL DÍA'), 60, 60);

  // Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '78px Impact';
  const titleLines = wrapText(ctx, title || 'Tips para tu vehículo', 600);
  let y = 160;
  for (const l of titleLines) {
    ctx.fillText(l, 60, y);
    y += 80;
  }

  // Tips cards
  const tipsList = tips || ['Revisa el aceite cada 5,000 km', 'Usa repuestos originales', 'Mantén la presión de neumáticos'];
  y = Math.max(y + 40, 360);
  for (const tip of tipsList) {
    drawGlassCard(ctx, 60, y, 650, 70, 35);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '26px "Segoe UI"';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`▸ ${tip}`, 90, y + 35);
    y += 90;
  }

  // Footer
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.font = '20px "Segoe UI"';
  ctx.fillText(`${brand.logo} · ${brand.ig}`, W / 2, H - 40);
}

// ── Main ──

const TEMPLATES = { promo: templatePromo, delivery: templateDelivery, launch: templateLaunch, educational: templateEducational };

async function generatePost(account, template = 'promo', params = {}) {
  const brand = BRANDS[account];
  if (!brand) throw new Error(`Unknown account: ${account}`);

  const outDir = join(POSTS_DIR, account, 'posts');
  mkdirSync(outDir, { recursive: true });

  console.log(`\n🎨 Generating ${template} post for ${account}...`);

  let imgBuffer = null;
  if (!params.noImage) {
    imgBuffer = await fetchUnsplashImage(params.query || brand.unsplashQuery);
  }

  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext('2d');

  const fn = TEMPLATES[template];
  if (!fn) throw new Error(`Unknown template: ${template}`);
  await fn(ctx, brand, imgBuffer, params);

  const slug = `${account}-${template}-${Date.now()}`;
  const outPath = join(outDir, `${slug}.png`);
  writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log(`  ✅ Saved: ${outPath}`);
  return outPath;
}

// ── CLI ──
const [,, account, template, ...rest] = process.argv;
if (account && template) {
  const params = {};
  if (rest.length) {
    for (let i = 0; i < rest.length; i++) {
      if (rest[i].startsWith('--')) {
        const key = rest[i].slice(2);
        const val = rest[i + 1] && !rest[i + 1].startsWith('--') ? rest[i + 1] : true;
        params[key] = val;
        if (val !== true) i++;
      }
    }
  }
  generatePost(account, template, params);
} else {
  console.log('Usage: node scripts/generate-post.mjs <account> <template> [--title "..." --subtitle "..." --cta "..."]');
  console.log(`Accounts: ${Object.keys(BRANDS).join(', ')}`);
  console.log(`Templates: ${Object.keys(TEMPLATES).join(', ')}`);
}

export { generatePost, BRANDS, TEMPLATES };
