const BARMAN_SCENES = {
  opening: {
    time: "17:45",
    image: "calme",
    title: "Le bar est encore fermé",
    description: "Tu arrives avant la soirée. Tout se passe dans ce bar : c'est toi qui décides comment le préparer.",
    speaker: "Alex",
    line: "On ouvre bientôt ! À quelle heure veux-tu laisser entrer les clients ?",
    choices: [
      {
        label: "Ouvrir à 18 h",
        good: true,
        feedback: "Tu as du temps pour préparer le service.",
        next: "prep",
        effects: { queue: -1 },
      },
      {
        label: "Ouvrir à 19 h",
        good: false,
        feedback: "Les clients attendent déjà devant la porte, et tu n'as pas eu le temps de ranger.",
        next: "opening",
        retry: true,
        effects: { queue: 2, stress: 1, mess: 2, openedLate: true },
      },
      {
        label: "Ouvrir à 18 h 30",
        good: true,
        feedback: "Tu prends un peu de temps sans trop retarder l'ouverture.",
        next: "prep",
        effects: { queue: 1 },
      },
    ],
  },

  prep: {
    time: "18:05",
    image: "calme",
    title: "Préparer le comptoir",
    description: "Verres, tables, boissons : le service va bientôt commencer.",
    descriptionWhenMessy: "Tu as ouvert tard : verres sales et tables en désordre, alors que les premiers clients entrent déjà.",
    speaker: "Alex",
    line: "On fait quoi en priorité pour être prêts ?",
    choices: [
      {
        label: "Nettoyer les tables et les verres",
        good: true,
        feedback: "La salle est propre et accueillante.",
        next: "arrival",
        effects: { mess: -2 },
      },
      {
        label: "Vérifier le stock de boissons",
        good: true,
        feedback: "Tu anticipes les commandes à venir.",
        next: "arrival",
        effects: { stock: 2 },
      },
      {
        label: "Discuter avant de préparer",
        good: false,
        feedback: "Tu prends du retard dans la préparation.",
        next: "prep",
        retry: true,
        effects: { queue: 1, mess: 1 },
      },
    ],
  },

  arrival: {
    time: "18:25",
    image: "client",
    title: "Un client entre dans le bar",
    description: "Un jeune client s'installe devant toi, au comptoir. Tu es derrière le bar.",
    speaker: "Le client",
    line: "Salut ! Je viens juste de m'asseoir.",
    choices: [
      {
        label: "L'accueillir avec le sourire",
        good: true,
        feedback: "Le client se sent bienvenu.",
        next: "order",
        effects: { trust: 1 },
      },
      {
        label: "Lui demander directement sa commande",
        good: true,
        feedback: "Tu vas droit au but, avec efficacité.",
        next: "order",
        effects: {  },
      },
      {
        label: "Continuer le rangement sans parler",
        good: false,
        feedback: "Le client attend sans savoir si tu l'as vu.",
        next: "arrival",
        retry: true,
        effects: { queue: 1, trust: -1 },
      },
    ],
  },

  order: {
    time: "18:35",
    image: "client",
    title: "Le client veut un Coca",
    description: "Le client te regarde depuis le comptoir. Il attend sa commande.",
    speaker: "Le client",
    line: "Un Coca, s'il te plaît ! Tu peux me le servir ?",
    choices: [
      {
        label: "Oui, je vais préparer le Coca",
        good: true,
        feedback: "Tu acceptes de servir sa boisson.",
        next: "bottle",
        effects: {  },
      },
      {
        label: "Proposer une autre boisson sans alcool",
        good: true,
        feedback: "Tu proposes une option, mais tu dois vérifier son choix.",
        next: "bottle",
        effects: { trust: 0 },
      },
      {
        label: "Refuser sans explication",
        good: false,
        feedback: "Le client ne comprend pas ton refus.",
        next: "recovery",
        effects: { refused: true, trust: -2, queue: 1 },
      },
    ],
  },

  recovery: {
    time: "18:38",
    image: "client",
    title: "Le client est contrarié",
    description: "Ce n'est pas terminé : tu peux encore rétablir la relation.",
    speaker: "Le client",
    line: "Pourquoi tu ne veux pas me servir ?",
    choices: [
      {
        label: "M'excuser et préparer son Coca",
        good: true,
        feedback: "Tu as su corriger ton refus.",
        next: "bottle",
        effects: { apology: true, trust: 1 },
      },
      {
        label: "Expliquer calmement et proposer de l'eau",
        good: true,
        feedback: "Le client apprécie au moins une explication.",
        next: "rush",
        effects: { apology: true, trust: 0 },
      },
      {
        label: "Ignorer sa demande",
        good: false,
        feedback: "Le client quitte le comptoir mécontent.",
        next: "recovery",
        retry: true,
        effects: { ignored: true, trust: -2, queue: 1 },
      },
    ],
  },

  bottle: {
    time: "18:40",
    image: "bouteilles",
    title: "Quelle bouteille prends-tu ?",
    description: "Tu vois une bouteille de cola, un verre vide et une bouteille d'alcool. Ne te trompe pas de produit.",
    speaker: "Alex",
    line: "Le client veut un Coca. Regarde bien les bouteilles !",
    choices: [
      {
        label: "Choisir la bouteille de Coca",
        good: true,
        feedback: "Bonne commande : le client reçoit sa boisson.",
        next: "rush",
        effects: { served: true, trust: 1, queue: -1 },
      },
      {
        label: "Choisir la bouteille d'alcool",
        good: false,
        feedback: "Ce n'est pas sa commande ! Recommence : il attend un Coca.",
        next: "bottle",
        effects: { wrong: 1 },
        retry: true,
      },
      {
        label: "Demander confirmation au client",
        good: true,
        feedback: "Il confirme qu'il souhaite un Coca.",
        next: "bottle",
        effects: { trust: 0 },
        retry: true,
      },
    ],
  },

  rush: {
    time: "20:00",
    image: "affluence",
    title: "Le bar se remplit !",
    description: "Plusieurs groupes arrivent et le comptoir devient très animé.",
    speaker: "Alex",
    line: "Ça commence à être chargé ! Comment on s'organise ?",
    choices: [
      {
        label: "Appeler un collègue en renfort",
        good: true,
        feedback: "À deux, le service devient plus fluide.",
        next: "organization",
        effects: { team: 1, queue: -2, stress: -1 },
      },
      {
        label: "Répartir les commandes par priorité",
        good: true,
        feedback: "Tu limites les oublis et organises le travail.",
        next: "organization",
        effects: { queue: -1, stress: 0 },
      },
      {
        label: "Essayer de tout faire tout seul",
        good: false,
        feedback: "Tu prends du retard et tu te fatigues.",
        next: "rush",
        retry: true,
        effects: { queue: 2, stress: 2 },
      },
    ],
  },

  organization: {
    time: "20:20",
    image: "affluence",
    title: "Des commandes arrivent ensemble",
    description: "Une table de quatre personnes attend, pendant que d'autres clients demandent l'addition.",
    speaker: "Alex",
    line: "Quelle est ta prochaine action pour garder le rythme ?",
    choices: [
      {
        label: "Prendre les commandes une par une",
        good: true,
        feedback: "Tu restes méthodique, même si cela prend du temps.",
        next: "impatient",
        effects: { queue: 0 },
      },
      {
        label: "Servir les boissons déjà prêtes",
        good: true,
        feedback: "Tu libères le comptoir rapidement.",
        next: "impatient",
        effects: { queue: -1 },
      },
      {
        label: "Accepter toutes les commandes d'un coup",
        good: false,
        feedback: "Tu risques d'oublier des détails.",
        next: "organization",
        retry: true,
        effects: { queue: 1, stress: 1 },
      },
    ],
  },

  impatient: {
    time: "20:45",
    image: "client",
    title: "Un client trouve l'attente trop longue",
    description: "Une table commence à s'impatienter. Les choix précédents déterminent à quel point la situation est tendue.",
    speaker: "Le client",
    line: "Ça fait un moment qu'on attend ! Où en est notre commande ?",
    choices: [
      {
        label: "M'excuser et annoncer un délai réaliste",
        good: true,
        feedback: "Tu apaises les tensions par la communication.",
        next: "spillage",
        effects: { trust: 1, apology: true, queue: -1 },
      },
      {
        label: "Demander à Alex de vérifier la commande",
        good: true,
        feedback: "Le client est rassuré d'être pris en charge.",
        next: "spillage",
        effects: { team: 1, queue: -1 },
      },
      {
        label: "Dire de patienter sans explication",
        good: false,
        feedback: "Le client a l'impression de ne pas être écouté.",
        next: "impatient",
        retry: true,
        effects: { trust: -2, ignored: true, queue: 1 },
      },
    ],
  },

  spillage: {
    time: "21:05",
    image: "verre",
    title: "CRAC ! Un verre se brise",
    description: "Gros plan sur le sol du même bar : des morceaux de verre et du liquide sont au milieu du passage.",
    speaker: "Alex",
    line: "Attention ! Il y a du verre partout. Quelle est ta première réaction ?",
    choices: [
      {
        label: "Baliser la zone puis nettoyer",
        good: true,
        feedback: "Tu sécurises le passage et nettoies correctement.",
        next: "safety",
        effects: { safe: true, mess: -2, broken: true },
      },
      {
        label: "Prévenir Alex puis chercher le balai",
        good: true,
        feedback: "Tu demandes du renfort et sécurises ensuite la zone.",
        next: "safety",
        effects: { safe: true, team: 1, mess: -1, broken: true },
      },
      {
        label: "Ignorer et continuer à servir",
        good: false,
        feedback: "Danger ! Un client peut glisser sur les débris.",
        next: "incident",
        effects: { safe: false, broken: true, mess: 3 },
      },
    ],
  },

  incident: {
    time: "21:12",
    image: "verre",
    title: "Un client manque de tomber",
    description: "Le passage est dangereux et le service doit s'arrêter pour sécuriser les lieux.",
    speaker: "Alex",
    line: "On ne peut pas laisser ça comme ça. Il faut agir maintenant !",
    choices: [
      {
        label: "Arrêter le service et sécuriser le sol",
        good: true,
        feedback: "Tu réagis enfin pour protéger les clients.",
        next: "safety",
        effects: { safe: true, stress: 1, mess: -1 },
      },
      {
        label: "Faire intervenir un responsable",
        good: true,
        feedback: "Un adulte responsable prend en charge l'incident.",
        next: "safety",
        effects: { safe: true, team: 1, stress: 1 },
      },
      {
        label: "Continuer malgré le danger",
        good: false,
        feedback: "L'incident s'aggrave : la soirée est interrompue.",
        next: "endIncident",
        effects: { safe: false, ignored: true },
      },
    ],
  },

  safety: {
    time: "21:20",
    image: "nettoyage",
    title: "Le passage est de nouveau accessible",
    description: "On retrouve le même sol du bar, nettoyé ou en cours de nettoyage selon ton choix.",
    speaker: "Alex",
    line: "Merci d'avoir pris la sécurité au sérieux. On reprend comment ?",
    choices: [
      {
        label: "Vérifier que la zone est vraiment sûre",
        good: true,
        feedback: "Tu protèges les clients avant de reprendre.",
        next: "stock",
        effects: { safe: true, mess: -1 },
      },
      {
        label: "Reprendre progressivement les commandes",
        good: true,
        feedback: "Tu relances le service sans te précipiter.",
        next: "stock",
        effects: { queue: -1 },
      },
      {
        label: "Aller très vite pour rattraper le retard",
        good: false,
        feedback: "La précipitation augmente la fatigue.",
        next: "safety",
        retry: true,
        effects: { stress: 1, queue: -1 },
      },
    ],
  },

  stock: {
    time: "21:35",
    image: "bouteilles",
    title: "Une boisson manque en réserve",
    description: "Tu constates que le stock prévu n'est pas suffisant pour une nouvelle commande.",
    speaker: "Alex",
    line: "On n'a plus cette boisson au frais. Que peut-on proposer ?",
    choices: [
      {
        label: "Vérifier le stock et proposer une alternative",
        good: true,
        feedback: "Tu renseignes correctement le client.",
        next: "payment",
        effects: { trust: 1, stock: 1 },
      },
      {
        label: "Prévenir le client et lui laisser choisir",
        good: true,
        feedback: "Tu fais preuve de transparence.",
        next: "payment",
        effects: { trust: 1 },
      },
      {
        label: "Promettre une boisson indisponible",
        good: false,
        feedback: "Le client attend un produit que tu n'as pas.",
        next: "stock",
        retry: true,
        effects: { queue: 1, trust: -1 },
      },
    ],
  },

  payment: {
    time: "22:05",
    image: "client",
    title: "C'est le moment de régler",
    description: "Des clients demandent l'addition avant de rentrer chez eux.",
    speaker: "Le client",
    line: "On peut régler, s'il vous plaît ?",
    choices: [
      {
        label: "Vérifier l'addition avant l'encaissement",
        good: true,
        feedback: "Tu évites les erreurs de caisse.",
        next: "lastcall",
        effects: { payment: true, trust: 1 },
      },
      {
        label: "Encaisser rapidement puis remettre un reçu",
        good: true,
        feedback: "Tu gardes un service efficace.",
        next: "lastcall",
        effects: { payment: true },
      },
      {
        label: "Deviner le montant sans vérifier",
        good: false,
        feedback: "Tu risques une erreur de caisse.",
        next: "payment",
        retry: true,
        effects: { payment: false, trust: -1 },
      },
    ],
  },

  lastcall: {
    time: "22:20",
    image: "desordre",
    title: "Derniers clients, dernier effort",
    description: "Le bar se vide. Les verres sales et les tables doivent être pris en charge.",
    speaker: "Alex",
    line: "On peut déjà avancer le rangement. Tu préfères quoi ?",
    choices: [
      {
        label: "Débarrasser les tables et trier les verres",
        good: true,
        feedback: "La salle est déjà plus propre.",
        next: "closing",
        effects: { mess: -2 },
      },
      {
        label: "Faire le tour des clients pour vérifier",
        good: true,
        feedback: "Tu t'assures que personne n'a été oublié.",
        next: "closing",
        effects: { trust: 1, queue: -1 },
      },
      {
        label: "Attendre que tout le monde parte",
        good: false,
        feedback: "Le rangement s'accumule pour la fermeture.",
        next: "lastcall",
        retry: true,
        effects: { mess: 1 },
      },
    ],
  },

  closing: {
    time: "22:45",
    image: "desordre",
    title: "Il est temps de fermer",
    description: "Dernière mission : préparer le bar pour l'équipe du lendemain.",
    speaker: "Alex",
    line: "On termine bien notre soirée ?",
    choices: [
      {
        label: "Nettoyer, ranger et vérifier la caisse",
        good: true,
        feedback: "Le bar est prêt pour demain.",
        next: "end",
        effects: { mess: -3, closed: true },
      },
      {
        label: "Ranger l'essentiel avant de partir",
        good: true,
        feedback: "Tu ranges une partie du bar, mais il reste des tâches.",
        next: "end",
        effects: { mess: -1, closed: false },
      },
      {
        label: "Partir sans ranger",
        good: false,
        feedback: "L'équipe du lendemain retrouve beaucoup de travail.",
        next: "closing",
        retry: true,
        effects: { mess: 3, closed: false },
      },
    ],
  },
};

const BARMAN_ADVICE = {
  opening: "Tu peux ouvrir plus tôt pour mieux préparer le bar. Un barman anticipe toujours le début du service.",
  prep: "Avant le service, un barman nettoie le comptoir, prépare son poste et vérifie les stocks.",
  arrival: "Un bon accueil met les clients à l’aise. Regarde-les, souris et parle clairement.",
  order: "Le client a demandé un Coca. Un barman reformule la commande et sert la bonne boisson.",
  bottle: "Ici, il faut choisir le Coca. En vrai, un barman vérifie toujours la commande avant de servir.",
  rush: "Quand il y a beaucoup de monde, tu peux demander de l’aide, organiser les priorités ou avancer étape par étape.",
  organization: "Pour mieux gérer l’affluence, commence souvent par les commandes rapides et communique avec les clients.",
  impatient: "Reste calme, excuse-toi et donne un délai réaliste. La communication est essentielle.",
  spillage: "La priorité est la sécurité : empêcher les gens de marcher sur les débris puis nettoyer.",
  incident: "Un barman doit protéger la zone, ramasser les morceaux avec le bon matériel et vérifier que personne ne se blesse.",
  safety: "Une fois le sol sécurisé, tu peux reprendre le service avec plus de sérénité.",
  stock: "Si un produit manque, explique-le honnêtement et propose une alternative.",
  payment: "À l’encaissement, vérifie toujours le montant et reste poli jusqu’au bout.",
  lastcall: "En fin de service, débarrasse, vérifie les besoins des derniers clients et prépare doucement la fermeture.",
  closing: "À la fermeture, un barman range le poste, nettoie, vérifie la caisse et prépare le lendemain.",
};

const BARMAN_SALARY = {
  median: 1627,
  reference: 'Barman / Barmaid',
  url: 'https://www.orientation-regionsud.fr/metiers/barman-barmaid',
};

const BARMAN_ANSWERS = [
  {
    match: /^(?=.*serveur)(?=.*(diff|bar))/,
    reply: 'Le barman travaille surtout au comptoir et prépare les boissons. Le serveur s’occupe davantage du service en salle et des tables. Dans un petit bar, une même personne peut faire un peu des deux.',
  },
  {
    match: /qualite|competence|savoir etre|savoir-faire/,
    reply: 'Les qualités utiles sont : être poli, rapide, organisé, attentif, résistant au stress, à l’aise avec les clients, propre dans son travail et capable de coopérer avec l’équipe.',
  },
  {
    match: /etude|formation|diplome|ecole|apprendre/,
    reply: 'On peut découvrir ce métier par des formations en hôtellerie-restauration, par un CAP ou un bac pro, ou directement sur le terrain avec de l’expérience. On apprend beaucoup en pratique.',
  },
  {
    match: /salaire|combien gagne|paye|paie|argent|pourboire/,
    reply: () => `Selon Orientation Région Sud (données Insee 2022), la moitié des barmans à temps plein gagnent plus de ${euros(BARMAN_SALARY.median)} net par mois. Le salaire varie selon le lieu, l’expérience, les horaires et les pourboires.`,
  },
  {
    match: /horaire|heures|soir|week[- ]?end|nuit/,
    reply: 'Les horaires d’un barman sont souvent décalés : fins de journée, soirées, week-ends et parfois nuits. Il faut être prêt à travailler quand les clients sortent.',
  },
  {
    match: /client|accueil|politesse|plainte|reclam/,
    reply: 'Un barman écoute, reste calme, reformule la demande, s’excuse si besoin et cherche une solution simple. Une bonne relation client compte beaucoup dans ce métier.',
  },
  {
    match: /stress|pression|rush|affluence|monde/,
    reply: 'Quand il y a du monde, le barman doit garder son calme, prioriser les commandes, communiquer avec ses collègues et éviter de se précipiter au point de faire des erreurs.',
  },
  {
    match: /boisson|coca|alcool|biere|vin|soft/,
    reply: 'Le barman sert des boissons avec ou sans alcool. Il doit connaître les produits, écouter la commande, respecter les doses et ne jamais confondre une boisson sans alcool avec une boisson alcoolisée.',
  },
  {
    match: /cocktail|recette|melange|dose|shaker|mixologie/,
    reply: 'Pour préparer un cocktail, un barman suit une recette, dose correctement les ingrédients, utilise le bon matériel et garde le poste propre. La précision compte autant que la rapidité.',
  },
  {
    match: /hygiene|propre|nettoyage|menage|vaisselle/,
    reply: 'L’hygiène est essentielle : nettoyer le comptoir, les verres, les outils, jeter les déchets, essuyer les surfaces et garder une zone de travail propre.',
  },
  {
    match: /secur|verre|casse|incident|gliss|bless/,
    reply: 'La sécurité passe avant tout : enlever les objets dangereux, nettoyer un verre cassé, signaler un sol glissant et faire attention aux clients comme aux collègues.',
  },
  {
    match: /stock|rupture|manque|produit/,
    reply: 'Le barman vérifie les stocks, repère les ruptures, signale les produits manquants et propose une alternative si nécessaire. Anticiper évite beaucoup de problèmes.',
  },
  {
    match: /caisse|encaisser|paiement|addition|rendu monnaie|terminal|tpe/,
    reply: 'À la caisse, il faut vérifier la commande, annoncer le montant, encaisser correctement et rendre la monnaie juste. C’est une étape importante de confiance.',
  },
  {
    match: /equipe|collegue|entraide/,
    reply: 'Le travail d’équipe est très important. Demander de l’aide au bon moment permet de mieux gérer l’affluence et d’éviter les erreurs.',
  },
  {
    match: /fatigue|difficile|dur|debout/,
    reply: 'Le métier peut être physique : on reste souvent debout, on bouge beaucoup et les soirées intenses peuvent être fatigantes. Il faut de l’endurance.',
  },
  {
    match: /avantage|plaisir|pourquoi aimer/,
    reply: 'Les points positifs sont le contact avec les gens, l’ambiance, le rythme vivant, la créativité pour les boissons et la satisfaction de bien gérer une soirée.',
  },
  {
    match: /inconvenient|contrainte|difficulte|probleme/,
    reply: 'Les contraintes sont les horaires décalés, le stress pendant les coups de feu, la fatigue, les imprévus et la nécessité de toujours rester poli et concentré.',
  },
  {
    match: /age|mineur|loi|legal/,
    reply: 'Les règles peuvent varier, mais servir de l’alcool implique de respecter la loi, l’âge minimum des clients et les consignes de l’établissement.',
  },
  {
    match: /barman|bartender|metier|travail|role/,
    reply: 'Le métier de barman consiste à accueillir les clients, prendre ou préparer les commandes, servir les boissons, gérer le comptoir, encaisser, maintenir le bar propre, travailler avec l’équipe et veiller à la sécurité.',
  },
  {
    match: /point|score/,
    reply: 'Le bilan montre comment tes décisions ont influencé le service, les clients, la sécurité et le rangement. Il n’y a pas de note dans cette version.',
  },
  {
    match: /pourquoi|perdu|fin|resultat/,
    reply: state => `Tes choix ont influencé l’attente (${state.queue}), le rangement (${state.mess}), la confiance client et la sécurité. C’est pour cela que ta fin change d’une partie à l’autre.`,
  },
  {
    match: /musique|son|piste/,
    reply: 'Chaque famille de métiers a sa propre musique de fond. Le bouton Son, en haut du jeu, coupe la musique et les effets sonores.',
  },
  {
    match: /bonjour|salut|hello/,
    reply: 'Salut ! Je suis Alex. Je peux t’aider sur le métier de barman, les scènes du jeu et la bonne façon de gérer le bar.',
  },
];

const BARMAN_LATE_OPENING_TIMES = {
  prep: '19:05',
  arrival: '19:15',
  order: '19:25',
  recovery: '19:28',
  bottle: '19:30',
};

const BARMAN = {
  name: 'Barman',
  tagline: 'une soirée au bar',
  pitch: 'Vis une soirée au bar',
  icon: 'i-cocktail',
  sector: 'hotellerie',
  keywords: /\b(bar(man|maid|tender|miste)?|barmen)\b/,
  endHeading: 'Fin de service',

  info: {
    salary: BARMAN_SALARY,
    summary: 'Le barman accueille les clients, prépare et sert les boissons, avec ou sans alcool, et veille à l’ambiance, à la propreté et à la sécurité du bar.',
    missions: [
      'Accueillir les clients et prendre les commandes',
      'Préparer et servir les boissons, dont les cocktails',
      'Encaisser et vérifier l’addition',
      'Gérer les stocks et l’approvisionnement',
      'Garder le comptoir propre et la salle sûre',
    ],
    qualities: [
      'Sens du contact et politesse',
      'Rapidité et organisation',
      'Résistance au stress et à la fatigue',
      'Esprit d’équipe',
      'Rigueur sur l’hygiène et la sécurité',
    ],
    studies: [
      'CAP Commercialisation et services en hôtel-café-restaurant',
      'Bac pro Commercialisation et services en restauration',
      'Spécialisation barman après un CAP ou un bac pro',
      'On apprend aussi beaucoup sur le terrain',
    ],
    conditions: [
      'Travail debout, en salle et au comptoir',
      'Horaires décalés : soirées, week-ends, jours fériés',
      'Bars, hôtels, restaurants, salles d’événements',
      'Sur la Côte d’Azur, beaucoup d’offres pendant la saison touristique',
    ],
  },

  colleague: 'Alex',
  chatSubtitle: 'Pose toutes tes questions sur la soirée et le métier de barman',
  journalTitle: 'Ton journal de soirée',
  greeting: 'Salut ! Je suis Alex. Pose-moi une question sur la scène ou sur le métier de barman.',
  defaultAdvice: 'Lis la situation affichée et choisis l’action la plus logique pour le service.',
  fallback: 'Je peux répondre aux questions de base sur le métier de barman : rôle, qualités, formation, horaires, salaire, clients, cocktails, sécurité, hygiène, stock, encaissement, travail en équipe et scène en cours.',

  order: ['opening', 'prep', 'arrival', 'order', 'recovery', 'bottle', 'rush', 'organization', 'impatient', 'spillage', 'incident', 'safety', 'stock', 'payment', 'lastcall', 'closing'],
  limits: { trust: [-5, 9] },
  scenes: BARMAN_SCENES,
  advice: BARMAN_ADVICE,
  answers: BARMAN_ANSWERS,

  newState() {
    return {
      step: 'opening',
      time: '17:45',
      queue: 0,
      mess: 0,
      stress: 0,
      team: 0,
      trust: 1,
      stock: 1,
      wrong: 0,
      served: false,
      refused: false,
      broken: false,
      safe: true,
      payment: true,
      closed: false,
      openedLate: false,
      apology: false,
      ignored: false,
      notes: [],
      feedback: null,
    };
  },

  clock(step, state) {
    if (state.openedLate && BARMAN_LATE_OPENING_TIMES[step]) return BARMAN_LATE_OPENING_TIMES[step];
    return this.scenes[step]?.time || state.time;
  },

  describe(scene, state) {
    return (state.mess >= 2 && scene.descriptionWhenMessy) || scene.description;
  },

  crowd(state) {
    if (state.queue >= 4) return 'Bondé';
    if (state.queue >= 2) return 'Animé';
    return 'Calme';
  },

  image(step, state) {
    if (step === 'prep' && state.mess >= 2) return 'desordre';
    if (step === 'closing' && state.mess < 1) return 'calme';
    if (step === 'impatient' && state.queue < 2) return 'affluence';
    if (step === 'safety' && state.safe) return 'nettoyage';
    return this.scenes[step]?.image || 'calme';
  },

  endImage(state) {
    return state.mess >= 2 ? 'desordre' : 'calme';
  },

  endTime(incident) {
    return incident ? '21:15' : '23:00';
  },

  ending(state, incident) {
    if (incident || !state.safe) return ['Service interrompu', 'Un incident de sécurité a imposé d’arrêter le service : la sécurité passe toujours avant le reste.'];
    if (state.refused && state.trust < 0) return ['Réclamation client', 'La relation client a été fragilisée par plusieurs décisions.'];
    if (state.queue >= 4 && state.trust < 1) return ['Clients impatients', 'L’attente a augmenté et plusieurs clients se sont découragés.'];
    if (state.mess >= 3 && !state.closed) return ['Fermeture précipitée', 'Le bar est resté en désordre et l’équipe du lendemain devra terminer le rangement.'];
    if (state.wrong >= 2) return ['Service à revoir', 'Tu as découvert l’importance de vérifier les commandes et les produits.'];
    if (state.openedLate && state.team && state.closed && state.safe) return ['Coup de feu maîtrisé', 'Malgré une ouverture tardive, l’entraide et la sécurité ont permis de bien finir.'];
    if (state.team && state.closed && state.trust >= 3 && state.queue <= 2) return ['Soirée réussie en équipe', 'Le service a bien fonctionné grâce à ta communication et à l’entraide.'];
    if (state.closed && state.trust >= 2 && state.mess <= 1) return ['Bar impeccable', 'Tu as bien géré les clients et préparé le bar pour demain.'];
    if (state.team) return ['Esprit d’équipe', 'Tu as utilisé l’entraide pour faire face aux difficultés de la soirée.'];
    if (state.trust >= 2) return ['Clients satisfaits', 'Tu as pris le temps d’écouter les demandes et de rester accueillant.'];
    return ['Soirée riche en apprentissages', 'Tu as découvert les missions, les contraintes et les imprévus du métier de barman.'];
  },
};
