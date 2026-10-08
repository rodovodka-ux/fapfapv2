# FAP FAP — Décisions de règles (clarifications avec l'utilisateur)

Version de référence : `fapfap(19).html` (identique à `fapfap.html` de l'archive).
Version corrigée : [fapfap.html](fapfap.html). Les points marqués *(changement à coder)* ci-dessous sont **faits** (voir « Corrections appliquées » en bas).

1. **Version** : la v19 est bien la dernière.
2. **Fin de manche après une Passe** *(changement à coder)* : l'adversaire rejoue sa dernière carte ; le passeur pose ses **2 cartes d'un coup**. On compare la carte adverse à la **meilleure carte du passeur dans la couleur demandée** ; si le passeur n'a pas la couleur, il joue libre et perd le pli.
   - Aujourd'hui le jeu fait : le passeur répond avec une carte puis joue sa dernière carte seul.
3. **Passe à couleurs différentes avec un 3** : on garde (même couleur, OU couleurs différentes dont un 3).
4. **CORA après une Passe** : seul le pli où la Passe a été déclarée ne compte pas. Si le passeur pose ensuite ses 2 cartes en libre et que le meneur gagne avec un 3 → **c'est un CORA**.
5. **33 Glacée** : sans objet. Un 3 ne gagne que s'il commande, et commander le dernier pli exige d'avoir gagné l'avant-dernier : les deux 3 viennent forcément du même joueur.
6. **Points** : inchangés. Manche = 1, CORA = 2, 33 Glacée = 3, victoire automatique = 1, partie en 5 points.
7. **Victoires automatiques** *(changement à coder)* :
   - Total des 5 cartes ≤ 21
   - Brelan **333** ou **777** uniquement
   - **4 symboles** *(à réintroduire)* : la même valeur dans les 4 couleurs (Black, Tchaka, Coubie, Zing), n'importe quelle valeur de 3 à 9 (le 10 est impossible, il n'y a pas de 10 Black)
   - **5 cartes de même couleur** : gardée
8. **Annonce de Penalty** *(changement à coder)* : Penalty peut parfois annoncer en retard (après la 1ʳᵉ carte), et peut même **rater complètement** sa fenêtre et perdre sa victoire automatique.
9. **Distribution** : inchangée. Le gagnant de la manche distribue, le perdant ouvre la suivante.
10. **Brûler la carte** : inchangé. Le jeu bloque les coups illégaux.
11. **Carré la Pute, bonus** *(changement à coder)* : un CORA ou une 33 Glacée permet d'**éliminer 2 joueurs** ; une manche normale, 1 seul.
12. **Carré la Pute en ligne** : oui, **plus tard**, une fois le duel en ligne fiable. La nouvelle fin de Passe (2 cartes d'un coup) s'applique aussi à 4 joueurs.
13. **Multijoueur** : on remplace PeerJS par **Supabase Realtime** (serveur relais), et non Firebase.
14. **Tests** : question pas encore posée.

## Bug de règle constaté en jouant (v19)
- Après une Passe, Penalty n'a plus de carte, on me propose **encore** « Je suis en passe », et la manche se termine alors que **j'ai toujours mon 10 Tchaka en main**. La nouvelle règle n°2 corrige ce cas.

## Audit visuel (partie jouée au format téléphone 375×812)
### Duel
1. **Cartes des plis précédents empilées** dans la zone de chaque joueur : on ne sait plus quelle carte appartient au pli en cours (mon 9 Coubie joué libre au pli d'avant avait l'air d'être ma réponse à son 10 Coubie). *Problème le plus gênant.*
2. **Aucun signal clair « À toi de jouer »**. Seul le bandeau « Commande : X » s'affiche, et l'écran reste identique quel que soit le joueur qui doit jouer.
3. **Silhouettes des joueurs** : la tête de Penalty et les bras sont de simples formes marron arrondies, qui ressemblent à des éléments provisoires.
4. **Dos des cartes de Penalty** : le logo « FF » est coupé par le chevauchement des cartes (on lit « F F F FF »).
5. **Symbole Tchaka** (trèfle) : ressemble plutôt à un champignon ou un nuage.
6. **La mise en page saute** d'un tour à l'autre : la table se déplace verticalement, le cadre « Ta main » apparaît et disparaît.
7. **Pas de halo de lumière** : la table est un rectangle éclairé uniformément, loin du « cercle de lumière dans le noir » de la photo de référence.
8. **Marqueur « Passe »** : texte minuscule, posé en travers d'une carte.
9. **Orthographe** : « PENALTY · 1 CARTES ».
10. **Menu d'accueil** : le fond n'est pas opaque et on lit à travers le texte du jeu (« À toi de commander », « Ta main »). Le statut « À toi de commander » s'affiche même quand c'est toi qui distribues.
11. **Grand vide noir** sous la main.

### Carré la Pute
12. **Style complètement différent du duel** : ni table en bois, ni halo, ni ambiance. Les cartes jouées sont des mini-cartes sans le nouveau design (pas d'index de coin).
13. **Ma main est très sombre** quand les cartes ne sont pas jouables : difficile de lire son propre jeu.
14. **Ma main dépasse en bas de l'écran** sur un téléphone de 812 px de haut.
15. **Compteurs du haut** (5 4 4 5) : très pâles et sans légende (ce sont les cartes restantes).
16. **Centre de la table vide**, alors que les cartes jouées sont serrées près des joueurs.

## Corrections appliquées (30/09/2026)
### Règles
- **Fin de Passe** (duel + Carré) : le passeur pose ses 2 cartes d'un coup (bouton « Poser mes 2 cartes », ou clic sur une carte). Il ne peut plus repasser. Penalty et les IA du Carré le font aussi, et l'IA de Penalty en tient compte dans ses calculs.
- **CORA après une Passe** : compte (seul le pli de la Passe est exclu).
- **Les 4 symboles** réintroduits (même valeur dans les 4 couleurs).
- **Annonce des IA** : 70 % tout de suite, 20 % en retard (après la 1re carte), 10 % ratée. Quand Penalty rate son annonce, il s'en rend compte à la fin de la manche.
- **Carré** : un CORA ou une 33 Glacée → le gagnant élimine 2 joueurs (deux choix successifs).

### Visuel
- Seul le pli en cours est au centre, en grand. Les plis précédents passent en petites cartes au-dessus/au-dessous de chaque joueur. La carte qui tient le contrôle brille (Carré).
- Indicateur de tour : « À toi de commander / À toi de répondre / Penalty réfléchit… » au-dessus de ta main + bandeau lumineux.
- Cartes non jouables : assombries mais lisibles. Quand ce n'est pas ton tour : cartes normales.
- Table : un seul cercle de lumière sur le bois, noir tout autour. Même table pour le Carré.
- Nouveaux bras/mains (silhouettes avec manche et poing) pour Penalty et les spectateurs ; la forme marron sous ta main est supprimée.
- Logo « FF » visible en entier (seulement sur la carte du dessus).
- Nouveau symbole Tchaka (vrai trèfle).
- Plus de saut de mise en page (bulle de Penalty flottante, zone des boutons de hauteur fixe, cadre « Ta main » permanent).
- Marqueur « Passe » de la taille d'une carte.
- « 1 carte » / « 2 cartes ».
- Menus opaques.
- Carré : compteurs lisibles « 5 cartes », joueur actif surligné, main entièrement visible sur un écran de 812 px.
- **Débordement horizontal corrigé** : la page faisait 403 px de large sur un écran de 375 px (les bras des spectateurs dépassaient). Sur téléphone, ça pouvait provoquer un zoom ou un décalage, et c'est ce qui faisait rater mes clics en mode téléphone.

### Outil de test
- En ouvrant le jeu avec `?debug` à la fin de l'adresse, un accès `window.__ff` permet de tester les règles automatiquement. Sans `?debug`, rien ne change.

## Multijoueur (30/09/2026)
- PeerJS (connexion directe entre téléphones) **remplacé par Supabase Realtime** : les deux téléphones passent par le serveur de Supabase.
- **Couche anti-perte** : chaque message est numéroté, confirmé par l'autre téléphone et renvoyé toutes les 1,2 s tant qu'il n'est pas arrivé ; les messages sont appliqués dans l'ordre, une seule fois.
- **Présence** : on sait si l'autre est là. Bandeau « X s'est déconnecté — en attente de son retour… » ou « Connexion perdue — reconnexion… », avec un bouton Quitter. Au retour, la partie reprend là où elle en était.
- Messages clairs : code inexistant, partie déjà complète, serveur injoignable, clé Supabase manquante.
- Le nom de l'hôte s'affiche maintenant aussi chez l'invité.
- **Mode test local** : ajouter `?mplocal` à l'adresse (et `&drop=0.3` pour simuler 30 % de pertes) pour jouer entre deux onglets du même navigateur, sans serveur.
- Tests : un match complet sans perte (5-2 / 2-5), puis un match complet avec 30 % de messages perdus (5-1 / 1-5). Aucune erreur, et les deux écrans ont toujours affiché le même score.
- **Reste à faire** : renseigner `SUPABASE_URL` et `SUPABASE_ANON_KEY` dans fapfap.html, puis tester sur deux vrais téléphones.

## Mise en ligne (30/09/2026)
- Dépôt GitHub : `rodovodka-ux/fapfapv2` (fichier `index.html`). L'ancienne version reste dans `rodovodka-ux/fafap-6`.
- Adresse officielle : https://rodovodka-ux.github.io/fapfapv2/
- La box « Infinity Box » intercepte les sites `*.github.io` avec un pare-feu Fortinet dont le certificat est expiré. Adresse de secours qui passe : https://raw.githack.com/rodovodka-ux/fapfapv2/main/index.html (cliquer sur « Open the page » à la première visite).
- Supabase : projet `cydmvgwdnxawlhblkkpc`, clé publishable dans le fichier. Un projet gratuit se met en pause après 7 jours sans activité (réactivation en un clic dans le tableau de bord).
- **Multijoueur testé et validé par l'utilisateur sur de vrais appareils.**

## Expérience joueur — étape 1 (01/10/2026)
- **Invitation** : bouton « Inviter sur WhatsApp » (et « Partager » si le téléphone le permet). Le lien `…/?partie=CODE` ouvre directement l'écran « On t'invite à jouer ! » : un clic, et l'ami est dans la partie. Le code figure aussi dans le message, au cas où.
- **Prénom mémorisé** sur l'appareil.
- **Revanche** en un clic, contre Penalty, en Carré et en ligne (en ligne, les deux joueurs doivent accepter ; message « X veut sa revanche ! »).
- **Fin de match** : score affiché (« Penalty gagne 5 à 4 »), phrase spéciale pour une défaite serrée, bilan contre Penalty. Correction d'un défaut ancien : le texte du certificat était illisible (clair sur clair).
- **Distribution** : plus d'écran « Nouvelle manche / Continuer » ; un petit message l'annonce. Le rituel « Je partage ou je dépose ? » tient en un seul écran (coupe bas/milieu/haut + tas du haut/bas), avec l'option « Toujours partager ».
- **Menu ☰** à la place de ↺ : Reprendre, Règles du jeu, Son, Toujours partager, Quitter (avec confirmation, retour au menu principal dans tous les modes).
- **Règles en bref** intégrées au jeu.
- **Textes agrandis** partout (plus rien de minuscule).

## Expérience joueur — étape 2 : la progression (01/10/2026)
- **La route du quartier** (remplace « Contre Penalty ») : choix parmi 4 adversaires, tous honnêtes, avec leurs propres répliques :
  - **Gervais** ★ : nerveux, joue souvent au hasard. Annonce ses victoires automatiques tard, voire pas du tout.
  - **Aristide** ★★ : joue proprement (comptage des cartes), sans calcul profond.
  - **Penalty** ★★★ : l'IA forte (calcul Monte Carlo, 450 ms).
  - **Mbarga le Vétéran** ★★★★ : calcul deux fois plus poussé (900 ms), n'oublie jamais d'annoncer. **Débloqué en battant Penalty.**
- **Réputation et rangs** : Petit joueur (0) → Joueur du dimanche (300) → Joueur sérieux (900) → Redouté (2000) → Caïd du quartier (3800) → Légende de Melen (6500).
  - Gains : +5 par manche gagnée, +15 CORA, +40 33 Glacée, +10 victoire automatique ; victoire de match : Gervais +50, Aristide +100, Penalty +150, Mbarga +220 ; défaite +20 ; en ligne : victoire +80, défaite +25 ; Carré : survivant +150, +15 par élimination, partie +25 ; chaque trophée +50.
- **18 trophées** (voir l'écran Trophées), avec une bannière « Trophée débloqué » pendant la partie.
- **Fin de match** : bilan de réputation ligne par ligne, barre de rang qui se remplit, célébration en cas de nouveau rang, bilan contre l'adversaire, annonce du déblocage de Mbarga.
- **Accueil** : rang, réputation et nombre de trophées affichés ; boutons Trophées et Statistiques.
- **Statistiques** : réputation, bilan contre chaque adversaire, matchs en ligne. (Correction d'un ancien défaut : le « taux de victoire » affiché était en réalité celui de Penalty.)
- Les anciens résultats contre Penalty sont repris dans le nouveau bilan.

## Noms des personnages (01/10/2026)
- Gervais → **Joëlle** (textes accordés au féminin), Aristide → **RALL**, Mbarga → **Mr Kamga**. Valable partout : la route du quartier, Carré la Pute, les trophées et les messages.
- Les identifiants internes n'ont pas changé, donc la progression déjà enregistrée est conservée.

## Expérience joueur — étape 3 (01/10/2026)
- **Le défi du jour** (en haut de l'accueil) : 3 manches contre Penalty, avec **la même donne pour tous les joueurs** ce jour-là (donne calculée à partir de la date, sans le rituel de coupe). Une seule tentative par jour : abandonner compte comme joué. Le défi change à minuit (heure du téléphone). Le n°1 correspond au 1er octobre 2026.
  - Résultat en émojis : 🟩 manche gagnée, 🟨 CORA, 🧊 33 Glacée, ⚡ victoire automatique, 🟥 perdue. Bouton « Partager mon résultat » (texte prêt pour WhatsApp, à la manière de Wordle).
  - Réputation : +30 par manche gagnée, +40 pour un défi terminé. Trophées « Rendez-vous quotidien » et « Défi parfait ».
- **Série de jours 🔥** : la première partie terminée chaque jour prolonge la série. Bonus de +10 par jour de série (70 maximum). Trophées à 3 et 7 jours. La série s'affiche sur l'accueil.
- **Partage d'exploits en image** : certificat dessiné en 1080×1080 (CORA, 33 Glacée, VICTOIRE, SURVIVANT) au nom du joueur, avec le lien du jeu. Le bouton apparaît sur le certificat de CORA ou de 33 Glacée quand c'est ton exploit, et en fin de match quand tu gagnes. Sur téléphone, il ouvre le menu de partage (WhatsApp…) ; sinon, l'image est enregistrée puis WhatsApp s'ouvre.
- **Réactions rapides en ligne** : bouton 💬 avec 8 réactions (« Tu dors ? », « Quel bail ! », « Range tes cartes », « Bien joué 👏 », 😂, 🔥, « Hmm… 🤔 », « On se calme »). Pas de texte libre, donc rien à modérer, et une petite limite contre le spam.
- 22 trophées au total.

## Expérience joueur — étape 4 (01/10/2026)
- **Décors à débloquer** (bouton 🎨 Décors sur l'accueil), uniquement en jouant :
  - Dos de cartes : Bordeaux (de base), Lions Indomptables (rang Joueur du dimanche), Pagne wax (Joueur sérieux), Nuit de Melen (trophée Rendez-vous quotidien), Or de légende (Légende de Melen).
  - Tables : Bois du tripot (de base), Nappe de Mama Cécile (trophée 3 jours d'affilée), Tapis vert du bar (battre Penalty).
  - Ambiances : Ampoule jaune (de base), Néon du maquis (Joueur sérieux), Pluie sur la tôle (trophée 33 Glacée).
  - Une bannière annonce chaque nouveau décor débloqué.
- **Partie guidée** avec Penalty (5 plis sur une donne préparée ; seule la carte conseillée est jouable). Penalty explique commande, suivre, contrôle et dernier pli, et la partie se termine sur un CORA. Mise en avant pour les nouveaux joueurs, trophée « Apprenti du quartier » (+50 rép.). Le CORA de la partie guidée ne compte pas pour les trophées.
- **Installation comme une application** : fichiers `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png` à mettre à côté de `index.html`. Bouton « Installer le jeu » (Android/Chrome) ou explication pour iPhone. Le jeu s'ouvre et se joue contre l'IA **sans réseau** (testé serveur coupé). Le jeu en ligne a évidemment besoin du réseau.
  - Pour chaque nouvelle version : changer `CACHE = 'fapfap-v1'` en `fapfap-v2`, etc. dans `sw.js` (la page elle-même est toujours rechargée en priorité depuis le réseau).
- **Mesures anonymes** : table `events` dans Supabase (script `supabase-mesures.sql` à exécuter une fois). Événements : session, match_end, square_end, daily_end, tuto_end, install. Uniquement un identifiant aléatoire et des chiffres de jeu. Désactivable par le joueur (menu Pause). Jamais envoyées depuis les pages de test.
- Corrections au passage : nom de l'adversaire dans le tableau des scores (il affichait toujours « Penalty ») ; tampon de l'accueil qui chevauchait un bouton.
- 23 trophées au total.

## Refonte graphique (01/10/2026)
- **Polices** : style A « Moderne et chaleureux ». **Bricolage Grotesque** pour les titres, les valeurs des cartes et les gros chiffres ; **Manrope** pour tout le reste. Anton, Work Sans, JetBrains Mono et Playfair sont retirées. Chiffres à largeur fixe (les scores ne « sautent » plus).
- Titre écrit « Fap Fap » ; les petites étiquettes en MAJUSCULES ESPACÉES passent en minuscules normales ; image de partage mise aux nouvelles polices.
- **Mains et spectateurs dessinés supprimés.** Chaque personnage a un **médaillon** (accueil, adversaire, Carré la Pute, coach de la partie guidée) qui affiche son illustration dès que l'image existe, sinon son initiale.
- Emplacements d'illustrations prévus : `art/penalty.png`, `art/joelle.png`, `art/rall.png`, `art/kamga.png` (portraits) et `art/<nom>-table.png` (facultatif : bras et mains tenant les cartes, vus d'en haut). Voir `ILLUSTRATIONS.md`.

## Illustrations intégrées (01/10/2026)
- Image générée par l'utilisateur, découpée en : `art/penalty.jpg`, `art/joelle.jpg`, `art/rall.jpg` (portraits 512×512) et `art/penalty-table.jpg`, `art/joelle-table.jpg`, `art/rall-table.jpg` (mains tenant les cartes, retournées de 180° pour arriver « d'en face »). Plus `art/scene.jpg` (les trois à table), mis de côté pour l'accueil.
- Le jeu accepte `.jpg` (essayé en premier) ou `.png`. Le portrait est à côté du nom de l'adversaire ; quand ses mains existent, elles remplacent la rangée de cartes retournées, avec un fondu sur les bords.
- **Manque : Mr Kamga** (le générateur l'a remplacé par une scène de groupe). En attendant, il garde son initiale et ses cartes retournées.
- **Mr Kamga ajouté** (01/10/2026) : `art/kamga.jpg` (portrait) et `art/kamga-table.jpg` (mains retournées), découpés depuis la dernière image générée. Les 4 personnages sont complets. Images « à table » limitées à 150 px de haut pour garder la même taille pour tous.

## Mise en ligne (01/10/2026)
- Publiée par Claude via le Chrome de l'utilisatrice, dans le dépôt `rodovodka-ux/fapfapv2` : `index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png` (version « Nouvelle version : regles, progression, defi du jour, polices, installation »), puis le dossier `art/` avec 9 images (version « Illustrations des personnages », e9b6f95).
- Les 3 déploiements GitHub Pages sont terminés avec succès. Vérifié en ligne via githack : nouvelle version, polices, portraits, aucune erreur.
- githack peut servir l'ancienne version pendant quelques minutes après une mise à jour (sa mémoire se rafraîchit ensuite toute seule).
- Pour la prochaine mise à jour : passer `CACHE = 'fapfap-v1'` à `fapfap-v2` dans `sw.js`.

## Pages, pause, chat et animations (05/10/2026)
- **Plusieurs pages** au lieu d'un seul menu : Accueil → Jouer → (Route du quartier / Avec un ami / Carré la Pute), Profil, Trophées, Décors, Règles, Paramètres, Invitation, Ton code, Rejoindre. Chaque page a un bouton **‹ retour** en haut, et le **bouton retour du téléphone** fonctionne aussi (glissement vers la droite ou la gauche).
- **Bouton ☰ pendant la partie = menu Pause** : Reprendre, Recommencer la partie (avec confirmation), Règles, Paramètres, Quitter vers l'accueil (avec confirmation qui explique ce qui sera perdu). La pause est **réelle** contre les IA : elles attendent. En ligne la partie continue (c'est dit dans le menu), et « Recommencer » est caché (en ligne il y a la revanche) ainsi que pendant le défi du jour.
- Pendant une partie, le bouton retour du téléphone ouvre la pause au lieu de quitter le jeu.
- **Page Paramètres** : son, vibrations, réduire les animations, toujours partager, ton prénom, chat on/off, statistiques anonymes.
- **Page Profil** : carte avec rang, barre de réputation, parties, victoires, trophées, jours de suite.
- **Chat en ligne** : bouton 💬 rond à droite de la table (avec pastille de messages non lus). Texte libre (200 caractères max., anti-spam doux) + réponses rapides. Un emoji seul s'envole en grand au-dessus de la table chez les deux joueurs. Bouton « Couper » pour ne plus être dérangé. Les messages sont toujours affichés comme du texte (impossible d'injecter du code). L'ancienne palette de réactions est remplacée par le chat.
- **Animations reprises de l'ancienne version 48, modernisées** : lettres du logo qui tombent et boutons qui arrivent en cascade (complet la 1re fois, rapide ensuite), boutons « 3D » qui s'enfoncent, portraits qui parlent / sautent de joie / secouent la tête, certificat de fin de match qui tombe (grisé en cas de défaite, avec la tête de l'adversaire), anneau lumineux quand une carte se pose, emojis géants en ligne.
- L'accueil utilise l'illustration `art/scene.jpg` en fond.
- Correctif : relancer une partie de Carré ne peut plus être perturbé par un minuteur de la partie précédente.

## Tables, musique et bruitages modernes (05/10/2026)
- **13 tables** (au lieu de 3), dont 7 jouables tout de suite : Bois du tripot, Plage de Kribi, Terre rouge de l'Est, Pagne wax, Ardoise de l'école, Natte de raphia, Toit sous les étoiles. À gagner : Tapis vert (battre Penalty), Nappe de Mama Cécile (3 jours de suite), Arcade néon (Joueur du dimanche), Marbre du palace (Joueur sérieux), Velours du casino (Redouté), Table d'or (Légende de Melen).
- **Une musique par table** + une pour les menus, composée en direct par le jeu (aucun fichier) : longues suites de 2 × 8 accords qui alternent, nappe douce, mélodie qui change à chaque passage, basse. Instruments : piano électrique, piano feutré, kalimba (sanza), balafon, cloches, synthé. Ambiances : vagues à Kribi, grillons sous les étoiles, murmure du bar, pluie (avec l'ambiance « Pluie sur la tôle »). Humeurs variées : joyeux (Kribi, wax, Mama), apaisant (accueil, raphia), triste/nostalgique (ardoise, tapis vert, marbre), rêveur (étoiles), mystérieux (velours), synthé (arcade), majestueux (or).
- Dans Décors, toucher une table fait entendre sa musique tout de suite ; le nom du morceau est affiché sous chaque table, dans la pause et dans les paramètres.
- **Bruitages refaits** (fini les « bips » années 90) : carte qui glisse et se pose, distribution, petit « tap » sur chaque bouton, glissement entre les pages, plucks modernes pour les plis, accords et « boom » grave pour CORA / 33 Glacée / victoire, nappe triste pour la défaite. Mixage avec compresseur et réverbération.
- Paramètres : Son (tout), Musique de fond on/off, volume de la musique, volume des effets.
- Le son se met en pause quand le jeu passe en arrière-plan (batterie).
- Correctif : les Règles/Paramètres ouverts depuis la pause s'affichaient derrière le menu pause.

## Icônes à la place des émojis (06/10/2026)
- Plus aucun émoji dans l'interface : une seule famille d'icônes au trait (SVG intégré au jeu, couleur du thème) pour les boutons, tuiles de l'accueil, menu pause, paramètres, trophées, chat, partage, cadenas, étoiles de difficulté.
- Le défi du jour affiche ses résultats en pastilles de couleur avec icône (gagné, CORA, 33 Glacée, victoire auto, perdu).
- Gardés volontairement : les symboles de cartes ♠♥♦♣, les émojis que les joueurs s'envoient dans le chat, et les carrés de couleur du message WhatsApp de partage (format de partage classique).
- sw.js passé en fapfap-v3.

## Animations de partie (06/10/2026)
- **Jeton de contrôle** : une pièce lumineuse « Contrôle » posée devant le joueur qui a le contrôle ; elle glisse vers l'autre (avec un petit son) dès que le contrôle change. Aussi en Carré la Pute, à côté du nom du joueur.
- **Vraie distribution** : le paquet est posé sur la table, les cartes volent une par une vers chaque joueur (le non-donneur servi en premier, puis en alternance ; en Carré, tour de table). Chaque carte apparaît quand elle arrive ; l'adversaire attend la fin de la donne pour jouer. Quand quelqu'un « dépose », on voit la coupe : le haut du paquet se soulève et repasse dessous.
- **Dernière carte au ralenti** : quand le meneur pose sa dernière carte, la lumière se resserre sur la table, le titre et le score s'effacent, la musique baisse, un battement de cœur ; la carte qui répond se retourne lentement et le gagnant du pli est révélé plus tard. CORA : le 3 gagnant devient doré avec une onde de choc ; 33 Glacée : il devient bleu glacé.
- Tout est coupé avec « Réduire les animations ».
- sw.js passé en fapfap-v4.

## Table en verre au soleil + musique lofi (06/10/2026)
- Nouvelle table gratuite « Verre au soleil » : la seule table lumineuse. Pièce en plein jour (lumière de fenêtre en bandes obliques), plateau en verre épais avec bord vert qui accroche la lumière, reflets, parquet visible à travers le verre, reflets de lumière (caustiques) qui bougent lentement, ombres réelles des cartes posées sur le verre. Toute l'interface autour passe en encre foncée sur panneaux de verre clair.
- Sa musique « Sieste en terrasse » : lofi hip-hop à 80 bpm, piano électrique feutré, nappe douce, basse, batterie rap simple (grosse caisse, caisse claire sur 2 et 4, charleston avec swing) et craquements de vinyle.
- sw.js passé en fapfap-v5.

## Coupe en deux temps, partie rapide, adversaires moins bavards (06/10/2026)
- **La coupe, en deux pages animées** : 1) l'adversaire (avatar + bulle) a mélangé, le paquet est battu en boucle (animation de mélange), grande question « Tu coupes ou tu partages ? » avec deux grosses cartes-boutons. 2) Si on coupe : le paquet vu de profil avec trois lignes de coupe (Haut / Milieu / Bas) ; on touche une ligne, le paquet se sépare en deux tas (avec le nombre de cartes de chaque) ; on touche le tas qu'on garde, il se soulève et brille. Retour possible « Finalement, je partage ». Quand c'est l'adversaire (ou l'ami en ligne) qui choisit, les mêmes écrans se jouent tout seuls.
- **Partie rapide** : sur la page des adversaires et dans le salon en ligne, choix « Match (premier à 5) » ou « Partie rapide (une seule manche décide) ». Mémorisé. En ligne, c'est le créateur de la partie qui choisit. Une partie rapide gagnée rapporte un tiers de la réputation d'un match, et ne compte pas pour « Sans appel ».
- **Adversaires plus calmes, plus drôles** : pendant la manche, au plus une remarque par manche (30 % de chance, jamais à moins de 14 s d'une autre) ; fin de manche commentée 6 fois sur 10 ; CORA/33 Glacée toujours. Jamais deux fois la même phrase de suite. Toutes les répliques réécrites, plus courtes et plus provocatrices (Penalty le prof moqueur, Joëlle superstitieuse, RALL le chambreur, Mr Kamga laconique). Carré : remarques en cours de jeu 1 fois sur 5.
- sw.js passé en fapfap-v6.

## Nouvel accueil : logo et fond du bar (06/10/2026)
- Logo illustré généré par l'utilisatrice (« Fap Fap » doré en relief, couronne, trois cartes) : fond retiré automatiquement (seul le blanc relié aux bords est enlevé, pour garder les faces blanches des cartes), recadré, 600 px, `art/logo.png`. Il tombe et rebondit à l'ouverture, et un reflet de lumière le traverse toutes les quelques secondes. Si l'image ne charge pas, l'ancien titre en texte s'affiche.
- Fond de l'accueil : photo floue d'un bar de quartier la nuit (ampoule, bokeh doré, cartes sur la table), `art/home-bar.jpg` (99 Ko), légèrement assombri au centre pour la lisibilité.
- sw.js passé en fapfap-v7 (le logo et le fond sont gardés pour le hors-ligne).

## Jetons virtuels et mises (06/10/2026)
- Jetons virtuels uniquement : ils se gagnent en jouant, ne s'achètent pas et ne s'échangent jamais contre de l'argent (rappelé dans le jeu). 1 000 jetons au départ.
- Accueil : solde avec pièce dorée, bouton « Bonus du jour » (300 jetons, +50 par jour de série, jusqu'à 600) avec pièces qui volent et compteur qui défile ; si on est à moins de 100 jetons, « Penalty te dépanne +300 » (une fois par heure). Bouton couronne → page « Les plus riches du quartier ».
- Mises : Amical / 100 / 500 / 1 000 / 5 000 / 10 000 (choix mémorisé), sur la page des adversaires et dans le salon en ligne. Contre l'ordinateur la mise est prise au début du match ; une victoire rapporte mise × cote : Joëlle ×1,5, RALL ×2, Penalty ×3, Mr Kamga ×5 ; chaque CORA gagné +25 %, chaque 33 Glacée +50 %. Toute victoire contre l'ordinateur rapporte en plus 50 jetons. Quitter ou recommencer fait perdre la mise (c'est écrit dans la confirmation).
- En ligne : le créateur choisit la mise, chacun met la même (dans la limite de son solde), le gagnant rafle le pot. Même mise pour la revanche.
- Fortunes du quartier : Joëlle 2 500, RALL 6 000, Penalty 25 000, Mr Kamga 80 000 au départ ; quand tu gagnes une mise contre eux ils te paient, quand tu perds ils empochent ta mise. Classement avec toi dedans.
- Autres gains : +200 jetons par trophée, +100 par manche gagnée au défi du jour. Fin de match : bloc « +X jetons » qui défile, avec le détail (mise × cote, solde). Profil : solde, record, total gagné.
- sw.js passé en fapfap-v8.

## Carré la Pute à 2, 3 ou 4 (ordinateur et en ligne) + accueil aux couleurs de la table (06/10/2026)
- **Carré la Pute** a sa page : choix 2 joueurs (toi et Penalty), 3 (avec Joëlle et RALL) ou 4, plus la mise. Le survivant gagne une mise par joueur (×2, ×3 ou ×4) + 50 jetons de victoire.
- **En ligne de 2 à 4** : dans « Avec un ami », choix « Duel » ou « Carré la Pute ». Le créateur ouvre une table (code + lien WhatsApp), jusqu'à 3 amis s'assoient (ils voient la liste des joueurs), option « Compléter avec l'ordinateur jusqu'à 4 ». Même lien d'invitation que le duel : le jeu reconnaît tout seul que c'est une table.
- Fonctionnement : le téléphone du créateur fait tourner la partie et envoie à chacun la table vue de sa place (sa main, le nombre de cartes des autres, le pli, l'historique). Chaque joueur envoie ses coups (carte, passe, pose des 2 cartes, victoire automatique, choix des éliminés quand il gagne une manche). Coups numérotés et renvoyés jusqu'à confirmation ; la table est renvoyée toutes les 1,5 s. Un ami absent plus de 20 s est remplacé par l'ordinateur. Les grands moments (CORA, 33 Glacée, éliminations, victoire auto, vainqueur) s'affichent chez tout le monde. Revanche lancée par le créateur. Chaque joueur met la même mise ; le survivant rafle une mise par joueur.
- Testé : partie complète à 3 téléphones (3 onglets), éliminations choisies à distance, écran de fin chez les trois.
- **Accueil aux couleurs de la table** (maquette) : la photo du bar est teintée et le bouton « Jouer », les pastilles d'icônes et la barre de rang prennent la couleur : Velours → rouge, Arcade néon → violet, Tapis vert → vert, Étoiles → bleu, Kribi → turquoise, les autres → or. Table en verre → accueil clair en plein jour, panneaux de verre et texte foncé. Les pastilles d'icônes sont maintenant pleines, colorées et brillantes.
- sw.js passé en fapfap-v9.

## Citations, certificat premium, météorite du CORA, contrôle de l'âge (06/10/2026)
- **Citations du quartier** en bas de l'accueil : 25 répliques drôles et camerounaises sur le jeu, signées par les personnages (« Le 3 ne prévient pas. Il frappe. » — Penalty ; « Même le délestage attend la fin de la manche. » — RALL ; « Le Fap Fap, c'est comme le benskin : il faut savoir quand freiner. »…). Elles défilent de droite à gauche une par une, dans un ordre mélangé, sans répétition avant d'avoir tout vu.
- **Certificat CORA / 33 Glacée refait** : parchemin, cadre doré à double filet avec ornements dans les coins, titre en feuille d'or avec reflet qui passe, ruban rouge qui se déroule (bleu pour la 33 Glacée), sceau de cire « FF » qui tombe avec un bruit sourd, rayons de lumière qui tournent derrière, carte qui arrive en basculant puis flotte doucement.
- **Ralenti et battement de cœur du dernier pli supprimés.**
- **CORA = météorite** : une météorite en feu tombe du ciel sur le 3 gagnant ; flash, ondes de choc, braises projetées, tremblement de toute la table, vibration, la carte devient dorée et prend feu (flammes animées). Son : sifflement de chute, explosion grave, crépitement du feu. **33 Glacée (double CORA) : deux météorites**, la deuxième plus grosse, tremblement deux fois plus fort, plus de braises. Le certificat arrive après l'impact. Aussi en Carré la Pute et en ligne.
- **Contrôle de l'âge** au premier lancement : « As-tu 18 ans ou plus ? » avec le logo ; « Oui » est mémorisé sur le téléphone ; « Non » affiche « Le jeu est fermé — Reviens quand tu auras 18 ans » et ferme le jeu (quand le navigateur le permet, par exemple dans l'appli installée). En bas : « Nul n'entre ici s'il est babylone. »
- sw.js passé en fapfap-v10.

## Vérification des victoires automatiques (06/10/2026)
- Une victoire automatique n'est plus comptée tout de suite : une fenêtre « Victoire automatique » montre les 5 cartes annoncées face cachée ; « Consulter les cartes » les retourne une par une, met en valeur celles qui font la victoire et explique pourquoi (« 3 + 4 + 5 + 3 + 6 = 21 : pas plus de 21 », « Trois 7 dans la même main », « Le 5 dans les 4 couleurs », « Les 5 cartes en Coubie ») ; puis « Confirmer ma victoire » (ou « Valider » si c'est l'adversaire). Le point n'est donné qu'après.
- Partout : duel contre l'ordinateur, duel en ligne (l'ami reçoit les cartes annoncées), Carré la Pute (y compris en ligne : toute la table voit les cartes). En ligne, si personne ne touche l'écran, la vérification se fait toute seule au bout de 25 s pour ne pas bloquer la partie.
- Mélange : vérifié, pas d'erreur. Règle : le gagnant de la manche mélange la suivante et le perdant choisit (partager / couper). En gagnant plusieurs manches de suite, c'est l'adversaire qui choisit. L'option « Toujours partager » (écran du choix et Paramètres) supprime le choix.
- sw.js passé en fapfap-v11.

## Écran de jeu sur téléphone
- La partie tient toujours dans la hauteur de l'écran (100dvh), en-tête collé en haut : le bouton menu reste visible.
- Sur les petits écrans (hauteur < 860 px puis < 720 px), les cartes, avatars et l'en-tête sont réduits.


## Comptes joueurs
- Chaque joueur est d'abord un invité (compte anonyme Supabase) : sa progression est sauvegardée dans la table players dès la première partie.
- « Mon compte » : sauvegarder la progression avec un code reçu par e-mail (ou Google quand il sera configuré) pour la retrouver sur un autre téléphone. La copie la plus récente gagne.
- Pseudo visible par les autres ; l'e-mail n'est jamais montré.
- Classement « Tout le quartier » (fonction fapfap_top) : pseudo, jetons, rang. Les jetons restent virtuels et calculés par le téléphone (pas anti-triche).


## Pages secondaires et traînée lumineuse
- Toutes les pages prennent l'ambiance du bar et la couleur de la table choisie (fond, titre, bouton retour, boutons, interrupteurs), avec des lumières floues qui dérivent et le logo en filigrane.
- Le doigt ou la souris laisse une traînée de lumière aux couleurs de la table (encre dorée sur la table en verre). Désactivable dans Paramètres, coupée avec « Réduire les animations ».


## Icônes illustrées sur l'accueil
- Les 6 tuiles de l'accueil ont des icônes dessinées en couleur avec relief (joueur couronné, coupe, cartes et palette, livre avec un 3, engrenage, nuage et bouclier), aux couleurs de la table, avec un halo et un léger flottement.


## Refonte Liquid Glass
- Tout le jeu passe au verre liquide (style iOS 26) : une seule scène derrière (le bar sur les menus, la table en plein écran pendant la partie), boutons, cartes, barres et fenêtres en verre épais qui courbe la scène sur ses bords (Chrome/Android) ou la grossit comme une lentille (iPhone).
- Réglages « Profondeur du verre » et « Givre » dans Paramètres.
- Accueil refait : barre d'onglets flottante (Accueil, Profil, Trophées, Décors, Réglages), compte et classement en haut.
- Tables en plein écran avec grain, halo de lumière et reflet. Menu et son sous l'encoche de l'iPhone, main posée sur un plateau de verre au-dessus de la barre d'accueil.
- Logo en pleine résolution (857 px).


## Cartes, poussière, nouvelles tables, victoire, coupe
- Cartes : coins ancrés à la même distance, symbole et nom de la couleur au centre sans chevauchement.
- Traînée du doigt : poussière lumineuse fine (particules qui dérivent, scintillent et s'éteignent).
- 5 nouvelles tables : Sous la lampe (salle noire, faisceau du plafonnier), Néon 2099 (soleil synthwave, grille néon), Partie en orbite (planète, nébuleuses), Cristal sur socle (dalle de verre, caustiques), Sous l'orage (pluie sur tout l'écran, ondes sur la table, éclairs et tonnerre). Chacune a sa musique et teinte le verre.
- Panneau de fin de match refait en verre (badge Victoire/Défaite, halo).
- Coupe : c'est celui qui distribue (le gagnant de la manche, tiré au sort en début de match) qui demande « Je partage ou tu coupes ? » ; l'autre répond « Partage ! » ou « Je coupe ».


## Claquer
- Quand la victoire de la manche est certaine d'après ce que toute la table a vu (on a le contrôle, et chaque carte restante est soit dans une couleur que les autres n'ont plus, soit la plus forte encore en jeu dans sa couleur), le bouton « Claquer ! » apparaît : le reste de la manche se joue d'un coup, très vite, les réponses des autres sont jouées automatiquement (la plus petite carte permise).
- Le jeu garde les 3 pour la fin (CORA, 33 Glacée).
- L'ordinateur claque aussi (avec une vanne), en duel comme en Carré ; en ligne, l'ami a le même bouton (en Carré, c'est le téléphone hôte qui vérifie que c'est permis).


## Boutique
- Onglet Boutique dans la barre du bas (Trophées passe dans Profil) ; on y entre aussi en touchant ses jetons.
- Uniquement du cosmétique : 10 tables d'exception (lave, galaxie, corps humain, cyberpunk, abysses, jungle, oasis, banquise, temple grec, métropole), effets CORA (météorite offerte, foudre, pluie de billets, feu d'artifice, trou noir), effets de claque, traînées, dos de cartes, cadres de portrait, titres, réactions du chat.
- Aperçu en direct avant achat, confirmation, puis l'article est équipé.



## Mode histoire « La Nuit des 33 »
- Accès : grande carte sur l'accueil, sous « Jouer ». 12 chapitres, un nouveau chapitre chaque jour (on peut débloquer tout de suite pour 2 000 jetons). Une fois l'histoire finie, on peut la recommencer sans attente ; les fins découvertes restent.
- Scènes façon roman graphique : portrait du personnage, bulle de dialogue en verre, texte qui s'écrit, pluie, éclairs ; touche pour avancer, « » » pour l'avance rapide jusqu'au prochain choix.
- 10 personnages (portraits découpés dans l'image fournie) : Bobo, Nadège, Mireille (la Dame de Mokolo, en réalité lieutenante de police infiltrée), Ekwalla, Papa Essomba, Junior « le Fantôme », Mama Ngono, Ta' Nkwenti, Biloa, Alhadji Moussa.
- Jauges cachées : Vice, Confiance, Cœur (Nadège / Mireille), Dette. Les choix changent la suite : prison ou fuite au chapitre 7, adversaires de la finale, fins disponibles.
- Chaque chapitre a un vrai match (duel ou Carré) contre les personnages, avec mise en jetons réelle et cote ; perdre = rejouer (mise perdue). Règles spéciales : pas de Passe en prison, blindage de Mama Ngono (un 3 dans ta main à chaque duel), oreillette de Junior (une carte adverse soufflée à chaque manche).
- 5 fins : La Légende de Melen, Le Nouveau Maître, Loin de Melen, Derrière les barreaux, Le traître trahi. Première fin gagnante : 50 000 jetons (35 000 si on a emprunté à Moussa) + titre « Roi du Cercle ». Finir l'histoire débloque la table « Le Sous-sol du Royal ». +300 jetons par chapitre terminé la première fois.

## Amis, ampoule, navigation (v24)
- Classement « Tout le quartier » : toucher un joueur ouvre sa fiche (rang, jetons, en ligne ou non) avec « Défier » et « Ajouter en ami ». Nouvel onglet « Mes amis » (en ligne en premier, pastille verte). Après une partie en ligne, bouton « Ajouter X en ami ». Accès aussi depuis « Avec un ami » → « Défier un de mes amis ».
- Défier : la partie est créée comme d'habitude ; si l'ami est en ligne, son téléphone affiche « X te défie ! » (Accepter / Pas maintenant), le défi est renvoyé pendant 1 minute ; s'il joue déjà, il refuse automatiquement. Ami hors ligne : envoi du lien par WhatsApp.
- Base : script supabase-amis.sql (le classement renvoie l'identifiant du joueur ; fonction fapfap_players pour rafraîchir les amis). Jamais d'e-mail exposé.
- Réglage « Ampoule au-dessus de la table » (activé par défaut) : une ampoule nue au bout de son fil, qui se balance, avec un faisceau, un cercle de lumière chaude qui décroît avec la distance et le reste de la pièce dans le noir ; de temps en temps le courant baisse (délestage). Seulement sur les tables qui n'ont pas déjà leur propre lumière (Sous la lampe, Sous-sol du Royal, Verre au soleil).
- Navigation : le bouton Retour du téléphone est géré entièrement par le jeu (fermer la fenêtre ouverte, page précédente, pause en partie ; à l'accueil, appuyer deux fois pour quitter) ; l'historique ne peut plus se désynchroniser. Double appui sur un bouton ignoré (400 ms). Après chaque changement de page, le jeu vérifie qu'une seule page est affichée.

## Sécurité (v25)
- Audit : la base refuse toute lecture/écriture sans compte ; un joueur ne peut ni lire ni modifier la ligne d'un autre, ni se créer une ligne au nom d'un autre. Le classement et la fonction des amis ne donnent que pseudo, jetons, réputation et identifiant (jamais l'e-mail).
- Faille corrigée : n'importe qui pouvait se donner 999 millions de jetons et passer n°1. Garde-fou côté serveur (supabase-securite.sql) : un nouveau compte démarre au maximum à 60 000 jetons, puis +200 000 jetons et +30 000 de réputation au maximum par 24 h ; la fenêtre de 24 h est tenue par le serveur ; perdre n'est jamais limité.
- Les pseudos, messages du chat et invitations venant des autres joueurs sont toujours affichés comme du texte (pas d'injection de code possible) ; l'initiale des médaillons aussi.
- Les raccourcis de test (?debug, ?story) ne marchent plus que sur l'ordinateur de développement.
- La bibliothèque Supabase (qui gère la connexion) est maintenant une copie fixe dans le jeu (vendor/supabase-2.117.3.js), plus chargée depuis un site extérieur à version variable.
- Politique de sécurité du contenu : la page ne peut exécuter que son propre code et ne parler qu'à son serveur Supabase.
- Limites connues : les parties se calculent sur les téléphones, donc un tricheur très motivé peut encore gagner 200 000 jetons par jour ou voir les cartes en ligne avec un jeu modifié ; seule une version où le serveur arbitre chaque partie l'empêcherait complètement.

## Qui distribue, déménagement (v28, 08/10/2026)
- Correction : le gagnant d'une manche distribue toujours la suivante, y compris la première manche d'une revanche (avant, chaque nouveau match ou revanche tirait le donneur au sort, donc en partie rapide l'ordinateur pouvait gagner puis « partager » sans te poser la question). Tirage au sort seulement pour le tout premier match contre un adversaire. Même règle en ligne (revanche) et en Carré (le gagnant de la manche distribue la suivante ; le gagnant de la partie distribue la première de la revanche).
- Lien officiel : https://fapfap-jeu.vercel.app/ (Vercel gratuit, mis à jour automatiquement depuis GitHub). Les invitations WhatsApp et l'image de partage pointent toujours vers ce lien. Sur les anciennes adresses (github.io, githack), un bandeau « Le jeu a déménagé » invite à sauvegarder sa progression puis à ouvrir le nouveau lien.
- Mode histoire d'une traite (08/10/2026) : plus d'attente d'un jour entre les chapitres ni de déblocage payant ; le chapitre suivant s'ouvre dès que le précédent est fini. La progression reste sauvegardée pour reprendre plus tard. La carte de l'accueil affiche le chapitre en cours dès l'ouverture du jeu.
- Barre du bas permanente (08/10/2026) : Accueil, Profil, Boutique, Décors et Réglages gardent la barre affichée ; toucher un onglet remplace la page (pas d'empilement), la bulle de verre suit l'onglet actif, et « Retour » depuis un onglet ramène toujours à l'Accueil. La barre se cache en partie, dans les pages secondaires (Jouer, histoire, trophées…) et dans les Réglages ouverts depuis la pause.
- Thème « Or sous verre » (08/10/2026), menu du jeu : chaque panneau de l'accueil et la barre du bas sont de l'or poli enfermé dans du verre épais (tranche lumineuse, frange colorée sur les bords, paillettes d'or dans le verre, reflets qui suivent l'inclinaison du téléphone, étincelles qui s'allument). Le bouton « Jouer » est un aquarium rempli d'or liquide aux 3/5 : la surface reste à niveau et penche doucement avec le téléphone, fait des vagues sous le doigt, des gouttes sautent ; remuer l'or n'ouvre pas la page, une simple touche oui. Le Roi d'or (masque d'or couronné) suit le doigt des yeux, cligne, parle et provoque ; le toucher fait apparaître « Ose me défier », qui lance un duel contre l'adversaire le plus fort débloqué. Réglage « Thème Or sous verre » pour revenir au verre classique. Les animations ne tournent que quand l'accueil est affiché.