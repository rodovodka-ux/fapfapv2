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
  const state = { depth: 60, frost: 30, refract: chromium };
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
      node.style.backdropFilter = 'blur('+Math.max(2, blur)+'px) saturate(175%) brightness(1.06)';
    }
    node.style.webkitBackdropFilter = 'blur('+Math.max(2, blur)+'px) saturate(175%) brightness(1.06)';
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
  window.LiquidGlass = { scan, set, apply, get state(){ return Object.assign({}, state); } };
})();
