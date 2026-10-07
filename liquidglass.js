/* Liquid Glass engine for Fap Fap.
 * Each element with class "lg" becomes a piece of thick glass:
 *  - a real lens on its edges: a displacement map (computed for the exact size and corner radius of the element)
 *    bends the scene behind it, strongly near the border and not at all in the centre;
 *  - chromatic dispersion: red, green and blue are bent by slightly different amounts, so the curved edges
 *    split the light a little, like real glass;
 *  - frost (blur), and light that moves when the phone is tilted.
 * Refraction needs backdrop-filter with an SVG filter, which only Chromium supports (Chrome, Android, Edge);
 * elsewhere (Safari / iPhone) the glass keeps its blur, rim light and depth, without the bending.
 * Settings: LiquidGlass.set({depth: 0..100, frost: 0..100}).
 */
(function(){
  const SVGNS = 'http://www.w3.org/2000/svg';
  const chromium = !!(navigator.userAgentData && navigator.userAgentData.brands &&
    navigator.userAgentData.brands.some(b=> /Chromium/.test(b.brand)));
  // Safari (iPhone) cannot bend what is behind an element. There, each piece of glass carries its own copy of the
  // scene, magnified like through a lens and only visible on its rim ("mirror" mode). ?mirror forces it for testing.
  const forceMirror = /[?&]mirror\b/.test(location.search);
  const state = { depth: 60, frost: 30, refract: chromium && !forceMirror, scene: '.scene' };

  const css = document.createElement('style');
  css.textContent =
    '.lg>.lg-mirror{position:absolute!important;inset:0;z-index:0!important;border-radius:inherit;overflow:hidden;pointer-events:none;'+
      '-webkit-mask-size:100% 100%;mask-size:100% 100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}'+
    '.lg-mirror-in{position:absolute;left:0;top:0;will-change:transform;filter:saturate(1.35) brightness(1.1) contrast(1.05)}'+
    '.lg-mirror-in .lg-scene-copy{position:absolute!important;inset:0!important}'+
    '.lg-mirror-in .lg-scene-copy *{animation:none!important}'+
    '.lg-mirror .lg-fringe{position:absolute;inset:0;border-radius:inherit;mix-blend-mode:screen;opacity:var(--lg-depth,.6);'+
      'box-shadow:inset 1.5px 1.5px 1px rgba(255,70,90,.35),inset -1.5px -1.5px 1px rgba(70,140,255,.35)}';
  document.head.appendChild(css);
  const items = new Map(); // element -> {id, w, h, r}
  let uid = 0;

  // one hidden <svg> holds a filter per piece of glass
  const host = document.createElementNS(SVGNS, 'svg');
  host.setAttribute('width', '0'); host.setAttribute('height', '0');
  host.setAttribute('aria-hidden', 'true');
  host.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  const defs = document.createElementNS(SVGNS, 'defs');
  host.appendChild(defs);
  (document.body || document.documentElement).appendChild(host);

  // Displacement map of a rounded rectangle seen through a convex glass edge.
  // R/G = 128 means "no shift"; near the border the vector points inward, with a smooth convex profile.
  function makeMap(w, h, r, bezel){
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(w, h), d = img.data;
    const hw = w/2, hh = h/2, rr = Math.min(r, hw, hh);
    for(let y = 0; y < h; y++){
      for(let x = 0; x < w; x++){
        const px = x + 0.5 - hw, py = y + 0.5 - hh;
        const qx = Math.abs(px) - (hw - rr), qy = Math.abs(py) - (hh - rr);
        const ox = Math.max(qx, 0), oy = Math.max(qy, 0);
        const sd = Math.min(Math.max(qx, qy), 0) + Math.hypot(ox, oy) - rr; // signed distance, <0 inside
        const inside = -sd;
        let dx = 0, dy = 0;
        if(inside >= 0 && inside < bezel){
          let nx, ny;
          if(qx > 0 && qy > 0){ const l = Math.hypot(ox, oy) || 1; nx = ox/l; ny = oy/l; }
          else if(qx > qy){ nx = 1; ny = 0; } else { nx = 0; ny = 1; }
          nx *= Math.sign(px) || 1; ny *= Math.sign(py) || 1;
          const t = 1 - inside/bezel;               // 1 on the edge, 0 where the flat part starts
          const mag = t*t*(3 - 2*t) * (0.35 + 0.65*t); // smooth, steepest at the very edge
          dx = -nx*mag; dy = -ny*mag;
        }
        const i = (y*w + x)*4;
        d[i] = 128 + dx*127; d[i+1] = 128 + dy*127; d[i+2] = 128; d[i+3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    return c.toDataURL();
  }

  function el(tag, attrs){ const n = document.createElementNS(SVGNS, tag); for(const k in attrs) n.setAttribute(k, attrs[k]); return n; }

  function buildFilter(it, w, h, r){
    const depth = state.depth/100;
    const bezel = Math.min(Math.max(6, 8 + depth*30), Math.min(w, h)/2);
    const scale = Math.round(depth*95);
    let f = document.getElementById(it.id);
    if(f) f.remove();
    f = el('filter', {id: it.id, x: 0, y: 0, width: w, height: h, filterUnits: 'userSpaceOnUse', 'color-interpolation-filters': 'sRGB'});
    f.appendChild(el('feImage', {href: makeMap(w, h, r, bezel), x: 0, y: 0, width: w, height: h, preserveAspectRatio: 'none', result: 'map'}));
    // the three colours bend by slightly different amounts (dispersion), then are added back together
    const chans = [['r', 1, '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0'],
                   ['g', 0.93, '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0'],
                   ['b', 0.86, '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0']];
    chans.forEach(([c, k, m])=>{
      f.appendChild(el('feDisplacementMap', {in: 'SourceGraphic', in2: 'map', scale: Math.round(scale*k), xChannelSelector: 'R', yChannelSelector: 'G', result: c+'0'}));
      f.appendChild(el('feColorMatrix', {in: c+'0', type: 'matrix', values: m, result: c}));
    });
    f.appendChild(el('feComposite', {in: 'r', in2: 'g', operator: 'arithmetic', k1: 0, k2: 1, k3: 1, k4: 0, result: 'rg'}));
    f.appendChild(el('feComposite', {in: 'rg', in2: 'b', operator: 'arithmetic', k1: 0, k2: 1, k3: 1, k4: 0}));
    defs.appendChild(f);
  }

  function frostPx(){ return (state.frost/100)*18; }

  // ---- mirror mode (iPhone): the rim of the glass shows the scene magnified, with a soft lens profile ----
  function ringMask(w, h, r, bezel){
    // small canvas, stretched: the alpha is 1 on the very edge and fades to 0 where the flat part of the glass starts
    const s = Math.min(1, 160/Math.max(w, h));
    const W = Math.max(8, Math.round(w*s)), H = Math.max(8, Math.round(h*s));
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const ctx = c.getContext('2d'), img = ctx.createImageData(W, H), d = img.data;
    const hw = w/2, hh = h/2, rr = Math.min(r, hw, hh);
    for(let y = 0; y < H; y++) for(let x = 0; x < W; x++){
      const px = (x + 0.5)/s - hw, py = (y + 0.5)/s - hh;
      const qx = Math.abs(px) - (hw - rr), qy = Math.abs(py) - (hh - rr);
      const sd = Math.min(Math.max(qx, qy), 0) + Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) - rr;
      const t = Math.max(0, Math.min(1, 1 + sd/bezel)); // 1 at the edge, 0 inside
      const i = (y*W + x)*4;
      d[i] = d[i+1] = d[i+2] = 255; d[i+3] = Math.round(255 * t*t*(3 - 2*t));
    }
    ctx.putImageData(img, 0, 0);
    return c.toDataURL();
  }
  function mirrorSetup(node, it){
    if(it.mirror) return;
    const m = document.createElement('span'); m.className = 'lg-mirror'; m.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span'); inner.className = 'lg-mirror-in';
    const src = document.querySelector(state.scene);
    if(src){
      const copy = src.cloneNode(true);
      copy.classList.add('lg-scene-copy'); copy.removeAttribute('id');
      copy.querySelectorAll('[id]').forEach(n=> n.removeAttribute('id'));
      inner.appendChild(copy);
    }
    const fringe = document.createElement('span'); fringe.className = 'lg-fringe';
    m.appendChild(inner); m.appendChild(fringe);
    node.insertBefore(m, node.firstChild);
    it.mirror = m; it.inner = inner;
  }
  function mirrorPlace(node, it){
    if(!it.inner) return;
    const r = node.getBoundingClientRect();
    const k = 1 + 0.3*state.depth/100; // magnification of the lens
    it.inner.style.width = innerWidth + 'px'; it.inner.style.height = innerHeight + 'px';
    // the copy sits exactly where the real scene is, magnified around the centre of the glass
    it.inner.style.transformOrigin = (r.left + r.width/2) + 'px ' + (r.top + r.height/2) + 'px';
    it.inner.style.transform = 'translate(' + (-r.left) + 'px,' + (-r.top) + 'px) scale(' + k.toFixed(3) + ')';
  }
  function mirrorShape(node, it, w, h, r){
    const depth = state.depth/100;
    const bezel = Math.min(Math.max(6, 6 + depth*26), Math.min(w, h)/2);
    const url = 'url(' + ringMask(w, h, r, bezel) + ')';
    it.mirror.style.webkitMaskImage = url; it.mirror.style.maskImage = url;
    it.mirror.style.display = state.depth > 0 ? '' : 'none';
  }
  let placing = 0;
  function placeAll(){
    if(placing) return;
    placing = requestAnimationFrame(()=>{ placing = 0; items.forEach((it, node)=> mirrorPlace(node, it)); });
  }
  if(!state.refract){
    window.addEventListener('scroll', placeAll, {passive: true, capture: true});
    document.addEventListener('scroll', placeAll, {passive: true, capture: true});
    window.addEventListener('resize', placeAll);
  }

  function apply(node){
    let it = items.get(node);
    if(!it){ it = {id: 'lgf' + (++uid)}; items.set(node, it); ro.observe(node); }
    const rect = node.getBoundingClientRect();
    const w = Math.round(rect.width), h = Math.round(rect.height);
    if(w < 4 || h < 4) return;
    const r = parseFloat(getComputedStyle(node).borderTopLeftRadius) || 0;
    const blur = frostPx().toFixed(1);
    if(state.refract && state.depth > 0){
      if(it.w !== w || it.h !== h || it.r !== r || it.depth !== state.depth){
        buildFilter(it, w, h, r);
        it.w = w; it.h = h; it.r = r; it.depth = state.depth;
      }
      node.style.backdropFilter = 'url(#'+it.id+') blur('+blur+'px) saturate(175%) brightness(1.06)';
    } else {
      node.style.backdropFilter = 'blur('+Math.max(2, blur)+'px) saturate(180%) brightness(1.08)';
      mirrorSetup(node, it);
      if(it.w !== w || it.h !== h || it.r !== r || it.depth !== state.depth){
        mirrorShape(node, it, w, h, r);
        it.w = w; it.h = h; it.r = r; it.depth = state.depth;
      }
      mirrorPlace(node, it);
    }
    node.style.webkitBackdropFilter = 'blur('+Math.max(2, blur)+'px) saturate(180%) brightness(1.08)';
  }

  const ro = new ResizeObserver(entries=>{ entries.forEach(e=> apply(e.target)); });

  function scan(root){ (root || document).querySelectorAll('.lg').forEach(apply); }

  function set(opts){
    Object.assign(state, opts || {});
    const d = state.depth/100;
    const s = document.documentElement.style;
    s.setProperty('--lg-depth', d.toFixed(3));        // rim light, inner glow and shadow follow the depth
    s.setProperty('--lg-frost', (state.frost/100).toFixed(3));
    items.forEach((it, node)=> apply(node));
  }

  // light follows the tilt of the phone (or the mouse on a computer)
  let tiltOn = false;
  function setTilt(x, y){
    const s = document.documentElement.style;
    s.setProperty('--tx', Math.max(-1, Math.min(1, x)).toFixed(3));
    s.setProperty('--ty', Math.max(-1, Math.min(1, y)).toFixed(3));
  }
  function onOrient(e){
    if(e.gamma == null) return;
    tiltOn = true;
    setTilt(e.gamma/35, (e.beta - 40)/35);
  }
  function enableTilt(){
    if(typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function'){
      // iPhone: the browser asks once, after a tap
      DeviceOrientationEvent.requestPermission().then(p=>{ if(p === 'granted') window.addEventListener('deviceorientation', onOrient); }).catch(()=>{});
    } else window.addEventListener('deviceorientation', onOrient);
  }
  window.addEventListener('pointerdown', function once(){ enableTilt(); window.removeEventListener('pointerdown', once); });
  window.addEventListener('pointermove', e=>{ if(!tiltOn && e.pointerType === 'mouse') setTilt((e.clientX/innerWidth)*2 - 1, (e.clientY/innerHeight)*2 - 1); });

  // the specular glint follows the finger on each piece of glass
  document.addEventListener('pointermove', e=>{
    const g = e.target.closest && e.target.closest('.lg'); if(!g) return;
    const r = g.getBoundingClientRect();
    g.style.setProperty('--mx', (e.clientX - r.left)+'px'); g.style.setProperty('--my', (e.clientY - r.top)+'px');
  }, {passive: true});
  document.addEventListener('pointerdown', e=>{
    const g = e.target.closest && e.target.closest('.lg'); if(!g) return;
    const r = g.getBoundingClientRect();
    g.style.setProperty('--mx', (e.clientX - r.left)+'px'); g.style.setProperty('--my', (e.clientY - r.top)+'px');
  }, {passive: true});

  setTilt(0, 0);
  document.documentElement.classList.add(state.refract ? 'lg-refract' : 'lg-mirror-mode');
  window.LiquidGlass = { scan, set, apply, get state(){ return Object.assign({}, state); } };
})();
