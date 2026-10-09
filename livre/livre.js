/* « Pourquoi je suis mort ? » — Penalty. The book of the story mode, loaded only when the story is opened.
 *
 * One line = one screen beat. A line can start with marks, separated by spaces:
 *   !  a blow (huge letters that slam)      *  a reveal (a name, a verdict)      ~  a memory (out of the blur)
 *   >  typed (letter by letter)             +  stacks under the line before       @id  who speaks (portrait + name)
 *   ?key=value  only shown when that choice was made
 * and end with tags: {fx:shot} {c:red} {pic:stephane} {mood:tension}
 * Lines in brackets are events: [img lieu-x] a full-screen shot · [game id] a game of Fap Fap · [phone] Penalty's phone
 *   [choice key|answer 1|answer 2|…] a choice · [mood x] change the music
 * Everything else is plain narration.
 */
window.FF_BOOK = {
title: 'POURQUOI JE SUIS MORT ?',
author: 'PENALTY',
cast: {
  penalty:['Penalty','perso-penalty'], stephane:['Stéphane','perso-stephane'], christelle:['Christelle','perso-christelle'],
  caroline:['Caroline','perso-caroline'], rall:['RALL','perso-rall'], cobra:['Boris le Cobra','perso-cobra'],
  tchinda:['Papa Tchinda','perso-tchinda'], ismael:['Ismaël','perso-ismael'], mballa:['Adjudant Mballa','perso-mballa'],
  mami:['Mami Ange','perso-mami-ange'], masque:['Le Ngonzormorrr','perso-masque'], kappo:['Le Ngonzormorrr','perso-kappo'],
  tante:['Une tante',''], senateur:['Sénateur',''], militaire:['Le militaire',''], videur:['Le videur','']
},
// the games: who sits in front of Stéphane, how they play, what is at stake
games: {
  veillee:   {name:'RALL', opp:'aristide', art:'perso-rall', target:3, place:'À la table de la veillée, sous la bâche du fond.', intro:'« Ton frère me battait tous les samedis. On va voir si c’est dans le sang. »'},
  cobra:     {name:'Boris le Cobra', art:'perso-cobra', brain:'heuristic', target:3, fog:'joint', place:'Derrière la boutique, sur une caisse de bière retournée.', intro:'« Les gens parlent mieux après avoir perdu. »',
              lines:{control:['Tranquille, petit.','Le Cobra ne cligne pas.','Tu vois ? Même pas transpiré.'], win:['Ton frère aussi perdait, au début.','Rentre, petit. Il est tard.'], lose:['Wèèè… tu joues comme lui.','D’accord, d’accord. Je parle.'], cora:['Le 3. Toujours le 3.'], surprise:['Tchip… pas mal.'], behind:['Calme. La nuit est longue.']}},
  tchinda:   {name:'Papa Tchinda', art:'perso-tchinda', brain:'heuristic', target:3, place:'Devant le portail des Palmiers, sous la petite lampe.', intro:'« Je ne parle pas aux inconnus. Mais je joue avec eux. »',
              lines:{control:['Doucement, mon fils.','Les vieux ne se pressent jamais.','J’ai vu passer beaucoup de choses, ici.'], win:['La nuit, on a le temps de jouer.','Reviens demain, je serai là.'], lose:['Hm. Tu as la main de ton frère.','Bon. Assieds-toi, je vais te dire.'], cora:['Même un vieux garde son 3.'], surprise:['Seigneur… tu joues comme lui.'], behind:['Patience. La nuit est à moi.']}},
  kiosque:   {carre:[['Mami Ange','perso-mami-ange'], ['Sénateur',''], ['Le militaire','']], place:'Au kiosque de Mami Ange, en face du Prestige.', intro:'Trois joueurs, une seule place pour toi. Chaque joueur éliminé lâche une rumeur.'},
  ismael:    {name:'Ismaël', art:'perso-ismael', brain:'easy', target:3, place:'Sur le capot de la Yaris, sous les néons de la station.', intro:'« Si je gagne, tu descends et tu m’oublies. »',
              lines:{control:['Laisse-moi tranquille…','Je joue, je joue !','Pardon, pardon.'], win:['Voilà ! Maintenant oublie-moi.','Je t’ai battu, descends.'], lose:['Jésus… d’accord, je parle.','Je n’ai rien fait, je te jure.'], cora:['Un 3 ! Dieu est grand.'], surprise:['Tu es vraiment son frère…'], behind:['Je n’arrive pas à me concentrer…']}},
  mballa:    {name:'Adjudant Mballa', art:'perso-mballa', brain:'heuristic', target:3, rule:'nopasse', place:'Au bar d’en face du commissariat.', intro:'Il ne passe jamais. Il obéit aux règles comme aux ordres.',
              lines:{control:['Au pas.','C’est moi qui commande, ici.','Droit devant.'], win:['Circulez.','Rentre chez toi, petit.'], lose:['…Bon. Écoute-moi bien.','Je n’ai jamais vu ton visage.'], cora:['Un 3, réglementaire.'], surprise:['Hm. Tu as de la discipline.'], behind:['On ne recule jamais.']}},
  christelle:{name:'Christelle', art:'perso-christelle', brain:'heuristic', target:3, place:'Sur le lit, comme on jouait tous les trois le dimanche.', intro:'Elle joue avec le cœur : imprévisible, parfois brillante, parfois perdue.',
              lines:{control:['Comme avant…','Il jouait cette carte-là aussi.','Ne me regarde pas comme ça.'], win:['Tu vois ? Je sais jouer, moi aussi.','Laisse-moi finir ma valise.'], lose:['…Il faut que je te dise quelque chose.','D’accord. Je vais tout te raconter.'], cora:['Un 3… pour lui.'], surprise:['Tu as ses mains.'], behind:['Je n’ai plus la tête à ça.']}},
  caroline:  {name:'Caroline', art:'perso-caroline', brain:'pimc', ms:450, samples:120, target:3, place:'Dans un salon de thé de Bastos, avec un jeu de cartes encore sous plastique.', intro:'Elle te laisse gagner les premiers plis. Elle garde toujours son 3 pour la fin.',
              lines:{control:['Doucement, mon cœur.','Tu lui ressembles tellement.','Tu crois que tu mènes ?'], win:['Ton frère jouait mieux.','On joue encore ? J’adore te regarder perdre.'], lose:['Tu es plus malin que lui.','Bien joué. Vraiment.'], cora:['Je garde toujours mon 3 pour la fin.'], surprise:['Intéressant…'], behind:['Je te laisse croire.']}},
  masque:    {opp:'mbarga', target:5, peek:'chaise', place:'Derrière le rideau rouge du Prestige, sous la lampe basse.', intro:'Le plus fort de tous. Personne ne l’a jamais battu.'}
},
chapters: [

{n:1, t:'Le bruit après le silence', who:'Penalty', text:`
[mood tension]
Les gyrophares tournaient. {fx:siren}
! Rouge. {c:red}{fx:red}
! Bleu. {c:blue}{fx:blue}
! Rouge. {c:red}{fx:red}
! Bleu. {c:blue}{fx:blue}
~ Puis… {fx:hush}
! Toh. {fx:shot}
! Toh. {fx:shot}
! Toh. {fx:shot}
[title]
[mood none]
La première chose que j’ai entendue, c’était le silence.
Pas celui d’une maison vide.
+ Pas celui d’une nuit calme.
~ Un silence lourd.
Le genre de silence qui arrive après un bruit trop violent pour que ton cerveau accepte immédiatement ce qui vient de se passer.
[img lieu-yaounde]
[mood night]
Je regardais les lumières de la ville danser au loin.
* Yaoundé continuait de vivre.
Les voitures passaient. {fx:city}
+ Les gens riaient dans les bars.
Quelqu’un devait sûrement être en train de commander un verre quelque part, sans savoir qu’à quelques kilomètres de là, une vie venait de s’arrêter.
~ La mienne. {fx:heart}
Je me suis souvent demandé :
+ > Pourquoi moi ?
+ > Pourquoi cette nuit-là ?
+ > Pourquoi Bastos ?
+ > Pourquoi cette femme ?
Mais avec le temps, j’ai compris que la vraie question n’était pas :
* “Qui m’a tué ?”
La vraie question était :
* “Pourquoi je suis mort ?” {fx:heart}
Parce que ma mort n’a pas commencé quand il a sorti son arme.
+ Elle a commencé bien avant.
Elle a commencé le jour où j’ai cru qu’une mauvaise idée pouvait rester sans conséquence.
`},

{n:2, t:'La veillée', who:'Stéphane', text:`
[mood wake]
Chez nous, on ne laisse jamais un mort seul la première nuit.
On chante.
+ On boit.
+ On pleure un peu.
* Et on joue aux cartes. {fx:shuffle}
[img lieu-veillee]
Ce n’est pas un manque de respect.
+ C’est une façon de dire au mort qu’il est encore assis avec nous.
Ma veillée avait lieu chez ma mère, à Mvog-Ada.
Des bâches tendues dans la cour.
+ Des chaises en plastique louées au voisin.
+ Des ampoules accrochées à un fil qui clignotaient à chaque coupure.
Des tantes que je n’avais pas vues depuis des années pleuraient plus fort que tout le monde.
C’est souvent comme ça.
~ Ceux qui t’ont le moins appelé de ton vivant sont ceux qui crient le plus fort à ta mort.
Vers minuit, mon petit frère est arrivé. {mood:tension}
* Stéphane. {pic:stephane}
Il avait dix-neuf ans. Il me ressemblait.
! Trop. {fx:thud}
Le même front. Les mêmes épaules.
+ La même façon de pencher la tête quand il écoute quelqu’un qu’il ne croit pas.
Quand il est entré dans la cour, une tante a lâché son verre. {fx:glass}
Quelqu’un a crié mon nom.
@tante ! — Penalty ?! {fx:shock}
Pendant deux secondes, toute la veillée s’est arrêtée. {mood:none}
+ Les gens regardaient mon petit frère comme on regarde un revenant.
Puis ils ont compris.
~ Le mort, c’était moi.
Lui, c’était juste mon petit frère, qui avait eu la mauvaise idée de me ressembler. {mood:wake}
Stéphane n’a pas pleuré.
Mon petit frère ne pleure pas devant les gens.
+ Il range ses larmes quelque part, et il ne les sort que quand il a un plan.
Sous la bâche du fond, il y avait la table des cartes. {fx:shuffle}
* RALL. {pic:rall}
Mon gars du quartier. Celui avec qui je partageais tout.
+ Les taffes, les blagues, les secrets.
Il battait les cartes avec ses mains qui tremblaient un peu.
Il a levé les yeux vers Stéphane.
@rall — Assieds-toi, petit. Ton frère me battait tous les samedis. On va voir si c’est dans le sang.
Stéphane s’est assis.
+ Sans un mot.
[game veillee]
Mon petit frère joue comme moi.
+ Mais en plus froid.
Moi, je jouais pour gagner.
+ Lui, il joue pour comprendre.
Au dernier pli, il a posé un 3. {fx:card}
! CORA. {fx:cora}
Les gars autour de la table ont sifflé. Quelqu’un a dit que c’était moi qui guidais sa main.
~ Peut-être.
RALL a ri. Un rire trop court.
@rall — Toi, c’est le diable.
Puis il a baissé la voix. {mood:tension}
@rall — Ton frère avait une femme. Pas Christelle. Une autre. Une femme qui sent l’argent.
Stéphane n’a rien répondu.
+ Il a juste rangé les cartes.
Vers trois heures du matin, Christelle est venue s’asseoir à côté de lui. {mood:wake}{pic:christelle}
Les yeux rouges. Le pagne de deuil mal attaché.
Elle lui a tendu mon téléphone.
@christelle — Il aurait voulu que tu l’aies.
~ Elle ne lui a pas tout donné.
Je le savais.
+ Parce que c’est moi qui lui avais confié ce qu’elle gardait.
Le téléphone avait encore sa coque fissurée. Le code, c’était la date de naissance de notre mère.
+ Stéphane l’a ouvert du premier coup.
[phone]
Des notes. Des vocaux. Des messages que je n’avais jamais effacés.
~ Cette nuit-là, pendant que tout le monde chantait pour moi, mon petit frère a commencé à chercher pour moi. {mood:night}
`},

{n:3, t:'Une idée noire', who:'Penalty', text:`
[mood night]
* Je l’appelais mon idée noire.
Pas parce qu’elle était laide.
+ Au contraire.
Elle était le genre de femme qui faisait tourner les regards quand elle entrait quelque part.
+ Toujours bien habillée.
+ Toujours parfumée.
+ Toujours avec cette confiance de quelqu’un qui savait exactement l’effet qu’elle produisait.
Mais derrière son sourire, il y avait quelque chose.
+ Une chose dangereuse.
+ Une chose que je n’ai pas voulu voir.
! Elle était mariée. {fx:thud}
Et son mari était un homme puissant.
Un homme qui avait réussi. Un homme avec de l’argent, des voitures propres, des costumes bien taillés et des contacts partout.
* Moi, j’avais 23 ans. {pic:penalty}
J’avais mes rêves, mes problèmes et cette arrogance qu’ont beaucoup de jeunes hommes quand ils pensent que rien ne peut leur arriver.
Elle avait l’expérience.
+ J’avais l’insouciance.
Elle savait jouer.
+ Moi, je pensais juste m’amuser.
~ La première fois qu’elle m’a regardé comme ça, j’ai compris que j’étais déjà en train de perdre. {fx:heart}
`},

{n:4, t:'Deux ou trois taffes', who:'Penalty', text:`
[mood night]
Il y avait des soirs où je savais que je devais réfléchir.
+ Alors je faisais exactement l’inverse.
Je sortais un peu de quoi oublier.
* Deux ou trois taffes.
Pas pour faire le malin.
+ Pas pour raconter une histoire aux autres.
+ Juste pour faire taire le bruit dans ma tête.
~ Pendant quelques minutes, tout semblait plus simple.
Les problèmes disparaissaient.
+ Les questions aussi.
Mais elles revenaient toujours.
! Plus fortes.
Je regardais la fumée monter dans l’air et je pensais à ma vie.
+ À mes choix.
+ À cette femme.
+ À cet argent qui arrivait facilement.
! Trop facilement.
~ Parce que les choses qui arrivent trop facilement cachent souvent une facture qu’on ne voit pas encore.
`},

{n:5, t:'Le coin des gars', who:'Stéphane', text:`
[mood night]
Derrière la boutique de Mama Nicole, il y a un coin que tout le quartier connaît et que personne n’avoue connaître.
Trois bancs.
+ Un manguier.
+ Une radio qui ne capte qu’une seule chaîne.
[img lieu-coin]
C’est là que je fumais.
+ C’est là que Stéphane est allé chercher la suite.
Boris était assis sur le banc du milieu. On l’appelait le Cobra. {pic:cobra}
Pas parce qu’il était dangereux. Parce qu’il ne clignait presque jamais des yeux.
Quand il a vu Stéphane arriver, il a reculé si vite qu’il a renversé sa bière. {fx:glass}
@cobra — Wèèè… Ne me fais pas ça, petit. J’ai cru que c’était lui.
Il a rallumé son joint pour se calmer.
+ Il l’a tendu à Stéphane.
[choice joint|Refuser le joint|Tirer une taffe]
?joint=0 Stéphane a regardé le joint comme on regarde un serpent.
?joint=0 @stephane — Non.
?joint=0 @cobra — Ton frère disait non aussi. Au début.
?joint=1 Stéphane a tiré une fois. Une seule.
?joint=1 La fumée est montée. Ses yeux sont devenus lourds.
?joint=1 @cobra — Ah… Là, tu ressembles vraiment à ton frère.
?joint=1 ~ Ses cartes, ensuite, flottaient un peu.
Ils ont joué sur une caisse de bière retournée.
[game cobra]
Après la partie, le Cobra a parlé.
~ Les gens parlent toujours mieux après avoir perdu. Ils ont besoin de gagner quelque chose.
@cobra — Ton frère a changé, ces derniers mois. Des chaussures neuves. Un téléphone neuf. Il payait les tournées.
Il a tiré sur son joint.
@cobra — Dans le quartier, quand un gars mange bien sans travailler plus, les gens ne demandent pas comment.
@cobra + — Ils demandent qui.
@stephane — Qui ?
Le Cobra a regardé autour de lui. Même la radio semblait écouter. {mood:tension}
@cobra — Elle s’appelle Caroline. Son mari… on l’appelle le Ngonzormorrr.
! Ngonzormorrr. {fx:thud}
Le silence est tombé sur le banc.
@cobra — Personne ne sait vraiment qui il est. On dit qu’il joue aux cartes avec un masque d’or.
@cobra + — Que personne ne l’a jamais battu.
@cobra + — Que même ceux qui le battent finissent par perdre.
Stéphane n’a pas bougé.
@stephane — Autre chose ?
Le Cobra a hésité. Longtemps.
@cobra — Un soir, des gars sont venus poser des questions sur ton frère. Ils payaient bien.
@stephane — Tu as parlé ?
@cobra — J’ai dit ce que tout le monde savait.
~ Dans ce pays, ce que tout le monde sait finit toujours chez celui qui paie.
Avant de partir, Stéphane a demandé où j’allais quand je disparaissais des nuits entières.
Le Cobra a écrit une adresse sur un paquet de cigarettes vide.
> Résidence Les Palmiers. Bastos.
`},

{n:6, t:'La femme d’un autre', who:'Penalty', text:`
[mood night]
[img lieu-meuble]
Elle connaissait les endroits où personne ne posait de questions.
Les appartements meublés.
+ Les rendez-vous discrets.
+ Les heures où son mari était absent.
* “Il est en mission à Douala.”
Cette phrase était devenue notre couverture.
+ Comme une chanson qu’on répétait pour croire qu’elle était vraie.
Elle avait pris l’habitude de m’appeler quand elle voulait me voir.
Moi, j’aimais quand elle me disait de rester.
+ J’aimais son sourire.
+ J’aimais l’attention.
+ J’aimais aussi les liasses qu’elle me glissait parfois entre les mains.
~ C’était peut-être ça le pire.
Je pouvais me raconter toutes les histoires que je voulais.
+ Mais au fond, je savais que l’argent faisait partie du piège.
Je n’étais pas seulement amoureux d’elle.
* J’étais amoureux de la vie qu’elle me faisait croire possible.
`},

{n:7, t:'Les liasses', who:'Penalty', text:`
[mood night]
Un soir, elle m’a dit de m’habiller bien.
Pas bien comme pour le quartier.
+ Bien comme pour les gens qui n’ont jamais pris un taxi de leur vie.
Elle m’a emmené dans une villa à Santa Barbara. Un portail noir. Un gardien qui ne regardait pas les visages, seulement les voitures.
[img lieu-villa]
Dans le salon, des hommes en costume jouaient au Fap Fap. {fx:shuffle}
Pas avec des pièces de cent francs.
! Avec des liasses.
Des liasses de dix mille, attachées avec des élastiques, posées sur la table comme on pose du pain.
J’avais déjà joué pour de l’argent.
+ Jamais pour autant d’argent.
Caroline s’est penchée à mon oreille. {pic:caroline}
@caroline * — Gagne.
Juste ça.
+ Gagne.
Et j’ai gagné. {fx:card}
+ Une fois.
+ Deux fois.
+ Trois fois.
Les hommes riaient. Ils me tapaient sur l’épaule. Ils disaient que j’avais la main.
À la fin de la nuit, j’avais six cent mille francs dans les poches. {fx:coins}
! Six cent mille.
Ma mère ne gagnait pas ça en quatre mois.
Je me sentais grand.
+ Je me sentais vu.
Mais dans un coin du salon, il y avait un homme qui ne jouait pas. {mood:tension}
+ Il ne buvait pas.
+ Il ne parlait pas.
+ Il regardait.
Je me suis dit qu’il s’ennuyait.
~ Aujourd’hui, je sais qu’il travaillait.
Le lendemain, j’ai acheté des chaussures que je ne pouvais pas m’offrir. J’ai payé une tournée à tout le quartier.
C’est ce soir-là que je suis devenu célèbre.
+ Et dans mon monde, la célébrité, c’est juste une autre façon d’être repéré.
~ L’argent qu’on gagne trop vite a toujours un propriétaire qui attend quelque part.
* Moi, je pensais que c’était le mien.
`},

{n:8, t:'Le gardien', who:'Stéphane', text:`
[mood night]
La Résidence Les Palmiers ne ressemble à rien.
+ C’est exprès.
~ Les endroits où l’on cache des choses ne doivent jamais attirer les regards.
[img lieu-palmiers]
Papa Tchinda, le gardien de nuit, écoutait la radio sur une chaise en plastique, devant le portail.
+ Une petite table.
+ Une lampe.
+ Un jeu de cartes usé.
Quand il a vu Stéphane sortir de l’ombre, sa radio est tombée. {fx:thud}{pic:tchinda}
Il s’est levé d’un coup et il a fait un grand signe de croix.
@tchinda — Seigneur… Mon fils… Tu es revenu ?
@stephane — Je suis son frère.
Le vieux est resté longtemps à le regarder. Comme on regarde une photo qu’on croyait perdue.
Puis il s’est rassis.
@tchinda — Je ne parle pas aux inconnus.
Il a ramassé ses cartes. {fx:shuffle}
@tchinda — Mais je joue avec eux.
[game tchinda]
Papa Tchinda joue comme les vieux. Il ne se presse jamais.
+ Il garde ses grosses cartes jusqu’au moment où tu as oublié qu’il les avait.
Quand il a perdu, il a souri. Le sourire de quelqu’un qui voulait perdre depuis le début.
@tchinda — Ton frère était gentil. Il me donnait toujours mille francs.
Il a baissé la voix.
@tchinda — La dame aussi donnait. Plus. Beaucoup plus. Pour que j’oublie les visages.
@stephane — Et cette nuit-là ?
Le vieux a regardé le balcon du deuxième étage. {mood:tension}
@tchinda — Ton frère est sorti vers vingt-deux heures quarante. Il avait l’air pressé. Il regardait son téléphone.
@stephane — Et elle ?
@tchinda — Dix minutes après, la dame est sortie sur le balcon. Elle a téléphoné.
@stephane — Elle pleurait ?
@tchinda — Non.
@stephane + — Elle riait ?
@tchinda + — Non plus.
@tchinda * — Elle parlait comme on commande un taxi.
Stéphane a demandé pour le mari.
> “En mission à Douala.”
Papa Tchinda a ri tout bas. Un rire triste.
@tchinda — Douala ? Mon fils… Cette nuit-là, le grand 4x4 noir était garé au bout de la rue.
@tchinda + — Depuis vingt heures. Moteur éteint. Vitres fermées.
* Douala n’avait jamais été aussi proche. {fx:heart}
Je l’avais eue tous les soirs sous les yeux, au bout de la rue.
~ Et je n’avais jamais regardé.
`},

{n:9, t:'L’homme de Douala', who:'Penalty', text:`
[mood night]
Il y a des mensonges qui sont dangereux parce qu’ils sont gros.
+ Et il y en a d’autres qui sont dangereux parce qu’on les répète tellement qu’on finit par les croire.
* “Il est en mission à Douala.”
Voilà ma phrase préférée.
+ Ma chanson.
+ Mon excuse.
Quand elle me disait ça, je respirais mieux.
Comme si Douala était devenue un endroit magique où les maris disparaissaient et où les problèmes prenaient des vacances.
~ La naïveté est un drôle de médicament.
* Ça calme la douleur avant de tuer le patient.
Son mari, lui, n’était pas un homme qu’on pouvait simplement effacer. {mood:tension}
Les gens comme lui ne disparaissent pas vraiment.
+ Ils observent.
+ Ils attendent.
+ Ils ont des moyens.
Moi, je pensais qu’un homme riche était juste un homme avec plus d’argent.
Je n’avais pas encore compris qu’à partir d’un certain niveau, l’argent ne sert plus seulement à acheter des choses.
Il sert à ouvrir des portes.
+ À fermer des bouches.
+ À faire arriver des vérités plus vite que les mensonges.
`},

{n:10, t:'Le roi sans couronne', who:'Penalty', text:`
[mood night]
Je ne connaissais pas vraiment son mari.
+ Je connaissais seulement ce qu’on disait de lui.
Dans les quartiers, les gens parlent beaucoup.
~ C’est presque un sport national.
Un gars achète une nouvelle voiture, tout le monde connaît déjà son salaire, son passé et même les problèmes qu’il cache.
Les gens peuvent ne pas avoir de connexion internet, mais ils ont toujours une connexion avec les affaires des autres.
Son mari était respecté.
+ Certains avaient peur de lui.
+ D’autres faisaient semblant de l’aimer.
C’est souvent comme ça avec le pouvoir.
Les gens ne sourient pas toujours parce qu’ils sont heureux de te voir.
+ Parfois ils sourient parce qu’ils savent que tu peux leur créer des problèmes.
Moi, j’étais juste un jeune homme qui pensait avoir trouvé une porte d’entrée dans un monde qui n’était pas le mien.
* Je n’avais pas compris que certaines portes s’ouvrent seulement pour mieux se refermer derrière toi. {fx:thud}
`},

{n:11, t:'Le masque d’or', who:'Stéphane', text:`
[mood tension]
Tout le monde à Bastos connaît le Prestige.
! Personne n’y entre.
[img lieu-prestige]
C’est un cabaret avec des néons bleus, des voitures garées en double file et un videur qui pèse le poids d’un frigo.
Au fond, derrière un rideau rouge, il y a une salle.
* C’est là que le Ngonzormorrr joue.
Stéphane n’a pas essayé d’entrer.
Il s’est assis en face, au kiosque de Mami Ange, là où les chauffeurs, les vendeuses et les retraités refont le monde toute la nuit. {mood:night}
[img lieu-kiosque]
~ Le kongossa a ses propres institutions. Le kiosque de Mami Ange est une des plus anciennes.
Trois personnes jouaient au Carré.
+ Mami Ange elle-même. {pic:mami}
+ Un moto-taximan qu’on appelait Sénateur.
+ Et un vieux militaire à la retraite qui gardait son béret même pour dormir.
@mami — Il manque un quatrième.
Stéphane s’est assis.
[game kiosque]
Sénateur est tombé le premier. Il a parlé le premier.
@senateur — Il porte un masque d’or à sa table. Pour que personne ne lise son visage.
@senateur + — Il dit que le visage, c’est la seule carte qu’on ne peut pas cacher.
Mami Ange est tombée ensuite.
@mami — Il a une femme très belle. Caroline.
@mami * — Elle sourit trop pour une femme heureuse.
Le vieux militaire a tenu jusqu’au bout. Quand il a perdu, il a enlevé son béret pour la première fois de la soirée.
@militaire — On dit qu’il voit les cartes des autres. {mood:tension}
@stephane — Comment ?
@militaire — Personne ne sait. Ceux qui ont cherché à savoir ne jouent plus.
Il a remis son béret.
@militaire — Petit, laisse tomber. Ton frère aussi posait des questions.
! Non.
Moi, je ne posais pas de questions.
* C’était ça, mon problème.
À ce moment-là, un 4x4 noir est passé lentement devant le kiosque. {fx:car}
+ Les vitres fermées.
+ Il n’a pas accéléré.
+ Il n’a pas ralenti.
~ Il a juste regardé.
`},

{n:12, t:'La nuit de Bastos', who:'Penalty', text:`
[mood night]
[img lieu-bastos]
Bastos brillait comme toujours. {fx:city}
Les restaurants étaient pleins.
+ Les voitures passaient.
+ Les gens riaient.
~ La ville avait ce talent particulier : continuer sa fête pendant que certains vivent leur catastrophe en silence.
J’étais sorti du meublé avec cette sensation étrange.
Le genre de sensation qu’on ignore parce qu’on préfère croire qu’on imagine.
Mon téléphone dans la main.
+ Quelques messages.
+ Quelques pensées.
+ Et cette impression que quelque chose avait changé. {mood:tension}
Mais l’homme aime beaucoup ignorer les signes.
+ On peut voir un mur devant soi et accélérer quand même.
~ C’est presque un talent.
> J’ai commandé mon Yango.
Je pensais rentrer.
+ Simplement rentrer.
* Mais parfois, une course de quelques minutes peut devenir le trajet le plus long d’une vie. {fx:heart}
`},

{n:13, t:'La carte d’identité', who:'Penalty', text:`
[mood tension]
[img lieu-barrage]
Quand la police est arrivée, mon premier réflexe a été de chercher une explication. {fx:siren}
C’est fou comme on croit toujours qu’une explication va sauver une situation.
+ Comme si les mots avaient toujours du pouvoir.
Je suis quelqu’un.
+ J’ai une identité.
+ J’ai une histoire.
+ J’ai une version des faits.
* Je sors ma carte.
Monsieur l’agent veut même pas regarder.
À ce moment-là, j’ai compris quelque chose.
Parfois, le problème n’est pas que personne ne connaît la vérité.
* Le problème, c’est que personne ne veut l’entendre.
Dans le Yango police, personne ne veut m’écouter.
Les gyrophares tournaient.
! Rouge. {c:red}{fx:red}
! Bleu. {c:blue}{fx:blue}
! Rouge. {c:red}{fx:red}
! Bleu. {c:blue}{fx:blue}
~ Comme les battements d’un cœur qui commence à comprendre qu’il est dans une mauvaise histoire. {fx:heart}
`},

{n:14, t:'Le Yango', who:'Stéphane', text:`
[mood night]
Dans mon téléphone, il y avait encore la dernière course.
> Vingt-deux heures quarante-trois. Résidence Les Palmiers.
+ > Toyota Yaris grise. Chauffeur : Ismaël.
Stéphane a commandé une course au même endroit, à la même heure.
+ Une semaine plus tard, presque jour pour jour.
* Et c’est Ismaël qui est venu.
~ Le destin a parfois le sens de l’humour.
Stéphane est monté à l’arrière, exactement où j’étais assis.
Ismaël a regardé dans son rétroviseur. {pic:ismael}
! Il a freiné. {fx:brake}
Si fort qu’une moto a failli entrer dans son coffre.
@ismael — Jésus ! Jésus Marie Joseph !
@stephane — Je ne suis pas lui.
@ismael — Je n’ai rien fait ! Je te jure devant Dieu, je n’ai rien fait !
Ils ont fini garés devant une station-service, moteur coupé.
Ismaël ne voulait pas parler. Il voulait que la nuit se termine.
@ismael — Je joue avec toi. Si je gagne, tu descends et tu m’oublies.
[game ismael]
Ismaël joue comme il conduit quand il a peur.
+ Vite.
+ Trop vite.
+ Il a perdu sans comprendre comment.
Alors il a parlé. Les mains sur le volant, comme s’il conduisait encore. {mood:tension}
@ismael * — La police n’est pas arrivée.
@stephane — Comment ça ?
@ismael — Elle attendait. Au deuxième carrefour.
@ismael + — Ils savaient la couleur de ma voiture. Mon numéro.
@ismael + — Ils ont levé la main avant même que j’arrive à leur hauteur.
Il a avalé sa salive.
@ismael — Ils l’ont fait descendre. Ils l’ont mis dans une autre voiture. Une voiture de police, mais pas avec des policiers comme les autres.
@stephane — Et toi ?
@ismael — Un agent m’a donné vingt mille francs. Il m’a dit d’oublier la route.
Il a regardé Stéphane dans le rétroviseur. Puis il a détourné les yeux.
@ismael ~ — J’ai oublié. Jusqu’à ce soir.
Moi aussi, j’avais vu ces gyrophares.
+ Mais je croyais qu’ils arrivaient.
! Ils m’attendaient. {fx:thud}
`},

{n:15, t:'L’adjudant', who:'Stéphane', text:`
[mood night]
L’agent qui avait donné les vingt mille francs s’appelait Mballa.
* Adjudant Mballa. {pic:mballa}
Stéphane l’a trouvé dans un bar près du commissariat, à l’heure où les policiers deviennent des clients comme les autres.
[img lieu-bar-police]
Quand Mballa a vu mon visage s’asseoir en face de lui, sa main est allée toute seule vers sa ceinture.
+ Puis il s’est rappelé où il était.
@mballa — Tu es qui, toi ?
@stephane — Le frère.
Mballa a commandé une autre bière. Il en avait besoin.
@mballa — Je ne sais rien.
Stéphane a posé un jeu de cartes sur la table. {fx:card}
@stephane * — Alors joue.
[game mballa]
Mballa joue comme un policier. Droit devant.
+ Il ne passe jamais.
+ Il ne recule jamais.
~ C’est comme ça qu’on perd au Fap Fap.
Quand le dernier pli est tombé, il a vidé sa bière d’un coup.
@mballa — On nous a payés. Une enveloppe. Plus que mon salaire de trois mois. {mood:tension}
@stephane — Qui ?
@mballa — Je ne connais pas le nom. Ces gens-là n’ont pas de nom.
Il a regardé la porte du bar.
@mballa — Mais l’appel. L’heure. La couleur de la voiture.
@mballa + — Ce n’était pas le mari.
@stephane — C’était qui ?
@mballa ! — Une femme.
Il a baissé les yeux.
@mballa — Une voix calme. Très calme. Elle a donné l’heure à la minute près.
En partant, il a glissé un papier plié sous le jeu de cartes.
+ > Le relevé des appels reçus au poste cette nuit-là.
@mballa — Je n’ai jamais vu ton visage, petit. Et toi, tu n’as jamais vu le mien.
* Une femme.
+ Calme.
Dans ma vie, il n’y en avait qu’une qui pouvait parler aussi calmement d’un homme qu’elle envoyait mourir.
Mais ça, mon petit frère ne le savait pas encore.
~ Et moi, je ne voulais pas encore le croire.
`},

{n:16, t:'Pourquoi je suis mort ?', who:'Penalty', text:`
[mood tension]
On m’a conduit devant lui.
~ Et pendant quelques secondes, le monde est devenu silencieux. {fx:hush}
* Le fameux homme de Douala.
Celui qui devait être loin.
+ Celui qui devait être absent.
! Il était là.
Devant moi.
Je regardais son visage.
+ Pas de surprise.
+ Pas de panique.
Juste cette colère froide des hommes qui ont déjà compris avant même qu’on leur explique.
Elle était là aussi.
Mais son regard avait changé.
Ce n’était plus celui d’une femme qui souriait dans un appartement.
* C’était celui d’une personne qui savait que le jeu était terminé.
J’ai voulu parler.
+ J’ai voulu expliquer.
+ Dire que ce n’était pas ce qu’il pensait.
+ Dire que…
Mais certaines histoires arrivent à un moment où les mots ne servent plus à rien.
C’est quand il a sorti son arme {fx:heart}
+ Que j’ai compris qu’il ne m’a pas cru.
À cet instant précis, j’ai revu toute ma vie.
Pas les grands moments.
+ Les petits.
+ Les choix.
+ Les secondes où j’aurais pu partir.
+ Les fois où j’ai vu le danger et où j’ai décidé de fermer les yeux.
~ J’ai vu ma vie défiler dans ses yeux.
~ Puis…
! Toh. {fx:shot}
! Toh. {fx:shot}
! Toh. {fx:shot}
[mood none]
`},

{n:17, t:'Christelle', who:'Stéphane', text:`
[mood wake]
Christelle habitait un petit studio à Biyem-Assi.
+ Une chambre, une douche, un réchaud et une fenêtre qui donnait sur le mur du voisin.
~ On y avait passé nos meilleurs dimanches.
[img lieu-studio]
Quand Stéphane a frappé, elle a ouvert en tenant encore un pagne plié. {pic:christelle}
Derrière elle, une valise.
+ À moitié faite.
@stephane — Tu pars ?
@christelle — Je vais chez ma tante à Bafoussam. Quelques jours.
Elle mentait mal. Elle a toujours menti mal.
~ C’est pour ça que je l’aimais.
Ils ont joué sur le lit, comme on jouait tous les trois avant. Elle, moi et lui.
+ Le dimanche, avec du soya et du jus de foléré.
[game christelle]
Au milieu de la partie, elle s’est arrêtée.
+ Elle a posé ses cartes.
+ Elle a pleuré.
Pas comme à la veillée.
+ Pour de vrai, cette fois.
@christelle * — Je savais pour elle.
Stéphane n’a rien dit.
@christelle — Je savais pour Caroline. Pour l’argent. Pour son mari. Il m’a tout dit. Il y avait un plan.
@stephane — Quel plan ?
Christelle a essuyé ses yeux avec le pagne.
@christelle ~ — Pour comprendre, il faut remonter trois mois en arrière.
Et elle a raconté.
Stéphane l’a écoutée jusqu’au bout. Puis il a posé une seule question.
@stephane — Il y avait un papier ?
Christelle n’a pas cligné des yeux.
@christelle ! — Non.
* Elle a menti.
Je le sais.
+ Parce que c’est moi qui le lui avais donné.
Sur la valise, il y avait une enveloppe de banque mal cachée sous un pagne.
Stéphane l’a vue.
+ Il n’a rien dit.
Mon petit frère a toujours su attendre.
~ Moi, jamais.
`},

{n:18, t:'Même mort', who:'Penalty', text:`
[mood night]
> Et tu sais quoi ?
! Même étant mort, je l’ai quand même tué aussi. {fx:thud}
Mais pour comprendre ça, il faut revenir trois mois en arrière.
À cette époque, je pensais encore que Caroline était simplement ma petite aventure dangereuse.
+ Ma sugar.
+ Mon expérience.
+ La femme du Kappo.
~ Je ne savais pas encore qu’elle allait me conduire jusqu’à ma mort.
[img lieu-meuble]
Ce matin-là, après m’avoir envoyé au septième ciel au moins trois fois pendant la nuit, Caroline m’avait remis un document.
Il était environ neuf heures.
+ J’étais encore dans le lit.
+ La pièce était froide.
Il y avait cette odeur de cigarette mélangée à nos deux parfums.
+ Et une légère odeur de weed.
Elle était allongée à côté de moi, complètement nue. {pic:caroline}
Je regardais le papier dans ma main.
C’était la première fois qu’elle me donnait autre chose que de l’argent.
J’ai souri.
+ Une idée m’a traversé l’esprit.
@penalty — C’est quoi ça ?
Elle m’a regardé.
@caroline — Ouvre, mon cœur.
J’ai ouvert.
> Des informations bancaires.
+ > Un compte avec beaucoup d’argent.
J’ai regardé le nom du titulaire.
+ Puis je l’ai regardée.
@penalty — C’est pour ton mari ?
* Elle a simplement souri.
~ Ce sourire-là…
Aujourd’hui encore, je m’en souviens.
Elle m’a demandé de garder le document.
+ De ne poser aucune question.
+ Et surtout, de ne pas jouer au con.
Le moment venu, elle me dirait quoi faire.
Je devais aller travailler.
Alors on s’est allumé un truc.
+ On a encore parlé un peu.
+ Puis j’ai pris ma douche et je suis parti.
Je pensais que ce papier allait changer ma vie.
* Je n’avais aucune idée qu’il allait surtout changer ma mort. {fx:heart}
`},

{n:19, t:'Elle savait', who:'Penalty', text:`
[mood tension]
Quelques semaines plus tard, ma copine a découvert Caroline.
~ Et là…
! Tout a explosé. {fx:glass}
Elle a trouvé les messages.
+ Les appels.
+ Les rendez-vous.
+ L’argent.
Elle a compris que ma petite histoire avec Caroline n’était pas seulement une histoire de sexe.
J’ai menti.
+ Puis j’ai encore menti.
+ Puis j’ai compris que ça ne servait plus à rien.
* Alors j’ai tout avoué.
Le compte.
+ Caroline.
+ Son mari.
+ Et le plan.
Elle m’a regardé longtemps. {pic:christelle}
Je pensais qu’elle allait partir.
Elle m’a simplement demandé :
@christelle — Tu comptais vraiment partir avec elle ?
Je n’ai pas répondu.
+ Elle avait déjà compris.
C’est ce jour-là qu’elle a découvert la vérité.
+ Et c’est aussi ce jour-là que notre histoire a changé.
~ Parce qu’au lieu de me quitter…
* Elle a décidé de rester.
`},

{n:20, t:'Une quatrième personne', who:'Penalty', text:`
[mood tension]
! Elle voulait sa part.
Au début, j’ai cru qu’elle parlait sous le coup de la colère.
+ Mais non.
+ Elle était sérieuse.
Elle voulait l’argent.
+ Elle voulait une nouvelle vie.
* Et surtout, elle voulait que Caroline paie.
Alors elle est entrée dans le plan.
Nous étions maintenant trois.
+ Caroline.
+ Moi.
+ Ma copine.
Trois personnes qui voulaient la même chose.
! L’argent.
Mais pas pour les mêmes raisons.
Caroline voulait disparaître avec moi.
+ Moi, je voulais disparaître avec ma copine.
+ Et ma copine…
* Elle voulait d’abord se débarrasser de Caroline.
~ Je ne le savais pas encore.
`},

{n:21, t:'Le plan', who:'Penalty', text:`
[mood tension]
Notre plan semblait simple.
! Trop simple.
Caroline devait nous aider à nous débarrasser de son mari.
+ Ensuite, nous devions récupérer l’argent du compte.
+ Puis disparaître.
Moi et ma copine.
+ Une nouvelle vie.
+ Un autre pays.
+ Personne ne nous retrouverait.
~ Du moins, c’est ce que je croyais.
Parce qu’il y avait une chose que nous ignorions.
* Le mari de Caroline savait déjà qu’il se passait quelque chose. {fx:thud}
Et pendant que nous préparions notre avenir…
! Lui préparait notre fin. {fx:heart}
`},

{n:22, t:'Caroline', who:'Stéphane', text:`
[mood tension]
Elle a donné rendez-vous à Stéphane dans un salon de thé à Bastos.
+ Un endroit où le café coûte le prix d’un repas au quartier.
[img lieu-salon-the]
Elle était déjà assise quand il est entré.
Robe noire.
+ Lunettes noires.
~ Le deuil va bien aux femmes qui l’ont choisi.
Quand elle a vu mon visage traverser la salle, sa tasse a tremblé. {fx:glass}
+ Une seconde.
+ Une seule.
@caroline — Mon Dieu…
* Puis elle a souri. Et le masque est revenu. {pic:caroline}
@caroline — Tu lui ressembles tellement. Assieds-toi.
Elle a sorti un jeu de cartes de son sac. Neuf. Encore sous plastique. {fx:shuffle}
@caroline — Tu joues ? Ton frère jouait bien. Trop bien pour son bien.
[game caroline]
Caroline joue comme elle vit.
Elle te laisse gagner les premiers plis.
+ Elle te laisse croire.
* Et elle garde son 3 pour la fin.
Pendant la partie, elle a raconté sa version.
Elle m’aimait.
+ Son mari était un monstre.
+ Elle était une prisonnière dans une belle maison.
+ Elle n’avait rien pu faire.
~ Une belle histoire.
Je l’avais crue, moi aussi.
@stephane — Le gardien t’a vue téléphoner. Vingt-deux heures cinquante. Sur le balcon.
@caroline — J’ai appelé un taxi.
@stephane — La police dit que c’était une femme. Calme.
Caroline a posé une carte. Lentement. {fx:card}
@caroline * — Il y a beaucoup de femmes calmes à Yaoundé.
À la fin, elle a posé sa main sur le poignet de mon frère.
+ La même main.
+ Le même sourire.
@caroline — Ton frère avait quelque chose à moi. Un papier. Si tu le trouves, apporte-le-moi. Je saurai être reconnaissante.
J’ai vu sa main sur le poignet de Stéphane.
! J’ai eu froid.
~ Les morts aussi peuvent avoir froid.
`},

{n:23, t:'Le Ngonzormorrr', who:'Stéphane', text:`
[mood tension]
Le message est arrivé sur mon téléphone. Sur le téléphone que Stéphane portait maintenant dans sa poche. {fx:buzz}
+ Un numéro masqué.
> Le Ngonzormorrr veut voir le fantôme. Ce soir. Au Prestige.
[img lieu-prestige]
Le videur qui pèse le poids d’un frigo a reculé d’un pas en voyant Stéphane.
~ Personne n’aime ouvrir la porte à un mort.
Derrière le rideau rouge, il y avait une table verte, une lampe basse, un fauteuil.
[img lieu-table-masque]
* Et dans le fauteuil, un homme avec un masque d’or. {pic:masque}
Des cornes.
+ Des spirales gravées.
+ Une bouche ouverte sur des crocs.
+ Et dans les trous des yeux, deux petites braises qui suivaient chacun de ses gestes.
@masque — Assieds-toi.
Stéphane s’est assis. Dos au grand miroir du mur.
@masque * — Je t’ai déjà tué une fois. {fx:thud}
@stephane — Non. Tu as tué mon frère.
@stephane ! — Moi, tu ne me connais pas encore.
Le masque a ri. Un rire sans joie.
Les premières cartes sont tombées. Le masque jouait comme s’il voyait à travers celles de Stéphane. {fx:card}
Puis mon petit frère a levé les yeux.
+ Il a vu le miroir derrière lui.
+ Il a vu ses propres cartes dedans.
[choice chaise|Tourner sa chaise face au mur|Rester assis et jouer quand même]
?chaise=0 Il n’a rien dit. Il s’est levé. Il a tourné sa chaise. Il s’est rassis face au mur.
?chaise=0 Le masque n’a pas protesté.
?chaise=0 ~ On ne proteste pas quand on se fait prendre à tricher par un garçon de dix-neuf ans.
?chaise=1 Il n’a rien dit. Il est resté assis, dos au miroir.
?chaise=1 ~ Il voulait savoir s’il pouvait le battre quand même.
[game masque]
! Stéphane a gagné. {fx:cora}
Alors l’homme a enlevé son masque.
Derrière, il n’y avait pas un démon.
* Il y avait un homme de cinquante-cinq ans. {pic:kappo}
Fatigué, avec des cernes et une alliance trop serrée.
! Le mari.
@kappo — Ta Caroline m’a appelé elle-même. Elle m’a donné l’heure, l’adresse, la couleur du Yango.
@kappo + — Elle pleurait. Elle disait que ton frère la menaçait.
@stephane * — Elle ne pleurait pas. Le gardien l’a vue.
Le Ngonzormorrr est resté silencieux.
+ Longtemps.
~ Pour la première fois de sa vie, quelqu’un avait vu ses cartes à lui.
@kappo — Il existe un papier, n’est-ce pas ? Apporte-le-moi. Je paie le double de ce qu’elle t’a promis.
Les deux m’avaient tué.
+ L’un avec une arme.
+ L’autre avec un coup de téléphone.
Et maintenant, les deux voulaient la même chose.
! Le papier.
* Pour la première fois de ma vie, ou de ma mort, quelqu’un de ma famille tenait toutes les cartes.
`},

{n:24, t:'Le papier', who:'Penalty', text:`
[mood night]
On croit souvent que les morts ne font plus rien.
+ Qu’ils restent là où on les a laissés.
+ Couchés. Silencieux. Terminés.
! C’est faux.
~ Parfois, un mort a encore une course à faire.
* La mienne s’appelait un papier.
Une feuille.
+ Des chiffres.
+ Un nom.
Le genre de chose qu’on peut plier en quatre et glisser dans une poche.
+ Le genre de chose qui peut aussi plier un homme en quatre.
Trois jours avant Bastos, je l’avais donnée à Christelle.
@penalty — S’il m’arrive quelque chose, tu envoies ça.
Elle avait ri.
@christelle — Tu regardes trop de films.
Puis elle avait vu mes yeux.
+ Et elle avait arrêté de rire.
* Elle ne l’a pas envoyé.
Elle avait peur.
+ Et elle avait envie de l’argent.
~ Les deux sont humains.
Le matin où Stéphane est revenu de Bastos, elle l’attendait devant chez ma mère. Sa valise à la main.
Elle lui a tendu l’enveloppe de banque. {pic:christelle}
@christelle — Il voulait que ça parte. Moi, je n’ai pas eu le courage. Toi, tu fais ce que tu veux.
Puis elle a pris son car pour Bafoussam.
~ Je ne sais pas si elle reviendra.
[img lieu-chambre]
Mon petit frère s’est assis sur le lit où on dormait enfants. Il a ouvert le papier.
* Et moi, enfin, j’ai compris. {mood:tension}
Ce compte n’était pas l’argent du Ngonzormorrr.
* C’était l’argent des grands.
Des marchés.
+ Des enveloppes.
+ Des noms qu’on ne prononce pas.
Lui, il ne faisait que le garder.
! Et Caroline le savait.
Elle savait que son mari découvrirait l’histoire.
+ Elle savait qu’il me tuerait.
+ Et elle savait que ce papier, une fois sorti, tuerait son mari.
Elle ne m’avait jamais donné ce papier pour nous.
* Elle me l’avait donné pour que je meure avec.
Je n’étais pas son amant.
! J’étais sa mèche. {fx:thud}
~ Au Fap Fap comme dans la vie, ce n’est pas la meilleure main qui gagne.
* C’est celle qu’on cache le mieux.
Caroline avait gardé son 3 pour la fin.
Mais elle avait oublié une chose.
* Dans ma famille aussi, on sait compter les cartes.
Maintenant, c’était à mon petit frère de jouer le dernier pli.
[choice fin|Envoyer le papier|Envoyer le papier et le relevé d’appels|Vendre le papier au plus offrant]
`}
],

// the endings: the one read depends on Stéphane's last choice (« fin »); the hidden one opens after a first ending
endings: {
'0': {t:'Le papier', text:`
[mood night]
Stéphane a envoyé le papier un lundi matin.
Une enveloppe.
+ Une adresse.
+ Un timbre de cinq cents francs.
~ C’est fou ce qu’on peut faire avec cinq cents francs.
Deux semaines après, le Ngonzormorrr ne répondait plus au téléphone.
Trois semaines après, on a parlé d’un accident sur la route de Douala.
! Douala.
* Il était enfin en mission à Douala.
+ Pour de vrai, cette fois.
Caroline portait du noir. Un beau noir. Bien coupé. {pic:caroline}
~ Elle pleurait juste assez pour que personne ne pose de questions.
! Elle avait gagné.
Avec mon papier. Avec ma mort. Avec la main de mon petit frère.
* Même mort, je l’ai tué.
~ Mais c’est elle qui a ramassé les cartes.
`},
'1': {t:'Le dernier pli', text:`
[mood night]
Stéphane a envoyé deux pages.
La première, c’était le compte.
La deuxième, c’était le relevé d’appels que l’adjudant Mballa avait glissé sous le jeu de cartes.
> Vingt-deux heures cinquante. Un numéro.
* Le numéro de Caroline.
Le Ngonzormorrr est parti en mission à Douala.
+ Pour de vrai.
Caroline n’a pas eu le temps de choisir sa robe noire.
On est venu la chercher un matin, dans sa belle maison de Bastos. {fx:siren}
~ Elle souriait encore. Mais plus pareil.
[img lieu-coin]
Le soir même, à Mvog-Ada, sous le manguier, Stéphane a joué aux cartes avec RALL. {mood:wake}
Au dernier pli, il a posé un 3. {fx:card}
! CORA. {fx:cora}
RALL a dit que c’était moi qui guidais sa main.
* Cette fois, c’était vrai.
Même mort, je l’ai tué.
* Et mon petit frère a fini la partie.
`},
'2': {t:'Pourquoi je vais mourir ?', text:`
[mood tension]
Stéphane n’a rien envoyé.
* Il a vendu le papier. Au plus offrant.
Des chaussures neuves.
+ Un téléphone neuf.
+ Des tournées pour tout le quartier.
Dans le quartier, quand un gars mange bien sans travailler plus, les gens ne demandent pas comment.
* Ils demandent qui.
Un soir, son téléphone a vibré. {fx:buzz}
> — Tu ressembles tellement à ton frère. Tu viens ce soir ? Il est en mission à Douala.
Il a souri. {pic:stephane}
~ Le même sourire que moi.
! J’ai crié.
~ Les morts crient aussi. Personne ne les entend.
! POURQUOI JE VAIS MOURIR ? {fx:shot}
`},
'cachee': {t:'Et si j’étais parti ?', text:`
[mood night]
[img lieu-meuble]
Ce matin-là, Caroline m’a tendu le papier. {pic:caroline}
@caroline — Ouvre, mon cœur.
Je l’ai regardé longtemps.
* Puis je l’ai posé sur le lit. Sans l’ouvrir.
J’ai pris ma douche.
+ Je me suis habillé.
@caroline — Tu vas où ?
@penalty — Chez moi.
! Je ne suis jamais revenu.
Je ne suis pas devenu riche.
+ Je n’ai jamais eu les chaussures.
+ Ni le téléphone.
+ Ni les tournées.
[img lieu-coin]
Mais le samedi suivant, sous le manguier, j’ai battu RALL au Fap Fap. {mood:wake}
Et mon petit frère, assis à côté, m’a regardé jouer en se demandant comment je faisais. {pic:stephane}
Il n’a jamais eu besoin de chercher pourquoi je suis mort.
* Parce que je ne suis pas mort.
~ Pas cette fois.
`}
}
};
