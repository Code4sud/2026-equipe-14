const MARKETING_SCENES = {
  brief: {
    time: 'J-90',
    image: 'reunion',
    title: 'Le brief du lancement',
    description: "Un nouveau téléphone sort dans 3 mois, avec un budget limité. Le brief ne précise pas l'objectif principal.",
    speaker: 'Inès, directrice marketing',
    line: "Le brief est flou sur l'objectif. Que fais-tu ?",
    choices: [
      {
        label: 'Clarifier les ventes visées, la cible et les indicateurs',
        good: true,
        feedback: "Cadrage solide, au prix d'un peu de temps.",
        next: 'etude',
        effects: { equipe: 5 },
      },
      {
        label: 'Accepter le brief tel quel',
        good: false,
        feedback: 'Départ rapide, mais risque de désaccord plus tard.',
        next: 'brief',
        retry: true,
        effects: { vague: true, equipe: -5 },
      },
    ],
  },

  etude: {
    time: 'J-80',
    image: 'reunion',
    title: "L'étude de marché",
    description: 'Les premiers avis clients sur ce type de téléphone sont partagés.',
    speaker: 'Inès, directrice marketing',
    line: 'Quelle étude mènes-tu ?',
    choices: [
      {
        label: 'Interroger un petit groupe de clients',
        good: true,
        feedback: 'Des retours utiles, avec un léger retard.',
        next: 'cible',
        effects: { clients: 5 },
      },
      {
        label: 'Utiliser les anciennes données',
        good: false,
        feedback: "C'est rapide, mais peut-être dépassé.",
        next: 'etude',
        retry: true,
        effects: { data: true },
      },
    ],
  },

  cible: {
    time: 'J-70',
    image: 'openspace',
    title: 'Définir la cible',
    description: "Il faut décider à qui s'adresse ce téléphone.",
    speaker: 'Inès, directrice marketing',
    line: 'À qui adresses-tu la campagne ?',
    choices: [
      {
        label: 'Choisir une cible prioritaire',
        good: true,
        feedback: 'Message précis, pour un public plus restreint.',
        next: 'positionnement',
        effects: { ventes: 5 },
      },
      {
        label: 'Viser plusieurs publics à la fois',
        good: false,
        feedback: 'Couverture large, mais message moins distinctif.',
        next: 'cible',
        retry: true,
        effects: { large: true, ventes: -5 },
      },
    ],
  },

  positionnement: {
    time: 'J-60',
    image: 'smartphone',
    title: 'Le positionnement et le prix',
    description: 'Le téléphone a un vrai point fort : son autonomie, mesurée en test.',
    speaker: 'Inès, directrice marketing',
    line: 'Quel angle défends-tu ?',
    choices: [
      {
        label: 'Un avantage vérifié et un prix cohérent',
        good: true,
        feedback: 'Une promesse crédible.',
        next: 'creation',
        effects: { clients: 10 },
      },
      {
        label: "L'accroche la plus spectaculaire",
        good: false,
        feedback: 'Plus mémorable, mais risque de déception.',
        next: 'positionnement',
        retry: true,
        effects: { exagere: true, clients: -5, ventes: 5 },
      },
    ],
  },

  creation: {
    time: 'J-45',
    image: 'affiche',
    title: 'Deux campagnes proposées',
    description: "L'équipe créative propose deux campagnes très différentes.",
    speaker: "L'équipe créative",
    line: 'On a deux pistes. Comment tu tranches ?',
    choices: [
      {
        label: 'Tester les deux versions auprès de la cible',
        good: true,
        feedback: 'Des données utiles, avec un délai supplémentaire.',
        next: 'budget',
        effects: { ventes: 5 },
      },
      {
        label: "Suivre l'intuition de la direction",
        good: false,
        feedback: 'Validation rapide, résultat incertain.',
        next: 'creation',
        retry: true,
        effects: { intuition: true },
      },
    ],
  },

  budget: {
    time: 'J-35',
    image: 'reunion',
    title: 'Le budget est réduit de 20 %',
    description: 'La direction financière annonce une baisse du budget marketing.',
    speaker: 'Inès, directrice marketing',
    line: 'Comment répartis-tu le budget restant ?',
    choices: [
      {
        label: 'Concentrer les dépenses sur les canaux les plus pertinents',
        good: true,
        feedback: 'Un impact ciblé.',
        next: 'visuels',
        effects: { budget: 10, ventes: 5 },
      },
      {
        label: 'Être présent sur tous les canaux',
        good: false,
        feedback: 'Visibilité large, mais faible impact par canal.',
        next: 'budget',
        retry: true,
        effects: { partout: true, budget: -15 },
      },
    ],
  },

  visuels: {
    time: 'J-15',
    image: 'openspace',
    title: 'Les visuels arrivent en retard',
    description: 'Les photos et vidéos du téléphone ne seront pas toutes prêtes à temps.',
    speaker: 'Inès, directrice marketing',
    line: 'Que fais-tu de la date de lancement ?',
    choices: [
      {
        label: 'Reporter pour terminer et vérifier les supports',
        good: true,
        feedback: 'Qualité protégée, mais date manquée.',
        next: 'defaut',
        effects: { reporte: true, ventes: -10 },
      },
      {
        label: 'Maintenir la date avec les supports prêts',
        good: false,
        feedback: 'Calendrier tenu, mais risque de défaut ignoré.',
        next: 'visuels',
        retry: true,
        effects: { clients: -5 },
      },
    ],
  },

  defaut: {
    time: 'J-7',
    image: 'smartphone',
    title: 'Un défaut signalé sur un prototype',
    description: 'Des testeurs signalent un problème sur un prototype du téléphone.',
    speaker: 'Le service client',
    line: "Des avis parlent d'un défaut. Comment réagis-tu ?",
    choices: [
      {
        label: 'Vérifier avec les équipes produit et qualité',
        good: true,
        feedback: 'Une décision plus sûre.',
        next: 'reactions',
        effects: { clients: 5 },
      },
      {
        label: 'Répondre que le produit est prêt, sans vérifier',
        good: false,
        feedback: 'Réaction rapide, mais risque de perte de confiance.',
        next: 'defaut',
        retry: true,
        effects: { minimise: true, clients: -15 },
      },
    ],
  },

  reactions: {
    time: 'Jour J',
    image: 'reseaux',
    title: 'Les premières réactions',
    description: 'Le téléphone est lancé. Sur les réseaux sociaux, les réactions sont mitigées.',
    speaker: 'Le community manager',
    line: 'Les avis sont partagés. Quelle réponse apportes-tu ?',
    choices: [
      {
        label: 'Répondre avec transparence et remonter les retours',
        good: true,
        feedback: 'La confiance est mieux préservée.',
        next: 'resultats',
        effects: { clients: 10, equipe: 5 },
      },
      {
        label: 'Ignorer les critiques et garder le plan',
        good: false,
        feedback: 'Du temps gagné, mais du mécontentement possible.',
        next: 'reactions',
        retry: true,
        effects: { clients: -10 },
      },
    ],
  },

  resultats: {
    time: 'J+14',
    image: 'reseaux',
    title: "Des clics, mais peu d'achats",
    description: 'La campagne attire beaucoup de visites sur le site, mais peu de personnes achètent.',
    speaker: 'Inès, directrice marketing',
    line: 'Que fais-tu de ces résultats faibles ?',
    choices: [
      {
        label: "Analyser le parcours d'achat et ajuster un élément",
        good: true,
        feedback: 'Un diagnostic plus précis.',
        next: 'end',
        effects: { ventes: 10 },
      },
      {
        label: 'Changer immédiatement toute la campagne',
        good: false,
        feedback: 'Action rapide, mais difficile de savoir ce qui marche.',
        next: 'resultats',
        retry: true,
        effects: { changements: true, budget: -10, equipe: -10 },
      },
    ],
  },
};

const MARKETING_ADVICE = {
  brief: 'Un bon lancement commence par un objectif clair : combien vendre, à qui, et comment on mesurera le succès.',
  etude: 'Des retours récents de vrais clients valent souvent mieux que d’anciennes données.',
  cible: 'Une cible précise permet un message qui parle vraiment aux gens.',
  positionnement: 'Une promesse doit être vraie et vérifiée : un client déçu se fait entendre.',
  creation: 'Tester deux versions auprès de la cible permet de choisir sur des faits, pas sur des intuitions.',
  budget: 'Avec moins d’argent, mieux vaut être fort sur quelques canaux que faible partout.',
  visuels: 'Reporter protège la qualité, maintenir protège le calendrier : il faut choisir en connaissant le risque.',
  defaut: 'Un défaut signalé se vérifie avec les équipes produit et qualité avant de répondre.',
  reactions: 'La transparence avec les clients préserve la confiance.',
  resultats: 'Quand les résultats sont faibles, on analyse pour trouver l’élément à changer, au lieu de tout jeter.',
};

const MARKETING_SALARY = {
  median: 4068,
  reference: 'Chef / Cheffe de produit',
  url: 'https://www.orientation-regionsud.fr/metiers/chef-cheffe-de-produit',
};

const MARKETING_GAUGES = [
  { key: 'ventes', label: 'Ventes' },
  { key: 'budget', label: 'Budget' },
  { key: 'clients', label: 'Clients' },
  { key: 'equipe', label: 'Équipe' },
];

const MARKETING_ANSWERS = [
  {
    match: /etude|formation|diplome|ecole|apprendre|bac/,
    reply: 'Après le bac, on peut suivre un BTS ou un BUT en commerce ou en marketing, puis une licence ou un master, par exemple en école de commerce. L’anglais est souvent demandé.',
  },
  {
    match: /salaire|combien gagne|paye|paie|argent/,
    reply: () => `Sur Orientation Région Sud, la fiche « Chef / Cheffe de produit », qui pilote un produit de sa conception à sa commercialisation, indique que la moitié des personnes à temps plein gagnent plus de ${euros(MARKETING_SALARY.median)} net par mois (Insee 2022). En début de carrière, un chargé de marketing gagne en général moins.`,
  },
  {
    match: /qualite|competence|savoir etre|savoir-faire/,
    reply: 'Il faut être curieux, créatif, à l’aise avec les chiffres, bon communicant et capable de travailler avec des équipes très différentes : produit, ventes, création, finance.',
  },
  {
    match: /cible|client|persona/,
    reply: 'La cible, c’est le groupe de personnes à qui s’adresse le produit. Plus elle est précise, plus le message peut leur parler.',
  },
  {
    match: /reseau|social|influence|community/,
    reply: 'Les réseaux sociaux servent à faire connaître le produit et à écouter les clients. Répondre avec transparence aux critiques aide à garder leur confiance.',
  },
  {
    match: /budget|cout|depense/,
    reply: 'Le chargé de marketing répartit un budget entre plusieurs canaux : publicité en ligne, affichage, magasins, influenceurs. Il mesure ce que chaque euro rapporte.',
  },
  {
    match: /indicateur|mesure|kpi|chiffre|vente/,
    reply: 'On suit des indicateurs : nombre de visites, taux de clics, ventes, avis clients. Ils montrent ce qui marche et ce qu’il faut ajuster.',
  },
  {
    match: /promesse|mensonge|exager|ethique/,
    reply: 'Une promesse marketing doit être vraie. Exagérer attire l’attention un moment, mais les clients déçus le font vite savoir.',
  },
  {
    match: /horaire|heures|week[- ]?end|stress/,
    reply: 'Les horaires sont plutôt des horaires de bureau, avec des périodes intenses avant un lancement.',
  },
  {
    match: /marketing|charge|metier|travail|role/,
    reply: 'Le chargé de marketing aide à faire connaître et vendre un produit : il étudie le marché, définit la cible et le message, prépare les campagnes, gère un budget et analyse les résultats.',
  },
  {
    match: /pourquoi|perdu|fin|resultat/,
    reply: state => `Ta fin dépend de tes jauges (ventes ${state.ventes} %, budget ${state.budget} %, clients ${state.clients} %, équipe ${state.equipe} %) et des choix risqués que tu as faits.`,
  },
  {
    match: /bonjour|salut|hello/,
    reply: 'Bonjour ! Je suis Inès, directrice marketing. Pose-moi tes questions sur le lancement ou sur le métier.',
  },
];

const MARKETING_RISKS = ['vague', 'data', 'large', 'exagere', 'intuition', 'partout', 'minimise', 'changements'];

const CHARGE_MARKETING = {
  name: 'Chargé de marketing',
  tagline: 'le lancement d’un téléphone',
  pitch: 'Lance un nouveau téléphone',
  icon: 'i-smartphone',
  sector: 'commerce',
  keywords: /marketing|chef de produit|telephone|lancement|publicite/,
  colleague: 'Inès',
  colleagueRole: 'ta directrice marketing',
  endHeading: 'Bilan du lancement',
  chatSubtitle: 'Pose toutes tes questions sur le lancement et le métier',
  journalTitle: 'Ton journal de lancement',
  greeting: 'Bonjour ! Je suis Inès, directrice marketing. Pose-moi une question sur le lancement ou sur le métier.',
  defaultAdvice: 'Cherche le choix qui protège à la fois les ventes, le budget, la confiance des clients et l’équipe.',
  fallback: 'Je peux répondre aux questions sur le métier : études, salaire, qualités, cible, réseaux sociaux, budget, indicateurs et promesses.',

  info: {
    salary: MARKETING_SALARY,
    summary: 'Le chargé de marketing aide à faire connaître et vendre un produit. Il étudie le marché, définit la cible et le message, prépare les campagnes avec les équipes créatives, gère un budget et analyse les résultats.',
    missions: [
      'Étudier le marché et les attentes des clients',
      'Définir la cible, le positionnement et le prix',
      'Préparer les campagnes avec les équipes créatives',
      'Répartir le budget entre les canaux',
      'Suivre les résultats et ajuster la stratégie',
    ],
    qualities: [
      'Curiosité et créativité',
      'Aisance avec les chiffres',
      'Communication et diplomatie',
      'Organisation face aux délais',
      'Honnêteté dans les promesses faites aux clients',
    ],
    studies: [
      'BTS ou BUT en commerce ou en marketing',
      'Licence ou master, par exemple en école de commerce',
      'Anglais souvent demandé',
    ],
    conditions: [
      'Bureau, en lien avec de nombreuses équipes',
      'Périodes intenses avant les lancements',
      'Entreprises, marques et agences de communication',
      'Beaucoup de travail sur ordinateur et en réunion',
    ],
  },

  order: ['brief', 'etude', 'cible', 'positionnement', 'creation', 'budget', 'visuels', 'defaut', 'reactions', 'resultats'],
  scenes: MARKETING_SCENES,
  advice: MARKETING_ADVICE,
  answers: MARKETING_ANSWERS,
  gauges: MARKETING_GAUGES,
  gaugeAlert: 50,
  limits: { ventes: [0, 100], budget: [0, 100], clients: [0, 100], equipe: [0, 100] },

  newState() {
    const state = { step: 'brief', time: 'J-90', ventes: 60, budget: 60, clients: 60, equipe: 60, reporte: false, notes: [], feedback: null };
    for (const risk of MARKETING_RISKS) state[risk] = false;
    return state;
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

  endImage() {
    return 'magasin';
  },

  endTime() {
    return 'Bilan';
  },

  ending(state) {
    const risks = MARKETING_RISKS.filter(risk => state[risk]).length;
    if (risks >= 6 && state.ventes <= 55) return ['Poste menacé', 'La direction retire le projet et peut mettre fin au contrat : échec commercial aggravé par des erreurs répétées et une perte de confiance interne.'];
    if (state.exagere || state.minimise) return ['Crise de réputation', 'Promesse exagérée ou défaut minimisé : la campagne doit être corrigée et les clients informés.'];
    if (state.partout && state.ventes < 65) return ['Échec commercial', 'Le téléphone est connu, mais se vend peu : forte visibilité, faible conversion et dépenses trop élevées.'];
    if (state.large || state.vague) return ['Campagne inefficace', 'Ciblage trop large ou message peu clair : la stratégie est revue avant le prochain lancement.'];
    if (state.data || state.intuition || state.changements) return ['Résultat mitigé', 'Données insuffisantes ou décisions changées trop souvent : bilan peu concluant, une nouvelle étude est nécessaire.'];
    if (state.reporte) return ['Lancement réussi mais tardif', 'Qualité préservée, mais une partie de l’occasion commerciale a été manquée.'];
    return ['Succès commercial', 'Cible pertinente, promesse crédible, ventes et budget au rendez-vous : les objectifs sont atteints et l’équipe est reconnue.'];
  },
};
