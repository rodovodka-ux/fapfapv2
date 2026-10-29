// Fap Fap — la troupe des 16 (v94) : un seul style de visage, en SVG, partagé par le jeu et la League.
// FFP.face(id, ex) : ex = 'neutral' | 'happy' | 'vexed' | 'cora'. FFP.artOf(gameId) : l'identifiant de dessin d'un
// personnage du jeu (les identifiants internes historiques sont gardés pour ne pas casser les sauvegardes).
(()=>{const INK = '#1b120c', SW = 5;
let uid = 0;
function face(P, ex){
  const k = 'f'+(++uid), S = P.skin, D = P.shade, rx = P.rx || 50, ry = P.ry || 55;
  const lid = (x)=> '<path d="M'+(x-12)+' 85 L'+(x+12)+' 85 L'+(x+12)+' 97 Q'+x+' 93 '+(x-12)+' 97 Z" fill="'+S+'"/><path d="M'+(x-11)+' 97 Q'+x+' 93 '+(x+11)+' 97" fill="none" stroke="'+INK+'" stroke-width="4" stroke-linecap="round"/>';
  const eye = (x)=>{
    if(ex==='happy') return '<path d="M'+(x-10)+' 101 Q'+x+' 88 '+(x+10)+' 101" fill="none" stroke="'+INK+'" stroke-width="5.5" stroke-linecap="round"/>';
    if(ex==='cora') return '<ellipse cx="'+x+'" cy="97" rx="12" ry="14" fill="#fff" stroke="'+INK+'" stroke-width="4"/><circle cx="'+x+'" cy="99" r="4" fill="'+INK+'"/>';
    const look = P.look || 0;
    let g = '<ellipse cx="'+x+'" cy="98" rx="9.5" ry="11.5" fill="#fff" stroke="'+INK+'" stroke-width="4"/><circle cx="'+(x+look)+'" cy="100" r="5.2" fill="'+(P.iris || INK)+'"/>'+(P.iris ? '<circle cx="'+(x+look)+'" cy="100" r="2.6" fill="'+INK+'"/>' : '')+'<circle cx="'+(x+look+1.8)+'" cy="97.5" r="1.7" fill="#fff"/>';
    if(ex==='vexed' || (ex==='neutral' && P.sleepy)) g += lid(x);
    if(P.liner && ex!=='cora') g += '<path d="'+(x<100 ? 'M71 96 L62 91' : 'M129 96 L138 91')+'" stroke="'+INK+'" stroke-width="3.5" stroke-linecap="round"/>';
    if(P.lashes && ex!=='happy') g +='<path d="M'+(x-9)+' 88 l-4 -4 M'+(x+9)+' 88 l4 -4 M'+(x+(x<100?-5:5))+' 86 l'+(x<100?-2:2)+' -5" stroke="'+INK+'" stroke-width="3" stroke-linecap="round"/>';
    return g;
  };
  const bc = P.browC || INK, bw = P.brow || 6;
  const angry = '<path d="M70 82 L90 88 M130 82 L110 88" stroke="'+bc+'" stroke-width="'+bw+'" stroke-linecap="round"/>';
  const brows = ex==='vexed' ? angry
    : ex==='cora' ? '<path d="M68 76 Q80 68 91 75 M109 75 Q120 68 132 76" fill="none" stroke="'+bc+'" stroke-width="'+bw+'" stroke-linecap="round"/>'
    : ex==='happy' ? '<path d="M70 80 Q80 74 90 79 M110 79 Q120 74 130 80" fill="none" stroke="'+bc+'" stroke-width="'+bw+'" stroke-linecap="round"/>'
    : P.browsN==='angry' ? '<path d="M70 80 L90 85 M130 80 L110 85" stroke="'+bc+'" stroke-width="'+bw+'" stroke-linecap="round"/>'
    : P.oneBrow ? '<path d="M70 78 Q80 70 90 76 M110 84 L130 82" fill="none" stroke="'+bc+'" stroke-width="'+bw+'" stroke-linecap="round"/>'
    : '<path d="M70 83 Q80 78 90 82 M110 82 Q120 78 130 83" fill="none" stroke="'+bc+'" stroke-width="'+bw+'" stroke-linecap="round"/>';
  const lip = P.lip || '#5a1a10';
  const mouth = ex==='happy' ? '<path d="M84 124 Q100 122 116 124 Q114 144 100 145 Q86 144 84 124 Z" fill="#5a1010" stroke="'+INK+'" stroke-width="4" stroke-linejoin="round"/><path d="M87 125 Q100 124 113 125 L112 130 Q100 129 88 130 Z" fill="#fff"/>'+(P.goldTooth ? '<rect x="103" y="125" width="6" height="5" fill="#ffd34a"/>' : '')+'<path d="M93 140 Q100 136 107 140" fill="#e2585a"/>'
    : ex==='cora' ? '<ellipse cx="100" cy="133" rx="10" ry="12" fill="#5a1010" stroke="'+INK+'" stroke-width="4"/><path d="M93 140 Q100 136 107 140" fill="#e2585a"/>'
    : ex==='vexed' ? '<path d="M88 136 Q100 127 112 136" fill="'+(P.lipFill ? lip : 'none')+'" stroke="'+INK+'" stroke-width="5" stroke-linecap="round"/>'
    : P.mouthN==='flat' ? '<path d="M90 131 L110 131" stroke="'+INK+'" stroke-width="5" stroke-linecap="round"/>'
    : P.mouthN==='pout' ? '<path d="M88 131 Q94 125 100 128 Q106 125 112 131 Q100 140 88 131 Z" fill="'+lip+'" stroke="'+INK+'" stroke-width="3.5" stroke-linejoin="round"/><path d="M90 131 Q100 133 110 131" fill="none" stroke="'+INK+'" stroke-width="2"/><path d="M96 135 Q100 136 104 135" stroke="#fff" stroke-width="2" opacity=".55" stroke-linecap="round"/>'
    : P.mouthN==='grin' ? '<path d="M86 126 Q100 124 114 126 Q112 138 100 139 Q88 138 86 126 Z" fill="#5a1010" stroke="'+INK+'" stroke-width="4" stroke-linejoin="round"/><path d="M89 127 Q100 126 111 127 L110 131 Q100 130 90 131 Z" fill="#fff"/>'+(P.goldTooth ? '<rect x="103" y="126.5" width="6" height="4.5" fill="#ffd34a"/>' : '')
    : P.smirk ? '<path d="M88 130 Q100 134 110 127 Q114 125 116 122" fill="none" stroke="'+INK+'" stroke-width="5" stroke-linecap="round"/>'
    : '<path d="M88 129 Q100 136 112 129'+(P.lipFill ? ' Q100 133 88 129 Z' : '')+'" fill="'+(P.lipFill ? lip : 'none')+'" stroke="'+INK+'" stroke-width="'+(P.lipFill ? 4 : 5)+'" stroke-linecap="round" stroke-linejoin="round"/>';
  const blush = P.blush && ex!=='vexed' ? '<ellipse cx="70" cy="118" rx="9" ry="5" fill="'+P.blush+'" opacity=".55"/><ellipse cx="130" cy="118" rx="9" ry="5" fill="'+P.blush+'" opacity=".55"/>' : '';
  const nose = P.nose || '<path d="M97 106 Q93 116 99 118 Q104 119 105 115" fill="none" stroke="'+D+'" stroke-width="4" stroke-linecap="round"/>';
  const head = '<ellipse cx="100" cy="102" rx="'+rx+'" ry="'+ry+'"/>';
  const f = x=> typeof x==='function' ? x(ex) : (x || '');
  return '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><clipPath id="'+k+'h">'+head+'</clipPath></defs>'
    + f(P.back)
    + '<path d="M28 200 Q32 166 70 158 L130 158 Q168 166 172 200 Z" fill="'+P.cloth+'" stroke="'+INK+'" stroke-width="'+SW+'" stroke-linejoin="round"/>'
    + '<path d="M30 200 Q36 176 58 166 L60 200 Z" fill="'+P.clothD+'"/>'
    + f(P.body)
    + '<path d="M84 140 L84 162 Q100 172 116 162 L116 140 Z" fill="'+D+'" stroke="'+INK+'" stroke-width="'+SW+'" stroke-linejoin="round"/>'
    + f(P.collar)
    + '<circle cx="'+(100-rx+2)+'" cy="106" r="10" fill="'+S+'" stroke="'+INK+'" stroke-width="'+SW+'"/><circle cx="'+(100+rx-2)+'" cy="106" r="10" fill="'+S+'" stroke="'+INK+'" stroke-width="'+SW+'"/>'
    + f(P.earring)
    + '<g clip-path="url(#'+k+'h)"><rect x="40" y="30" width="120" height="140" fill="'+S+'"/><ellipse cx="150" cy="120" rx="40" ry="60" fill="'+D+'" opacity="'+(P.shadeOp || 1)+'"/><ellipse cx="78" cy="'+(P.bald ? 64 : 78)+'" rx="'+(P.bald ? 22 : 16)+'" ry="'+(P.bald ? 14 : 10)+'" fill="#fff" opacity="'+(P.bald ? .22 : .14)+'"/>'+f(P.jaw)+'</g>'
    + head.replace('/>', ' fill="none" stroke="'+INK+'" stroke-width="'+SW+'"/>')
    + f(P.hair) + blush
    + '<g class="'+(ex==='neutral' || ex==='vexed' ? 'blink' : '')+'">'+eye(80)+eye(120)+'</g>'
    + brows + f(P.marks) + f(P.glasses) + nose + f(P.beard) + mouth + f(P.extra) + f(P.over) + f(P.hat)
    + '</svg>';
}

// ---- skins ----
const SK = { d1:['#4a2a1a','#36200f'], d2:['#5a3420','#42251a'], m1:['#7a4a2c','#5e3620'], m2:['#8a5530','#6d4024'], m3:['#a86a45','#8a5233'],
             l1:['#e0ab80','#c28a5e'], l2:['#e8b993','#cc9a72'], l3:['#d6a074','#b88052'] };
const sk = id=> ({skin:SK[id][0], shade:SK[id][1]});
const S = (d, w)=> 'stroke="'+INK+'" stroke-width="'+(w || 5)+'" stroke-linejoin="round"'+(d ? ' '+d : '');

// ---- the 16 ----
const C = [
  { id:'penalty', name:'Penalty', c:'#3d8bff', c2:'#2a5fc0', c3:'#0a1838', kept:1,
    role:'Le maître du quartier', say:'« Je compte tes cartes. Toutes. »',
    who:'Calme, sûr de lui, il a écrit le manuel. Il retient ta façon de jouer.',
    style:'<b>Le calculateur.</b> Il réfléchit plus que tout le monde et joue toujours le coup le plus solide en moyenne. Il apprend tes habitudes : si tu gardes tes 3 pour la fin, il lâche ses grosses cartes tôt pour te les faire sortir.',
    move:'Tu commandes Coubie avec un 5 : il ne prend pas avec son 9, il passe un 4. Il garde le 9 pour la dernière levée, là où il vaut une manche.',
    carre:'Élimine toujours le joueur le plus dangereux pour la suite, jamais par rancune.',
    ...sk('m2'), cloth:'#3d8bff', clothD:'#2a6ad6', smirk:true,
    back:'<path d="M146 76 Q170 70 184 56 Q176 76 162 84 Z M146 80 Q172 84 190 76 Q178 92 160 92 Z" fill="#fff" '+S('',4.5)+'/>',
    hair:'<path d="M52 92 Q50 46 100 44 Q150 46 148 92 Q146 70 132 62 Q100 52 68 62 Q54 70 52 92 Z" fill="#1c120d" '+S()+'/><path d="M50 72 Q100 58 150 72 L150 84 Q100 70 50 84 Z" fill="#fff" '+S('',4.5)+'/><path d="M52 78 Q100 64 148 78" fill="none" stroke="#3d8bff" stroke-width="4"/>',
    jaw:'<path d="M50 120 Q60 158 100 162 Q140 158 150 120 Q140 150 100 152 Q60 150 50 120 Z" fill="#3a2316" opacity=".35"/>',
    collar:'<path d="M80 160 L100 176 L120 160" fill="#fff" '+S('',4)+'/><text x="140" y="194" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="20" fill="#fff" stroke="'+INK+'" stroke-width="1.5">11</text>' },
  { id:'rall', name:'Rall', c:'#ffc93c', c2:'#c99410', c3:'#2e2004', kept:1,
    role:'Le roi du bluff', say:'« Tu es né hier ou bien ? »',
    who:'Provocateur, il te parle pendant toute la partie. Ce qu’il dit de sa main est vrai une fois sur deux.',
    style:'<b>Le menteur.</b> Il annonce des mains qu’il n’a pas pour te pousser à jouer trop tôt tes grosses cartes. Entre deux bons coups, il prend celui qui cache sa vraie couleur (la feinte).',
    move:'Il joue libre son 9 de Tchaka pour te faire croire qu’il n’a plus de Tchaka… et finit la manche avec le 3 de Tchaka : CORA.',
    carre:'Élimine celui qui l’a démasqué (qui a gagné contre son bluff).',
    ...sk('d2'), cloth:'#1f1f1f', clothD:'#111', oneBrow:true, smirk:true, look:2,
    back:'<path d="M70 52 Q66 26 100 22 Q134 26 130 52 Z" fill="#e8a817" '+S()+'/>',
    hair:'<path d="M50 96 Q48 44 100 40 Q152 44 150 96 Q148 80 140 72 L60 72 Q52 80 50 96 Z" fill="#ffc93c" '+S()+'/><path d="M82 72 Q100 60 118 72 Z" fill="#2a1a14" '+S('',4)+'/><path d="M78 72 L122 72" stroke="'+INK+'" stroke-width="5"/><circle cx="100" cy="41" r="5" fill="#e8a817" '+S('',3)+'/>',
    body:'<path d="M70 160 Q100 196 130 160" fill="none" stroke="#e9b94e" stroke-width="5" stroke-dasharray="6 3"/><circle cx="100" cy="184" r="9" fill="#ffd34a" '+S('',3.5)+'/><text x="100" y="188" text-anchor="middle" font-family="Fredoka" font-weight="700" font-size="11" fill="'+INK+'">R</text>',
    beard:'<path d="M92 144 Q100 152 108 144 Q104 149 100 149 Q96 149 92 144 Z" fill="#2a1a14" '+S('',3)+'/>',
    extra: ex=> ex==='neutral' || ex==='vexed' ? '<path d="M113 128 L134 122" stroke="#e8d3a8" stroke-width="4" stroke-linecap="round"/>' : '' },
  { id:'kamga', name:'Mr Kamga', c:'#3fbf6a', c2:'#2b7a47', c3:'#0e2a18',
    role:'Le guide · très fort', say:'« Doucement. Le 3 attend son heure. »',
    who:'L’ancien du quartier. Il t’apprend le jeu (la leçon, les conseils au bon moment)… et c’est le plus patient des adversaires.',
    style:'<b>Le patient.</b> Il garde ses 3 pour la dernière levée tant que c’est raisonnable : il chasse le CORA et la 33 Glacée. Il laisse filer les petites levées sans regret.',
    move:'Il a deux 3. Il ne prend pas une seule levée pendant quatre tours… puis gagne la dernière avec un 3, et la précédente avec l’autre : 33 Glacée.',
    carre:'Épargne le plus faible de la table : « Il apprend. Laissez-le. »',
    ...sk('m1'), cloth:'#2f9d58', clothD:'#227a43', look:1, browC:'#f2efe8', brow:7,
    collar:'<path d="M78 160 L100 186 L122 160" fill="none" stroke="#e9b94e" stroke-width="5" stroke-linejoin="round"/>',
    hair:'<path d="M52 92 Q48 112 56 122 L62 118 Q56 104 60 94 Z M148 92 Q152 112 144 122 L138 118 Q144 104 140 94 Z" fill="#f2efe8" '+S('',4)+'/>',
    glasses:'<circle cx="80" cy="98" r="15" fill="rgba(255,255,255,.12)" '+S('',4)+'/><circle cx="120" cy="98" r="15" fill="rgba(255,255,255,.12)" '+S('',4)+'/><path d="M95 97 Q100 93 105 97" fill="none" stroke="'+INK+'" stroke-width="4"/>',
    beard:'<path d="M62 118 Q64 150 100 160 Q136 150 138 118 Q130 128 118 126 Q100 140 82 126 Q70 128 62 118 Z" fill="#f2efe8" '+S('',4)+'/>',
    hat:'<path d="M70 60 L76 22 Q100 16 124 22 L130 60 Q100 68 70 60 Z" fill="#c8283a" '+S()+'/><path d="M74 50 Q100 56 126 50" fill="none" stroke="#e9b94e" stroke-width="3.5"/><path d="M100 18 Q114 10 118 26" fill="none" stroke="'+INK+'" stroke-width="3" stroke-linecap="round"/><circle cx="118" cy="30" r="5" fill="#e9b94e" '+S('',3)+'/>' },
  { id:'alida', name:'Alida', c:'#ff5fa8', c2:'#c23a7c', c3:'#3a0a22', isNew:1,
    role:'La répartie', say:'« Rejoue, chéri. Celle-là, je l’ai même pas sentie. »',
    who:'Très forte, elle a toujours le dernier mot. Elle ne laisse jamais une provocation sans réponse.',
    style:'<b>La contre-attaque.</b> Elle reprend le contrôle dès qu’elle peut, avec la plus petite carte qui suffit, et punit chaque commande faible. Ses grosses cartes restent cachées pour la fin.',
    move:'Tu commandes Zing avec un 6 : elle prend avec le 7, pas avec le 10. Le 10 attend la dernière levée.',
    carre:'Élimine celui qui a parlé le plus fort contre elle.',
    ...sk('m3'), cloth:'#ff5fa8', clothD:'#d9408a', lashes:true, smirk:true, rx:48, ry:53,
    back:'<circle cx="54" cy="52" r="30" fill="#2a1a14" '+S()+'/><circle cx="146" cy="52" r="30" fill="#2a1a14" '+S()+'/>',
    hair:'<path d="M52 96 Q50 52 100 48 Q150 52 148 96 Q140 70 100 66 Q60 70 52 96 Z" fill="#2a1a14" '+S()+'/><path d="M88 46 L76 36 L78 56 Z M112 46 L124 36 L122 56 Z" fill="#ff5fa8" '+S('',4)+'/><circle cx="100" cy="46" r="7" fill="#ff5fa8" '+S('',4)+'/>',
    earring:'<circle cx="52" cy="124" r="9" fill="none" stroke="#e9b94e" stroke-width="4"/><circle cx="148" cy="124" r="9" fill="none" stroke="#e9b94e" stroke-width="4"/>',
    lipFill:true, lip:'#a0204a',
    collar:'<path d="M74 160 Q100 176 126 160" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>' },
  { id:'eva', name:'Eva', c:'#ff7a59', c2:'#d8553a', c3:'#3a120a', isNew:1,
    role:'La crush de Penalty', say:'« Penalty, regarde ! Je gagne comme toi ! »',
    who:'Blagueuse, toujours le sourire, amoureuse de Penalty. Elle rit même quand elle perd.',
    style:'<b>L’imprévisible.</b> Entre plusieurs bons coups, elle choisit au hasard : impossible de lire son jeu. Elle aime ouvrir avec ses cartes moyennes pour voir comment tu réagis.',
    move:'Deux parties de suite, la même main : elle ne commence jamais par la même carte.',
    carre:'N’élimine jamais Penalty, sauf s’il ne reste qu’eux deux.',
    ...sk('l1'), cloth:'#ff7a59', clothD:'#e05a3a', lashes:true, blush:'#ff6f6f', lipFill:true, lip:'#e0505a', rx:47, ry:53, iris:'#6b3f1f', shadeOp:.55, brow:5,
    back:'<path d="M50 80 Q40 140 46 180 L74 176 Q62 140 66 100 Z M150 80 Q160 140 154 180 L126 176 Q138 140 134 100 Z" fill="#3a2016" '+S()+'/>',
    hair:'<path d="M50 100 Q46 46 100 44 Q154 46 150 100 Q144 72 118 66 Q104 82 72 82 Q56 86 50 100 Z" fill="#3a2016" '+S()+'/><path d="M66 70 Q90 62 112 68" fill="none" stroke="#5a3424" stroke-width="3"/>',
    earring:'<path d="M53 118 q-5 -6 0 -9 q5 -3 0 9 Z M53 118 q5 -6 0 -9" fill="#ff5f7a" stroke="'+INK+'" stroke-width="2"/><path d="M147 118 q-5 -6 0 -9 q5 3 0 9 Z" fill="#ff5f7a" stroke="'+INK+'" stroke-width="2"/>',
    collar:'<path d="M78 160 Q100 172 122 160" fill="none" stroke="#fff" stroke-width="4"/><path d="M60 176 q4 -6 8 0 q4 -6 8 0 l-8 9 Z" fill="#fff" stroke="'+INK+'" stroke-width="2"/>' },
  { id:'daryck', name:'Daryck', c:'#e040fb', c2:'#a12ab8', c3:'#2a0833', isNew:1,
    role:'Le pote fêtard', say:'« On finit la partie et on va au snack, OK ? »',
    who:'Le meilleur ami de Penalty. Toujours de bonne humeur, toujours prêt pour la suite de la soirée.',
    style:'<b>Le flambeur.</b> Entre deux bons coups, il prend celui qui peut rapporter le plus gros (CORA, 33 Glacée), même si c’est un peu plus risqué. Il joue vite.',
    move:'Il a un 3 et un 10 de la même couleur : il garde les deux pour finir en CORA plutôt que d’assurer la levée.',
    carre:'Épargne Penalty, son pote. Élimine celui qui gâche l’ambiance.',
    ...sk('d1'), cloth:'#e040fb', clothD:'#b02bcc', mouthN:'grin',
    hair:'<g fill="#1c120d" '+S('',4)+'><circle cx="62" cy="62" r="11"/><circle cx="80" cy="50" r="12"/><circle cx="100" cy="46" r="12"/><circle cx="120" cy="50" r="12"/><circle cx="138" cy="62" r="11"/></g>',
    glasses:'<rect x="64" y="86" width="32" height="24" rx="8" fill="rgba(0,240,255,.25)" stroke="'+INK+'" stroke-width="4.5"/><rect x="104" y="86" width="32" height="24" rx="8" fill="rgba(0,240,255,.25)" stroke="'+INK+'" stroke-width="4.5"/><path d="M96 96 L104 96 M64 94 L54 92 M136 94 L146 92" stroke="'+INK+'" stroke-width="4"/>',
    body:'<g fill="#ffe14a" '+S('',2.5)+'><circle cx="54" cy="184" r="5"/><circle cx="146" cy="180" r="5"/><circle cx="128" cy="194" r="4"/><circle cx="72" cy="194" r="4"/></g>',
    collar:'<path d="M80 160 L100 180 L120 160" fill="none" stroke="#fff" stroke-width="4"/>' },
  { id:'nassim', name:'Nassim', c:'#2fbfa8', c2:'#1f8a7a', c3:'#062824', isNew:1,
    role:'Le calme', say:'« … »',
    who:'Grande coupe afro, calme et sérieux. Il parle peu, il regarde beaucoup.',
    style:'<b>Le mur.</b> Il choisit toujours le coup le moins risqué, même s’il rapporte moins. Il utilise la Passe mieux que personne pour garder ses cartes fortes.',
    move:'Mené d’une manche, il ne panique pas : il passe deux fois, garde son 10 et son 9, et reprend la main au bon moment.',
    carre:'Élimine simplement le meilleur joueur restant. Pas d’émotion.',
    ...sk('d2'), cloth:'#5e6b6a', clothD:'#48524f', mouthN:'flat', look:0,
    back:'<circle cx="100" cy="70" r="66" fill="#1c120d" '+S()+'/><circle cx="72" cy="40" r="10" fill="#fff" opacity=".07"/>',
    hair:'<path d="M50 96 Q52 58 100 56 Q148 58 150 96 Q140 74 100 72 Q60 74 50 96 Z" fill="#1c120d"/>',
    collar:'<path d="M80 160 Q100 170 120 160" fill="none" stroke="#2fbfa8" stroke-width="5"/>' },
  { id:'tiko', name:'Tiko la Mélo', c:'#ff9f1c', c2:'#c47208', c3:'#2e1802', isNew:1,
    role:'Le frimeur', say:'« Regarde-moi bien. C’est comme ça qu’on gagne avec style. »',
    who:'Toujours bien sapé, nœud papillon, lunettes de soleil sur la tête. Il joue pour qu’on le regarde.',
    style:'<b>Le spectacle.</b> Il cherche le coup qui fait crier la table : CORA, 33 Glacée, victoire en annonçant. Mais il ne sacrifie jamais une manche pour ça.',
    move:'À coups égaux, il finit toujours sur le 3, pour le CORA et pour la photo.',
    carre:'Adore la claque : il la place dès qu’elle est sûre.',
    ...sk('m2'), cloth:'#f4ead8', clothD:'#d8cbb2', smirk:true,
    hair:'<path d="M50 94 Q48 48 100 44 Q152 48 150 94 Q146 70 120 64 Q90 58 70 66 Q54 74 50 94 Z" fill="#1c120d" '+S()+'/><path d="M86 47 Q84 58 90 66" fill="none" stroke="#3a2a20" stroke-width="3"/><rect x="62" y="48" width="30" height="13" rx="6" fill="#111" '+S('',3.5)+'/><rect x="108" y="48" width="30" height="13" rx="6" fill="#111" '+S('',3.5)+'/><path d="M92 54 L108 54" stroke="'+INK+'" stroke-width="3.5"/>',
    beard:'<path d="M86 121 Q100 116 114 121 Q100 120 86 121 Z" fill="#1c120d" stroke="#1c120d" stroke-width="3" stroke-linejoin="round"/>',
    body:'<path d="M70 158 L88 200 L60 200 Z M130 158 L112 200 L140 200 Z" fill="#2a2a2a" '+S('',4)+'/>',
    collar:'<path d="M88 166 L100 172 L112 166 L112 180 L100 174 L88 180 Z" fill="#ff9f1c" '+S('',3.5)+'/>' },
  { id:'push', name:'Push', c:'#9aa5b1', c2:'#6a7480', c3:'#161a1e', isNew:1,
    role:'Le nerveux tranquille', say:'« Prends ton temps. Moi j’ai toute la nuit. »',
    who:'Clope au bec en permanence, l’air détendu. Il use tes nerfs.',
    style:'<b>L’usure.</b> Il prend son temps sur chaque coup serré et joue la défense basse : il donne ses petites cartes, garde ses grosses, et te laisse t’épuiser à commander.',
    move:'Tu commandes trois fois de suite ; il ne prend jamais. À la fin, tu n’as plus rien, lui a le 10 et le 9.',
    carre:'Élimine celui qui s’énerve à la table.',
    ...sk('l3'), cloth:'#4a525c', clothD:'#363c44', sleepy:true, smirk:true, shadeOp:.6,
    hair:'<path d="M50 92 Q48 40 100 38 Q152 40 150 92 Q130 74 100 72 Q70 74 50 92 Z" fill="#7d8792" '+S()+'/><path d="M50 86 Q100 66 150 86 L150 96 Q100 76 50 96 Z" fill="#9aa5b1" '+S('',4)+'/><path d="M64 56 L64 76 M80 50 L80 72 M96 48 L96 70 M112 48 L112 70 M128 52 L128 72" stroke="#6a7480" stroke-width="2.5"/><circle cx="100" cy="36" r="7" fill="#9aa5b1" '+S('',3.5)+'/>',
    jaw:'<g fill="#7a5a40" opacity=".5"><circle cx="78" cy="140" r="1.6"/><circle cx="86" cy="146" r="1.6"/><circle cx="100" cy="149" r="1.6"/><circle cx="114" cy="146" r="1.6"/><circle cx="122" cy="140" r="1.6"/><circle cx="92" cy="152" r="1.6"/><circle cx="108" cy="152" r="1.6"/></g>',
    extra: ex=> ex==='cora' ? '' : '<path d="M112 129 L140 124" stroke="#fff" stroke-width="5.5" stroke-linecap="round"/><path d="M112 129 L140 124" stroke="'+INK+'" stroke-width="1.5" opacity=".4"/><path d="M136 124.6 L141 123.8" stroke="#ff7a2a" stroke-width="5.5" stroke-linecap="round"/><path class="smoke" d="M144 118 Q140 110 146 104 Q152 98 148 90" fill="none" stroke="#dfe6ee" stroke-width="3" stroke-linecap="round" opacity=".8"/>' },
  { id:'banquier', name:'Mr le Banquier', c:'#8e1b3a', c2:'#6e1530', c3:'#22050d', isNew:1,
    role:'L’homme très riche', say:'« Tu joues avec l’argent de ta mère, toi ? »',
    who:'Très riche, il insulte tout le monde et ne doute jamais. Il joue pour humilier.',
    style:'<b>L’écraseur.</b> Il veut gagner gros : entre deux bons coups, il choisit celui qui fait le plus de points, et il presse quand tu es mené.',
    move:'Il mène 1-0 : au lieu d’assurer, il garde ses 3 pour te mettre un CORA et finir la partie d’un coup.',
    carre:'Élimine toujours le plus riche de la table.',
    ...sk('d1'), cloth:'#222a33', clothD:'#161c22', smirk:true, rx:52, ry:56, browC:'#c9c9c9',
    hair:'<path d="M50 96 Q46 46 100 44 Q154 46 150 96 Q148 74 136 66 Q100 54 64 66 Q52 74 50 96 Z" fill="#b8b8b8" '+S()+'/><path d="M64 60 Q100 50 136 60" fill="none" stroke="#e8e8e8" stroke-width="3"/>',
    jaw:'<path d="M60 140 Q100 176 140 140 Q100 160 60 140 Z" fill="#2a160b" opacity=".35"/>',
    beard:'<path d="M78 122 Q90 114 100 120 Q110 114 122 122 Q118 130 108 126 Q100 124 92 126 Q82 130 78 122 Z" fill="#d8d8d8" '+S('',3.5)+'/>',
    glasses:'<circle cx="120" cy="98" r="15" fill="rgba(255,255,255,.15)" stroke="#e9b94e" stroke-width="4"/><path d="M134 104 Q146 130 142 160" fill="none" stroke="#e9b94e" stroke-width="2.5"/>',
    collar:'<path d="M84 160 L100 174 L116 160 L108 200 L92 200 Z" fill="#fff" '+S('',3.5)+'/><path d="M96 168 L104 168 L106 198 L100 202 L94 198 Z" fill="#e9b94e" '+S('',3)+'/><path d="M140 172 l10 -4 l4 10 Z" fill="#8e1b3a" '+S('',2.5)+'/>' },
  { id:'systeme', name:'Système', c:'#00c2ff', c2:'#0085b0', c3:'#021d29', isNew:1,
    role:'Le bavard très fort', say:'« Tu as joué libre… donc plus de Zing chez toi, hein ! »',
    who:'Crâne d’œuf, drôle, bavard, il commente tout ce que tu fais. Et il a souvent raison.',
    style:'<b>Le lecteur.</b> Il note chaque couleur que tu n’as plus (quand tu joues libre ou que tu passes) et en tire tout. Il bluffe en parlant, comme Rall, mais il joue mieux que lui.',
    move:'Tu as joué libre sur Zing : il commande Zing jusqu’à la fin, tu ne peux plus jamais reprendre la main.',
    carre:'Élimine celui dont il a le mieux lu le jeu.',
    ...sk('m1'), cloth:'#00c2ff', clothD:'#0099cc', mouthN:'grin', rx:46, ry:60, bald:true,
    collar:'<path d="M82 160 L100 172 L118 160" fill="#fff" '+S('',3.5)+'/><path d="M50 182 l8 -8 l8 8 l8 -8 l8 8 M118 182 l8 -8 l8 8 l8 -8 l8 8" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>' },
  { id:'dila', name:'Dila', c:'#6a3cc0', c2:'#4b2790', c3:'#140830', isNew:1,
    role:'Le dealer du quartier', say:'« Tu gagnes encore, je ne te sers plus. Je te préviens. »',
    who:'Tout le monde le connaît. Quand il perd, il menace de ne plus te servir.',
    style:'<b>Le mauvais perdant.</b> Quand il mène, il joue serré. Quand il est mené, il prend tous les risques pour revenir : un vrai joueur sous pression.',
    move:'Mené 0-1, il garde ses deux 3 malgré le danger : soit 33 Glacée, soit rien.',
    carre:'Élimine celui qui l’a battu à la manche d’avant.',
    ...sk('d1'), cloth:'#2a2140', clothD:'#1d162e', smirk:true, goldTooth:true,
    back:'<path d="M36 200 Q24 96 100 34 Q176 96 164 200 Z" fill="#6a3cc0" '+S()+'/>',
    hair:'<path d="M48 108 Q46 50 100 44 Q154 50 152 108 Q150 70 100 64 Q50 70 48 108 Z" fill="#5a30a8" '+S()+'/>',
    marks:'<path d="M118 76 L126 90" stroke="#2a160b" stroke-width="3" stroke-linecap="round"/>',
    earring:'<circle cx="148" cy="118" r="4" fill="#e9e9e9" '+S('',2)+'/>',
    collar:'<path d="M84 160 Q100 168 116 160" fill="none" stroke="#6a3cc0" stroke-width="5"/><path d="M92 166 L92 190 M108 166 L108 190" stroke="#ddd" stroke-width="3"/>' },
  { id:'pampam', name:'Pam-Pam', c:'#e8233a', c2:'#b01528', c3:'#300409', isNew:1,
    role:'La plus jolie, toujours fâchée', say:'« Tu m’as prise ? Tu vas me le payer. »',
    who:'La plus belle du quartier, et elle le sait. Toujours fâchée, elle lance des piques à tout le monde.',
    style:'<b>La vengeance.</b> Si tu lui prends le contrôle, elle cherche à te le reprendre tout de suite, mais seulement quand c’est un bon coup : elle reste dangereuse.',
    move:'Tu lui prends une levée avec un 8 : à la suivante, elle te reprend la main avec le 9, exprès.',
    carre:'Élimine celui qui l’a contrariée (qui lui a pris le plus de levées).',
    ...sk('l2'), cloth:'#e8233a', clothD:'#c01a2e', lashes:true, liner:true, lipFill:true, lip:'#d0103a', mouthN:'pout', browsN:'angry', brow:4.5, rx:45, ry:53, iris:'#7a4a1a', shadeOp:.45, blush:'#ff8a8a',
    nose:'<path d="M99 108 Q96 115 100 116" fill="none" stroke="#c49068" stroke-width="3.5" stroke-linecap="round"/>',
    back:'<path d="M54 76 Q38 150 52 190 L84 180 Q66 140 70 96 Z M146 76 Q162 150 148 190 L116 180 Q134 140 130 96 Z" fill="#1a0e0a" '+S()+'/>',
    hair:'<path d="M54 104 Q46 46 104 44 Q154 48 148 104 Q144 76 126 66 Q96 80 64 74 Q56 86 54 104 Z" fill="#1a0e0a" '+S()+'/><path d="M104 46 Q90 62 62 72" fill="none" stroke="#3a2418" stroke-width="3"/>',
    marks:'<circle cx="128" cy="124" r="2.2" fill="#3a2418"/>',
    earring:'<circle cx="55" cy="124" r="9" fill="none" stroke="#e9b94e" stroke-width="4"/><circle cx="145" cy="124" r="9" fill="none" stroke="#e9b94e" stroke-width="4"/>',
    collar:'<path d="M70 160 Q100 184 130 160" fill="none" stroke="#fff" stroke-width="4"/><circle cx="100" cy="178" r="5" fill="#e9b94e" '+S('',2)+'/>' },
  { id:'masque', name:'Le Masque', c:'#e9b94e', c2:'#a87b1c', c3:'#1e1404', isNew:1,
    role:'Le boss, personne ne sait qui', say:'« Je savais que tu allais jouer ça. Je sais toujours. »',
    who:'Un masque d’or. Personne ne sait qui est derrière. On le débloque en battant les meilleurs. Gains × 5.',
    style:'<b>Le parfait.</b> Il réfléchit plus longtemps que tous, et il a un secret : il connaît une de tes cartes. Il n’oublie rien, ne s’énerve jamais.',
    move:'Il sait que tu as le 3 de Coubie : il ne commande jamais Coubie à la dernière levée.',
    carre:'Élimine dans l’ordre parfait pour finir seul.',
    skin:'#2a1a10', shade:'#1a1008', cloth:'#111', clothD:'#000',
    back:'<path d="M32 200 Q20 80 100 30 Q180 80 168 200 Z" fill="#1a1a1a" '+S()+'/>',
    over: ex=>{
      const eyeH = ex==='happy' ? 'M70 100 Q80 92 90 100 Q80 96 70 100 Z M110 100 Q120 92 130 100 Q120 96 110 100 Z' : ex==='cora' ? 'M68 98 Q80 84 92 98 Q80 104 68 98 Z M108 98 Q120 84 132 98 Q120 104 108 98 Z' : ex==='vexed' ? 'M68 94 L92 100 Q80 104 68 98 Z M132 94 L108 100 Q120 104 132 98 Z' : 'M68 98 Q80 88 92 98 Q80 104 68 98 Z M108 98 Q120 88 132 98 Q120 104 108 98 Z';
      return '<path d="M54 80 Q56 46 100 44 Q144 46 146 80 Q150 130 128 152 Q100 168 72 152 Q50 130 54 80 Z" fill="#e9b94e" '+S()+'/><path d="M100 46 L100 150" stroke="#c99a3e" stroke-width="3"/><path d="M60 82 Q80 74 92 86 M140 82 Q120 74 108 86" fill="none" stroke="#a87b1c" stroke-width="4"/><path d="'+eyeH+'" fill="#000"/><circle cx="80" cy="97" r="2.4" fill="#ffd34a"/><circle cx="120" cy="97" r="2.4" fill="#ffd34a"/><path d="'+(ex==='happy' ? 'M88 132 Q100 140 112 132' : ex==='cora' ? 'M92 132 Q100 142 108 132' : 'M88 134 L112 134')+'" fill="none" stroke="#5a3a08" stroke-width="4" stroke-linecap="round"/><path d="M66 70 Q76 60 90 62" fill="none" stroke="#fff3bf" stroke-width="3" opacity=".7"/>'; } },
  { id:'rosine', name:'Maman Rosine', c:'#b5562b', c2:'#8a3d1c', c3:'#2a0f05', isNew:1,
    role:'La patronne du maquis', say:'« Chez moi, on paie ses dettes avant de rejouer. »',
    who:'C’est chez elle qu’on joue. Elle sert à boire, elle connaît tout le monde, elle ne fait de cadeau à personne.',
    style:'<b>La gardienne.</b> Elle joue ses couleurs longues pour vider ton jeu, puis te fait payer chaque erreur. Sobre, régulière, jamais un coup de folie.',
    move:'Elle a quatre Tchaka : elle commande Tchaka encore et encore jusqu’à ce que tu n’aies plus rien pour répondre.',
    carre:'Élimine celui qui doit le plus de jetons au maquis (celui qui a le moins).',
    ...sk('d2'), cloth:'#e8a33c', clothD:'#c9862a', rx:53, ry:55, blush:'#b04a3a',
    hat:'<path d="M46 86 Q40 40 100 30 Q160 40 154 86 Q130 70 100 70 Q70 70 46 86 Z" fill="#b5562b" '+S()+'/><path d="M74 36 Q90 8 112 24 Q132 4 138 40 Q118 30 100 44 Q86 30 74 36 Z" fill="#d06a35" '+S('',4.5)+'/><path d="M56 70 Q100 52 144 70" fill="none" stroke="#ffd34a" stroke-width="3" stroke-dasharray="5 4"/>',
    earring:'<circle cx="49" cy="122" r="6" fill="#ffd34a" '+S('',2.5)+'/><circle cx="151" cy="122" r="6" fill="#ffd34a" '+S('',2.5)+'/>',
    collar:'<path d="M74 160 Q100 178 126 160" fill="none" stroke="#b5562b" stroke-width="5"/><g fill="#b5562b"><circle cx="54" cy="184" r="5"/><circle cx="146" cy="182" r="5"/></g>' },
  { id:'ngobassa', name:'Commissaire Ngo Bassa', c:'#2b4a9e', c2:'#1d3373', c3:'#060f26', isNew:1,
    role:'La réglementaire', say:'« Victoire automatique. Je l’annonce. C’est le règlement. »',
    who:'Commissaire du quartier, elle joue au maquis le soir. Elle connaît les règles par cœur et ne laisse rien passer.',
    style:'<b>Le règlement.</b> Elle utilise chaque règle au moment exact : la Passe, la victoire automatique, la claque au Carré. Jamais un bluff, jamais une erreur de règle.',
    move:'Elle a la main qui gagne d’office : elle l’annonce à la première seconde, sans même jouer.',
    carre:'Élimine selon l’ordre du classement de la partie, pas selon ses humeurs.',
    ...sk('d1'), cloth:'#2b4a9e', clothD:'#1d3373', lashes:true, mouthN:'flat', rx:47, ry:53,
    hair:'<path d="M50 104 Q48 70 64 64 L136 64 Q152 70 150 104 Q146 84 136 80 L64 80 Q54 84 50 104 Z" fill="#1c120d" '+S('',4)+'/>',
    hat:'<path d="M54 70 Q52 34 100 32 Q148 34 146 70 Z" fill="#2b4a9e" '+S()+'/><path d="M48 70 L152 70 Q150 82 100 82 Q50 82 48 70 Z" fill="#111" '+S('',4.5)+'/><circle cx="100" cy="50" r="9" fill="#ffd34a" '+S('',3)+'/><path d="M56 62 L144 62" stroke="#ffd34a" stroke-width="3"/>',
    earring:'<circle cx="52" cy="120" r="3.5" fill="#ffd34a"/><circle cx="148" cy="120" r="3.5" fill="#ffd34a"/>',
    collar:'<path d="M80 160 L100 176 L120 160" fill="#cfd8ea" '+S('',3.5)+'/><rect x="50" y="176" width="16" height="6" fill="#ffd34a" '+S('',2)+'/><rect x="134" y="176" width="16" height="6" fill="#ffd34a" '+S('',2)+'/>' }
];
const BY = {}; C.forEach(P=> BY[P.id] = P);
// the game's historical ids -> the face that now belongs to them
const ART = {gervais:'alida', aristide:'rall', penalty:'penalty', mbarga:'masque', mami:'rosine', caroline:'pampam', cobra:'push',
  ismael:'daryck', tchinda:'kamga', mballa:'ngobassa', stephane:'nassim', eva:'eva', tiko:'tiko', banquier:'banquier', systeme:'systeme', dila:'dila'};
const artOf = id=> ART[id] || (BY[id] ? id : null);
// the face on its own colour (the character's signature light)
const wrap = (a, ex)=> '<span class="ffp-f" style="background:radial-gradient(90% 80% at 50% 28%, '+BY[a].c2+', '+BY[a].c3+')">'+face(BY[a], ex)+'</span>';
window.FFP = {
  C, BY, ART, artOf,
  face: (id, ex)=>{ const P = BY[artOf(id) || id]; return P ? face(P, ex || 'neutral') : ''; },
  info: id=> BY[artOf(id) || id] || null,
  // a portrait in an element: the face, and its expression changes for a moment (then back to neutral)
  put(el, id, ex){ if(!el) return false; const a = artOf(id); if(!a) return false; el.dataset.ffp = a; el.innerHTML = wrap(a, ex || 'neutral'); return true; },
  react(el, ex, ms){ if(!el || !el.dataset.ffp) return; const a = el.dataset.ffp; el.innerHTML = wrap(a, ex); clearTimeout(el._ffpT); if(ms) el._ffpT = setTimeout(()=>{ el.innerHTML = wrap(a, 'neutral'); }, ms); }
};
})();