const MEDECIN_SCENES = {
  plainte: {
    time: '14:00',
    image: 'cabinet',
    title: 'Un patient entre dans le cabinet',
    description: 'Consultation fictive : le patient a de la toux, mal à la gorge et se sent très fatigué.',
    speaker: 'Le patient',
    line: 'Bonjour docteur… Je ne me sens vraiment pas bien depuis quelques jours.',
    choices: [
      {
        label: 'Laisser le patient expliquer ses symptômes',
        good: true,
        feedback: 'Tu notes les symptômes et depuis quand ils ont commencé.',
        next: 'gorge',
        effects: { ecoute: true },
      },
      {
        label: 'Commencer par regarder la gorge',
        good: true,
        feedback: 'Tu notes les symptômes et depuis quand ils ont commencé.',
        next: 'gorge',
        effects: {  },
      },
    ],
  },

  gorge: {
    time: '14:03',
    image: 'examen',
    title: 'Observer la gorge',
    description: "Tu examines la gorge du patient avec une lampe. Choisis l'image qui correspond à ce que tu observes.",
    speaker: 'Dr Roux, maître de stage',
    line: 'Quelle image choisis-tu pour décrire la gorge ?',
    choices: [
      {
        label: 'Image A : rougeur légère, pas de dépôts visibles',
        good: true,
        feedback: 'Aspect de la gorge noté : rougeur légère, sans dépôts.',
        next: 'fievre',
        effects: {  },
        image: 'gorgeA',
      },
      {
        label: 'Image B : dépôts blanchâtres visibles',
        good: true,
        feedback: 'Aspect de la gorge noté : dépôts blanchâtres sur les amygdales.',
        next: 'fievre',
        effects: { depots: true },
        image: 'gorgeB',
      },
      {
        label: 'Image C : image floue, examen à refaire',
        good: true,
        feedback: "Image floue : l'examen de la gorge sera à refaire.",
        next: 'fievre',
        effects: {  },
        image: 'gorgeC',
      },
    ],
  },

  fievre: {
    time: '14:05',
    image: 'cabinet',
    title: 'La fièvre',
    description: 'Le patient dit avoir eu chaud et froid ces derniers jours.',
    speaker: 'Dr Roux, maître de stage',
    line: 'Quelle question poses-tu sur la fièvre ?',
    choices: [
      {
        label: 'Depuis quand, et à quelle intensité ?',
        good: true,
        feedback: 'Tu consignes la réponse dans le dossier.',
        next: 'respiration',
        effects: {  },
      },
      {
        label: 'Le patient a-t-il pris sa température ?',
        good: true,
        feedback: 'Tu consignes la réponse dans le dossier.',
        next: 'respiration',
        effects: {  },
      },
    ],
  },

  respiration: {
    time: '14:07',
    image: 'examen',
    title: 'Examiner la respiration',
    description: "Tu écoutes la respiration du patient. Choisis l'image qui correspond à ton observation.",
    speaker: 'Dr Roux, maître de stage',
    line: 'Quelle image respiratoire retiens-tu ?',
    choices: [
      {
        label: 'Image A : respiration calme',
        good: true,
        feedback: 'Observation notée : respiration calme et régulière.',
        next: 'toux',
        effects: {  },
        image: 'respA',
      },
      {
        label: 'Image B : respiration rapide ou difficile',
        good: true,
        feedback: "Signe d'alerte : il faut une évaluation urgente, on ne poursuit pas une consultation de routine.",
        next: 'endIncident',
        effects: {  },
        image: 'respB',
      },
      {
        label: 'Image C : image non concluante',
        good: true,
        feedback: 'Observation non concluante : à surveiller.',
        next: 'toux',
        effects: {  },
        image: 'respC',
      },
    ],
  },

  toux: {
    time: '14:09',
    image: 'cabinet',
    title: 'La toux',
    description: 'Le patient tousse plusieurs fois pendant la consultation.',
    speaker: 'Dr Roux, maître de stage',
    line: 'Que demandes-tu sur la toux ?',
    choices: [
      {
        label: 'Est-elle sèche ou avec des crachats ?',
        good: true,
        feedback: 'Tu notes le type de toux.',
        next: 'sinus',
        effects: {  },
      },
      {
        label: 'Est-elle présente surtout la nuit ?',
        good: true,
        feedback: 'Tu notes le type de toux.',
        next: 'sinus',
        effects: {  },
      },
      {
        label: 'Le patient dit ne pas tousser',
        good: true,
        feedback: 'Tu notes que la toux est absente.',
        next: 'sinus',
        effects: {  },
      },
    ],
  },

  sinus: {
    time: '14:11',
    image: 'examen',
    title: 'Examiner le visage et les sinus',
    description: "Tu observes le visage du patient et tu appuies doucement au niveau des sinus. Choisis l'image qui correspond.",
    speaker: 'Dr Roux, maître de stage',
    line: 'Quelle image du visage et des sinus retiens-tu ?',
    choices: [
      {
        label: 'Image A : pas de douleur apparente',
        good: true,
        feedback: 'Observation notée : pas de douleur au niveau du visage.',
        next: 'symptomes',
        effects: {  },
        image: 'sinusA',
      },
      {
        label: 'Image B : douleur localisée au visage',
        good: true,
        feedback: 'Observation notée : douleur localisée au niveau des sinus.',
        next: 'symptomes',
        effects: { douleurFace: true },
        image: 'sinusB',
      },
      {
        label: 'Image C : image peu lisible',
        good: true,
        feedback: 'Image peu lisible : observation à compléter.',
        next: 'symptomes',
        effects: {  },
        image: 'sinusC',
      },
    ],
  },

  symptomes: {
    time: '14:13',
    image: 'cabinet',
    title: 'Les symptômes associés',
    description: "D'autres signes peuvent aider à comprendre ce qui se passe.",
    speaker: 'Dr Roux, maître de stage',
    line: 'Quels symptômes associés recherches-tu ?',
    choices: [
      {
        label: 'Courbatures et fatigue marquée',
        good: true,
        feedback: 'Tu consignes les réponses.',
        next: 'antecedents',
        effects: { courbatures: true },
      },
      {
        label: 'Nez bouché ou écoulement',
        good: true,
        feedback: 'Tu consignes les réponses.',
        next: 'antecedents',
        effects: { nez: true },
      },
      {
        label: 'Aucun de ces symptômes',
        good: true,
        feedback: 'Tu consignes les réponses.',
        next: 'antecedents',
        effects: {  },
      },
    ],
  },

  antecedents: {
    time: '14:15',
    image: 'dossier',
    title: 'Les antécédents',
    description: "Tu ouvres le dossier médical du patient sur l'ordinateur.",
    speaker: 'Dr Roux, maître de stage',
    line: 'Que vérifies-tu dans ses antécédents ?',
    choices: [
      {
        label: 'Une maladie chronique ou un traitement en cours',
        good: true,
        feedback: 'Tu précises les antécédents dans le dossier.',
        next: 'examens',
        effects: {  },
      },
      {
        label: 'Une allergie connue',
        good: true,
        feedback: 'Tu précises les antécédents dans le dossier.',
        next: 'examens',
        effects: {  },
      },
      {
        label: 'Aucun élément signalé',
        good: true,
        feedback: 'Tu précises les antécédents dans le dossier.',
        next: 'examens',
        effects: {  },
      },
    ],
  },

  examens: {
    time: '14:17',
    image: 'dossier',
    title: 'Un examen complémentaire ?',
    description: 'Tu relis tout ce que tu as noté pendant la consultation.',
    speaker: 'Dr Roux, maître de stage',
    line: 'Les signes nécessitent-ils un examen complémentaire ?',
    choices: [
      {
        label: "Oui, selon l'évaluation clinique",
        good: true,
        feedback: "Tu choisis l'examen adapté dans la simulation.",
        next: 'conclusion',
        effects: {  },
      },
      {
        label: "Non, les éléments recueillis suffisent pour l'instant",
        good: true,
        feedback: "Tu choisis l'examen adapté dans la simulation.",
        next: 'conclusion',
        effects: {  },
      },
      {
        label: "J'ai un doute important",
        good: true,
        feedback: 'Doute important : le patient doit être évalué en urgence.',
        next: 'endIncident',
        effects: {  },
      },
    ],
  },

  conclusion: {
    time: '14:19',
    image: 'cabinet',
    title: 'La conclusion provisoire',
    description: 'Il est temps de conclure : quelle hypothèse correspond le mieux à tout ce que tu as observé ?',
    speaker: 'Dr Roux, maître de stage',
    line: 'Quelle conclusion provisoire retiens-tu ?',
    choices: [
      {
        label: 'Symptômes plutôt compatibles avec une infection virale',
        good: true,
        feedback: 'Hypothèse retenue : rhume ou infection virale.',
        next: 'end',
        effects: { viral: true },
      },
      {
        label: 'Début brutal avec fièvre et courbatures marquées',
        good: true,
        feedback: 'Hypothèse retenue : syndrome grippal.',
        next: 'end',
        effects: { grippe: true },
      },
      {
        label: 'Contexte compatible, test à discuter',
        good: true,
        feedback: 'Hypothèse retenue : COVID-19.',
        next: 'end',
        effects: { covid: true },
      },
      {
        label: 'Mal de gorge important, suspicion à vérifier',
        good: true,
        feedback: 'Hypothèse retenue : angine.',
        next: 'end',
        effects: { angine: true },
      },
      {
        label: 'Douleur faciale et symptômes nasaux au premier plan',
        good: true,
        feedback: 'Hypothèse retenue : sinusite.',
        next: 'end',
        effects: { sinusite: true },
      },
      {
        label: 'Toux avec gêne respiratoire ou examen préoccupant',
        good: true,
        feedback: 'Hypothèse retenue : atteinte pulmonaire suspectée.',
        next: 'end',
        effects: { pulmonaire: true },
      },
      {
        label: 'Éléments insuffisants ou contradictoires',
        good: true,
        feedback: 'Hypothèse retenue : diagnostic incertain.',
        next: 'end',
        effects: { incertain: true },
      },
    ],
  },
};

const MEDECIN_ADVICE = {
  plainte: 'Une consultation commence presque toujours par l’écoute : laisser le patient raconter aide à ne rien oublier.',
  gorge: 'Regarde bien la couleur et la présence de dépôts. Si l’image n’est pas nette, mieux vaut refaire l’examen.',
  fievre: 'Pour la fièvre, on s’intéresse à la durée, à l’intensité et à la façon dont elle a été mesurée.',
  respiration: 'Une respiration rapide ou difficile est un signe d’alerte : on ne continue pas comme une consultation ordinaire.',
  toux: 'Le type de toux, sèche ou grasse, et le moment où elle apparaît donnent des indices.',
  sinus: 'Une douleur localisée au visage, avec le nez bouché, peut orienter vers les sinus.',
  symptomes: 'Les symptômes associés aident à distinguer un rhume d’une grippe ou d’une autre cause.',
  antecedents: 'Les maladies chroniques, les traitements et les allergies changent la façon de prendre en charge un patient.',
  examens: 'En cas de doute important, le plus sûr est de faire évaluer rapidement le patient.',
  conclusion: 'Ta conclusion doit s’appuyer sur ce que tu as observé : c’est une hypothèse, qui se confirme ou s’ajuste avec le suivi.',
};

const MEDECIN_SALARY = {
  median: 3588,
  reference: 'Médecin généraliste',
  url: 'https://www.orientation-regionsud.fr/metiers/medecin-generaliste',
};

const MEDECIN_DISCLAIMER = 'Simulation pédagogique : seul un vrai médecin peut poser un diagnostic.';

const MEDECIN_ANSWERS = [
  {
    match: /^(?=.*specialiste)(?=.*(diff|generaliste))/,
    reply: 'Le médecin généraliste suit les patients dans la durée et s’occupe de tous les problèmes de santé courants. Quand c’est nécessaire, il oriente vers un spécialiste : cardiologue, ORL, pneumologue…',
  },
  {
    match: /etude|formation|diplome|ecole|apprendre|bac|annee/,
    reply: 'Il faut environ 10 ans d’études après le bac : une première année PASS ou L.AS, puis les études de médecine, puis l’internat de médecine générale. On obtient le diplôme d’État de docteur en médecine, et il faut s’inscrire à l’Ordre des médecins pour exercer.',
  },
  {
    match: /salaire|combien gagne|paye|paie|argent|revenu/,
    reply: () => `Selon Orientation Région Sud (données Insee 2022), la moitié des médecins salariés à temps plein gagnent plus de ${euros(MEDECIN_SALARY.median)} net par mois. Beaucoup de médecins généralistes exercent en libéral, où les revenus varient davantage.`,
  },
  {
    match: /qualite|competence|savoir etre|savoir-faire/,
    reply: 'Il faut savoir écouter, expliquer avec des mots simples, être rigoureux, garder son calme dans l’urgence et aimer apprendre toute sa vie, car la médecine évolue sans cesse.',
  },
  {
    match: /horaire|heures|nuit|garde|week[- ]?end/,
    reply: 'Les journées sont souvent longues, avec des consultations et des visites. Certains médecins participent aussi à des gardes le soir ou le week-end.',
  },
  {
    match: /liberal|cabinet|hopital|maison de sante|ou travailler|salarie/,
    reply: 'Un médecin généraliste peut travailler en libéral dans son cabinet, dans une maison de santé avec d’autres soignants, ou comme salarié dans un centre de santé ou un hôpital.',
  },
  {
    match: /urgen|grave|samu|\b15\b/,
    reply: 'Face à un signe de gravité, comme une respiration difficile, le médecin ne continue pas une consultation ordinaire : il organise une prise en charge rapide. En France, le numéro du SAMU est le 15.',
  },
  {
    match: /diagnostic|hypothese|conclusion/,
    reply: 'Le diagnostic se construit petit à petit : écouter, examiner, poser des questions, parfois demander un examen. Une première conclusion reste une hypothèse que le suivi permet de confirmer.',
  },
  {
    match: /secret|confidentiel/,
    reply: 'Le médecin est tenu au secret médical : ce que dit le patient reste entre eux, sauf exceptions prévues par la loi.',
  },
  {
    match: /stress|difficile|dur|fatigue/,
    reply: 'Le métier demande beaucoup : responsabilité, charge de travail, situations émotionnelles. Travailler en équipe et bien s’organiser aide à tenir.',
  },
  {
    match: /avantage|plaisir|pourquoi aimer/,
    reply: 'On aide les gens au quotidien, on les connaît dans la durée, et chaque consultation est différente.',
  },
  {
    match: /medecin|generaliste|metier|travail|role/,
    reply: 'Le médecin généraliste est le premier interlocuteur des patients : il écoute, examine, pose un diagnostic, prescrit des soins, fait de la prévention et oriente vers un spécialiste si besoin.',
  },
  {
    match: /pourquoi|perdu|fin|resultat/,
    reply: 'Ta fin dépend de ce que tu as observé et de la conclusion que tu as choisie. Il n’y a pas de score : l’important est que ta conclusion s’appuie sur tes observations.',
  },
  {
    match: /bonjour|salut|hello/,
    reply: 'Bonjour ! Je suis le Dr Roux, ta maître de stage. Pose-moi tes questions sur la consultation ou sur le métier de médecin généraliste.',
  },
];

const MEDECIN_ENDINGS = [
  ['viral', 'Hypothèse : rhume ou infection virale', 'Dans la simulation, on donne des conseils adaptés et on organise un suivi.'],
  ['grippe', 'Hypothèse : syndrome grippal', 'Dans la simulation, on vérifie si un test ou un suivi est indiqué.'],
  ['covid', 'Hypothèse : COVID-19', 'Dans la simulation, on confirme selon le contexte et les recommandations.'],
  ['angine', 'Hypothèse : angine', 'Dans la simulation, on fait un examen ou un test avant toute décision de traitement.'],
  ['sinusite', 'Hypothèse : sinusite', 'Dans la simulation, on évalue la durée, l’évolution et les signes associés.'],
  ['pulmonaire', 'Suspicion d’atteinte pulmonaire', 'Dans la simulation, le patient a besoin d’une évaluation médicale rapide.'],
  ['incertain', 'Diagnostic incertain', 'Dans la simulation, on réexamine, on demande un avis ou on organise un suivi.'],
];

const MEDECIN = {
  name: 'Médecin généraliste',
  tagline: 'une consultation au cabinet',
  pitch: 'Mène une consultation au cabinet',
  icon: 'i-stethoscope',
  sector: 'sante',
  keywords: /medecin|generaliste|docteur|sante|consultation/,
  colleague: 'Dr Roux',
  colleagueRole: 'ta maître de stage',
  endHeading: 'Fin de la consultation',
  chatSubtitle: 'Pose toutes tes questions sur la consultation et le métier de médecin',
  journalTitle: 'Ton dossier de consultation',
  greeting: 'Bonjour ! Je suis le Dr Roux, ta maître de stage. Pose-moi une question sur la consultation ou sur le métier.',
  defaultAdvice: 'Écoute, observe, puis appuie ta conclusion sur ce que tu as vraiment constaté.',
  fallback: 'Je peux répondre aux questions sur le métier : études, salaire, qualités, horaires, lieux d’exercice, urgences, diagnostic, secret médical et différence avec un spécialiste.',

  info: {
    salary: MEDECIN_SALARY,
    summary: 'Le médecin généraliste est le premier interlocuteur des patients. Il les écoute, les examine, pose un diagnostic, prescrit des soins et des examens, fait de la prévention et les oriente vers un spécialiste quand c’est nécessaire.',
    missions: [
      'Écouter le patient et l’interroger sur ses symptômes',
      'Examiner, poser un diagnostic et prescrire des soins',
      'Repérer les signes d’urgence et organiser la prise en charge',
      'Suivre les patients dans la durée et faire de la prévention',
      'Orienter vers un spécialiste ou un examen complémentaire',
    ],
    qualities: [
      'Écoute et empathie',
      'Rigueur et esprit d’analyse',
      'Clarté pour expliquer avec des mots simples',
      'Calme dans les situations urgentes',
      'Goût d’apprendre tout au long de sa carrière',
    ],
    studies: [
      'Au lycée : spécialités scientifiques recommandées (SVT, physique-chimie, maths)',
      'Environ 10 ans après le bac : PASS ou L.AS, études de médecine, puis internat de médecine générale',
      'Diplôme d’État de docteur en médecine et inscription à l’Ordre des médecins',
    ],
    conditions: [
      'Cabinet, maison de santé, centre de santé ou hôpital',
      'Longues journées, parfois des gardes le soir ou le week-end',
      'Exercice en libéral ou comme salarié',
      'Travail en lien avec infirmiers, pharmaciens et spécialistes',
    ],
  },

  order: ['plainte', 'gorge', 'fievre', 'respiration', 'toux', 'sinus', 'symptomes', 'antecedents', 'examens', 'conclusion'],
  scenes: MEDECIN_SCENES,
  advice: MEDECIN_ADVICE,
  answers: MEDECIN_ANSWERS,

  newState() {
    return {
      step: 'plainte',
      time: '14:00',
      ecoute: false,
      depots: false,
      douleurFace: false,
      courbatures: false,
      nez: false,
      viral: false,
      grippe: false,
      covid: false,
      angine: false,
      sinusite: false,
      pulmonaire: false,
      incertain: false,
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
    return this.scenes[step]?.image || 'cabinet';
  },

  endImage(state, incident) {
    return incident || state.pulmonaire ? 'urgence' : 'cabinet';
  },

  endTime() {
    return '14:20';
  },

  ending(state, incident) {
    const closing = `Clôture : explique ta conclusion au patient et le suivi prévu. ${MEDECIN_DISCLAIMER}`;
    if (incident) return ['Évaluation urgente', `Tu as repéré un signe d’alerte : on ne poursuit pas une consultation de routine, le patient doit être évalué rapidement. ${closing}`];
    const [, title, follow] = MEDECIN_ENDINGS.find(([key]) => state[key]) ?? MEDECIN_ENDINGS.at(-1);
    return [title, `${follow} ${closing}`];
  },
};
