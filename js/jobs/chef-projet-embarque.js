const CHEF_PROJET_SCENES = {
  brief: {
    time: '09:00',
    image: 'reunion',
    title: 'Le brief du client',
    description: "9 h 00, lancement du projet : une marque d'électroménager veut un robot de cuisine. Tes quatre jauges partent de 80 %.",
    speaker: 'Le client',
    line: 'Je veux un robot puissant, tactile, silencieux… et pas cher !',
    choices: [
      {
        label: 'Accepter toutes ses demandes pour décrocher le contrat',
        good: false,
        feedback: 'Erreur : tout vouloir à bas prix est impossible, tu signerais un projet déficitaire. Recadre le contrat (−15 % budget).',
        next: 'brief',
        effects: { budget: -15 },
        retry: true,
      },
      {
        label: 'Prioriser : fixer le prix cible, la puissance moteur et les fonctions clés',
        good: true,
        feedback: 'Cahier des charges réaliste (+5 % client).',
        next: 'design',
        effects: { client: 5 },
      },
    ],
  },

  design: {
    time: '10:00',
    image: 'openspace',
    title: "Conflit entre la 3D et l'électronique",
    description: 'Le designer 3D a dessiné un socle élégant… mais trop petit pour refroidir le moteur.',
    speaker: 'Sam, lead technique',
    line: "Le design et l'électronique ne sont pas d'accord. Tu tranches comment ?",
    choices: [
      {
        label: "Imposer le design 3D et dire à l'équipe électronique de se débrouiller",
        good: false,
        feedback: 'Erreur : le moteur surchaufferait et grillerait dès la première pâte à pain. Il faut refaire les plans 3D (−15 % équipe).',
        next: 'design',
        effects: { equipe: -15 },
        retry: true,
      },
      {
        label: 'Réunir 3D, mécanique et électronique pour élargir la ventilation du socle',
        good: true,
        feedback: 'Architecture mécanique et thermique validée (+5 % équipe).',
        next: 'validation',
        effects: { equipe: 5 },
      },
    ],
  },

  validation: {
    time: '11:00',
    image: 'demo',
    title: 'Validation avec le client',
    description: 'Avant de lancer les achats de composants, le client doit valider le produit et le devis.',
    speaker: 'Sam, lead technique',
    line: "Qu'est-ce qu'on présente au client ?",
    choices: [
      {
        label: 'Les plans CAO 3D bruts et les schémas électroniques',
        good: false,
        feedback: "Erreur : le client ne comprend pas le jargon technique et valide à l'aveugle. Il faut vulgariser (−10 % client).",
        next: 'validation',
        effects: { client: -10 },
        retry: true,
      },
      {
        label: 'Zapper la validation pour lancer la fabrication au plus vite',
        good: false,
        feedback: "Erreur : l'interface de l'écran ne lui plaît pas, il faudrait tout refaire. Reprends l'étude (−20 % budget).",
        next: 'validation',
        effects: { budget: -20 },
        retry: true,
      },
      {
        label: 'Une maquette visuelle des écrans, le fonctionnement et le devis final',
        good: true,
        feedback: 'Devis signé : budget et planning verrouillés.',
        next: 'achats',
        effects: {  },
      },
    ],
  },

  achats: {
    time: '12:00',
    image: 'carteVide',
    title: 'Alerte achats',
    description: "Le service achats appelle : la puce de l'écran tactile a six mois de retard de livraison.",
    speaker: 'Le service achats',
    line: "Sans cette puce, pas d'écran. On fait quoi ?",
    choices: [
      {
        label: 'Attendre la puce en espérant que le fournisseur accélère',
        good: false,
        feedback: "Erreur : en électronique, les délais s'allongent toujours et ton planning exploserait. Change de composant en urgence (−15 % délai).",
        next: 'achats',
        effects: { delai: -15 },
        retry: true,
      },
      {
        label: "Valider avec l'électronique et le logiciel une puce équivalente disponible en stock",
        good: true,
        feedback: 'Approvisionnement sécurisé, zéro retard.',
        next: 'avenant',
        effects: {  },
      },
    ],
  },

  avenant: {
    time: '13:30',
    image: 'reunion',
    title: "Le client change d'avis",
    description: 'À mi-projet, le client veut ajouter une balance intégrée sous le bol.',
    speaker: 'Le client',
    line: "Une balance sous le bol, ce serait génial. Vous pouvez l'ajouter ?",
    choices: [
      {
        label: 'Dire oui gratuitement pour garder une bonne relation',
        good: false,
        feedback: "Erreur : il faut ajouter des capteurs, modifier le moule 3D et coder l'écran. Renégocie (−15 % budget).",
        next: 'avenant',
        effects: { budget: -15 },
        retry: true,
      },
      {
        label: 'Refuser en bloc : le contrat est déjà signé',
        good: false,
        feedback: "Erreur : un refus sec agace le client et abîme la relation. Propose-lui une solution chiffrée (−15 % client).",
        next: 'avenant',
        effects: { client: -15 },
        retry: true,
      },
      {
        label: 'Chiffrer le surcoût des capteurs et décaler la livraison de 3 semaines',
        good: true,
        feedback: 'Avenant signé : marge et planning protégés (+10 % client).',
        next: 'test',
        effects: { client: 10 },
      },
    ],
  },

  test: {
    time: '14:30',
    image: 'cuisine',
    title: 'Test du prototype en cuisine',
    description: "Premier essai en conditions réelles : la vapeur fait bugger l'écran, et la lame met 2 secondes à s'arrêter quand on ouvre le couvercle.",
    speaker: 'Sam, lead technique',
    line: 'Le client attend son prototype. On le livre comme ça ?',
    choices: [
      {
        label: 'Corriger ça plus tard par une mise à jour : le client veut son prototype',
        good: false,
        feedback: "Erreur : risque de coupure grave et blocage à la certification CE, c'est interdit. Retour en atelier (−20 % client).",
        next: 'test',
        effects: { client: -20 },
        retry: true,
      },
      {
        label: "Ajouter un coupe-circuit mécanique au couvercle et rendre l'écran étanche",
        good: true,
        feedback: 'Produit sûr et prêt pour la norme CE (+5 % équipe).',
        next: 'usine',
        effects: { equipe: 5 },
      },
    ],
  },

  usine: {
    time: '15:30',
    image: 'usine',
    title: 'Lancement en usine',
    description: '5 000 robots vont être fabriqués : il faut préparer la chaîne de production.',
    speaker: "Le responsable de l'usine",
    line: "Qu'est-ce que vous nous envoyez pour lancer la production ?",
    choices: [
      {
        label: "Le prototype assemblé à la main, pour que l'usine le copie",
        good: false,
        feedback: 'Erreur : une usine a besoin de moules industriels et de tests automatiques. Crée le dossier usine (−15 % budget).',
        next: 'usine',
        effects: { budget: -15 },
        retry: true,
      },
      {
        label: 'Les fichiers de production et un banc de test moteur et écran',
        good: true,
        feedback: "Production lancée : chaque robot est testé en sortie d'usine.",
        next: 'sav',
        effects: {  },
      },
    ],
  },

  sav: {
    time: '16:30',
    image: 'labo',
    title: 'Retours du service après-vente',
    description: 'Les premiers robots sont vendus. 3 % des clients signalent une mise en sécurité quand ils pétrissent de la pâte à pain.',
    speaker: 'Le service après-vente',
    line: "Les clients se plaignent. Qu'est-ce qu'on leur répond ?",
    choices: [
      {
        label: "Répondre que le robot n'est pas fait pour les pâtes trop épaisses",
        good: false,
        feedback: 'Erreur : les mauvais avis tombent en ligne et le distributeur bloque les ventes. Gère la crise (−20 % client).',
        next: 'sav',
        effects: { client: -20 },
        retry: true,
      },
      {
        label: 'Analyser les retours moteur et déployer un réglage plus souple',
        good: true,
        feedback: 'Problème résolu à distance, le produit est fiable (+10 % client).',
        next: 'end',
        effects: { client: 10 },
      },
    ],
  },
};

const CHEF_PROJET_ADVICE = {
  brief: 'Un client veut souvent tout. Le chef de projet l’aide à choisir : un prix cible, des performances et quelques fonctions clés.',
  design: 'Quand deux métiers ne sont pas d’accord, on les réunit pour trouver une solution qui marche pour les deux.',
  validation: 'Pour faire valider un client, on lui montre ce qu’il comprend : une maquette des écrans, le fonctionnement et le prix.',
  achats: 'Face à une pénurie, on cherche un composant équivalent disponible, validé par l’électronique et le logiciel.',
  avenant: 'Une nouvelle demande se chiffre : coût en plus, délai en plus, puis le client décide.',
  test: 'La sécurité n’attend pas une mise à jour : un produit dangereux ne peut pas être livré.',
  usine: 'Une usine a besoin de fichiers de production et de bancs de test, pas d’un prototype à copier.',
  sav: 'Quand les clients se plaignent, on analyse les retours au lieu de leur donner tort.',
};

const CHEF_PROJET_SALARY = {
  median: 3687,
  reference: 'Ingénieur / Ingénieure R&D en industrie',
  url: 'https://www.orientation-regionsud.fr/metiers/ingenieur-ingenieure-rd-en-industrie',
};

const CHEF_PROJET_ANSWERS = [
  {
    match: /^(?=.*(ingenieur|developpeur|technicien))(?=.*(diff|chef|projet))/,
    reply: 'L’ingénieur ou le développeur embarqué conçoit une partie du produit : la carte électronique ou le programme. Le chef de projet, lui, organise l’ensemble : planning, budget, équipe et relation avec le client. Beaucoup de chefs de projet ont d’abord été ingénieurs.',
  },
  {
    match: /qualite|competence|savoir etre|savoir-faire/,
    reply: 'Il faut être organisé, rigoureux, bon communicant, calme face aux imprévus, et avoir une solide culture technique : électronique, programmation en C, objets connectés. L’anglais technique est aussi très utile.',
  },
  {
    match: /etude|formation|diplome|ecole|apprendre|bac/,
    reply: 'Le plus courant est un bac+5 : école d’ingénieurs ou master en électronique, informatique embarquée ou systèmes. Au lycée, les spécialités maths, physique ou NSI, ou un bac STI2D, sont de bons points de départ. Beaucoup deviennent chefs de projet après quelques années comme ingénieur.',
  },
  {
    match: /salaire|combien gagne|paye|paie|argent/,
    reply: () => `Selon Orientation Région Sud (données Insee 2022), la moitié des ingénieurs R&D en industrie, la famille de métiers du chef de projet systèmes embarqués, gagnent plus de ${euros(CHEF_PROJET_SALARY.median)} net par mois à temps plein. Le salaire dépend ensuite de l’expérience, de l’entreprise et du secteur.`,
  },
  {
    match: /horaire|heures|soir|week[- ]?end/,
    reply: 'Les horaires sont plutôt des horaires de bureau, avec des périodes plus chargées avant une livraison ou une certification.',
  },
  {
    match: /langage|code|programm|c\+\+|python|rust/,
    reply: 'Dans l’embarqué, on programme surtout en C et en C++, parfois en Rust. Python sert souvent pour les tests et les outils. Le chef de projet ne code pas forcément, mais il doit comprendre ce que fait l’équipe.',
  },
  {
    match: /norme|certif|marquage|\bcem\b|electromagnet/,
    reply: 'Un appareil électronique vendu en Europe doit porter le marquage CE. Il passe des tests en laboratoire, par exemple de compatibilité électromagnétique : il ne doit pas perturber les autres appareils. Certains secteurs, comme l’automobile ou le médical, ont des normes encore plus strictes.',
  },
  {
    match: /securite|cyber|pirate|hack/,
    reply: 'Un objet connecté peut être attaqué comme un ordinateur. On protège les communications, on signe les mises à jour et on teste la sécurité avant de livrer.',
  },
  {
    match: /jauge|pourcent|%/,
    reply: 'Les quatre jauges représentent ce qu’un chef de projet doit protéger : la satisfaction du client, l’énergie de l’équipe, le budget et le délai. Chaque erreur en fait baisser une.',
  },
  {
    match: /usine|production|industri|fabric/,
    reply: 'Passer du prototype à l’usine s’appelle l’industrialisation : on fournit des fichiers de production, des moules et des bancs de test pour que chaque produit fabriqué soit contrôlé.',
  },
  {
    match: /\bsav\b|apres-vente|apres vente|retour/,
    reply: 'Le service après-vente fait remonter les problèmes des clients. Sur un produit connecté, on peut souvent les corriger à distance par une mise à jour du logiciel.',
  },
  {
    match: /\b3d\b|cao|mecani|design/,
    reply: 'Un produit embarqué mélange design, mécanique, électronique et logiciel. Le chef de projet fait dialoguer ces métiers : un joli boîtier ne sert à rien si le moteur surchauffe dedans.',
  },
  {
    match: /devis|avenant|contrat/,
    reply: 'Le devis fixe le prix et le contenu. Quand le client demande quelque chose de nouveau en cours de route, on signe un avenant : un complément au contrat avec le surcoût et le nouveau délai.',
  },
  {
    match: /planning|retard|delai|budget|risque/,
    reply: 'Le chef de projet tient le planning et le budget, repère les risques tôt et prévoit des marges. Quand un retard arrive, il prévient le client vite, avec un nouveau planning réaliste.',
  },
  {
    match: /client|negoci/,
    reply: 'Avec le client, il faut comprendre le besoin, l’écrire clairement, et quand une nouvelle demande arrive, expliquer son impact sur le délai et le coût pour qu’il décide en connaissance de cause.',
  },
  {
    match: /equipe|collegue|conflit|manag/,
    reply: 'Le chef de projet coordonne des personnes aux métiers différents : électroniciens, développeurs, testeurs. Il organise des points réguliers, règle les tensions en s’appuyant sur les faits et protège l’équipe de la surcharge.',
  },
  {
    match: /outil|logiciel|oscillo|jira|git/,
    reply: 'Côté gestion : planning, tableau de tâches, suivi des bugs. Côté technique, l’équipe utilise Git pour le code, et au labo un oscilloscope, un multimètre et des bancs de test.',
  },
  {
    match: /sophia|nice|cote d.?azur|region|ou travailler|entreprise/,
    reply: 'Près de Nice, la technopole de Sophia Antipolis rassemble beaucoup d’entreprises d’électronique, de télécoms et d’informatique. Ailleurs, on trouve ce métier dans l’automobile, l’aéronautique, le spatial, la santé ou l’énergie.',
  },
  {
    match: /stress|pression|difficile|dur/,
    reply: 'La pression vient surtout des délais, des imprévus techniques et des tests de certification. L’organisation et la communication aident beaucoup à la gérer.',
  },
  {
    match: /avantage|plaisir|pourquoi aimer/,
    reply: 'On voit un produit naître, du cahier des charges jusqu’à l’objet qui fonctionne. On travaille avec des personnes très variées et sur des sujets utiles : santé, environnement, transport.',
  },
  {
    match: /inconvenient|contrainte|probleme/,
    reply: 'Les contraintes : la pression des délais, les pénuries de composants, les normes à respecter, et la responsabilité quand quelque chose ne va pas.',
  },
  {
    match: /embarque|systeme/,
    reply: 'Un système embarqué, c’est un petit ordinateur caché dans un objet : une voiture, une montre, un pacemaker, un satellite, un capteur connecté. Il est programmé pour une tâche précise, souvent avec peu d’énergie et de mémoire.',
  },
  {
    match: /chef|projet|metier|travail|role/,
    reply: 'Le chef de projet systèmes embarqués pilote la création d’un produit électronique intelligent : il comprend le besoin du client, organise l’équipe, tient le planning et le budget, et fait valider le produit jusqu’à sa livraison.',
  },
  {
    match: /pourquoi|perdu|fin|resultat/,
    reply: state => `Ta fin dépend des quatre jauges : client ${state.client} %, équipe ${state.equipe} %, budget ${state.budget} %, délai ${state.delai} %. Si toutes restent au-dessus de 50 %, le robot est un succès.`,
  },
  {
    match: /bonjour|salut|hello/,
    reply: 'Salut ! Je suis Sam, lead technique. Pose-moi tes questions sur le métier de chef de projet systèmes embarqués ou sur le robot.',
  },
];

const CHEF_PROJET_GAUGES = [
  { key: 'client', label: 'Client' },
  { key: 'equipe', label: 'Équipe' },
  { key: 'budget', label: 'Budget' },
  { key: 'delai', label: 'Délai' },
];

const CHEF_PROJET_EMBARQUE = {
  name: 'Chef de projet systèmes embarqués',
  tagline: 'un projet de robot de cuisine',
  pitch: 'Pilote la création d’un robot de cuisine',
  icon: 'i-chip',
  sector: 'numerique',
  keywords: /embarque|chef de projet|systemes?\b|electronique|objet connecte|robot/,
  colleague: 'Sam',
  endHeading: 'Bilan du projet',
  chatSubtitle: 'Pose toutes tes questions sur le projet et le métier de chef de projet',
  journalTitle: 'Ton journal de projet',
  greeting: 'Salut ! Je suis Sam, lead technique. Pose-moi une question sur le robot ou sur le métier.',
  defaultAdvice: 'Lis la situation et demande-toi ce qui protège à la fois le client, l’équipe, le budget et le délai.',
  fallback: 'Je peux répondre aux questions sur le métier : rôle, études, qualités, salaire, langages, normes, devis, usine, après-vente, planning, travail en équipe, et où travailler près de Nice.',

  info: {
    salary: CHEF_PROJET_SALARY,
    summary: 'Le chef de projet systèmes embarqués pilote la création d’un produit électronique intelligent : objet connecté, équipement médical, système de voiture ou de satellite. Il ne fait pas tout lui-même : il organise l’équipe, tient le planning et le budget, et fait le lien avec le client.',
    missions: [
      'Comprendre le besoin du client et écrire le cahier des charges',
      'Construire le planning, suivre le budget et anticiper les risques',
      'Coordonner les équipes matériel, logiciel et test',
      'Faire valider le produit : tests, normes, certification',
      'Présenter l’avancement au client et à la direction',
    ],
    qualities: [
      'Organisation et rigueur',
      'Communication et diplomatie',
      'Culture technique : électronique, programmation en C, objets connectés',
      'Calme face aux imprévus',
      'Anglais technique',
    ],
    studies: [
      'Au lycée : spécialités maths, physique ou NSI, ou bac STI2D',
      'Bac+5 : école d’ingénieurs ou master en électronique, informatique embarquée ou systèmes',
      'Souvent quelques années comme ingénieur embarqué avant de devenir chef de projet',
    ],
    conditions: [
      'Bureau et laboratoire, en équipe',
      'Horaires de bureau, avec des pics avant les livraisons',
      'Automobile, aéronautique, spatial, santé, énergie, objets connectés',
      'Près de Nice : la technopole de Sophia Antipolis',
    ],
  },

  order: ['brief', 'design', 'validation', 'achats', 'avenant', 'test', 'usine', 'sav'],
  scenes: CHEF_PROJET_SCENES,
  advice: CHEF_PROJET_ADVICE,
  answers: CHEF_PROJET_ANSWERS,
  gauges: CHEF_PROJET_GAUGES,
  gaugeAlert: 50,
  limits: { client: [0, 100], equipe: [0, 100], budget: [0, 100], delai: [0, 100] },

  newState() {
    return {
      step: 'brief',
      time: '09:00',
      client: 80,
      equipe: 80,
      budget: 80,
      delai: 80,
      notes: [],
      feedback: null,
    };
  },

  clock(step, state) {
    return this.scenes[step]?.time || state.time;
  },

  describe(scene) {
    return scene.description;
  },

  image(step) {
    return this.scenes[step]?.image || 'reunion';
  },

  endImage(state) {
    return this.lowGauges(state).length ? 'reunion' : 'usine';
  },

  endTime() {
    return '18:00';
  },

  lowGauges(state) {
    return this.gauges.filter(({ key }) => state[key] <= this.gaugeAlert).map(({ label }) => label.toLowerCase());
  },

  ending(state) {
    const low = this.lowGauges(state);
    if (!low.length) return ['Succès : robot commercialisé et rentable', 'Toutes tes jauges sont restées au-dessus de 50 % : le robot est en magasin, le client est satisfait et l’équipe est fière du projet.'];
    return ['Fin mitigée', `Le produit est sorti, mais avec une marge ou une équipe épuisée : ${low.length > 1 ? 'jauges' : 'jauge'} ${low.join(', ')} à 50 % ou moins. Rejoue pour trouver un meilleur équilibre.`];
  },
};
