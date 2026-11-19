const EAUX_SCENES = {
  pollution: {
    time: '07:00',
    image: 'station',
    title: 'Prise de poste à la station',
    description: "Tu surveilles la station de traitement des eaux. Les capteurs indiquent une eau d'entrée plus polluée que d'habitude.",
    speaker: "Camille, cheffe d'équipe",
    line: "L'eau qui arrive est trop polluée. Tu fais quoi ?",
    choices: [
      {
        label: 'Adapter le traitement',
        good: true,
        feedback: 'Tu modifies les paramètres du traitement.',
        next: 'ph',
        effects: {  },
      },
      {
        label: 'Ne rien faire',
        good: false,
        feedback: "La pollution n'est pas maîtrisée : l'eau ressort trop chargée.",
        next: 'pollution',
        retry: true,
        effects: { errors: 1, pollution: true },
      },
    ],
  },

  ph: {
    time: '07:45',
    image: 'controle',
    title: 'Le pH est anormal',
    description: "Sur l'écran de supervision, le pH de l'eau sort des valeurs normales.",
    speaker: "Camille, cheffe d'équipe",
    line: "Le pH n'est pas bon. Qu'est-ce que tu décides ?",
    choices: [
      {
        label: 'Corriger les dosages',
        good: true,
        feedback: 'Tu ajustes les réactifs : le pH revient dans les valeurs normales.',
        next: 'pompe',
        effects: {  },
      },
      {
        label: 'Ne rien faire',
        good: false,
        feedback: "La qualité de l'eau se dégrade.",
        next: 'ph',
        retry: true,
        effects: { errors: 1 },
      },
    ],
  },

  pompe: {
    time: '08:30',
    image: 'pompes',
    title: 'Une pompe tombe en panne',
    description: "Une alarme sonne dans la salle des pompes : une des pompes s'est arrêtée.",
    speaker: "Camille, cheffe d'équipe",
    line: 'Une pompe est en panne. Comment tu réagis ?',
    choices: [
      {
        label: 'Faire un diagnostic',
        good: true,
        feedback: 'Tu identifies la panne et tu la répares.',
        next: 'filtre',
        effects: {  },
      },
      {
        label: 'Compenser avec les autres pompes',
        good: false,
        feedback: 'Les autres pompes tournent plus fort : il faut les surveiller de près.',
        next: 'pompe',
        retry: true,
        effects: { errors: 1 },
      },
    ],
  },

  filtre: {
    time: '09:15',
    image: 'pompes',
    title: 'Un filtre est bouché',
    description: 'La pression augmente devant un filtre : il est encrassé.',
    speaker: "Camille, cheffe d'équipe",
    line: "Le filtre est bouché. On s'en occupe quand ?",
    choices: [
      {
        label: 'Nettoyer le filtre',
        good: true,
        feedback: 'Tu effectues le nettoyage selon la procédure.',
        next: 'debit',
        effects: {  },
      },
      {
        label: 'Attendre demain',
        good: false,
        feedback: 'Le traitement perd en efficacité.',
        next: 'filtre',
        retry: true,
        effects: { errors: 1 },
      },
    ],
  },

  debit: {
    time: '10:00',
    image: 'controle',
    title: 'Le débit est trop important',
    description: "Il a plu cette nuit : beaucoup plus d'eau arrive à la station.",
    speaker: "Camille, cheffe d'équipe",
    line: 'Le débit est trop fort. Que fais-tu ?',
    choices: [
      {
        label: 'Régler les équipements',
        good: true,
        feedback: 'Tu ajustes le débit pour que la station suive.',
        next: 'accident',
        effects: {  },
      },
      {
        label: 'Ne rien faire',
        good: false,
        feedback: 'La station risque la surcharge.',
        next: 'debit',
        retry: true,
        effects: { errors: 1 },
      },
    ],
  },

  accident: {
    time: '10:45',
    image: 'station',
    title: 'Pollution accidentelle',
    description: 'Une tache huileuse apparaît dans un bassin : une pollution accidentelle arrive par le réseau.',
    speaker: "Camille, cheffe d'équipe",
    line: 'Il y a une pollution accidentelle ! Ta réaction ?',
    choices: [
      {
        label: 'Alerter et isoler',
        good: true,
        feedback: "Tu alertes, tu isoles l'arrivée polluée et tu adaptes le traitement.",
        next: 'analyses',
        effects: {  },
      },
      {
        label: 'Mettre du savon',
        good: false,
        feedback: 'Le savon aggrave la pollution !',
        next: 'accident',
        retry: true,
        effects: { errors: 1, pollution: true, negligence: 1 },
      },
    ],
  },

  analyses: {
    time: '11:30',
    image: 'analyse',
    title: "Résultats d'analyse anormaux",
    description: "Au laboratoire, un échantillon d'eau donne des résultats inhabituels.",
    speaker: "Camille, cheffe d'équipe",
    line: 'Les analyses sont anormales. Par quoi tu commences ?',
    choices: [
      {
        label: 'Rechercher la cause',
        good: true,
        feedback: 'Tu effectues des contrôles complémentaires.',
        next: 'bassin',
        effects: {  },
      },
      {
        label: "Couper l'eau et analyser",
        good: true,
        feedback: "Tu isoles l'eau le temps de l'analyser.",
        next: 'bassin',
        effects: {  },
      },
    ],
  },

  bassin: {
    time: '12:15',
    image: 'station',
    title: 'Un bassin déborde presque',
    description: "Le niveau d'un bassin monte et s'approche du bord.",
    speaker: "Camille, cheffe d'équipe",
    line: 'Le bassin va déborder. Que fais-tu ?',
    choices: [
      {
        label: 'Augmenter le débit de sortie',
        good: true,
        feedback: "Tu évacues l'excédent en sécurité.",
        next: 'automate',
        effects: {  },
      },
      {
        label: "Boucher l'entrée",
        good: false,
        feedback: 'La pression monte dangereusement dans les canalisations.',
        next: 'bassin',
        retry: true,
        effects: { errors: 1, negligence: 1 },
      },
    ],
  },

  automate: {
    time: '13:00',
    image: 'controle',
    title: "L'automate est en panne",
    description: 'Le système automatique qui pilote une partie de la station ne répond plus.',
    speaker: "Camille, cheffe d'équipe",
    line: "L'installation automatisée est en panne. On fait comment ?",
    choices: [
      {
        label: 'Appeler un professionnel',
        good: true,
        feedback: "Un spécialiste intervient sur l'automate.",
        next: 'cuve',
        effects: {  },
      },
      {
        label: 'Redémarrer la machine',
        good: false,
        feedback: 'Tu tentes un redémarrage sans connaître la cause de la panne.',
        next: 'automate',
        retry: true,
        effects: { errors: 1 },
      },
    ],
  },

  cuve: {
    time: '13:45',
    image: 'cuve',
    title: 'Un objet tombe dans une cuve',
    description: "Pendant une ronde, tu vois un objet flotter à la surface d'une cuve.",
    speaker: "Camille, cheffe d'équipe",
    line: 'Un objet est tombé dans la cuve. Tu fais quoi ?',
    choices: [
      {
        label: 'Récupérer en sécurité',
        good: true,
        feedback: 'Tu appliques la procédure de récupération.',
        next: 'end',
        effects: {  },
      },
      {
        label: "Laisser l'objet",
        good: false,
        feedback: "L'objet risque de contaminer l'eau.",
        next: 'cuve',
        retry: true,
        effects: { errors: 1, negligence: 1 },
      },
    ],
  },
};

const EAUX_ADVICE = {
  pollution: 'Quand l’eau d’entrée change, le technicien adapte le traitement : il ne laisse jamais une pollution passer.',
  ph: 'Le pH se corrige en ajustant le dosage des réactifs, petit à petit, en surveillant les mesures.',
  pompe: 'Face à une panne, on cherche d’abord la cause. Compenser avec les autres pompes les fatigue et ne règle rien.',
  filtre: 'Un filtre bouché fait perdre de l’efficacité : on le nettoie sans attendre, en suivant la procédure.',
  debit: 'Quand le débit augmente, on règle les équipements pour éviter la surcharge.',
  accident: 'Une pollution accidentelle se traite en alertant et en isolant. Ajouter un produit au hasard peut l’aggraver.',
  analyses: 'Des analyses anormales demandent des contrôles, ou d’isoler l’eau le temps de comprendre.',
  bassin: 'Pour éviter un débordement, on évacue l’excédent. Boucher l’entrée fait monter la pression dans les tuyaux.',
  automate: 'Sur une installation automatisée, on fait appel à un spécialiste plutôt que de redémarrer au hasard.',
  cuve: 'Un objet dans une cuve se récupère avec la procédure prévue, en sécurité.',
};

const EAUX_SALARY = {
  median: 1754,
  reference: 'Agent / Agente d’assainissement',
  url: 'https://www.orientation-regionsud.fr/metiers/agent-agente-dassainissement',
};

const EAUX_ANSWERS = [
  {
    match: /etude|formation|diplome|ecole|apprendre|bac/,
    reply: 'On peut commencer avec un CAP agent de la qualité de l’eau ou un bac pro dans la chimie et l’eau. Pour devenir technicien, on vise plutôt un BTS Métiers de l’eau, un BUT ou une licence professionnelle dans l’eau ou l’environnement.',
  },
  {
    match: /salaire|combien gagne|paye|paie|argent/,
    reply: () => `Sur Orientation Région Sud, la fiche la plus proche, « Agent / Agente d’assainissement », indique que la moitié des personnes à temps plein gagnent plus de ${euros(EAUX_SALARY.median)} net par mois (Insee 2022). Un technicien, plus qualifié, gagne en général davantage.`,
  },
  {
    match: /qualite|competence|savoir etre|savoir-faire/,
    reply: 'Il faut être rigoureux, réactif, à l’aise avec les mesures et les machines, respecter les procédures de sécurité et aimer protéger l’environnement.',
  },
  {
    match: /\bph\b|reactif|dosage|chimi/,
    reply: 'Le pH indique si l’eau est trop acide ou trop basique. Le technicien le corrige en ajustant les réactifs, puis il vérifie avec de nouvelles mesures.',
  },
  {
    match: /pollu|environnement|riviere|nature/,
    reply: 'Une station de traitement protège les rivières et la mer : l’eau rejetée doit être assez propre pour ne pas abîmer la nature. En cas de pollution, on alerte et on isole.',
  },
  {
    match: /securite|danger|procedure|risque/,
    reply: 'Dans une station, on respecte toujours les procédures : produits chimiques, cuves, machines en mouvement. Elles protègent le technicien comme l’environnement.',
  },
  {
    match: /horaire|heures|nuit|astreinte|week[- ]?end/,
    reply: 'Les horaires sont souvent réguliers, mais une station tourne jour et nuit : certains techniciens font des astreintes pour intervenir en cas d’alarme.',
  },
  {
    match: /potable|robinet|epuration|usee/,
    reply: 'Il existe deux grands types de stations : celles qui rendent l’eau potable avant qu’elle arrive au robinet, et les stations d’épuration qui nettoient les eaux usées avant de les rendre à la nature.',
  },
  {
    match: /ou travailler|employeur|entreprise|collectivite/,
    reply: 'On travaille pour une commune, une métropole ou une entreprise spécialisée dans l’eau, dans des stations d’eau potable ou d’épuration.',
  },
  {
    match: /technicien|metier|travail|role/,
    reply: 'Le technicien de traitement des eaux surveille et pilote une station : il contrôle la qualité de l’eau, règle les traitements, entretient les équipements et réagit aux pannes et aux pollutions.',
  },
  {
    match: /pourquoi|perdu|fin|resultat/,
    reply: state => `Ta fin dépend du bilan de la station : ${state.errors} erreur(s), ${state.negligence} négligence(s)${state.pollution ? ' et une pollution non maîtrisée' : ''}.`,
  },
  {
    match: /bonjour|salut|hello/,
    reply: 'Salut ! Je suis Camille, cheffe d’équipe à la station. Pose-moi tes questions sur le métier ou sur ta journée.',
  },
];

const TECHNICIEN_EAUX = {
  name: 'Technicien de traitement des eaux',
  tagline: 'une journée à la station',
  pitch: 'Pilote une station de traitement',
  icon: 'i-droplet',
  sector: 'industrie',
  keywords: /\beaux?\b|station|epuration|assainissement|traitement/,
  colleague: 'Camille',
  colleagueRole: 'ta cheffe d’équipe',
  endHeading: 'Bilan de la station',
  chatSubtitle: 'Pose toutes tes questions sur la station et le métier',
  journalTitle: 'Ton journal de poste',
  greeting: 'Salut ! Je suis Camille, cheffe d’équipe. Pose-moi une question sur la station ou sur le métier.',
  defaultAdvice: 'Lis la situation : la bonne réaction protège à la fois l’eau, les équipements et l’environnement.',
  fallback: 'Je peux répondre aux questions sur le métier : études, salaire, qualités, pH, pollution, sécurité, horaires et où travailler.',

  info: {
    salary: EAUX_SALARY,
    summary: 'Le technicien de traitement des eaux veille au bon fonctionnement d’une station d’eau potable ou d’épuration. Il contrôle la qualité de l’eau, règle les traitements, entretient les équipements et réagit aux pannes comme aux pollutions.',
    missions: [
      'Surveiller la station et les mesures de qualité de l’eau',
      'Régler les traitements et le dosage des réactifs',
      'Entretenir les pompes, les filtres et les bassins',
      'Réagir aux pannes et aux pollutions accidentelles',
      'Réaliser des analyses et tenir le suivi',
    ],
    qualities: [
      'Rigueur et sens des responsabilités',
      'Réactivité face aux alarmes',
      'Goût pour la technique et les mesures',
      'Respect strict des procédures de sécurité',
      'Envie de protéger l’environnement',
    ],
    studies: [
      'CAP agent de la qualité de l’eau ou bac pro dans la chimie et l’eau',
      'Pour être technicien : BTS Métiers de l’eau, BUT ou licence professionnelle',
      'Formations courtes possibles en traitement et gestion des eaux',
    ],
    conditions: [
      'En station, à l’intérieur et à l’extérieur',
      'Horaires réguliers, avec parfois des astreintes',
      'Communes, métropoles ou entreprises de l’eau',
      'Port d’équipements de protection',
    ],
  },

  order: ['pollution', 'ph', 'pompe', 'filtre', 'debit', 'accident', 'analyses', 'bassin', 'automate', 'cuve'],
  scenes: EAUX_SCENES,
  advice: EAUX_ADVICE,
  answers: EAUX_ANSWERS,

  newState() {
    return { step: 'pollution', time: '07:00', errors: 0, negligence: 0, pollution: false, notes: [], feedback: null };
  },

  clock(step, state) {
    return this.scenes[step]?.time || state.time;
  },

  describe(scene) {
    return scene.description;
  },

  crowd(state) {
    if (state.errors >= 3) return 'Station perturbée';
    if (state.errors >= 1) return 'Station sous surveillance';
    return 'Station stable';
  },

  image(step) {
    return this.scenes[step]?.image || 'station';
  },

  endImage() {
    return 'station';
  },

  endTime() {
    return '14:30';
  },

  ending(state) {
    if (state.negligence >= 2) return ['Échec professionnel', 'Mise en danger de l’environnement : plusieurs négligences et procédures non respectées. Dans ce métier, la sécurité et les procédures passent avant tout.'];
    if (state.pollution) return ['Incident environnemental', 'Arrêt de la station : une pollution n’a pas été maîtrisée. Le technicien doit alerter, isoler et adapter le traitement.'];
    if (state.errors >= 3) return ['Station perturbée', 'Intervention nécessaire : plusieurs erreurs et retards ont fragilisé la station.'];
    if (state.errors >= 1) return ['Technicien compétent', 'Station fonctionnelle : quelques erreurs, mais sans conséquence grave.'];
    return ['Excellent technicien', 'Station parfaitement opérationnelle : tous les problèmes ont été maîtrisés.'];
  },
};
