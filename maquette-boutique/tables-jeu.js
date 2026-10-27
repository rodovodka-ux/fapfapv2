// Extrait tel quel du jeu (index.html, DScene) : les mêmes fonctions peignent les tables de la maquette.
    function rr(c, x, y, w, h, r){ r = Math.max(0, Math.min(r, w/2, h/2)); c.beginPath(); c.moveTo(x+r, y); c.arcTo(x+w, y, x+w, y+h, r); c.arcTo(x+w, y+h, x, y+h, r); c.arcTo(x, y+h, x, y, r); c.arcTo(x, y, x+w, y, r); c.closePath(); }
    const inset = (r, i)=> ({x:r.x+i, y:r.y+i, w:r.w-i*2, h:r.h-i*2});
    const U = (u, v)=> ({x:TP.x + u*TP.w, y:TP.y + v*TP.h});
    function grain(c,x,y,w,h,n,a,b){ for(let k=0;k<n;k++){ c.fillStyle=rnd()<.5?a:b; c.fillRect(x+rnd()*w,y+rnd()*h,1.4,1.4); } }
    function paintTripot(c){
      // sol en ciment, presque noir
      c.fillStyle='#4a423c'; c.fillRect(0,0,W,H); grain(c,0,0,W,H,2500,'rgba(0,0,0,.18)','rgba(255,240,220,.06)');
      // cadre en bois sombre
      let g=c.createLinearGradient(0,F.y,0,F.y+F.h); g.addColorStop(0,'#a8683a'); g.addColorStop(.06,'#7d4a26'); g.addColorStop(.94,'#7d4a26'); g.addColorStop(1,'#5a3218');
      rr(c,F.x,F.y,F.w,F.h,30); c.fillStyle=g; c.fill();
      c.save(); rr(c,F.x,F.y,F.w,F.h,30); c.clip(); c.strokeStyle='rgba(0,0,0,.25)'; c.lineWidth=1.3;
      for(let k=0;k<50;k++){ const yy=F.y+rnd()*F.h, xx=F.x+rnd()*F.w; c.beginPath(); c.moveTo(xx-40,yy); c.bezierCurveTo(xx-10,yy-4,xx+10,yy+4,xx+50,yy+rnd()*6-3); c.stroke(); }
      c.restore(); c.lineWidth=4; c.strokeStyle='#000'; rr(c,F.x,F.y,F.w,F.h,30); c.stroke();
      // filet de laiton puis le feutre vert râpé
      rr(c,TP.x-4,TP.y-4,TP.w+8,TP.h+8,22); c.fillStyle='#000'; c.fill();
      rr(c,TP.x-2,TP.y-2,TP.w+4,TP.h+4,21); c.fillStyle='#b8923e'; c.fill();
      rr(c,TP.x,TP.y,TP.w,TP.h,19); c.fillStyle='#2f8a52'; c.fill();
      c.save(); rr(c,TP.x,TP.y,TP.w,TP.h,19); c.clip();
      grain(c,TP.x,TP.y,TP.w,TP.h,3600,'rgba(0,0,0,.1)','rgba(190,255,200,.05)');
      // usure claire là où les mains frottent, brûlures de cigarette, ronds de verre
      [[.5,.88,.42,.12],[.5,.1,.3,.08],[.5,.48,.3,.2]].forEach(([u,v,rx,ry])=>{ const p=U(u,v); const gg=c.createRadialGradient(p.x,p.y,0,p.x,p.y,rx*TP.w); gg.addColorStop(0,'rgba(200,230,170,.16)'); gg.addColorStop(1,'rgba(200,230,170,0)'); c.fillStyle=gg; c.beginPath(); c.ellipse(p.x,p.y,rx*TP.w,ry*TP.h*2.4,0,0,7); c.fill(); });
      [[.3,.3],[.72,.7],[.62,.18],[.2,.78]].forEach(([u,v])=>{ const p=U(u,v); c.fillStyle='rgba(60,30,10,.5)'; c.beginPath(); c.ellipse(p.x,p.y,5,3.5,rnd()*3,0,7); c.fill(); c.fillStyle='rgba(10,5,0,.8)'; c.beginPath(); c.arc(p.x,p.y,2,0,7); c.fill(); });
      [[.82,.36,15],[.24,.42,17]].forEach(([u,v,r])=>{ const p=U(u,v); c.strokeStyle='rgba(30,40,20,.35)'; c.lineWidth=2.5; c.beginPath(); c.arc(p.x,p.y,r,.3,5.6); c.stroke(); });
      const gi=c.createLinearGradient(0,TP.y,0,TP.y+26); gi.addColorStop(0,'rgba(0,0,0,.45)'); gi.addColorStop(1,'rgba(0,0,0,0)'); c.fillStyle=gi; c.fillRect(TP.x,TP.y,TP.w,26);
      c.restore();
    }
    function paintBar(c){
      // carrelage rouge et crème, mouillé de bière
      const s=34; for(let y=0;y<H;y+=s) for(let x=0;x<W;x+=s){ c.fillStyle=((x/s+y/s)&1)?'#b9a58a':'#8a3a2c'; c.fillRect(x,y,s,s); }
      c.strokeStyle='rgba(0,0,0,.35)'; c.lineWidth=1.5; for(let x=0;x<W;x+=s){ c.beginPath(); c.moveTo(x,0); c.lineTo(x,H); c.stroke(); } for(let y=0;y<H;y+=s){ c.beginPath(); c.moveTo(0,y); c.lineTo(W,y); c.stroke(); }
      grain(c,0,0,W,H,1500,'rgba(0,0,0,.15)','rgba(255,255,255,.05)');
      // le mur de droite, peint, où est accroché le néon
      const wx=W-24; c.fillStyle='#6b5a52'; c.fillRect(wx,0,24,H); grain(c,wx,0,24,H,400,'rgba(0,0,0,.2)','rgba(255,255,255,.06)');
      c.fillStyle='#000'; c.fillRect(wx-3,0,3,H);
      // table en métal peint (bleu-vert), bord roulé, peinture écaillée qui laisse voir la rouille
      rr(c,F.x,F.y,F.w,F.h,16); c.fillStyle='#000'; c.fill();
      rr(c,F.x+3,F.y+3,F.w-6,F.h-6,14); c.fillStyle='#f3ead2'; c.fill();
      rr(c,TP.x,TP.y,TP.w,TP.h,10); c.fillStyle='#e2d3ad'; c.fill();
      c.save(); rr(c,TP.x,TP.y,TP.w,TP.h,10); c.clip();
      grain(c,TP.x,TP.y,TP.w,TP.h,1600,'rgba(0,0,0,.08)','rgba(255,255,255,.05)');
      for(let k=0;k<12;k++){ const x=TP.x+rnd()*TP.w, y=TP.y+rnd()*TP.h, r=2+rnd()*5; c.fillStyle='rgba(150,95,55,.55)'; c.beginPath(); for(let a=0;a<7;a++){ const rr2=r*(.6+rnd()*.6); c.lineTo(x+Math.cos(a)*rr2,y+Math.sin(a)*rr2); } c.fill(); }
      // ronds de bouteilles et flaques
      [[.2,.35,16],[.7,.42,15],[.55,.2,14]].forEach(([u,v,r])=>{ const p=U(u,v); c.strokeStyle='rgba(90,60,20,.35)'; c.lineWidth=3; c.beginPath(); c.arc(p.x,p.y,r,0,7); c.stroke(); });
      [[.35,.66,30,14]].forEach(([u,v,rx,ry])=>{ const p=U(u,v); c.fillStyle='rgba(150,100,30,.25)'; c.beginPath(); c.ellipse(p.x,p.y,rx,ry,.4,0,7); c.fill(); });
      c.restore();
    }
    function paintVeranda(c){
      // dalle de la véranda, carreaux rouge brique usés
      const s=40; for(let y=0;y<H;y+=s) for(let x=0;x<W;x+=s){ c.fillStyle=`rgb(${120+rnd()*20|0},${58+rnd()*12|0},${42+rnd()*10|0})`; c.fillRect(x,y,s,s); }
      c.strokeStyle='rgba(30,15,10,.55)'; c.lineWidth=2; for(let x=0;x<W;x+=s){ c.beginPath(); c.moveTo(x,0); c.lineTo(x,H); c.stroke(); } for(let y=0;y<H;y+=s){ c.beginPath(); c.moveTo(0,y); c.lineTo(W,y); c.stroke(); }
      grain(c,0,0,W,H,1800,'rgba(0,0,0,.15)','rgba(255,230,200,.05)');
      // table en planches
      rr(c,F.x,F.y,F.w,F.h,6); c.fillStyle='#000'; c.fill();
      const n=7, ph=(F.h-8)/n;
      for(let k=0;k<n;k++){
        const y=F.y+4+k*ph; const tone=[ '#b07a48','#a87244','#b9834f','#a06c40' ][k%4];
        rr(c,F.x+3,y+1,F.w-6,ph-2,3); c.fillStyle=tone; c.fill();
        c.save(); rr(c,F.x+4,y+1,F.w-8,ph-3,4); c.clip(); c.strokeStyle='rgba(60,30,10,.35)'; c.lineWidth=1.2;
        for(let j=0;j<6;j++){ const yy=y+4+rnd()*(ph-8); c.beginPath(); c.moveTo(F.x,yy); c.bezierCurveTo(F.x+F.w*.3,yy+rnd()*6-3,F.x+F.w*.6,yy+rnd()*6-3,F.x+F.w,yy+rnd()*4-2); c.stroke(); }
        c.fillStyle='rgba(60,30,10,.6)'; c.beginPath(); c.ellipse(F.x+F.w*(.2+rnd()*.6),y+ph/2,6,3,0,0,7); c.fill();
        c.restore();
        c.fillStyle='#2a2a2a'; [F.x+14,F.x+F.w-14].forEach(x=>{ c.beginPath(); c.arc(x,y+ph/2,2.2,0,7); c.fill(); });
      }
      c.lineWidth=3.5; c.strokeStyle='#000'; rr(c,F.x,F.y,F.w,F.h,6); c.stroke();
    }
    function frameWood(c, r, top, mid, dark, rad){ let g = c.createLinearGradient(0, r.y, 0, r.y + r.h); g.addColorStop(0, top); g.addColorStop(.06, mid); g.addColorStop(.94, mid); g.addColorStop(1, dark);
      rr(c, r.x, r.y, r.w, r.h, rad); c.fillStyle = g; c.fill(); c.lineWidth = 4; c.strokeStyle = '#000'; c.stroke(); }
    function tiles(c, s, a, b, line){ for(let y = 0; y < H; y += s) for(let x = 0; x < W; x += s){ c.fillStyle = ((x/s + y/s) & 1) ? a : b; c.fillRect(x, y, s, s); }
      c.strokeStyle = line; c.lineWidth = 1.5; for(let x = 0; x < W; x += s){ c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); } for(let y = 0; y < H; y += s){ c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); } }
    // the VIP club: black tufted leather, gold piping, a deep carpet
    function paintClub(c){
      c.fillStyle = '#2a0f1c'; c.fillRect(0, 0, W, H);
      for(let y = 0; y < H; y += 26) for(let x = (y/26 % 2)*13; x < W; x += 26){ c.fillStyle = 'rgba(217,164,65,.08)'; c.beginPath(); c.moveTo(x, y - 6); c.lineTo(x + 6, y); c.lineTo(x, y + 6); c.lineTo(x - 6, y); c.fill(); }
      frameWood(c, F, '#3a3036', '#1d181c', '#0e0b0d', 28);
      rr(c, TP.x - 3, TP.y - 3, TP.w + 6, TP.h + 6, 22); c.fillStyle = '#d9a441'; c.fill();
      rr(c, TP.x, TP.y, TP.w, TP.h, 20); c.fillStyle = '#26232a'; c.fill();
      c.save(); rr(c, TP.x, TP.y, TP.w, TP.h, 20); c.clip();
      const s = 44; for(let y = TP.y - s; y < TP.y + TP.h + s; y += s/2) for(let x = TP.x - s; x < TP.x + TP.w + s; x += s){ const ox = ((y - TP.y)/(s/2)) % 2 ? s/2 : 0;
        const g = c.createRadialGradient(x + ox, y, 2, x + ox, y, s*.62); g.addColorStop(0, 'rgba(0,0,0,.45)'); g.addColorStop(.25, 'rgba(255,255,255,.07)'); g.addColorStop(1, 'rgba(0,0,0,.15)'); c.fillStyle = g; c.fillRect(x + ox - s, y - s, s*2, s*2);
        c.fillStyle = '#0c0a0d'; c.beginPath(); c.arc(x + ox, y, 3, 0, 7); c.fill(); c.fillStyle = 'rgba(217,164,65,.7)'; c.beginPath(); c.arc(x + ox - .8, y - .8, 1.2, 0, 7); c.fill(); }
      c.restore();
    }
    // the yard: a plastic table under the mango tree, red earth around
    function paintCour(c){
      c.fillStyle = '#7a3e22'; c.fillRect(0, 0, W, H); for(let k = 0; k < 2200; k++){ c.fillStyle = rnd() < .5 ? 'rgba(0,0,0,.14)' : 'rgba(255,200,150,.07)'; c.fillRect(rnd()*W, rnd()*H, 2, 2); }
      for(let k = 0; k < 18; k++){ const x = rnd()*W, y = rnd()*H; c.fillStyle = 'rgba(40,70,20,.5)'; c.beginPath(); c.ellipse(x, y, 10, 4, rnd()*3, 0, 7); c.fill(); }
      rr(c, F.x, F.y, F.w, F.h, 22); c.fillStyle = '#000'; c.fill(); rr(c, F.x + 3, F.y + 3, F.w - 6, F.h - 6, 20); c.fillStyle = '#f4f1ea'; c.fill();
      rr(c, TP.x, TP.y, TP.w, TP.h, 16); c.fillStyle = '#ece6da'; c.fill();
      c.save(); rr(c, TP.x, TP.y, TP.w, TP.h, 16); c.clip(); c.strokeStyle = 'rgba(0,0,0,.06)'; c.lineWidth = 2; for(let x = TP.x; x < TP.x + TP.w; x += 9){ c.beginPath(); c.moveTo(x, TP.y); c.lineTo(x, TP.y + TP.h); c.stroke(); }
      [[.3,.3],[.7,.62]].forEach(([u, v])=>{ const p = U(u, v); c.strokeStyle = 'rgba(120,90,40,.25)'; c.lineWidth = 3; c.beginPath(); c.arc(p.x, p.y, 15, 0, 7); c.stroke(); });
      c.restore(); c.strokeStyle = 'rgba(0,0,0,.4)'; c.lineWidth = 2; rr(c, TP.x, TP.y, TP.w, TP.h, 16); c.stroke();
    }
    // the bedroom: a pagne on a low table, a straw mat on the floor
    function paintChambre(c){
      c.fillStyle = '#b8955c'; c.fillRect(0, 0, W, H);
      for(let y = 0; y < H; y += 8){ c.fillStyle = (y/8 % 2) ? 'rgba(90,60,25,.25)' : 'rgba(255,235,190,.1)'; c.fillRect(0, y, W, 4); }
      for(let x = 0; x < W; x += 12){ c.fillStyle = 'rgba(90,60,25,.15)'; c.fillRect(x, 0, 3, H); }
      frameWood(c, F, '#7a4a2a', '#5a341c', '#3a200e', 10);
      rr(c, TP.x, TP.y, TP.w, TP.h, 6); c.fillStyle = '#1d3f8a'; c.fill();
      c.save(); rr(c, TP.x, TP.y, TP.w, TP.h, 6); c.clip();
      const s = 46; for(let y = TP.y - s; y < TP.y + TP.h + s; y += s) for(let x = TP.x - s; x < TP.x + TP.w + s; x += s){ const o = ((y - TP.y)/s) % 2 ? s/2 : 0;
        c.fillStyle = '#F2B81D'; c.beginPath(); c.arc(x + o, y, 13, 0, 7); c.fill(); c.fillStyle = '#C8352B'; c.beginPath(); c.arc(x + o, y, 6, 0, 7); c.fill(); c.fillStyle = '#1B8F7A'; c.beginPath(); c.arc(x + o + s/2, y + s/2, 5, 0, 7); c.fill(); }
      c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 3; for(let k = 0; k < 6; k++){ c.beginPath(); c.moveTo(TP.x, TP.y + rnd()*TP.h); c.quadraticCurveTo(TP.x + TP.w/2, TP.y + rnd()*TP.h, TP.x + TP.w, TP.y + rnd()*TP.h); c.stroke(); }
      c.restore();
    }
    // the maquis under the storm: a red and white oilcloth, a cement floor wet with rain
    function paintMaquis(c){
      c.fillStyle = '#3e4246'; c.fillRect(0, 0, W, H); for(let k = 0; k < 1800; k++){ c.fillStyle = rnd() < .5 ? 'rgba(0,0,0,.18)' : 'rgba(200,220,255,.05)'; c.fillRect(rnd()*W, rnd()*H, 2, 2); }
      for(let k = 0; k < 8; k++){ c.fillStyle = 'rgba(150,180,210,.12)'; c.beginPath(); c.ellipse(rnd()*W, rnd()*H, 30 + rnd()*40, 10 + rnd()*14, rnd()*3, 0, 7); c.fill(); }
      frameWood(c, F, '#6b5a4a', '#4a3e32', '#2a2219', 12);
      rr(c, TP.x, TP.y, TP.w, TP.h, 8); c.fillStyle = '#f2ece0'; c.fill();
      c.save(); rr(c, TP.x, TP.y, TP.w, TP.h, 8); c.clip(); const s = 24;
      for(let x = TP.x; x < TP.x + TP.w; x += s*2){ c.fillStyle = 'rgba(200,40,40,.55)'; c.fillRect(x, TP.y, s, TP.h); }
      for(let y = TP.y; y < TP.y + TP.h; y += s*2){ c.fillStyle = 'rgba(200,40,40,.55)'; c.fillRect(TP.x, y, TP.w, s); }
      c.fillStyle = 'rgba(255,255,255,.12)'; c.beginPath(); c.ellipse(TP.x + TP.w*.7, TP.y + TP.h*.3, 60, 20, -.4, 0, 7); c.fill();
      c.restore();
    }
    // the cellar: an upturned crate stencilled FRAGILE, a dirt floor
    function paintCave(c){
      c.fillStyle = '#2e261e'; c.fillRect(0, 0, W, H); for(let k = 0; k < 2600; k++){ c.fillStyle = rnd() < .5 ? 'rgba(0,0,0,.2)' : 'rgba(200,170,120,.05)'; c.fillRect(rnd()*W, rnd()*H, 2, 2); }
      rr(c, F.x, F.y, F.w, F.h, 4); c.fillStyle = '#000'; c.fill();
      const n = 6, ph = (F.h - 8)/n;
      for(let k = 0; k < n; k++){ const y = F.y + 4 + k*ph; rr(c, F.x + 3, y + 1, F.w - 6, ph - 2, 2); c.fillStyle = ['#9a7a52','#8c6e48','#a3825a'][k%3]; c.fill();
        c.save(); rr(c, F.x + 3, y + 1, F.w - 6, ph - 2, 2); c.clip(); c.strokeStyle = 'rgba(50,30,10,.35)'; c.lineWidth = 1.2; for(let j = 0; j < 5; j++){ const yy = y + 4 + rnd()*(ph - 8); c.beginPath(); c.moveTo(F.x, yy); c.lineTo(F.x + F.w, yy + rnd()*4 - 2); c.stroke(); } c.restore();
        c.fillStyle = '#2a2a2a'; [F.x + 12, F.x + F.w - 12].forEach(x=>{ c.beginPath(); c.arc(x, y + ph/2, 2.4, 0, 7); c.fill(); }); }
      c.save(); c.translate(F.x + F.w*.5, F.y + F.h*.55); c.rotate(-.12); c.font = '700 '+Math.round(F.w*.16)+'px Fredoka, sans-serif'; c.textAlign = 'center'; c.fillStyle = 'rgba(150,30,20,.28)'; c.fillText('FRAGILE', 0, 0); c.font = '700 '+Math.round(F.w*.09)+'px Fredoka, sans-serif'; c.fillText('HAUT ↑', 0, F.w*.12); c.restore();
    }
    // the glass table: the floor shows through the glass, a chrome frame, reflections on top
    function paintVerre(c){
      const s = 44; for(let y = 0; y < H; y += s) for(let x = 0; x < W; x += s){ c.fillStyle = ((x/s + y/s) & 1) ? '#e8e2d4' : '#2a2a30'; c.fillRect(x, y, s, s); }
      rr(c, F.x, F.y, F.w, F.h, 18); c.fillStyle = '#000'; c.fill();
      let g = c.createLinearGradient(F.x, 0, F.x + F.w, 0); g.addColorStop(0, '#9aa3ad'); g.addColorStop(.5, '#eef2f6'); g.addColorStop(1, '#7d8690'); rr(c, F.x + 3, F.y + 3, F.w - 6, F.h - 6, 16); c.fillStyle = g; c.fill();
      c.save(); rr(c, TP.x, TP.y, TP.w, TP.h, 12); c.clip();
      // the floor seen through the glass: a bit green, a bit blurred
      for(let y = 0; y < H; y += s) for(let x = 0; x < W; x += s){ c.fillStyle = ((x/s + y/s) & 1) ? '#c7d5ce' : '#8fa39c'; c.fillRect(x + 4, y + 4, s, s); }
      c.fillStyle = 'rgba(110,180,175,.42)'; c.fillRect(TP.x, TP.y, TP.w, TP.h);
      c.fillStyle = 'rgba(255,255,255,.18)'; for(let k = 0; k < 3; k++){ c.beginPath(); const x = TP.x + TP.w*(.15 + k*.3); c.moveTo(x, TP.y); c.lineTo(x + 40, TP.y); c.lineTo(x - 60, TP.y + TP.h); c.lineTo(x - 100, TP.y + TP.h); c.closePath(); c.fill(); }
      c.restore(); c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 3; rr(c, TP.x + 2, TP.y + 2, TP.w - 4, TP.h - 4, 11); c.stroke(); c.strokeStyle = '#1B120C'; c.lineWidth = 2; rr(c, TP.x, TP.y, TP.w, TP.h, 12); c.stroke();
    }

    // v67 — the hood of a patrol car at night: wet asphalt around, white paint, the blue band, POLICE stencilled across
    function paintPolice(c){
      c.fillStyle = '#1c1d22'; c.fillRect(0, 0, W, H); grain(c, 0, 0, W, H, 2600, 'rgba(0,0,0,.25)', 'rgba(200,210,230,.05)');
      for(let k = 0; k < 7; k++){ c.fillStyle = 'rgba(120,140,170,.10)'; c.beginPath(); c.ellipse(rnd()*W, rnd()*H, 26 + rnd()*50, 8 + rnd()*14, rnd()*3, 0, 7); c.fill(); }
      // the hood: a long curved shape, a dark seam where it meets the windscreen
      rr(c, F.x, F.y, F.w, F.h, 34); c.fillStyle = '#000'; c.fill();
      let g = c.createLinearGradient(F.x, 0, F.x + F.w, 0); g.addColorStop(0, '#c9ced6'); g.addColorStop(.5, '#f4f6f9'); g.addColorStop(1, '#b9bfc8');
      rr(c, F.x + 3, F.y + 3, F.w - 6, F.h - 6, 31); c.fillStyle = g; c.fill();
      rr(c, TP.x, TP.y, TP.w, TP.h, 24); g = c.createLinearGradient(0, TP.y, 0, TP.y + TP.h); g.addColorStop(0, '#dfe3e9'); g.addColorStop(.5, '#f7f8fa'); g.addColorStop(1, '#d4d9e0'); c.fillStyle = g; c.fill();
      c.save(); rr(c, TP.x, TP.y, TP.w, TP.h, 24); c.clip();
      c.fillStyle = '#123a8a'; c.fillRect(TP.x, TP.y + TP.h*.44, TP.w, TP.h*.12); c.fillStyle = '#e9edf2'; c.fillRect(TP.x, TP.y + TP.h*.44 + TP.h*.05, TP.w, 3);
      c.save(); c.translate(TP.x + TP.w/2, TP.y + TP.h*.3); c.font = '700 ' + Math.round(TP.w*.17) + 'px Fredoka, sans-serif'; c.textAlign = 'center'; c.fillStyle = 'rgba(18,58,138,.16)'; c.fillText('POLICE', 0, 0); c.restore();
      // the curve of the hood: a soft highlight down the middle, two crease lines
      const hl = c.createLinearGradient(TP.x, 0, TP.x + TP.w, 0); hl.addColorStop(.35, 'rgba(255,255,255,0)'); hl.addColorStop(.5, 'rgba(255,255,255,.55)'); hl.addColorStop(.65, 'rgba(255,255,255,0)'); c.fillStyle = hl; c.fillRect(TP.x, TP.y, TP.w, TP.h);
      c.strokeStyle = 'rgba(0,0,0,.12)'; c.lineWidth = 2; [.18, .82].forEach(u=>{ c.beginPath(); c.moveTo(TP.x + TP.w*u, TP.y); c.quadraticCurveTo(TP.x + TP.w*(u + (u < .5 ? -.04 : .04)), TP.y + TP.h*.5, TP.x + TP.w*u, TP.y + TP.h); c.stroke(); });
      for(let k = 0; k < 40; k++){ c.fillStyle = 'rgba(150,170,200,.35)'; c.beginPath(); c.arc(TP.x + rnd()*TP.w, TP.y + rnd()*TP.h, .8 + rnd()*1.6, 0, 7); c.fill(); }   // drops of the last rain
      const sh = c.createLinearGradient(0, TP.y, 0, TP.y + 30); sh.addColorStop(0, 'rgba(10,14,24,.55)'); sh.addColorStop(1, 'rgba(10,14,24,0)'); c.fillStyle = sh; c.fillRect(TP.x, TP.y, TP.w, 30);
      c.restore(); c.lineWidth = 3; c.strokeStyle = '#000'; rr(c, F.x, F.y, F.w, F.h, 34); c.stroke();
    }
    // v67 — the veranda under the storm: soaked cement, planks of a heavy table, the edge of a tin awning dripping
    function paintAuvent(c){
      c.fillStyle = '#34383d'; c.fillRect(0, 0, W, H); grain(c, 0, 0, W, H, 2200, 'rgba(0,0,0,.2)', 'rgba(200,220,255,.05)');
      for(let k = 0; k < 10; k++){ c.fillStyle = 'rgba(150,180,215,.14)'; c.beginPath(); c.ellipse(rnd()*W, rnd()*H, 30 + rnd()*60, 9 + rnd()*16, rnd()*3, 0, 7); c.fill(); }
      rr(c, F.x, F.y, F.w, F.h, 6); c.fillStyle = '#000'; c.fill();
      const n = 7, ph = (F.h - 8)/n;
      for(let k = 0; k < n; k++){ const y = F.y + 4 + k*ph, tone = ['#8c6238','#80592f','#93693e','#7a5530'][k%4];
        rr(c, F.x + 3, y + 1, F.w - 6, ph - 2, 3); c.fillStyle = tone; c.fill();
        c.save(); rr(c, F.x + 4, y + 1, F.w - 8, ph - 3, 4); c.clip(); c.strokeStyle = 'rgba(40,20,8,.4)'; c.lineWidth = 1.2;
        for(let j = 0; j < 6; j++){ const yy = y + 4 + rnd()*(ph - 8); c.beginPath(); c.moveTo(F.x, yy); c.bezierCurveTo(F.x + F.w*.3, yy + rnd()*6 - 3, F.x + F.w*.6, yy + rnd()*6 - 3, F.x + F.w, yy + rnd()*4 - 2); c.stroke(); }
        c.fillStyle = 'rgba(160,190,220,.18)'; c.beginPath(); c.ellipse(F.x + F.w*(.2 + rnd()*.6), y + ph/2, 14 + rnd()*12, 4, 0, 0, 7); c.fill();   // rain puddles on the wood
        c.restore(); c.fillStyle = '#2a2a2a'; [F.x + 14, F.x + F.w - 14].forEach(x=>{ c.beginPath(); c.arc(x, y + ph/2, 2.2, 0, 7); c.fill(); }); }
      c.lineWidth = 3.5; c.strokeStyle = '#000'; rr(c, F.x, F.y, F.w, F.h, 6); c.stroke();
      // the edge of the corrugated tin awning, right above the table
      const ay = Math.max(0, F.y - 36); c.fillStyle = '#6d7277'; c.fillRect(0, ay, W, 22);
      for(let x = 0; x < W; x += 14){ const gg = c.createLinearGradient(x, 0, x + 14, 0); gg.addColorStop(0, 'rgba(255,255,255,.18)'); gg.addColorStop(.5, 'rgba(0,0,0,.25)'); gg.addColorStop(1, 'rgba(255,255,255,.18)'); c.fillStyle = gg; c.fillRect(x, ay, 14, 22); }
      c.fillStyle = '#000'; c.fillRect(0, ay + 22, W, 3); c.fillStyle = 'rgba(140,90,40,.45)'; for(let k = 0; k < 9; k++) c.fillRect(rnd()*W, ay + 4 + rnd()*12, 10 + rnd()*20, 4);   // rust
    }
    // v67 — on the hood of a yellow taxi at the junction: red laterite, the yellow paint, the black-and-white band, the windscreen edge
    function paintTaxi(c){
      c.fillStyle = '#5e2c18'; c.fillRect(0, 0, W, H); for(let k = 0; k < 2400; k++){ c.fillStyle = rnd() < .5 ? 'rgba(0,0,0,.2)' : 'rgba(255,190,140,.06)'; c.fillRect(rnd()*W, rnd()*H, 2, 2); }
      rr(c, F.x, F.y, F.w, F.h, 30); c.fillStyle = '#000'; c.fill();
      let g = c.createLinearGradient(F.x, 0, F.x + F.w, 0); g.addColorStop(0, '#c98f0e'); g.addColorStop(.5, '#ffd24a'); g.addColorStop(1, '#bf860c');
      rr(c, F.x + 3, F.y + 3, F.w - 6, F.h - 6, 27); c.fillStyle = g; c.fill();
      rr(c, TP.x, TP.y, TP.w, TP.h, 20); g = c.createLinearGradient(0, TP.y, 0, TP.y + TP.h); g.addColorStop(0, '#e6a812'); g.addColorStop(.5, '#ffc93c'); g.addColorStop(1, '#e09d10'); c.fillStyle = g; c.fill();
      c.save(); rr(c, TP.x, TP.y, TP.w, TP.h, 20); c.clip();
      // the windscreen at the top, dark, with the wiper resting on it
      c.fillStyle = '#121a24'; c.fillRect(TP.x, TP.y, TP.w, TP.h*.12); c.strokeStyle = '#000'; c.lineWidth = 4; c.beginPath(); c.moveTo(TP.x + TP.w*.18, TP.y + TP.h*.11); c.lineTo(TP.x + TP.w*.6, TP.y + TP.h*.04); c.stroke();
      // the band of black and white squares down the middle
      const sq = Math.max(10, TP.w/22), by = TP.y + TP.h*.62; for(let x = TP.x, i = 0; x < TP.x + TP.w; x += sq, i++){ c.fillStyle = i % 2 ? '#111' : '#f4f1ea'; c.fillRect(x, by, sq, sq); c.fillStyle = i % 2 ? '#f4f1ea' : '#111'; c.fillRect(x, by + sq, sq, sq); }
      const hl = c.createLinearGradient(TP.x, 0, TP.x + TP.w, 0); hl.addColorStop(.38, 'rgba(255,255,255,0)'); hl.addColorStop(.5, 'rgba(255,250,220,.5)'); hl.addColorStop(.62, 'rgba(255,255,255,0)'); c.fillStyle = hl; c.fillRect(TP.x, TP.y + TP.h*.12, TP.w, TP.h);
      for(let k = 0; k < 16; k++){ c.fillStyle = 'rgba(110,50,20,.35)'; c.beginPath(); c.arc(TP.x + rnd()*TP.w, TP.y + TP.h*(.2 + rnd()*.8), 1 + rnd()*3, 0, 7); c.fill(); }   // red dust of the road
      c.save(); c.translate(TP.x + TP.w/2, TP.y + TP.h*.4); c.font = '700 ' + Math.round(TP.w*.14) + 'px Fredoka, sans-serif'; c.textAlign = 'center'; c.fillStyle = 'rgba(40,25,0,.14)'; c.fillText('TAXI', 0, 0); c.restore();
      c.restore(); c.lineWidth = 3; c.strokeStyle = '#000'; rr(c, F.x, F.y, F.w, F.h, 30); c.stroke();
    }
    // v67 — the zinc counter of a maquis: dark green tiles, brushed metal, rings of bottles
    function paintZinc(c){
      const s = 30; for(let y = 0; y < H; y += s) for(let x = 0; x < W; x += s){ c.fillStyle = ((x/s + y/s) & 1) ? '#16302a' : '#1d3b33'; c.fillRect(x, y, s, s); }
      c.strokeStyle = 'rgba(0,0,0,.4)'; c.lineWidth = 1.5; for(let x = 0; x < W; x += s){ c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); } for(let y = 0; y < H; y += s){ c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
      rr(c, F.x, F.y, F.w, F.h, 10); c.fillStyle = '#000'; c.fill();
      let g = c.createLinearGradient(0, F.y, 0, F.y + F.h); g.addColorStop(0, '#c3c9ce'); g.addColorStop(1, '#868e95'); rr(c, F.x + 3, F.y + 3, F.w - 6, F.h - 6, 8); c.fillStyle = g; c.fill();
      rr(c, TP.x, TP.y, TP.w, TP.h, 6); g = c.createLinearGradient(TP.x, TP.y, TP.x + TP.w, TP.y + TP.h); g.addColorStop(0, '#a9b0b6'); g.addColorStop(.5, '#d3d8dc'); g.addColorStop(1, '#9aa2a8'); c.fillStyle = g; c.fill();
      c.save(); rr(c, TP.x, TP.y, TP.w, TP.h, 6); c.clip();
      c.strokeStyle = 'rgba(255,255,255,.12)'; c.lineWidth = 1; for(let y = TP.y; y < TP.y + TP.h; y += 3){ c.beginPath(); c.moveTo(TP.x, y + rnd()); c.lineTo(TP.x + TP.w, y + rnd()); c.stroke(); }   // brushed metal
      [[.3,.3,15],[.62,.2,14],[.5,.7,16],[.24,.66,13]].forEach(([u,v,r])=>{ const p = U(u, v); c.strokeStyle = 'rgba(60,70,60,.35)'; c.lineWidth = 3; c.beginPath(); c.arc(p.x, p.y, r, 0, 7); c.stroke(); });
      c.fillStyle = 'rgba(255,255,255,.1)'; c.beginPath(); c.ellipse(TP.x + TP.w*.65, TP.y + TP.h*.4, 70, 18, -.3, 0, 7); c.fill();
      c.restore(); c.lineWidth = 3; c.strokeStyle = '#000'; rr(c, F.x, F.y, F.w, F.h, 10); c.stroke();
    }
    function setupLightsGame(){
      const vh = TP.h, R = Math.hypot(W, vh);
      const B = (k, x, y, h, col, Rk, I, elec)=> ({k, x0:x, y0:y, h, col, R:R*Rk, I, elec});
      if(key==='tripot') L = [B('bulb', TP.x + TP.w*.47, TP.y + vh*.4, 420, [255,222,165], .62, 1, 1)];
      if(key==='bar') L = [B('neon', W - 12, TP.y + vh*.4, 150, [255,55,70], .75, .78, 1), B('far', -40, TP.y + vh + 60, 520, [255,205,150], .7, .7, 1)];
      if(key==='veranda') L = [B('flame', F.x - 6, TP.y + vh*.78, 95, [255,168,78], .85, 1, 0), B('moon', W + 260, -260, 1500, [120,150,255], 2.2, .2, 0)];
      if(key==='club') L = [B('spot', TP.x + TP.w*.2, TP.y + vh*.18, 300, [255,236,205], .44, 1.15, 1), B('spot', TP.x + TP.w*.5, TP.y + vh*.5, 300, [255,236,205], .44, 1.15, 1), B('spot', TP.x + TP.w*.8, TP.y + vh*.18, 300, [255,236,205], .44, 1.15, 1), B('amb', W/2, TP.y + vh*.5, 900, [180,90,140], .9, .25, 1)];
      if(key==='cour') L = [B('moon', W + 200, TP.y - 300, 1600, [140,170,255], 2.4, .55, 0), B('string', TP.x + TP.w*.2, TP.y - 20, 260, [255,190,90], .4, .55, 1), B('string', TP.x + TP.w*.55, TP.y - 30, 260, [255,140,110], .4, .5, 1), B('string', TP.x + TP.w*.88, TP.y - 20, 260, [255,220,120], .4, .55, 1)];
      if(key==='chambre') L = [B('street', -120, TP.y + vh*.3, 360, [255,190,110], 1.1, .9, 1), B('room', W/2, TP.y + vh*.6, 600, [120,110,160], .9, .22, 0)];
      if(key==='maquis') L = [B('bulb', TP.x + TP.w*.3, TP.y + vh*.35, 380, [255,200,140], .5, .5, 1), B('bolt', W + 120, TP.y - 160, 800, [200,215,255], 1.6, 0, 0)];
      if(key==='cave') L = [B('low', TP.x + TP.w*.86, TP.y + vh*.22, 120, [255,214,150], .7, 1.05, 1)];
      if(key==='verre') L = [B('chand', TP.x + TP.w*.5, TP.y + vh*.38, 480, [255,226,180], .7, 1, 1), B('amb', W/2, H, 900, [150,200,220], .9, .2, 1)];
      // the two beacons of the patrol car turn: red on the left, blue on the right, an orange street lamp far behind
      if(key==='police') L = [B('gyroR', TP.x + TP.w*.2, TP.y - 30, 240, [255,40,50], .8, 1.2, 0), B('gyroB', TP.x + TP.w*.8, TP.y - 30, 240, [40,110,255], .8, 1.25, 0), B('far', -80, TP.y + vh + 90, 620, [255,165,85], .95, .45, 1)];
      // a bare bulb swings under the tin awning; the lightning floods everything
      if(key==='auvent') L = [B('swing', TP.x + TP.w*.5, TP.y + vh*.22, 260, [255,196,120], .52, .7, 1), B('bolt', W*.7, TP.y - 200, 900, [205,220,255], 1.7, 0, 0)];
      // a motorbike's headlight from below, the orange lamp of the junction above
      if(key==='taxi') L = [B('head', W*.5, TP.y + vh + 40, 200, [255,250,232], .62, 1.35, 0), B('lamp', TP.x - 60, TP.y - 160, 700, [255,150,60], .75, .28, 1)];
      // the green neon tube over the zinc counter, and the warm bulb of the kitchen behind
      if(key==='zinc') L = [B('tube', TP.x + TP.w*.5, TP.y - 18, 170, [90,255,150], .85, 1.05, 1), B('kitchen', W + 60, TP.y + vh*.7, 520, [255,190,120], .8, .35, 1)];
      L.forEach(l=>{ l.x = l.x0; l.y = l.y0; l.e = l.I; });
    }
