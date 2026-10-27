// Les six nouvelles tables (v84, maquette) — écrites avec les mêmes outils que celles du jeu (rr, grain, frameWood, U, TP, F),
// pour entrer telles quelles dans DScene une fois validées. Inspirées des deux plus récentes : la table en verre et le club VIP.

    // le rooftop de Bastos : un deck en bois sombre, la ville en contrebas derrière la rambarde de verre, une table en marbre noir veiné d'or
    function paintRooftop(c){
      c.fillStyle = '#231b17'; c.fillRect(0, 0, W, H);
      for(let y = 0; y < H; y += 16){ c.fillStyle = (y/16 % 2) ? '#2a201b' : '#211915'; c.fillRect(0, y, W, 15); c.fillStyle = 'rgba(0,0,0,.45)'; c.fillRect(0, y + 15, W, 1); }
      grain(c, 0, 0, W, H, 1600, 'rgba(0,0,0,.2)', 'rgba(255,220,180,.04)');
      // la ville, floue, de part et d'autre (le bokeh des fenêtres et des phares)
      [[0, 22], [W - 22, 22]].forEach(([x0, w])=>{ c.fillStyle = 'rgba(12,16,40,.85)'; c.fillRect(x0, 0, w, H);
        for(let k = 0; k < 40; k++){ const x = x0 + rnd()*w, y = rnd()*H, r = 2 + rnd()*5, warm = rnd() < .6; const g = c.createRadialGradient(x, y, 0, x, y, r*2.2);
          g.addColorStop(0, warm ? 'rgba(255,200,120,.9)' : 'rgba(140,180,255,.9)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(x - r*3, y - r*3, r*6, r*6); }
        c.fillStyle = 'rgba(200,230,255,.18)'; c.fillRect(x0 === 0 ? w - 2 : x0, 0, 2, H); });
      frameWood(c, F, '#3a3a40', '#16161a', '#060607', 26);
      rr(c, TP.x - 3, TP.y - 3, TP.w + 6, TP.h + 6, 21); c.fillStyle = '#d9a441'; c.fill();
      rr(c, TP.x, TP.y, TP.w, TP.h, 19); let g = c.createLinearGradient(TP.x, TP.y, TP.x + TP.w, TP.y + TP.h); g.addColorStop(0, '#1b1a1f'); g.addColorStop(.5, '#0f0e12'); g.addColorStop(1, '#1d1b21'); c.fillStyle = g; c.fill();
      c.save(); rr(c, TP.x, TP.y, TP.w, TP.h, 19); c.clip();
      // les veines : de l'or, puis un blanc laiteux, qui serpentent en diagonale
      for(let k = 0; k < 9; k++){ let x = TP.x + rnd()*TP.w, y = TP.y - 10, gold = k < 4; c.strokeStyle = gold ? 'rgba(230,180,80,.75)' : 'rgba(235,235,245,.16)'; c.lineWidth = gold ? 1.6 + rnd()*1.4 : 3 + rnd()*5;
        c.beginPath(); c.moveTo(x, y); while(y < TP.y + TP.h + 10){ const nx = x + (rnd() - .35)*40, ny = y + 18 + rnd()*26; c.quadraticCurveTo(x + (rnd() - .5)*30, (y + ny)/2, nx, ny); x = nx; y = ny; } c.stroke(); }
      // le reflet des guirlandes sur le marbre poli
      for(let k = 0; k < 7; k++){ const x = TP.x + TP.w*(.08 + k*.14), y = TP.y + 14 + Math.sin(k*1.3)*6; const gg = c.createRadialGradient(x, y, 0, x, y, 16); gg.addColorStop(0, 'rgba(255,214,140,.55)'); gg.addColorStop(1, 'rgba(255,214,140,0)'); c.fillStyle = gg; c.fillRect(x - 16, y - 16, 32, 32); }
      c.restore();
      if(TP.w > 220){ // (les objets : seulement en grand, comme les tables du jeu dont les vignettes n'en ont pas)
      // un cocktail et un téléphone posés sur le bord
      const p = U(.12, .2); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(p.x + 5, p.y + 6, 15, 10, 0, 0, 7); c.fill();
      c.fillStyle = 'rgba(255,120,90,.85)'; c.strokeStyle = '#1B120C'; c.lineWidth = 2.2; c.beginPath(); c.arc(p.x, p.y, 13, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#9be36b'; c.beginPath(); c.arc(p.x + 5, p.y - 5, 4.5, 0, 7); c.fill(); c.stroke();
      const q = U(.86, .58); c.save(); c.translate(q.x, q.y); c.rotate(.35); c.fillStyle = 'rgba(0,0,0,.35)'; rr(c, -9, -16, 22, 36, 5); c.fill(); c.fillStyle = '#121216'; c.strokeStyle = '#000'; rr(c, -12, -19, 22, 36, 5); c.fill(); c.stroke(); c.fillStyle = '#2a3a70'; rr(c, -10, -16, 18, 28, 3); c.fill(); c.restore(); }
    }

    // le salon d'or : moquette bordeaux à damas doré, cadre doré sculpté, velours émeraude, filet d'or — le grand frère du club VIP
    function paintSalon(c){
      c.fillStyle = '#4a0f1e'; c.fillRect(0, 0, W, H);
      for(let y = 0; y < H; y += 40) for(let x = ((y/40) % 2)*20; x < W; x += 40){ c.save(); c.translate(x, y); c.fillStyle = 'rgba(230,180,80,.14)';
        c.beginPath(); c.moveTo(0, -12); c.quadraticCurveTo(8, -4, 0, 12); c.quadraticCurveTo(-8, -4, 0, -12); c.fill(); c.beginPath(); c.arc(0, 0, 3, 0, 7); c.fill();
        [-1, 1].forEach(s=>{ c.beginPath(); c.ellipse(s*8, 2, 5, 2.4, s*.6, 0, 7); c.fill(); }); c.restore(); }
      grain(c, 0, 0, W, H, 1400, 'rgba(0,0,0,.18)', 'rgba(255,200,160,.04)');
      // le cadre en bois doré, perles sculptées tout autour
      rr(c, F.x, F.y, F.w, F.h, 30); let g = c.createLinearGradient(F.x, F.y, F.x + F.w, F.y + F.h); g.addColorStop(0, '#f6d27a'); g.addColorStop(.35, '#b8862e'); g.addColorStop(.65, '#f0c766'); g.addColorStop(1, '#8a5f1c'); c.fillStyle = g; c.fill(); c.lineWidth = 4; c.strokeStyle = '#000'; c.stroke();
      const per = 2*(F.w + F.h), n = Math.floor(per/14);
      for(let i = 0; i < n; i++){ let d = i/n*per, x, y; if(d < F.w){ x = F.x + d; y = F.y + 6; } else if(d < F.w + F.h){ x = F.x + F.w - 6; y = F.y + d - F.w; } else if(d < 2*F.w + F.h){ x = F.x + F.w - (d - F.w - F.h); y = F.y + F.h - 6; } else { x = F.x + 6; y = F.y + F.h - (d - 2*F.w - F.h); }
        if(x < F.x + 14 && y < F.y + 14 || x > F.x + F.w - 14 && y < F.y + 14 || x < F.x + 14 && y > F.y + F.h - 14 || x > F.x + F.w - 14 && y > F.y + F.h - 14) continue;
        c.fillStyle = 'rgba(90,55,10,.55)'; c.beginPath(); c.arc(x + .8, y + .8, 2.6, 0, 7); c.fill(); c.fillStyle = 'rgba(255,240,190,.75)'; c.beginPath(); c.arc(x - .4, y - .4, 1.6, 0, 7); c.fill(); }
      rr(c, TP.x - 4, TP.y - 4, TP.w + 8, TP.h + 8, 20); c.fillStyle = '#000'; c.fill();
      rr(c, TP.x - 2, TP.y - 2, TP.w + 4, TP.h + 4, 19); c.fillStyle = '#e8bb55'; c.fill();
      rr(c, TP.x, TP.y, TP.w, TP.h, 17); c.fillStyle = '#0f5a3e'; c.fill();
      c.save(); rr(c, TP.x, TP.y, TP.w, TP.h, 17); c.clip();
      grain(c, TP.x, TP.y, TP.w, TP.h, 3200, 'rgba(0,0,0,.12)', 'rgba(160,255,200,.05)');
      // le velours : le poil couché dessine des vagues plus claires
      for(let k = 0; k < 6; k++){ const p = U(rnd(), rnd()); const gg = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, 60 + rnd()*60); gg.addColorStop(0, 'rgba(120,230,170,.10)'); gg.addColorStop(1, 'rgba(120,230,170,0)'); c.fillStyle = gg; c.fillRect(TP.x, TP.y, TP.w, TP.h); }
      // un monogramme FF brodé au centre
      c.font = '700 ' + Math.round(TP.w*.2) + 'px Fredoka, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = 'rgba(232,187,85,.13)'; c.fillText('FF', TP.x + TP.w/2, TP.y + TP.h*.47);
      c.strokeStyle = 'rgba(232,187,85,.22)'; c.lineWidth = 1.5; c.beginPath(); c.ellipse(TP.x + TP.w/2, TP.y + TP.h*.47, TP.w*.2, TP.w*.16, 0, 0, 7); c.stroke();
      const gi = c.createLinearGradient(0, TP.y, 0, TP.y + 24); gi.addColorStop(0, 'rgba(0,0,0,.45)'); gi.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = gi; c.fillRect(TP.x, TP.y, TP.w, 24);
      c.restore();
      if(TP.w > 220){ // (les objets : seulement en grand, comme les tables du jeu dont les vignettes n'en ont pas)
      // le seau à champagne et deux flûtes
      const b = U(.13, .2); c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.arc(b.x + 6, b.y + 7, 22, 0, 7); c.fill();
      g = c.createRadialGradient(b.x - 6, b.y - 6, 2, b.x, b.y, 22); g.addColorStop(0, '#fffbe8'); g.addColorStop(.5, '#d7c08a'); g.addColorStop(1, '#8a6c2c'); c.fillStyle = g; c.strokeStyle = '#1B120C'; c.lineWidth = 2.5; c.beginPath(); c.arc(b.x, b.y, 21, 0, 7); c.fill(); c.stroke();
      c.fillStyle = '#123d2a'; c.beginPath(); c.arc(b.x + 3, b.y - 2, 8, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#e8bb55'; c.beginPath(); c.arc(b.x + 3, b.y - 2, 3.5, 0, 7); c.fill();
      [[.88, .17], [.84, .25]].forEach(([u, v])=>{ const f = U(u, v); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.arc(f.x + 4, f.y + 5, 8, 0, 7); c.fill(); c.fillStyle = 'rgba(255,236,170,.85)'; c.strokeStyle = '#1B120C'; c.lineWidth = 2; c.beginPath(); c.arc(f.x, f.y, 7, 0, 7); c.fill(); c.stroke(); }); }
    }

    // au bord de la piscine (la villa) : l'eau turquoise tout autour, une margelle de pierre, une table en teck blanc et verre givré
    function paintPiscine(c){
      c.fillStyle = '#0d6f86'; c.fillRect(0, 0, W, H);
      const s = 22; c.strokeStyle = 'rgba(255,255,255,.14)'; c.lineWidth = 1; for(let x = 0; x < W; x += s){ c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); } for(let y = 0; y < H; y += s){ c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
      const gp = c.createLinearGradient(0, 0, 0, H); gp.addColorStop(0, 'rgba(40,200,220,.35)'); gp.addColorStop(1, 'rgba(0,40,80,.35)'); c.fillStyle = gp; c.fillRect(0, 0, W, H);
      // la margelle en pierre claire, sous la table
      rr(c, F.x - 6, F.y - 6, F.w + 12, F.h + 12, 34); c.fillStyle = '#e9dfcc'; c.fill(); grain(c, F.x - 6, F.y - 6, F.w + 12, F.h + 12, 1400, 'rgba(120,100,70,.18)', 'rgba(255,255,255,.2)'); c.lineWidth = 3; c.strokeStyle = '#000'; c.stroke();
      frameWood(c, F, '#fbf6ec', '#efe6d4', '#cdbf9f', 26);
      c.save(); rr(c, F.x, F.y, F.w, F.h, 26); c.clip(); c.strokeStyle = 'rgba(150,120,70,.22)'; c.lineWidth = 1; for(let y = F.y + 4; y < F.y + F.h; y += 5){ c.beginPath(); c.moveTo(F.x, y); c.lineTo(F.x + F.w, y + rnd()*2); c.stroke(); } c.restore();
      rr(c, TP.x, TP.y, TP.w, TP.h, 16); let g = c.createLinearGradient(TP.x, TP.y, TP.x + TP.w, TP.y + TP.h); g.addColorStop(0, '#d7eef0'); g.addColorStop(.5, '#bfe2e6'); g.addColorStop(1, '#a9d4da'); c.fillStyle = g; c.fill();
      c.save(); rr(c, TP.x, TP.y, TP.w, TP.h, 16); c.clip();
      grain(c, TP.x, TP.y, TP.w, TP.h, 2600, 'rgba(255,255,255,.18)', 'rgba(60,120,130,.08)');   // le givré
      c.fillStyle = 'rgba(255,255,255,.22)'; for(let k = 0; k < 2; k++){ const x = TP.x + TP.w*(.25 + k*.4); c.beginPath(); c.moveTo(x, TP.y); c.lineTo(x + 50, TP.y); c.lineTo(x - 50, TP.y + TP.h); c.lineTo(x - 100, TP.y + TP.h); c.closePath(); c.fill(); }
      c.restore(); c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 3; rr(c, TP.x + 2, TP.y + 2, TP.w - 4, TP.h - 4, 15); c.stroke(); c.strokeStyle = '#1B120C'; c.lineWidth = 2; rr(c, TP.x, TP.y, TP.w, TP.h, 16); c.stroke();
      if(TP.w > 220){ // (les objets : seulement en grand, comme les tables du jeu dont les vignettes n'en ont pas)
      // un jus de fruit et des lunettes de soleil
      const p = U(.12, .2); c.fillStyle = 'rgba(0,40,60,.3)'; c.beginPath(); c.arc(p.x + 5, p.y + 6, 13, 0, 7); c.fill(); c.fillStyle = '#ffb02e'; c.strokeStyle = '#1B120C'; c.lineWidth = 2.2; c.beginPath(); c.arc(p.x, p.y, 12, 0, 7); c.fill(); c.stroke();
      c.strokeStyle = '#e2558e'; c.lineWidth = 3; c.beginPath(); c.moveTo(p.x + 2, p.y - 2); c.lineTo(p.x + 16, p.y - 16); c.stroke();
      const q = U(.86, .6); c.save(); c.translate(q.x, q.y); c.rotate(-.3); c.fillStyle = '#121216'; c.strokeStyle = '#000'; c.lineWidth = 2; [-11, 11].forEach(x=>{ c.beginPath(); c.ellipse(x, 0, 10, 8, 0, 0, 7); c.fill(); c.stroke(); }); c.beginPath(); c.moveTo(-2, -2); c.lineTo(2, -2); c.stroke(); c.restore(); }
    }

    // le lounge néon : carrelage noir laqué qui reflète tout, une table laquée noire bordée d'un tube rose et d'un tube cyan
    function paintLounge(c){
      const s = 36; for(let y = 0; y < H; y += s) for(let x = 0; x < W; x += s){ c.fillStyle = ((x/s + y/s) & 1) ? '#0d0b12' : '#141019'; c.fillRect(x, y, s, s); }
      c.strokeStyle = 'rgba(255,255,255,.05)'; c.lineWidth = 1; for(let x = 0; x < W; x += s){ c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); } for(let y = 0; y < H; y += s){ c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
      // le reflet des tubes sur le sol mouillé
      [[F.y - 18, '255,60,170'], [F.y + F.h + 18, '40,220,255']].forEach(([y, col])=>{ const g = c.createLinearGradient(0, y - 20, 0, y + 20); g.addColorStop(0, 'rgba(' + col + ',0)'); g.addColorStop(.5, 'rgba(' + col + ',.22)'); g.addColorStop(1, 'rgba(' + col + ',0)'); c.fillStyle = g; c.fillRect(0, y - 20, W, 40); });
      frameWood(c, F, '#2a2730', '#121016', '#050407', 22);
      rr(c, TP.x, TP.y, TP.w, TP.h, 14); let g = c.createLinearGradient(0, TP.y, 0, TP.y + TP.h); g.addColorStop(0, '#16131c'); g.addColorStop(1, '#0a080e'); c.fillStyle = g; c.fill();
      c.save(); rr(c, TP.x, TP.y, TP.w, TP.h, 14); c.clip();
      // un fin motif de losanges, comme un tissu de costume
      c.strokeStyle = 'rgba(255,255,255,.035)'; c.lineWidth = 1; for(let k = -TP.h; k < TP.w + TP.h; k += 18){ c.beginPath(); c.moveTo(TP.x + k, TP.y); c.lineTo(TP.x + k - TP.h, TP.y + TP.h); c.stroke(); c.beginPath(); c.moveTo(TP.x + k, TP.y); c.lineTo(TP.x + k + TP.h, TP.y + TP.h); c.stroke(); }
      c.fillStyle = 'rgba(255,255,255,.06)'; c.beginPath(); c.ellipse(TP.x + TP.w*.68, TP.y + TP.h*.35, 80, 20, -.3, 0, 7); c.fill();
      c.restore();
      // les deux tubes, éteints (la lumière les allume : voir sourcesNew)
      [[F.y + 3, '#ff8bd0'], [F.y + F.h - 3, '#8beeff']].forEach(([y, col])=>{ c.lineCap = 'round'; c.strokeStyle = '#000'; c.lineWidth = 7; c.beginPath(); c.moveTo(F.x + 26, y); c.lineTo(F.x + F.w - 26, y); c.stroke(); c.strokeStyle = col; c.lineWidth = 3.5; c.stroke(); });
      if(TP.w > 220){ // (les objets : seulement en grand, comme les tables du jeu dont les vignettes n'en ont pas)
      // deux verres à shot et des jetons
      [[.12, .2], [.17, .26]].forEach(([u, v])=>{ const p = U(u, v); c.fillStyle = 'rgba(0,0,0,.4)'; c.beginPath(); c.arc(p.x + 4, p.y + 5, 9, 0, 7); c.fill(); c.fillStyle = 'rgba(200,240,255,.35)'; c.strokeStyle = '#000'; c.lineWidth = 2; c.beginPath(); c.arc(p.x, p.y, 8, 0, 7); c.fill(); c.stroke(); c.fillStyle = 'rgba(255,90,170,.7)'; c.beginPath(); c.arc(p.x, p.y, 4.5, 0, 7); c.fill(); });
      for(let k = 0; k < 4; k++){ const p = U(.86, .58); c.fillStyle = k % 2 ? '#ff4fae' : '#25d7ff'; c.strokeStyle = '#000'; c.lineWidth = 2; c.beginPath(); c.ellipse(p.x, p.y - k*3, 11, 7, 0, 0, 7); c.fill(); c.stroke(); } }
    }

    // la plage de Kribi : du sable, des coquillages, une table en bois flotté, un plateau en raphia tressé ; le soleil se couche
    function paintKribi(c){
      c.fillStyle = '#e2c08c'; c.fillRect(0, 0, W, H); grain(c, 0, 0, W, H, 4200, 'rgba(140,100,50,.22)', 'rgba(255,250,230,.25)');
      c.strokeStyle = 'rgba(160,120,70,.25)'; c.lineWidth = 2; for(let y = 10; y < H; y += 20){ c.beginPath(); c.moveTo(0, y); for(let x = 0; x <= W; x += 20) c.lineTo(x, y + Math.sin(x*.05 + y)*3); c.stroke(); }
      for(let k = 0; k < 10; k++){ const x = rnd()*W, y = rnd()*H; c.fillStyle = rnd() < .5 ? '#fbeee0' : '#f2b8a0'; c.strokeStyle = 'rgba(80,50,30,.6)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(x, y); c.arc(x, y, 5, Math.PI*1.1, Math.PI*1.9); c.closePath(); c.fill(); c.stroke(); }
      // l'écume de la mer qui lèche le bas de l'écran
      c.fillStyle = 'rgba(70,170,190,.55)'; c.beginPath(); c.moveTo(0, H); for(let x = 0; x <= W; x += 16) c.lineTo(x, H - 26 - Math.sin(x*.04)*8); c.lineTo(W, H); c.fill();
      c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 3; c.beginPath(); for(let x = 0; x <= W; x += 16) c.lineTo(x, H - 26 - Math.sin(x*.04)*8); c.stroke();
      // le cadre en bois flotté : planches grisées, inégales
      rr(c, F.x, F.y, F.w, F.h, 14); c.fillStyle = '#000'; c.fill();
      const n = 5, pw = (F.w - 6)/n; for(let k = 0; k < n; k++){ rr(c, F.x + 3 + k*pw, F.y + 3, pw - 2, F.h - 6, 10); c.fillStyle = ['#b9ad98','#a99c86','#c3b8a4','#ada08b'][k % 4]; c.fill();
        c.save(); rr(c, F.x + 3 + k*pw, F.y + 3, pw - 2, F.h - 6, 10); c.clip(); c.strokeStyle = 'rgba(70,60,50,.3)'; c.lineWidth = 1.1; for(let j = 0; j < 6; j++){ const xx = F.x + 3 + k*pw + 4 + rnd()*(pw - 10); c.beginPath(); c.moveTo(xx, F.y); c.bezierCurveTo(xx + rnd()*6 - 3, F.y + F.h*.3, xx + rnd()*6 - 3, F.y + F.h*.7, xx, F.y + F.h); c.stroke(); } c.restore(); }
      // le plateau en raphia tressé
      rr(c, TP.x, TP.y, TP.w, TP.h, 12); c.fillStyle = '#d8b46a'; c.fill();
      c.save(); rr(c, TP.x, TP.y, TP.w, TP.h, 12); c.clip(); const t = 12;
      for(let y = TP.y; y < TP.y + TP.h; y += t) for(let x = TP.x; x < TP.x + TP.w; x += t){ const o = ((x - TP.x)/t + (y - TP.y)/t) % 2; c.fillStyle = o ? 'rgba(150,100,40,.28)' : 'rgba(255,240,200,.18)'; c.fillRect(x, y, t, t/2); c.fillStyle = o ? 'rgba(255,240,200,.14)' : 'rgba(150,100,40,.22)'; c.fillRect(x, y + t/2, t, t/2); }
      c.strokeStyle = 'rgba(200,60,40,.5)'; c.lineWidth = 6; rr(c, TP.x + 14, TP.y + 14, TP.w - 28, TP.h - 28, 8); c.stroke();
      c.restore(); c.strokeStyle = '#1B120C'; c.lineWidth = 2; rr(c, TP.x, TP.y, TP.w, TP.h, 12); c.stroke();
      if(TP.w > 220){ // (les objets : seulement en grand, comme les tables du jeu dont les vignettes n'en ont pas)
      // une noix de coco avec sa paille, une étoile de mer
      const p = U(.13, .21); c.fillStyle = 'rgba(80,50,20,.35)'; c.beginPath(); c.arc(p.x + 5, p.y + 6, 17, 0, 7); c.fill(); c.fillStyle = '#6b4424'; c.strokeStyle = '#1B120C'; c.lineWidth = 2.4; c.beginPath(); c.arc(p.x, p.y, 16, 0, 7); c.fill(); c.stroke(); c.fillStyle = '#f6efe2'; c.beginPath(); c.arc(p.x, p.y, 9, 0, 7); c.fill(); c.stroke();
      c.strokeStyle = '#3d7fd9'; c.lineWidth = 3; c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(p.x + 14, p.y - 18); c.stroke();
      const q = U(.86, .6); c.save(); c.translate(q.x, q.y); c.rotate(.4); c.fillStyle = '#ff7a3c'; c.strokeStyle = '#1B120C'; c.lineWidth = 2; c.beginPath(); for(let i = 0; i < 10; i++){ const a = i/10*Math.PI*2 - Math.PI/2, r = i % 2 ? 5 : 13; c.lineTo(Math.cos(a)*r, Math.sin(a)*r); } c.closePath(); c.fill(); c.stroke(); c.restore(); }
    }

    // le vestiaire des Lions : la pelouse tondue en bandes, les couleurs du drapeau sur le cadre, l'étoile au centre du feutre
    function paintStade(c){
      for(let x = 0; x < W; x += 30){ c.fillStyle = (x/30 % 2) ? '#2f8a3e' : '#3a9a48'; c.fillRect(x, 0, 30, H); }
      grain(c, 0, 0, W, H, 3000, 'rgba(0,40,0,.18)', 'rgba(200,255,200,.06)');
      c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, H*.5); c.lineTo(W, H*.5); c.stroke(); c.beginPath(); c.arc(W/2, H*.5, Math.min(W, H)*.36, 0, 7); c.stroke();
      // le cadre : vert, rouge, jaune
      rr(c, F.x, F.y, F.w, F.h, 24); c.fillStyle = '#000'; c.fill();
      c.save(); rr(c, F.x + 3, F.y + 3, F.w - 6, F.h - 6, 22); c.clip(); ['#007a3d', '#ce1126', '#fcd116'].forEach((col, i)=>{ c.fillStyle = col; c.fillRect(F.x + i*F.w/3, F.y, F.w/3 + 1, F.h); });
      const hl = c.createLinearGradient(0, F.y, 0, F.y + F.h); hl.addColorStop(0, 'rgba(255,255,255,.3)'); hl.addColorStop(.08, 'rgba(255,255,255,0)'); hl.addColorStop(.92, 'rgba(0,0,0,0)'); hl.addColorStop(1, 'rgba(0,0,0,.35)'); c.fillStyle = hl; c.fillRect(F.x, F.y, F.w, F.h); c.restore();
      rr(c, TP.x - 3, TP.y - 3, TP.w + 6, TP.h + 6, 18); c.fillStyle = '#000'; c.fill();
      rr(c, TP.x, TP.y, TP.w, TP.h, 16); c.fillStyle = '#1f6b3a'; c.fill();
      c.save(); rr(c, TP.x, TP.y, TP.w, TP.h, 16); c.clip(); grain(c, TP.x, TP.y, TP.w, TP.h, 3400, 'rgba(0,0,0,.12)', 'rgba(190,255,200,.05)');
      const p = U(.5, .47), R = TP.w*.16; c.fillStyle = 'rgba(252,209,22,.16)'; c.beginPath(); for(let i = 0; i < 10; i++){ const a = i/10*Math.PI*2 - Math.PI/2, r = i % 2 ? R*.42 : R; c.lineTo(p.x + Math.cos(a)*r, p.y + Math.sin(a)*r); } c.closePath(); c.fill();
      c.font = '700 ' + Math.round(TP.w*.06) + 'px Fredoka, sans-serif'; c.textAlign = 'center'; c.fillStyle = 'rgba(255,255,255,.12)'; c.fillText('LIONS INDOMPTABLES', p.x, p.y + R + 26);
      c.restore();
      if(TP.w > 220){ // (les objets : seulement en grand, comme les tables du jeu dont les vignettes n'en ont pas)
      // le ballon et un sifflet
      const b = U(.13, .2); c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.arc(b.x + 5, b.y + 6, 15, 0, 7); c.fill(); c.fillStyle = '#fff'; c.strokeStyle = '#1B120C'; c.lineWidth = 2.4; c.beginPath(); c.arc(b.x, b.y, 14, 0, 7); c.fill(); c.stroke();
      c.fillStyle = '#1B120C'; c.beginPath(); for(let i = 0; i < 5; i++){ const a = i/5*Math.PI*2 - Math.PI/2; c.lineTo(b.x + Math.cos(a)*5, b.y + Math.sin(a)*5); } c.closePath(); c.fill();
      const w = U(.86, .58); c.fillStyle = '#c8c9cc'; c.strokeStyle = '#1B120C'; c.lineWidth = 2; rr(c, w.x - 12, w.y - 6, 22, 12, 6); c.fill(); c.stroke(); c.strokeStyle = '#ce1126'; c.lineWidth = 2; c.beginPath(); c.moveTo(w.x - 12, w.y); c.quadraticCurveTo(w.x - 30, w.y + 16, w.x - 14, w.y + 24); c.stroke(); }
    }

    // the lights of the new places
    function setupLightsNew(){
      const vh = TP.h, R = Math.hypot(W, vh);
      const B = (k, x, y, h, col, Rk, I, elec)=> ({k, x0:x, y0:y, h, col, R:R*Rk, I, elec});
      if(key==='rooftop') L = [B('string', TP.x + TP.w*.15, TP.y + 6, 240, [255,200,120], .38, .8, 1), B('string', TP.x + TP.w*.5, TP.y + 2, 240, [255,180,110], .38, .8, 1), B('string', TP.x + TP.w*.85, TP.y + 6, 240, [255,210,140], .38, .8, 1), B('city', W/2, H + 120, 900, [110,140,255], 1.1, .55, 0)];
      if(key==='salon') L = [B('chand', TP.x + TP.w*.5, TP.y + vh*.42, 480, [255,226,175], .72, 1.1, 1), B('amb', W/2, TP.y, 900, [200,90,120], .9, .25, 1)];
      if(key==='piscine') L = [B('pool', W/2, H + 40, 700, [80,230,255], 1.05, .75, 1), B('moon', -200, -240, 1500, [190,210,255], 2.2, .45, 0), B('lamp', TP.x + TP.w*.85, TP.y + vh*.15, 300, [255,220,170], .5, .7, 1)];
      if(key==='lounge') L = [B('neonP', TP.x + TP.w*.5, F.y - 10, 120, [255,60,170], .8, 1.05, 1), B('neonC', TP.x + TP.w*.5, F.y + F.h + 10, 120, [40,220,255], .8, 1.05, 1)];
      if(key==='kribi') L = [B('sun', -120, TP.y + vh*.55, 900, [255,150,70], 1.4, 1.05, 0), B('amb', W, 0, 900, [255,140,170], 1, .3, 0)];
      if(key==='stade') L = [B('flood', TP.x + TP.w*.08, TP.y - 30, 600, [235,245,255], 1.1, 1, 1), B('flood', TP.x + TP.w*.92, TP.y - 30, 600, [235,245,255], 1.1, 1, 1), B('amb', W/2, TP.y + vh, 900, [120,200,140], .9, .3, 0)];
      L.forEach(l=>{ l.x = l.x0; l.y = l.y0; l.e = l.I; });
    }
