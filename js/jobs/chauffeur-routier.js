const ROUTIER_SCENES = {
  appel: {
    time: '06:00',
    image: 'depot',
    title: 'Prise de poste au dépôt',
    description: "6 h 00 : tu prends ton camion-citerne. Avant de partir charger du jus de pomme, tu appelles l'usine. Tes trois jauges partent de 80 %.",
    speaker: 'Karim, exploitant',
    line: "Tu as l'usine au téléphone. Qu'est-ce que tu vérifies ?",
    choices: [
      {
        label: "Noter juste l'adresse et prendre la route",
        good: false,
        feedback: "Erreur : tu arriverais sans connaître le protocole sécurité ni le numéro de lot, et tu serais refoulé à l'entrée. Rappelle l'exploitant (−15 % chrono).",
        next: 'appel',
        effects: { chrono: -15 },
        retry: true,
      },
      {
        label: 'Vérifier les horaires, les EPI obligatoires et la référence de chargement',
        good: true,
        feedback: 'Dossier complet, arrivée sereine (+5 % chrono).',
        next: 'garde',
        effects: { chrono: 5 },
      },
    ],
  },

  garde: {
    time: '07:00',
    image: 'bascule',
    title: 'Le poste de garde',
    description: "Tu arrives à l'usine. Avant d'aller au quai, il faut passer par le poste de garde.",
    speaker: 'Le gardien',
    line: 'Bonjour ! Vous venez pour quoi ?',
    choices: [
      {
        label: 'Aller directement au quai de chargement pour gagner du temps',
        good: false,
        feedback: 'Erreur : sans pesée à vide (la tare) ni badge, impossible de mesurer le poids chargé. Demi-tour vers la bascule (−15 % chrono).',
        next: 'garde',
        effects: { chrono: -15 },
        retry: true,
      },
      {
        label: 'Décliner identité, transporteur et destination, puis passer sur la bascule à vide',
        good: true,
        feedback: 'Poids à vide enregistré : 14,5 tonnes.',
        next: 'chargement',
        effects: {  },
      },
    ],
  },

  chargement: {
    time: '08:00',
    image: 'quai',
    title: 'Le chargement',
    description: 'Le pompage du jus de pomme est terminé. Il reste à signer la lettre de voiture, le document qui accompagne la marchandise.',
    speaker: "L'opérateur de chargement",
    line: "C'est bon, vous pouvez signer la lettre de voiture.",
    choices: [
      {
        label: 'Signer vite, sans vérifier les plombs ni la quantité inscrite',
        good: false,
        feedback: "Erreur : si un robinet fuit ou qu'il manque 500 litres, c'est toi qui seras tenu responsable à l'arrivée. Fais rectifier le papier (−15 % client).",
        next: 'chargement',
        effects: { client: -15 },
        retry: true,
      },
      {
        label: 'Vérifier les scellés (plombs), la quantité, puis remplir la lettre de voiture',
        good: true,
        feedback: 'Chargement sécurisé et conforme (+5 % client).',
        next: 'pesee',
        effects: { client: 5 },
      },
    ],
  },

  pesee: {
    time: '08:45',
    image: 'bascule',
    title: 'La pesée de sortie',
    description: 'Dernière pesée avant de quitter le site : la balance affiche 45,2 tonnes.',
    speaker: 'Le gardien',
    line: 'Votre pesée est faite. Vous partez ?',
    choices: [
      {
        label: 'Passer au poste de garde et partir quand même, il y a peu de route',
        good: false,
        feedback: "Erreur : le maximum légal est de 44 tonnes. En cas de contrôle : 750 € d'amende et camion bloqué. Retour au quai (−20 % sécurité).",
        next: 'pesee',
        effects: { securite: -20 },
        retry: true,
      },
      {
        label: 'Signaler la surcharge, faire retirer 1,2 tonne, puis faire tamponner la sortie',
        good: true,
        feedback: 'Poids légal (44 tonnes) et lettre de voiture tamponnée.',
        next: 'pause',
        effects: {  },
      },
    ],
  },

  pause: {
    time: '11:45',
    image: 'route',
    title: 'Sur la route',
    description: 'Tu as roulé 4 h 15. Mais avec le chargement, tu travailles depuis 5 h 45.',
    speaker: 'Karim, exploitant',
    line: "Tout se passe bien ? Tu comptes t'arrêter quand ?",
    choices: [
      {
        label: 'Continuer encore 15 minutes pour atteindre 4 h 30 de conduite',
        good: false,
        feedback: 'Erreur : la loi impose 30 minutes de pause toutes les 6 heures de travail total, pas seulement de conduite. Infraction enregistrée sur la carte (−15 % sécurité).',
        next: 'pause',
        effects: { securite: -15 },
        retry: true,
      },
      {
        label: "S'arrêter maintenant sur une aire pour une coupure de 45 minutes",
        good: true,
        feedback: 'Carte conducteur 100 % conforme à la loi (+5 % sécurité).',
        next: 'livraison',
        effects: { securite: 5 },
      },
    ],
  },

  livraison: {
    time: '13:30',
    image: 'quai',
    title: 'Livraison chez le client',
    description: 'Tu arrives chez le client. Passage au poste de garde, puis il faut décharger.',
    speaker: 'Le réceptionnaire',
    line: 'Bonjour ! On peut ouvrir les vannes ?',
    choices: [
      {
        label: "Décharger directement dès l'ouverture des vannes, sans peser",
        good: false,
        feedback: "Erreur : sans pesée d'entrée, le client peut contester la quantité réellement livrée. Litige sur les volumes (−15 % client).",
        next: 'livraison',
        effects: { client: -15 },
        retry: true,
      },
      {
        label: 'Peser plein, décharger, faire signer la lettre de voiture, puis repeser à vide',
        good: true,
        feedback: 'Livraison validée, rien ne reste dans la cuve (+5 % client).',
        next: 'lavage',
        effects: { client: 5 },
      },
    ],
  },

  lavage: {
    time: '15:00',
    image: 'lavage',
    title: 'La mission suivante',
    description: 'Prochaine mission : charger du lait chez un autre client.',
    speaker: 'Karim, exploitant',
    line: 'Tu enchaînes avec le lait ?',
    choices: [
      {
        label: 'Filer directement chez le client suivant, la cuve est vide',
        good: false,
        feedback: "Erreur : contamination alimentaire immédiate, la cargaison de lait serait perdue. Refus à l'entrée du client (−20 % sécurité).",
        next: 'lavage',
        effects: { securite: -20 },
        retry: true,
      },
      {
        label: 'Passer en station de lavage agréée et récupérer le certificat de lavage',
        good: true,
        feedback: 'Cuve lavée et certifiée, prêt pour la suite (+5 % sécurité).',
        next: 'end',
        effects: { securite: 5 },
      },
    ],
  },
};

const ROUTIER_ADVICE = {
  appel: 'Avant de partir, un chauffeur vérifie les horaires, les équipements de protection demandés et la référence du chargement.',
  garde: 'On passe toujours par le poste de garde et la bascule à vide : c’est ce qui permettra de calculer le poids chargé.',
  chargement: 'Avant de signer la lettre de voiture, on vérifie les scellés et la quantité : la signature engage le chauffeur.',
  pesee: 'Un poids lourd ne doit pas dépasser 44 tonnes. Une surcharge est dangereuse et sanctionnée.',
  pause: 'La pause dépend du temps de travail total, pas seulement du temps de conduite.',
  livraison: 'On pèse avant et après le déchargement pour prouver la quantité livrée.',
  lavage: 'Une citerne alimentaire se lave dans une station agréée avant de changer de produit.',
};

const ROUTIER_SALARY = {
  median: 1850,
  reference: 'Conducteur / Conductrice de poids lourd',
  url: 'https://www.orientation-regionsud.fr/metiers/conducteur-conductrice-de-poids-lourd',
};

const ROUTIER_GAUGES = [
  { key: 'chrono', label: 'Chrono' },
  { key: 'client', label: 'Client' },
  { key: 'securite', label: 'Sécurité' },
];

const ROUTIER_ANSWERS = [
  {
    match: /etude|formation|diplome|ecole|apprendre|permis|fimo|bac/,
    reply: 'Il faut le permis C (ou CE pour les ensembles articulés) et la FIMO, une formation obligatoire pour transporter des marchandises. On peut y arriver par un CAP ou un bac pro conducteur routier, ou par un titre professionnel en centre de formation.',
  },
  {
    match: /salaire|combien gagne|paye|paie|argent/,
    reply: () => `Selon Orientation Région Sud (données Insee 2022), la moitié des conducteurs de poids lourd à temps plein gagnent plus de ${euros(ROUTIER_SALARY.median)} net par mois. Les primes et les heures de nuit ou de longue distance peuvent s’y ajouter.`,
  },
  {
    match: /qualite|competence|savoir etre|savoir-faire/,
    reply: 'Il faut être prudent, ponctuel, organisé, autonome, et rigoureux avec les papiers et les règles de sécurité.',
  },
  {
    match: /pause|repos|temps de conduite|fatigue/,
    reply: 'Les temps de conduite et de travail sont encadrés par la loi et enregistrés sur la carte du conducteur. Les pauses obligatoires protègent le chauffeur et les autres usagers de la route.',
  },
  {
    match: /poids|tonne|surcharge|bascule|pesee/,
    reply: 'Un poids lourd ne doit pas dépasser 44 tonnes en charge. On le pèse à vide puis plein sur une bascule pour connaître le poids exact de la marchandise.',
  },
  {
    match: /lettre de voiture|papier|document|bon de livraison/,
    reply: 'La lettre de voiture accompagne la marchandise : expéditeur, destinataire, nature et quantité. Le chauffeur la vérifie avant de signer, car elle engage sa responsabilité.',
  },
  {
    match: /lavage|hygiene|alimentaire|citerne/,
    reply: 'Une citerne alimentaire se lave dans une station agréée entre deux produits, avec un certificat de lavage, pour éviter toute contamination.',
  },
  {
    match: /horaire|heures|nuit|week[- ]?end|famille|maison/,
    reply: 'Les horaires dépendent des missions : départs très tôt, livraisons régionales avec retour le soir, ou longue distance avec des nuits hors de chez soi.',
  },
  {
    match: /chauffeur|routier|conducteur|metier|travail|role/,
    reply: 'Le chauffeur routier transporte des marchandises en respectant les délais et les règles de sécurité. Il charge et décharge, vérifie les documents, entretient son camion et prépare son itinéraire.',
  },
  {
    match: /pourquoi|perdu|fin|resultat/,
    reply: state => `Ta fin dépend de tes jauges : chrono ${state.chrono} %, client ${state.client} %, sécurité ${state.securite} %. Pour un succès, toutes doivent rester au-dessus de 80 %.`,
  },
  {
    match: /bonjour|salut|hello/,
    reply: 'Salut ! Je suis Karim, exploitant. C’est moi qui organise tes missions. Pose-moi tes questions sur la journée ou sur le métier.',
  },
];

const CHAUFFEUR_ROUTIER = {
  name: 'Chauffeur routier',
  tagline: 'une journée en camion-citerne',
  pitch: 'Livre une citerne de jus de pomme',
  icon: 'i-truck',
  sector: 'mobilite',
  keywords: /chauffeur|routier|camion|poids lourd|conducteur/,
  colleague: 'Karim',
  colleagueRole: 'ton exploitant',
  endHeading: 'Fin de journée',
  chatSubtitle: 'Pose toutes tes questions sur ta journée et le métier de chauffeur',
  journalTitle: 'Ton carnet de route',
  greeting: 'Salut ! Je suis Karim, exploitant. Pose-moi une question sur ta journée ou sur le métier.',
  defaultAdvice: 'Le bon choix protège à la fois les délais, le client et la sécurité.',
  fallback: 'Je peux répondre aux questions sur le métier : permis et formation, salaire, qualités, pauses, poids, documents, lavage des citernes et horaires.',

  info: {
    salary: ROUTIER_SALARY,
    summary: 'Le chauffeur routier transporte des marchandises d’un point à un autre, en respectant les délais et les règles de sécurité. Il charge et décharge, vérifie les documents, entretient son camion et prépare son itinéraire.',
    missions: [
      'Préparer la mission : horaires, itinéraire, consignes',
      'Charger et décharger en sécurité',
      'Vérifier et remplir les documents de transport',
      'Respecter les temps de conduite et de repos',
      'Entretenir le véhicule et signaler les anomalies',
    ],
    qualities: [
      'Prudence et vigilance',
      'Ponctualité et organisation',
      'Autonomie',
      'Rigueur avec les papiers et la réglementation',
      'Politesse avec les clients',
    ],
    studies: [
      'Permis C ou CE et FIMO (formation obligatoire)',
      'CAP ou bac pro conducteur routier de marchandises',
      'Titre professionnel en centre de formation, y compris en reconversion',
    ],
    conditions: [
      'Seul au volant, en lien avec l’exploitant',
      'Départs tôt le matin, parfois des nuits hors de chez soi',
      'Transport régional, national ou international',
      'Beaucoup d’entreprises recrutent',
    ],
  },

  order: ['appel', 'garde', 'chargement', 'pesee', 'pause', 'livraison', 'lavage'],
  scenes: ROUTIER_SCENES,
  advice: ROUTIER_ADVICE,
  answers: ROUTIER_ANSWERS,
  gauges: ROUTIER_GAUGES,
  gaugeAlert: 50,
  limits: { chrono: [0, 100], client: [0, 100], securite: [0, 100] },

  newState() {
    return { step: 'appel', time: '06:00', chrono: 80, client: 80, securite: 80, notes: [], feedback: null };
  },

  clock(step, state) {
    return this.scenes[step]?.time || state.time;
  },

  describe(scene) {
    return scene.description;
  },

  image(step) {
    return this.scenes[step]?.image || 'depot';
  },

  endImage() {
    return 'route';
  },

  endTime() {
    return '17:00';
  },

  ending(state) {
    if (this.gauges.every(({ key }) => state[key] > 80)) return ['Succès : chauffeur fiable et carré', 'Toutes tes jauges sont restées au-dessus de 80 % : livraison à l’heure, client satisfait et aucune infraction.'];
    const low = this.gauges.filter(({ key }) => state[key] <= 80).map(({ label }) => label.toLowerCase());
    return ['Fin mitigée', `Livré, mais avec des infractions ou des retards : ${low.length > 1 ? 'jauges' : 'jauge'} ${low.join(', ')} à 80 % ou moins.`];
  },
};
