// Ģenerē infografikas SVG pārlūkā (teksta platums tiek mērīts ar īsto Inter fontu).
// Izsauc: window.buildInfographic() -> SVG virkne.
window.buildInfographic = function (fontCss = '') {
  const W = 1080, H = 2400;
  const C = {
    bg0: '#07111f', bg1: '#0b1d38', cyan: '#22d3ee', orange: '#ff8a3d',
    green: '#34d399', text: '#eaf1fb', muted: '#c4d3ea',
  };
  const FONT = "InterLV, Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

  // ---------- teksta mērīšana ----------
  const NS = 'http://www.w3.org/2000/svg';
  const probeSvg = document.createElementNS(NS, 'svg');
  probeSvg.setAttribute('width', '2000'); probeSvg.setAttribute('height', '200');
  probeSvg.style.cssText = 'position:absolute;left:-9999px;top:0';
  document.body.appendChild(probeSvg);
  const probe = document.createElementNS(NS, 'text');
  probeSvg.appendChild(probe);
  function measure(str, size, weight, ls = 0) {
    probe.setAttribute('font-family', FONT);
    probe.setAttribute('font-size', size);
    probe.setAttribute('font-weight', weight);
    probe.setAttribute('letter-spacing', ls);
    probe.textContent = str;
    return probe.getComputedTextLength();
  }
  function wrap(str, size, weight, maxW) {
    const words = str.split(' ');
    const lines = []; let cur = '';
    for (const w of words) {
      const t = cur ? cur + ' ' + w : w;
      if (measure(t, size, weight) <= maxW || !cur) cur = t;
      else { lines.push(cur); cur = w; }
    }
    if (cur) lines.push(cur);
    return lines;
  }
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const report = [];

  // ---------- krāsu palīgi ----------
  function mix(a, b, t) {
    const pa = a.match(/\w\w/g).map(h => parseInt(h, 16));
    const pb = b.match(/\w\w/g).map(h => parseInt(h, 16));
    return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, '0')).join('');
  }

  // ---------- defs ----------
  const defs = [];
  defs.push(`
    <linearGradient id="bg" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0" stop-color="${C.bg0}"/><stop offset="0.55" stop-color="#0a1830"/><stop offset="1" stop-color="${C.bg1}"/>
    </linearGradient>
    <radialGradient id="glowC"><stop offset="0" stop-color="${C.cyan}" stop-opacity="0.55"/><stop offset="1" stop-color="${C.cyan}" stop-opacity="0"/></radialGradient>
    <radialGradient id="glowO"><stop offset="0" stop-color="${C.orange}" stop-opacity="0.5"/><stop offset="1" stop-color="${C.orange}" stop-opacity="0"/></radialGradient>
    <linearGradient id="gridFadeDown" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="gridFadeUp" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <mask id="mFloor"><rect x="0" y="1250" width="${W}" height="1150" fill="url(#gridFadeDown)"/></mask>
    <mask id="mCeil"><rect x="0" y="0" width="${W}" height="620" fill="url(#gridFadeUp)"/></mask>
    <filter id="blur24" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="24"/></filter>
    <filter id="blur12" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12"/></filter>
    <filter id="blur6" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="blur3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
    <linearGradient id="cardFace" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0" stop-color="#173560" stop-opacity="0.92"/><stop offset="1" stop-color="#0d2140" stop-opacity="0.94"/>
    </linearGradient>
    <linearGradient id="cardSheen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.09"/><stop offset="0.4" stop-color="#ffffff" stop-opacity="0.015"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="cardStroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.cyan}" stop-opacity="0.55"/><stop offset="0.5" stop-color="${C.cyan}" stop-opacity="0.14"/><stop offset="1" stop-color="${C.cyan}" stop-opacity="0.32"/>
    </linearGradient>
    <linearGradient id="cardEdge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0a1a33"/><stop offset="1" stop-color="#040b17"/>
    </linearGradient>
    <linearGradient id="btnFace" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5eebb9"/><stop offset="0.5" stop-color="${C.green}"/><stop offset="1" stop-color="#22b883"/>
    </linearGradient>
    <linearGradient id="btnShine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.45"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="badgeFace" cx="0.35" cy="0.3" r="0.8">
      <stop offset="0" stop-color="#ffffff"/><stop offset="0.7" stop-color="#e6fff5"/><stop offset="1" stop-color="#bff5de"/>
    </radialGradient>
    <linearGradient id="numFace" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffc49a"/><stop offset="0.45" stop-color="${C.orange}"/><stop offset="1" stop-color="#f26b1d"/>
    </linearGradient>
    <linearGradient id="slabTop" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1d4479"/><stop offset="1" stop-color="#0c2141"/>
    </linearGradient>
    <linearGradient id="gloss" x1="0" y1="0" x2="0.85" y2="0.9">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.6"/><stop offset="0.42" stop-color="#ffffff" stop-opacity="0.08"/><stop offset="0.6" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="gCyan" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8ef3ff"/><stop offset="0.45" stop-color="${C.cyan}"/><stop offset="1" stop-color="#0e93b0"/>
    </linearGradient>
    <linearGradient id="gOrange" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffc49a"/><stop offset="0.45" stop-color="${C.orange}"/><stop offset="1" stop-color="#e2611a"/>
    </linearGradient>
    <linearGradient id="gNavy" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2d5a99"/><stop offset="1" stop-color="#132c55"/>
    </linearGradient>
    <linearGradient id="gGreen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#9af5d2"/><stop offset="0.45" stop-color="${C.green}"/><stop offset="1" stop-color="#169e6f"/>
    </linearGradient>
    <linearGradient id="gArc" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${C.green}"/><stop offset="0.5" stop-color="${C.cyan}"/><stop offset="1" stop-color="${C.orange}"/>
    </linearGradient>
    <linearGradient id="titleAccent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffb07a"/><stop offset="1" stop-color="${C.orange}"/>
    </linearGradient>
    <linearGradient id="closeAccent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#6ff0c0"/><stop offset="1" stop-color="${C.green}"/>
    </linearGradient>
  `);

  const out = [];

  // ---------- fons ----------
  out.push(`<rect width="${W}" height="${H}" fill="url(#bg)"/>`);
  out.push(`<g>
    <circle cx="880" cy="230" r="430" fill="url(#glowC)" opacity="0.42"/>
    <circle cx="90" cy="1080" r="420" fill="url(#glowO)" opacity="0.26"/>
    <circle cx="1010" cy="1650" r="400" fill="url(#glowC)" opacity="0.22"/>
    <circle cx="160" cy="2260" r="420" fill="url(#glowC)" opacity="0.18"/>
    <circle cx="900" cy="2330" r="380" fill="url(#glowO)" opacity="0.2"/>
  </g>`);
  // perspektīvas režģis: grīda (apakšā) un griesti (augšā)
  function persp(vpY, yA, yB, dir) {
    const vx = W / 2; const g = [];
    for (let i = -14; i <= 14; i++) {
      const xb = vx + i * 120;
      g.push(`<line x1="${vx}" y1="${vpY}" x2="${xb}" y2="${yB}"/>`);
    }
    for (let k = 1; k <= 16; k++) {
      const t = Math.pow(k / 16, 2.1);
      const y = vpY + (yB - vpY) * t;
      if ((dir > 0 && y < yA) || (dir < 0 && y > yA)) continue;
      g.push(`<line x1="0" y1="${y.toFixed(1)}" x2="${W}" y2="${y.toFixed(1)}"/>`);
    }
    return g.join('');
  }
  out.push(`<g stroke="${C.cyan}" stroke-width="1" opacity="0.13" mask="url(#mFloor)">${persp(1150, 1250, 2400, 1)}</g>`);
  out.push(`<g stroke="${C.cyan}" stroke-width="1" opacity="0.10" mask="url(#mCeil)">${persp(760, 620, 0, -1)}</g>`);

  // ---------- izometriskais kubs (2:1 dimetrija, gaisma no augšas pa kreisi) ----------
  let gid = 0;
  const PAL = {
    cyan: { top: ['#b8f8ff', '#5fe6f7'], left: ['#38dcf2', '#17b6d3'], right: ['#0f8fac', '#0a6d86'] },
    orange: { top: ['#ffd8bb', '#ffa463'], left: ['#ff9850', '#f07526'], right: ['#cf5a17', '#a94510'] },
    navy: { top: ['#4f77c4', '#2f5299'], left: ['#24457f', '#1a3566'], right: ['#13274d', '#0d1c39'] },
  };
  function cube(cx, by, s, pal, { shadow = true, float = 0 } = {}) {
    // by = apakšējās skaldnes centrs (uz grīdas); float = pacelšana gaisā
    const p = PAL[pal]; const h = s * 1.12; const y0 = by - float;
    const T = [[cx, y0 - h - s / 2], [cx + s, y0 - h], [cx, y0 - h + s / 2], [cx - s, y0 - h]];
    const B2 = [cx, y0 + s / 2], B1 = [cx + s, y0], B3 = [cx - s, y0];
    const id = 'cb' + (gid++);
    defs.push(`<linearGradient id="${id}t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.top[0]}"/><stop offset="1" stop-color="${p.top[1]}"/></linearGradient>
      <linearGradient id="${id}l" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stop-color="${p.left[0]}"/><stop offset="1" stop-color="${p.left[1]}"/></linearGradient>
      <linearGradient id="${id}r" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stop-color="${p.right[0]}"/><stop offset="1" stop-color="${p.right[1]}"/></linearGradient>`);
    const pt = a => a.map(v => v.toFixed(1)).join(',');
    let g = '';
    if (shadow) {
      const sy = by + s * 0.12;
      g += `<ellipse cx="${cx + s * 0.25}" cy="${sy}" rx="${s * (1.05 - float / 260)}" ry="${s * (0.42 - float / 600)}" fill="#020712" opacity="${float ? 0.38 : 0.6}" filter="url(#blur${s > 30 ? 6 : 3})"/>`;
    }
    g += `<polygon points="${pt(T[3])} ${pt(T[2])} ${pt(B2)} ${pt(B3)}" fill="url(#${id}l)"/>`;
    g += `<polygon points="${pt(T[2])} ${pt(T[1])} ${pt(B1)} ${pt(B2)}" fill="url(#${id}r)"/>`;
    g += `<polygon points="${pt(T[0])} ${pt(T[1])} ${pt(T[2])} ${pt(T[3])}" fill="url(#${id}t)"/>`;
    // malu spīdums
    g += `<polyline points="${pt(T[3])} ${pt(T[0])} ${pt(T[1])}" fill="none" stroke="#fff" stroke-opacity="0.55" stroke-width="1.4" stroke-linejoin="round"/>`;
    g += `<polyline points="${pt(T[3])} ${pt(T[2])} ${pt(T[1])}" fill="none" stroke="#fff" stroke-opacity="0.8" stroke-width="1.8" stroke-linejoin="round"/>`;
    g += `<line x1="${T[2][0]}" y1="${T[2][1]}" x2="${B2[0]}" y2="${B2[1]}" stroke="#fff" stroke-opacity="0.35" stroke-width="1.4"/>`;
    g += `<line x1="${T[3][0]}" y1="${T[3][1]}" x2="${B3[0]}" y2="${B3[1]}" stroke="#fff" stroke-opacity="0.18" stroke-width="1"/>`;
    // mazs spīduma plankums augšējā kreisajā stūrī
    g += `<ellipse cx="${cx - s * 0.35}" cy="${y0 - h - s * 0.05}" rx="${s * 0.28}" ry="${s * 0.1}" fill="#fff" opacity="0.35" filter="url(#blur3)"/>`;
    return g;
  }

  // ---------- platforma (slab) ----------
  function slab(cx, cy, hw, th = 12) {
    const hh = hw / 2;
    const T = [[cx, cy - hh], [cx + hw, cy], [cx, cy + hh], [cx - hw, cy]];
    const pt = a => a.join(',');
    let g = '';
    g += `<ellipse cx="${cx + 8}" cy="${cy + th + 10}" rx="${hw * 0.95}" ry="${hh * 0.7}" fill="#01050d" opacity="0.6" filter="url(#blur12)"/>`;
    // mirdzums
    g += `<polygon points="${T.map(pt).join(' ')}" fill="none" stroke="${C.cyan}" stroke-width="6" opacity="0.55" filter="url(#blur6)"/>`;
    g += `<polygon points="${pt(T[3])} ${pt(T[2])} ${cx},${cy + hh + th} ${cx - hw},${cy + th}" fill="#0b1d38"/>`;
    g += `<polygon points="${pt(T[2])} ${pt(T[1])} ${cx + hw},${cy + th} ${cx},${cy + hh + th}" fill="#071327"/>`;
    g += `<polyline points="${cx - hw},${cy + th} ${cx},${cy + hh + th} ${cx + hw},${cy + th}" fill="none" stroke="${C.cyan}" stroke-opacity="0.35" stroke-width="1.2"/>`;
    g += `<polygon points="${T.map(pt).join(' ')}" fill="url(#slabTop)" stroke="${C.cyan}" stroke-width="2" stroke-linejoin="round"/>`;
    const k = 0.72;
    g += `<polygon points="${T.map(([x, y]) => [cx + (x - cx) * k, cy + (y - cy) * k].join(',')).join(' ')}" fill="none" stroke="${C.cyan}" stroke-opacity="0.28" stroke-width="1.2"/>`;
    g += `<polyline points="${pt(T[3])} ${pt(T[0])} ${pt(T[1])}" fill="none" stroke="#bff6ff" stroke-opacity="0.7" stroke-width="1.2"/>`;
    return g;
  }

  // ---------- ikonas: priekšpuse + siluets izspiešanai ----------
  // lokālās koordinātas ~ 0..100 x 0..100
  const ICONS = {
    shieldKey: {
      sil: `<path d="M50 2 L92 16 C92 54 77 79 50 96 C23 79 8 54 8 16 Z"/>`,
      front: `<path d="M50 2 L92 16 C92 54 77 79 50 96 C23 79 8 54 8 16 Z" fill="url(#gCyan)"/>
        <path d="M50 13 L82 23.5 C81.5 52 70 71 50 84 C30 71 18.5 52 18 23.5 Z" fill="#0c2a4d"/>
        <path d="M50 13 L82 23.5 C81.5 52 70 71 50 84" fill="none" stroke="#5fe6f7" stroke-opacity="0.45" stroke-width="1.5"/>
        <g transform="translate(1.6,1.4)" fill="#9a3d0c"><circle cx="50" cy="37" r="11" fill="none" stroke="#9a3d0c" stroke-width="7"/><rect x="46.5" y="46" width="7" height="27" rx="1.5"/><rect x="52" y="58" width="9" height="5" rx="1"/><rect x="52" y="66" width="7" height="5" rx="1"/></g>
        <g fill="url(#gOrange)"><circle cx="50" cy="37" r="11" fill="none" stroke="url(#gOrange)" stroke-width="7"/><rect x="46.5" y="46" width="7" height="27" rx="1.5"/><rect x="52" y="58" width="9" height="5" rx="1"/><rect x="52" y="66" width="7" height="5" rx="1"/></g>
        <path d="M41 33 A11 11 0 0 1 50 26" fill="none" stroke="#fff" stroke-opacity="0.75" stroke-width="2" stroke-linecap="round"/>`,
    },
    gauge: {
      sil: `<circle cx="50" cy="52" r="46"/>`,
      front: `<circle cx="50" cy="52" r="46" fill="url(#gCyan)"/>
        <circle cx="50" cy="52" r="39" fill="url(#gNavy)"/>
        <path d="M22.4 71.5 A34 34 0 1 1 77.6 71.5" fill="none" stroke="#081a33" stroke-width="10" stroke-linecap="round"/>
        <path d="M22.4 71.5 A34 34 0 1 1 77.6 71.5" fill="none" stroke="url(#gArc)" stroke-width="6" stroke-linecap="round"/>
        <g stroke="#eaf1fb" stroke-width="2.2" stroke-linecap="round" opacity="0.85">
          <line x1="31" y1="40" x2="35" y2="43"/><line x1="50" y1="30" x2="50" y2="35"/><line x1="69" y1="40" x2="65" y2="43"/>
        </g>
        <g transform="rotate(-62 50 55)">
          <path d="M47 55 L50 24 L53 55 Z" fill="#9a3d0c" transform="translate(1.4,1.2)"/>
          <path d="M47 55 L50 24 L53 55 Z" fill="url(#gOrange)"/>
        </g>
        <circle cx="50" cy="55" r="7" fill="url(#gOrange)"/><circle cx="48" cy="53" r="2.4" fill="#fff" opacity="0.8"/>
        <rect x="38" y="72" width="24" height="9" rx="3" fill="#081a33"/>
        <rect x="41" y="75" width="8" height="3" rx="1.5" fill="${C.orange}"/>`,
    },
    magnifier: {
      sil: `<circle cx="42" cy="42" r="38"/><line x1="66" y1="66" x2="92" y2="92" stroke="currentColor" stroke-width="16" stroke-linecap="round"/>`,
      front: `<line x1="66" y1="66" x2="92" y2="92" stroke="#9a3d0c" stroke-width="16" stroke-linecap="round" transform="translate(1.5,1.3)"/>
        <line x1="66" y1="66" x2="92" y2="92" stroke="url(#gOrange)" stroke-width="16" stroke-linecap="round"/>
        <line x1="70" y1="68" x2="86" y2="84" stroke="#fff" stroke-opacity="0.45" stroke-width="3" stroke-linecap="round"/>
        <circle cx="42" cy="42" r="38" fill="url(#gCyan)"/>
        <circle cx="42" cy="42" r="29" fill="#0c2a4d"/>
        <rect x="25" y="46" width="9" height="16" rx="1.5" fill="url(#gCyan)"/>
        <rect x="38" y="36" width="9" height="26" rx="1.5" fill="url(#gOrange)"/>
        <rect x="51" y="27" width="9" height="35" rx="1.5" fill="url(#gCyan)"/>
        <line x1="21" y1="63" x2="64" y2="63" stroke="#5fe6f7" stroke-opacity="0.6" stroke-width="1.6"/>
        <path d="M22 30 A23 23 0 0 1 36 18" fill="none" stroke="#fff" stroke-opacity="0.7" stroke-width="3" stroke-linecap="round"/>`,
    },
    bug: {
      sil: `<g stroke="currentColor" stroke-width="6" stroke-linecap="round" fill="none">
          <path d="M45 15 Q38 3 28 5"/><path d="M55 15 Q62 3 72 5"/>
          <path d="M28 45 L10 36"/><path d="M26 60 L6 60"/><path d="M29 75 L12 88"/>
          <path d="M72 45 L90 36"/><path d="M74 60 L94 60"/><path d="M71 75 L88 88"/></g>
        <circle cx="50" cy="26" r="14"/><ellipse cx="50" cy="62" rx="26" ry="31"/>`,
      front: `<g stroke="url(#gCyan)" stroke-width="6" stroke-linecap="round" fill="none">
          <path d="M45 15 Q38 3 28 5"/><path d="M55 15 Q62 3 72 5"/>
          <path d="M28 45 L10 36"/><path d="M26 60 L6 60"/><path d="M29 75 L12 88"/>
          <path d="M72 45 L90 36"/><path d="M74 60 L94 60"/><path d="M71 75 L88 88"/></g>
        <circle cx="50" cy="26" r="14" fill="url(#gNavy)" stroke="#5fe6f7" stroke-width="2"/>
        <circle cx="44.5" cy="24" r="3" fill="${C.cyan}"/><circle cx="55.5" cy="24" r="3" fill="${C.cyan}"/>
        <ellipse cx="50" cy="62" rx="26" ry="31" fill="url(#gOrange)"/>
        <path d="M50 33 L50 92" stroke="#9a3d0c" stroke-width="3"/>
        <circle cx="38" cy="55" r="5" fill="#9a3d0c" opacity="0.8"/><circle cx="62" cy="55" r="5" fill="#9a3d0c" opacity="0.8"/>
        <circle cx="40" cy="74" r="4" fill="#9a3d0c" opacity="0.8"/><circle cx="60" cy="74" r="4" fill="#9a3d0c" opacity="0.8"/>
        <path d="M32 50 A24 28 0 0 1 44 34" fill="none" stroke="#fff" stroke-opacity="0.7" stroke-width="3" stroke-linecap="round"/>`,
    },
    code: {
      sil: `<path d="M32 20 L4 50 L32 80 L42 70 L23 50 L42 30 Z"/><path d="M68 20 L96 50 L68 80 L58 70 L77 50 L58 30 Z"/><path d="M56 12 L67 15 L44 88 L33 85 Z"/>`,
      front: `<path d="M32 20 L4 50 L32 80 L42 70 L23 50 L42 30 Z" fill="url(#gCyan)"/>
        <path d="M68 20 L96 50 L68 80 L58 70 L77 50 L58 30 Z" fill="url(#gCyan)"/>
        <path d="M56 12 L67 15 L44 88 L33 85 Z" fill="url(#gOrange)"/>
        <path d="M32 20 L4 50" stroke="#fff" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round"/>
        <path d="M68 20 L96 50" stroke="#fff" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round"/>
        <path d="M56 12 L67 15" stroke="#fff" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round"/>`,
    },
    shieldCheck: {
      sil: `<path d="M50 2 L92 16 C92 54 77 79 50 96 C23 79 8 54 8 16 Z"/>`,
      front: `<path d="M50 2 L92 16 C92 54 77 79 50 96 C23 79 8 54 8 16 Z" fill="url(#gCyan)"/>
        <path d="M50 13 L82 23.5 C81.5 52 70 71 50 84 C30 71 18.5 52 18 23.5 Z" fill="#0c2a4d"/>
        <path d="M33 47 L45 59 L68 34" fill="none" stroke="#0b6b4a" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" transform="translate(1.6,1.6)"/>
        <path d="M33 47 L45 59 L68 34" fill="none" stroke="url(#gGreen)" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M35 46 L45 56" fill="none" stroke="#fff" stroke-opacity="0.6" stroke-width="2.5" stroke-linecap="round"/>`,
    },
  };
  // vienots 3D stils visām ikonām
  const SHEAR = 0.22;            // vertikālā plakne, pagriezta pret skatītāju
  const DEPTH = 18;              // izspieduma slāņu skaits
  const DV = [0.9, -0.45];      // izspieduma virziens (atpakaļ pa labi uz augšu)
  function icon3d(name, ox, oy, scale = 1) {
    const ic = ICONS[name]; const id = 'ic' + (gid++);
    defs.push(`<g id="${id}s">${ic.sil}</g>`);
    defs.push(`<mask id="${id}m" maskUnits="userSpaceOnUse" x="-20" y="-20" width="140" height="140"><use href="#${id}s" color="#fff" fill="#fff"/></mask>`);
    let g = `<g transform="translate(${ox},${oy}) scale(${scale}) matrix(1,${SHEAR},0,1,0,0)">`;
    for (let i = DEPTH; i >= 1; i--) {
      const t = i / DEPTH;
      const col = mix('#1b4a85', '#071833', t);
      g += `<use href="#${id}s" color="${col}" fill="${col}" transform="translate(${(DV[0] * i).toFixed(2)},${(DV[1] * i).toFixed(2)})"/>`;
    }
    // izspieduma aizmugurējā kontūra cianā (sānu mala)
    g += `<use href="#${id}s" color="${mix('#1b4f8a', '#0a2244', 0.3)}" fill="${mix('#1b4f8a', '#0a2244', 0.3)}" transform="translate(${(DV[0] * 0.6).toFixed(2)},${(DV[1] * 0.6).toFixed(2)})"/>`;
    g += ic.front;
    g += `<rect x="-20" y="-20" width="140" height="140" fill="url(#gloss)" mask="url(#${id}m)" opacity="0.55"/>`;
    g += `</g>`;
    return g;
  }
  // ikona uz platformas
  function iconOnSlab(name, cx, slabY, hw, scale) {
    let g = slab(cx, slabY, hw);
    // ēna uz platformas
    g += `<ellipse cx="${cx + 6}" cy="${slabY + 2}" rx="${hw * 0.5}" ry="${hw * 0.17}" fill="#01060f" opacity="0.65" filter="url(#blur6)"/>`;
    const sz = 100 * scale;
    const ox = cx - sz / 2 - 4; // korekcija nobīdei
    const oy = slabY + 6 - sz - SHEAR * sz / 2;
    g += icon3d(name, ox, oy, scale);
    return g;
  }

  // ---------- 3D cipars ----------
  function number3d(txt, x, y, size) {
    let g = '';
    g += `<text x="${x + 9}" y="${y + 12}" font-size="${size}" font-weight="900" fill="#01060f" opacity="0.55" filter="url(#blur6)">${txt}</text>`;
    for (let i = 7; i >= 1; i--) {
      g += `<text x="${x + i * 0.75}" y="${y + i * 0.95}" font-size="${size}" font-weight="900" fill="${mix('#c4531a', '#6e2a07', i / 7)}">${txt}</text>`;
    }
    g += `<text x="${x}" y="${y}" font-size="${size}" font-weight="900" fill="url(#numFace)">${txt}</text>`;
    g += `<text x="${x}" y="${y}" font-size="${size}" font-weight="900" fill="none" stroke="#ffe2cc" stroke-opacity="0.55" stroke-width="1">${txt}</text>`;
    return g;
  }

  // ---------- kartīte ----------
  function card(x, y, w, h, { accent = false } = {}) {
    let g = '';
    g += `<rect x="${x + 10}" y="${y + 30}" width="${w - 20}" height="${h}" rx="30" fill="#01040b" opacity="0.7" filter="url(#blur24)"/>`;
    g += `<rect x="${x}" y="${y + 10}" width="${w}" height="${h}" rx="28" fill="url(#cardEdge)" stroke="${C.cyan}" stroke-opacity="0.18"/>`;
    g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28" fill="url(#cardFace)"/>`;
    g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28" fill="url(#cardSheen)"/>`;
    g += `<rect x="${x + 0.75}" y="${y + 0.75}" width="${w - 1.5}" height="${h - 1.5}" rx="27.5" fill="none" stroke="${accent ? C.green : 'url(#cardStroke)'}" stroke-opacity="${accent ? 0.6 : 1}" stroke-width="1.5"/>`;
    g += `<path d="M${x + 40} ${y + 1.2} H${x + w * 0.55}" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1.5" stroke-linecap="round"/>`;
    return g;
  }

  // ---------- "Risinājums" poga ----------
  function solution(x, y, w, text) {
    const label = 'Risinājums:';
    const size = 24, lh = 31;
    const tx = x + 84, maxW = w - 84 - 26;
    const labelW = measure(label + ' ', size, 700);
    // pirmā rinda sāk pēc etiķetes
    const words = text.split(' ');
    const lines = []; let cur = ''; let first = true;
    for (const wd of words) {
      const t = cur ? cur + ' ' + wd : wd;
      const avail = first ? maxW - labelW : maxW;
      if (measure(t, size, 500) <= avail || !cur) cur = t;
      else { lines.push(cur); cur = wd; first = false; }
    }
    if (cur) lines.push(cur);
    const h = lines.length * lh + 26;
    const cy = y + h / 2;
    let g = '';
    g += `<rect x="${x + 4}" y="${y + 12}" width="${w - 8}" height="${h}" rx="18" fill="#03150e" opacity="0.6" filter="url(#blur6)"/>`;
    g += `<rect x="${x}" y="${y + 6}" width="${w}" height="${h}" rx="18" fill="#138a60"/>`;
    g += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="url(#btnFace)"/>`;
    g += `<rect x="${x + 2}" y="${y + 2}" width="${w - 4}" height="${h * 0.48}" rx="16" fill="url(#btnShine)"/>`;
    g += `<rect x="${x + 0.75}" y="${y + 0.75}" width="${w - 1.5}" height="${h - 1.5}" rx="17.5" fill="none" stroke="#b9ffe4" stroke-opacity="0.55" stroke-width="1.5"/>`;
    // žetons ar ķeksīti
    const bx = x + 42;
    g += `<circle cx="${bx + 1}" cy="${cy + 4}" r="24" fill="#0b6b4a"/>`;
    g += `<circle cx="${bx}" cy="${cy}" r="24" fill="url(#badgeFace)"/>`;
    g += `<circle cx="${bx}" cy="${cy}" r="23" fill="none" stroke="#ffffff" stroke-width="1.5"/>`;
    g += `<path d="M${bx - 10} ${cy + 1} L${bx - 3} ${cy + 8} L${bx + 11} ${cy - 7}" fill="none" stroke="#0e9467" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
    g += `<ellipse cx="${bx - 8}" cy="${cy - 12}" rx="8" ry="4" fill="#fff" opacity="0.9"/>`;
    const firstBase = cy - ((lines.length - 1) * lh) / 2 + 8.5;
    lines.forEach((ln, i) => {
      const by = firstBase + i * lh;
      if (i === 0) g += `<text x="${tx}" y="${by}" font-size="${size}" fill="#04281b"><tspan font-weight="700">${label}</tspan> <tspan font-weight="500">${esc(ln)}</tspan></text>`;
      else g += `<text x="${tx}" y="${by}" font-size="${size}" font-weight="500" fill="#04281b">${esc(ln)}</text>`;
      const lw = (i === 0 ? labelW : 0) + measure(ln, size, 500);
      if (tx + lw > x + w - 20) report.push('Pogas teksts pārāk plats: ' + ln);
    });
    return { g, h: h + 6, lines: lines.length };
  }

  // ---------- GALVENE ----------
  const M = 56;
  out.push(`<g font-family="${FONT}">`);
  // birka
  const tag = 'KVALITĀTES KONTROLE';
  const tagW = measure(tag, 24, 700, 2.5) + 48;
  out.push(`<rect x="${M}" y="58" width="${tagW}" height="46" rx="23" fill="${C.cyan}" fill-opacity="0.12" stroke="${C.cyan}" stroke-opacity="0.55"/>`);
  out.push(`<circle cx="${M + 22}" cy="81" r="5" fill="${C.cyan}"/>`);
  out.push(`<text x="${M + 36}" y="89.5" font-size="24" font-weight="700" letter-spacing="2.5" fill="#9ff1fc">${tag}</text>`);

  // virsraksts
  const titleMax = 630;
  let ts = 66;
  const tl = ['AI uzbūvēta lapa', 'nav automātiski', 'gatava lapa'];
  while (Math.max(...tl.map(t => measure(t, ts, 800, -1))) > titleMax) ts -= 1;
  report.push('virsraksta izmērs ' + ts);
  const tBase = 180, tLH = ts * 1.1;
  out.push(`<text x="${M}" y="${tBase}" font-size="${ts}" font-weight="800" letter-spacing="-1" fill="${C.text}">AI uzbūvēta lapa</text>`);
  out.push(`<text x="${M}" y="${tBase + tLH}" font-size="${ts}" font-weight="800" letter-spacing="-1" fill="${C.text}"><tspan fill="url(#titleAccent)">nav</tspan> automātiski</text>`);
  out.push(`<text x="${M}" y="${tBase + 2 * tLH}" font-size="${ts}" font-weight="800" letter-spacing="-1" fill="${C.text}">gatava lapa</text>`);
  const subY = tBase + 2 * tLH + 60;
  out.push(`<rect x="${M}" y="${subY - 30}" width="6" height="40" rx="3" fill="${C.cyan}"/>`);
  out.push(`<text x="${M + 22}" y="${subY}" font-size="29" font-weight="500" fill="#cfe0f5">5 biežākās kļūdas un kā no tām izvairīties</text>`);
  report.push('apakšvirsraksta platums ' + measure('5 biežākās kļūdas un kā no tām izvairīties', 29, 500).toFixed(0) + ' / līdz y ' + subY);
  out.push(`</g>`);

  // kubu kompozīcija labajā pusē
  {
    let g = '';
    g += `<circle cx="875" cy="250" r="190" fill="url(#glowC)" opacity="0.35"/>`;
    g += slab(872, 300, 162, 14);
    g += cube(742, 160, 20, 'orange', { float: 0 });           // peldošs mazs
    g += cube(1000, 132, 17, 'navy', { float: 0 });
    g += cube(872, 292, 70, 'cyan');
    g += cube(884, 205, 27, 'orange', { shadow: false });     // uz cianā kuba
    g += cube(796, 322, 44, 'navy');
    g += cube(952, 326, 40, 'orange');
    out.push(`<g>${g}</g>`);
  }

  // ---------- BLOKI ----------
  const ITEMS = [
    { icon: 'shieldKey', title: 'Drošības robi',
      desc: 'AI bieži atstāj API atslēgas kodā, neveic ievades datu pārbaudi un neierobežo piekļuvi.',
      sol: 'slepenās atslēgas glabāt vides mainīgajos, pārbaudīt formu datus, veikt drošības auditu pirms publicēšanas.' },
    { icon: 'gauge', title: 'Lēna darbība',
      desc: 'Neoptimizēti attēli, liekas bibliotēkas un uzblīdis kods palēnina ielādi mobilajās ierīcēs.',
      sol: 'saspiest attēlus, ielādēt tikai nepieciešamo, pārbaudīt ar PageSpeed Insights.' },
    { icon: 'magnifier', title: 'SEO un pieejamības trūkums',
      desc: 'Nav pareizas virsrakstu hierarhijas, meta aprakstu, alt tekstu un pietiekama kontrasta.',
      sol: 'pārbaudīt struktūru, pievienot metadatus, ievērot pieejamības pamatprasības.' },
    { icon: 'bug', title: 'Netestēta loģika',
      desc: 'Formas, maksājumi vai pieteikšanās lūzt neparedzētos gadījumos.',
      sol: 'izmēģināt visus scenārijus, kļūdainus datus, dažādas ierīces un pārlūkus.' },
    { icon: 'code', title: 'Haotisks un grūti uzturams kods',
      desc: 'Dublēts kods, nesakārtota struktūra, novecojušas vai neeksistējošas atkarības.',
      sol: 'pārskatīt kodu, sakārtot struktūru, pārbaudīt, vai bibliotēkas eksistē un ir aktuālas.' },
  ];
  const CX = 48, CW = W - 96, CH = 296, GAP = 40, START = 412;
  const decor = [];
  ITEMS.forEach((it, i) => {
    const y = START + i * (CH + 10 + GAP);
    let g = `<g font-family="${FONT}">`;
    g += card(CX, y, CW, CH);
    // ikona
    g += iconOnSlab(it.icon, CX + 132, y + 134, 80, 1.08);
    // cipars + virsraksts
    const TX = 330;
    const num = String(i + 1).padStart(2, '0');
    g += number3d(num, TX, y + 86, 76);
    const numW = measure(num, 76, 900);
    const titleX = TX + numW + 26;
    let tsz = 32;
    while (measure(it.title, tsz, 700) > CX + CW - 28 - titleX) tsz -= 1;
    if (tsz < 28) report.push('virsraksts par šauru: ' + it.title);
    g += `<text x="${titleX}" y="${y + 72}" font-size="${tsz}" font-weight="700" fill="${C.text}">${esc(it.title)}</text>`;
    // apraksts
    const dl = wrap(it.desc, 24, 500, CX + CW - 28 - TX);
    if (dl.length > 2) report.push('apraksts > 2 rindas: ' + it.title);
    dl.forEach((ln, k) => {
      g += `<text x="${TX}" y="${y + 130 + k * 32}" font-size="24" font-weight="500" fill="${C.muted}">${esc(ln)}</text>`;
    });
    // risinājums
    const s = solution(CX + 26, y + 190, CW - 52, it.sol);
    if (y + 190 + s.h > y + CH - 4) report.push('poga iziet ārpus kartītes: ' + it.title + ' h=' + s.h);
    g += s.g;
    g += `</g>`;
    out.push(g);
    if (i === 1) decor.push(cube(1022, y + 20, 22, 'orange', { shadow: true }));
    if (i === 3) decor.push(cube(58, y + 26, 20, 'cyan', { shadow: true }));
  });
  out.push(`<g>${decor.join('')}</g>`);

  // ---------- NOSLĒGUMS ----------
  {
    const y = START + 5 * (CH + 10 + GAP); const h = 216;
    let g = `<g font-family="${FONT}">`;
    g += `<rect x="${CX}" y="${y}" width="${CW}" height="${h}" rx="28" fill="${C.green}" opacity="0.18" filter="url(#blur24)"/>`;
    g += card(CX, y, CW, h, { accent: true });
    g += iconOnSlab('shieldCheck', CX + 132, y + 150, 84, 1.2);
    const TX = 330, maxW = CX + CW - 32 - TX;
    const l1 = wrap('AI paātrina izstrādi, bet atbildību par kvalitāti un drošību nes cilvēks.', 26, 600, maxW);
    l1.forEach((ln, k) => g += `<text x="${TX}" y="${y + 72 + k * 34}" font-size="26" font-weight="600" fill="${C.text}">${esc(ln)}</text>`);
    let fs = 36; const fin = 'Vienmēr pārbaudi, pirms publicē.';
    while (measure(fin, fs, 800) > maxW) fs -= 1;
    g += `<text x="${TX}" y="${y + 72 + l1.length * 34 + 54}" font-size="${fs}" font-weight="800" fill="url(#closeAccent)">${fin}</text>`;
    report.push('noslēgums: rindas ' + l1.length + ', fonts ' + fs + ', apakša ' + (y + 60 + l1.length * 34 + 44) + ' / kartīte līdz ' + (y + h));
    g += `</g>`;
    out.push(g);
  }

  probeSvg.remove();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="t d" font-family="${FONT}">
<title id="t">AI uzbūvēta lapa nav automātiski gatava lapa</title>
<desc id="d">5 biežākās kļūdas un kā no tām izvairīties: drošības robi, lēna darbība, SEO un pieejamības trūkums, netestēta loģika, haotisks un grūti uzturams kods. AI paātrina izstrādi, bet atbildību par kvalitāti un drošību nes cilvēks. Vienmēr pārbaudi, pirms publicē.</desc>
<defs><style>${fontCss}</style>${defs.join('\n')}</defs>
${out.join('\n')}
</svg>`;
  window.__report = report;
  return svg;
};
