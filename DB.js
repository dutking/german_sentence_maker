const verbEndings = {
  firstPerson: {
    singular: 'e',
    plural: 'en'
  },
  secondPerson: {
    singular: 'st',
    plural: 't'
  },
  thirdPerson: {
    singular: {
      masculine: 't',
      feminine: 't',
      neutral: 't'
    },
    plural: 'en'
  },
  infinitive: 'en',
  polite: 'en'
}

const pronouns = {
  firstPerson: {
    singular: 'ich',
    plural: 'wir'
  },
  secondPerson: {
    singular: 'du',
    plural: 'ihr'
  },
  thirdPerson: {
    singular: {
      masculine: 'er',
      feminine: 'sie',
      neutral: 'es'
    },
    plural: 'sie'
  },
  polite: 'Sie'
}

// выбираем местоимение. надо как-то рекурсивно переписать...

const fieldSets = {
  pronouns: ['person', 'number', 'gender', 'finalForm'],
  tenses: ['type', 'tense']
}

const tenses = {
  indicative: ['present', 'preterite', 'perfect', 'pqp', 'future1'],
  conjunctive1: ['present', 'perfect', 'future1'],
  conjunctive2: ['preterite', 'pqp', 'future1']
}

function getAuxPath(t, n) {
  return Object.assign({}, t, n)
}

function getAuxVerb(obj) {
  let aux = auxVerbs
  for (let prop in obj) {
    if (!Object.keys(aux).includes(obj[prop])) {
      break
    }
    aux = aux[obj[prop]]
  }
  return aux
}

const auxVerbs = {
  indicative: {
    perfect: {
      firstPerson: {
        singular: ['bin', 'habe'],
        plural: ['sind', 'haben']
      },
      secondPerson: {
        singular: ['bist', 'hast'],
        plural: ['seid', 'habt']
      },
      thirdPerson: {
        singular: {
          masculine: ['ist', 'hat'],
          feminine: ['ist', 'hat'],
          neutral: ['ist', 'hat']
        },
        plural: ['sind', 'haben']
      },
      polite: ['sind', 'haben']
    },
    pqp: {
      firstPerson: {
        singular: ['war', 'hatte'],
        plural: ['waren', 'hatten']
      },
      secondPerson: {
        singular: ['warst', 'hattest'],
        plural: ['wart', 'hattet']
      },
      thirdPerson: {
        singular: {
          masculine: ['war', 'hatte'],
          feminine: ['war', 'hatte'],
          neutral: ['war', 'hatte']
        },
        plural: ['waren', 'hatten']
      },
      polite: ['waren', 'hatten']
    },
    future1: {
      firstPerson: {
        singular: 'werde',
        plural: 'werden'
      },
      secondPerson: {
        singular: 'wirst',
        plural: 'werdet'
      },
      thirdPerson: {
        singular: {
          masculine: 'wird',
          feminine: 'wird',
          neutral: 'wird'
        },
        plural: 'werden'
      },
      polite: 'werden'
    }
    /*         future2: {

                } */
  },
  conjunktive1: {
    perfect: {
      firstPerson: {
        singular: ['sei', 'habe'],
        plural: ['seien', 'haben']
      },
      secondPerson: {
        singular: ['seiest', 'habest'],
        plural: ['seiet', 'habet']
      },
      thirdPerson: {
        singular: {
          masculine: ['sei', 'habe'],
          feminine: ['sei', 'habe'],
          neutral: ['sei', 'habe']
        },
        plural: ['seien', 'haben']
      },
      polite: ['seien', 'haben']
    },
    future1: {
      firstPerson: {
        singular: 'werde',
        plural: 'werden'
      },
      secondPerson: {
        singular: 'werdest',
        plural: 'werdet'
      },
      thirdPerson: {
        singular: {
          masculine: 'werde',
          feminine: 'werde',
          neutral: 'werde'
        },
        plural: 'werden'
      },
      polite: 'werden'
    },
    future2: {
      // to do
    }
  },
  conjunctive2: {
    pqp: {
      firstPerson: {
        singular: ['wäre', 'hätte'],
        plural: ['wären', 'hätten']
      },
      secondPerson: {
        singular: ['wärest', 'hättest'],
        plural: ['wäret', 'hättet']
      },
      thirdPerson: {
        singular: {
          masculine: ['wäre', 'hätte'],
          feminine: ['wäre', 'hätte'],
          neutral: ['wäre', 'hätte']
        },
        plural: ['wären', 'hätten']
      },
      polite: ['wären', 'hätten']
    },
    future1: {
      firstPerson: {
        singular: 'würde',
        plural: 'würden'
      },
      secondPerson: {
        singular: 'würdest',
        plural: 'würdet'
      },
      thirdPerson: {
        singular: {
          masculine: 'würde',
          feminine: 'würde',
          neutral: 'würde'
        },
        plural: 'würden'
      },
      polite: 'würden'
    }
    /*         future2: {
                    
                } */
  }
}

const prefixes = {
  detach: ['be', 'ge', 'er', 'ver', 'zer', 'ent', 'emp', 'miss'],
  attach: [
    'ab',
    'an',
    'auf',
    'aus',
    'bei',
    'ein',
    'fest',
    'her',
    'hin',
    'los',
    'mit',
    'nach',
    'vor',
    'weg',
    'zurück',
    'zusammen',
    'zu'
  ],
  mixed: ['durch', 'über', 'um', 'unter', 'wieder']
}

class Noun {
  constructor(gender, singular, plural) {
    this.gender = gender
    this.singular = singular
    this.plural = plural
  }
}

const nouns = {
  apfel: new Noun('masculine', 'Apfel', 'Äpfel'),
  karrote: new Noun('feminine', 'Karrote', 'Karroten'),
  radies: new Noun('neutral', 'Radies', 'Radies')
}

const regularVerbs = ['kaufen', 'verkaufen', 'einkaufen']

// Cases, Articles and Endings

const cases = {
  nominative: {
    article: {
      masculine: 'der',
      feminine: 'die',
      neutral: 'das',
      plural: 'die'
    },
    ending: {
      masculine: 'er',
      feminine: 'e',
      neutral: 'es',
      plural: 'e'
    }
  },
  accusative: {
    article: {
      masculine: 'den',
      feminine: 'die',
      neutral: 'das',
      plural: 'die'
    },
    ending: {
      masculine: 'en',
      feminine: 'e',
      neutral: 'es',
      plural: 'e'
    }
  },
  dative: {
    article: {
      masculine: 'dem',
      feminine: 'der',
      neutral: 'dem',
      plural: 'den' // реализовать прибаление окончания N
    },
    ending: {
      masculine: 'em',
      feminine: 'er',
      neutral: 'em',
      plural: 'en'
    }
  },
  genitive: {
    article: {
      masculine: 'des', // реализовать прибаление окончания S
      feminine: 'der',
      neutral: 'des', // реализовать прибаление окончания S
      plural: 'der'
    },
    ending: {
      masculine: 'es',
      feminine: 'er',
      neutral: 'es',
      plural: 'er'
    }
  }
}

class IrregularVerb {
  constructor(infinitive, person2, person3, preterite, particip2, translation) {
    this.infinitive = infinitive
    this.person2 = person2
    this.person3 = person3
    this.preterite = preterite
    this.particip2 = particip2
    this.translation = translation
  }
}

const irregularVerbs = {
  abreiben: new IrregularVerb(
    'abreiben',
    'reibst ab',
    'reibt ab',
    'rieb ab',
    'abgerieben',
    'вытирать, протирать'
  ),
  anstreichen: new IrregularVerb(
    'anfangen',
    'fängt an',
    'fing an',
    'angefangen',
    'начинать (-ся)'
  ),
  anstreichen: new IrregularVerb(
    'anstreichen',
    'streicht an',
    'strich an',
    'angestrichen',
    'окрашивать'
  ),
  backen: new IrregularVerb(
    'backen',
    'backt',
    'backte',
    'gebacken',
    'запекать'
  ),
  befehlen: new IrregularVerb(
    'befehlen',
    'befiehlt',
    'befahl',
    'befohlen',
    'приказывать'
  ),
  beginnen: new IrregularVerb(
    'beginnen',
    'beginnt',
    'begann',
    'begonnen',
    'начинать'
  ),
  begreifen: new IrregularVerb(
    'begreifen',
    'begreift',
    'begriff',
    'begriffen',
    'осознать'
  ),
  beißen: new IrregularVerb('beißen', 'beißt', 'biss', 'gebissen', 'кусать'),
  bergen: new IrregularVerb('bergen', 'birgt', 'barg', 'geborgen', 'спасать'),
  bersten: new IrregularVerb(
    'bersten',
    'birst',
    'barst',
    'geborsten',
    'лопаться'
  ),
  beweisen: new IrregularVerb(
    'beweisen',
    'beweist',
    'bewies',
    'bewiesen',
    'доказывать'
  ),
  biegen: new IrregularVerb('biegen', 'biegt', 'bog', 'gebogen', 'гнуть'),
  bieten: new IrregularVerb('bieten', 'bietet', 'bot', 'geboten', 'предлагать'),
  binden: new IrregularVerb(
    'binden',
    'bindet',
    'band',
    'gebunden',
    'связывать'
  ),
  bitten: new IrregularVerb('bitten', 'bittet', 'bat', 'gebeten', 'просить'),
  blasen: new IrregularVerb('blasen', 'bläst', 'blies', 'geblasen', 'дуть'),
  bleiben: new IrregularVerb(
    'bleiben',
    'bleibt',
    'blieb',
    'geblieben',
    'оставаться где-либо'
  ),
  braten: new IrregularVerb('braten', 'brät', 'briet', 'gebraten', 'жарить'),
  brechen: new IrregularVerb(
    'brechen',
    'bricht',
    'brach',
    'gebrochen',
    'ломать'
  ),
  brennen: new IrregularVerb(
    'brennen',
    'brennt',
    'brannte',
    'gebrannt',
    'гореть'
  ),
  bringen: new IrregularVerb(
    'bringen',
    'bringt',
    'brachte',
    'gebracht',
    'приносить что-либо'
  ),
  denken: new IrregularVerb(
    'denken',
    'denkt',
    'dachte',
    'gedacht',
    'думать, вспоминать'
  ),
  dreschen: new IrregularVerb(
    'dreschen',
    'drischt',
    'drosch',
    'gedroschen',
    'молотить'
  ),
  dringen: new IrregularVerb(
    'dringen',
    'dringt',
    'drang',
    'gedrungen',
    'проникать'
  ),
  durchstreichen: new IrregularVerb(
    'durchstreichen',
    'streicht durch',
    'strich durch',
    'durchgestrichen',
    'зачеркивать'
  ),
  dürfen: new IrregularVerb(
    'dürfen',
    'darf',
    'durfte',
    'gedurft',
    'выражает разрешение'
  ),
  einladen: new IrregularVerb(
    'einladen',
    'lädt ein',
    'lud ein',
    'eingeladen',
    'приглашать'
  ),
  empfangen: new IrregularVerb(
    'empfangen',
    'empfängt',
    'empfing',
    'empfangen',
    'принимать'
  ),
  empfehlen: new IrregularVerb(
    'empfehlen',
    'empfiehlt',
    'empfahl',
    'empfohlen',
    'рекомендовать'
  ),
  empfinden: new IrregularVerb(
    'empfinden',
    'empfindet',
    'empfand',
    'empfunden',
    'ощущать'
  ),
  entscheiden: new IrregularVerb(
    'entscheiden',
    'entscheidet',
    'entschied',
    'entschieden',
    'принять решение'
  ),
  erlöschen: new IrregularVerb(
    'erlöschen',
    'erlischt',
    'erlosch',
    'erloschen',
    'потухать'
  ),
  erschrecken: new IrregularVerb(
    'erschrecken',
    'erschrickt',
    'erschrak',
    'erschrocken',
    '(ис)пугаться'
  ),
  essen: new IrregularVerb('essen', 'isst', 'aß', 'gegessen', 'есть'),
  fahren: new IrregularVerb('fahren', 'fährt', 'fuhr', 'gefahren', 'ехать'),
  fallen: new IrregularVerb('fallen', 'fällt', 'fiel', 'gefallen', 'падать'),
  fangen: new IrregularVerb(
    'fangen',
    'fängt',
    'fing',
    'gefangen',
    'ловить, поймать'
  ),
  fechten: new IrregularVerb(
    'fechten',
    'ficht',
    'focht',
    'gefochten',
    'сражаться'
  ),
  finden: new IrregularVerb('finden', 'findet', 'fand', 'gefunden', 'находить'),
  flechten: new IrregularVerb(
    'flechten',
    'flicht',
    'flocht',
    'geflochten',
    'плести'
  ),
  fliegen: new IrregularVerb(
    'fliegen',
    'fliegt',
    'flog',
    'geflogen',
    'летать, лететь'
  ),
  fliehen: new IrregularVerb(
    'fliehen',
    'flieht',
    'floh',
    'geflohen',
    'cбежать'
  ),
  fließen: new IrregularVerb(
    'fließen',
    'fließt',
    'floss',
    'geflossen',
    'течь, литься'
  ),
  fressen: new IrregularVerb('fressen', 'frißt', 'fraß', 'gefressen', 'жрать'),
  frieren: new IrregularVerb(
    'frieren',
    'friert',
    'fror',
    'gefroren',
    'мёрзнуть'
  ),
  gären: new IrregularVerb('gären', 'gärt', 'gor', 'gegoren', 'бродить'),
  gebären: new IrregularVerb(
    'gebären',
    'gebärt',
    'gebar',
    'geboren',
    'рождать'
  ),
  geben: new IrregularVerb('geben', 'gibt', 'gab', 'gegeben', 'давать'),
  gedeihen: new IrregularVerb(
    'gedeihen',
    'gedeiht',
    'gedieh',
    'gediehen',
    'расти'
  ),
  gehen: new IrregularVerb('gehen', 'geht', 'ging', 'gegangen', 'идти, ходить'),
  gelingen: new IrregularVerb(
    'gelingen',
    'gelingt',
    'gelang',
    'gelungen',
    'удаваться'
  ),
  gelten: new IrregularVerb('gelten', 'gilt', 'galt', 'gegolten', 'стоить'),
  genesen: new IrregularVerb(
    'genesen',
    'genest',
    'genas',
    'genesen',
    'выздоравливать'
  ),
  genießen: new IrregularVerb(
    'genießen',
    'genießt',
    'genoß',
    'genossen',
    'наслаждаться'
  ),
  geschehen: new IrregularVerb(
    'geschehen',
    'geschieht',
    'geschah',
    'geschehen',
    'происходить'
  ),
  gewinnen: new IrregularVerb(
    'gewinnen',
    'gewinnt',
    'gewann',
    'gewonnen',
    'выигрывать'
  ),
  gießen: new IrregularVerb(
    'gießen',
    'gießt',
    'goss',
    'gegossen',
    'лить, наливать'
  ),
  gleichen: new IrregularVerb(
    'gleichen',
    'gleicht',
    'glich',
    'geglichen',
    'выравнивать'
  ),
  gleiten: new IrregularVerb(
    'gleiten',
    'gleitet',
    'glitt',
    'geglitten',
    'скользить'
  ),
  glimmen: new IrregularVerb(
    'glimmen',
    'glimmt',
    'glomm',
    'geglommen',
    'тлеть'
  ),
  graben: new IrregularVerb('graben', 'gräbt', 'grub', 'gegraben', 'копать'),
  greifen: new IrregularVerb(
    'greifen',
    'greift',
    'griff',
    'gegriffen',
    'браться (за что-либо)'
  ),
  haben: new IrregularVerb('haben', 'hat', 'hatte', 'gehabt', 'иметь'),
  halten: new IrregularVerb('halten', 'hält', 'hielt', 'gehalten', 'держать'),
  hängen: new IrregularVerb('hängen', 'hängt', 'hing', 'gehangen', 'висеть'),
  hauen: new IrregularVerb('hauen', 'haut', 'haute', 'gehauen', 'рубить'),
  heben: new IrregularVerb('heben', 'hebt', 'hob', 'gehoben', 'поднимать'),
  heißen: new IrregularVerb(
    'heißen',
    'heißt',
    'hieß',
    'geheißen',
    'называться'
  ),
  helfen: new IrregularVerb('helfen', 'hilft', 'half', 'geholfen', 'помогать'),
  kennen: new IrregularVerb(
    'kennen',
    'kennt',
    'kannte',
    'gekannt',
    'знать, быть знакомым'
  ),
  klingen: new IrregularVerb(
    'klingen',
    'klingt',
    'klang',
    'geklungen',
    'звенеть'
  ),
  kneifen: new IrregularVerb(
    'kneifen',
    'kneift',
    'kniff',
    'gekniffen',
    'ощипывать'
  ),
  kommen: new IrregularVerb('kommen', 'kommt', 'kam', 'gekommen', 'приходить'),
  können: new IrregularVerb('können', 'kann', 'konnte', 'gekonnt', 'мочь'),
  kriechen: new IrregularVerb(
    'kriechen',
    'kriecht',
    'kroch',
    'gekrochen',
    'ползти'
  ),
  laden: new IrregularVerb('laden', 'lädt', 'lud', 'geladen', 'грузить'),
  lassen: new IrregularVerb(
    'lassen',
    'läst',
    'ließ',
    'gelassen',
    'велеть, позволять'
  ),
  laufen: new IrregularVerb(
    'laufen',
    'läuft',
    'lief',
    'gelaufen',
    'бегать, бежать'
  ),
  leiden: new IrregularVerb('leiden', 'leidet', 'litt', 'gelitten', 'страдать'),
  leihen: new IrregularVerb(
    'leihen',
    'leiht',
    'lieh',
    'geliehen',
    'одалживать'
  ),
  lesen: new IrregularVerb('lesen', 'liest', 'las', 'gelesen', 'читать'),
  liegen: new IrregularVerb('liegen', 'liegt', 'lag', 'gelegen', 'лежать'),
  lügen: new IrregularVerb('lügen', 'lügt', 'log', 'gelogen', 'лгать'),
  mahlen: new IrregularVerb('mahlen', 'mahlt', 'mahlte', 'gemahlen', 'молоть'),
  meiden: new IrregularVerb('meiden', 'meidet', 'mied', 'gemieden', 'избегать'),
  melken: new IrregularVerb('melken', 'melkt', 'melkte', 'gemelkt', 'доить'),
  messen: new IrregularVerb('messen', 'mißt', 'maß', 'gemessen', 'измерять'),
  mißlingen: new IrregularVerb(
    'mißlingen',
    'mißlingt',
    'mißlang',
    'mißlungen',
    'не удаваться'
  ),
  mögen: new IrregularVerb(
    'mögen',
    'mag',
    'mochte',
    'gemocht',
    'любить, нравиться'
  ),
  müssen: new IrregularVerb(
    'müssen',
    'muss',
    'musste',
    'gemusst',
    'быть должным'
  ),
  nehmen: new IrregularVerb(
    'nehmen',
    'nimmt',
    'nahm',
    'genommen',
    'брать, взять'
  ),
  nennen: new IrregularVerb('nennen', 'nennt', 'nannte', 'genannt', 'называть'),
  pfeifen: new IrregularVerb(
    'pfeifen',
    'pfeift',
    'pfiff',
    'gepfiffen',
    'свистеть'
  ),
  preisen: new IrregularVerb(
    'preisen',
    'preist',
    'pries',
    'gepriesen',
    'хвалить'
  ),
  quellen: new IrregularVerb(
    'quellen',
    'quillt',
    'quol',
    'gequollen',
    'замачивать'
  ),
  raten: new IrregularVerb('raten', 'rät', 'riet', 'geraten', 'советовать'),
  reiben: new IrregularVerb('reiben', 'reibt', 'rieb', 'gerieben', 'тереть'),
  reißen: new IrregularVerb('reißen', 'reißt', 'riss', 'gerissen', 'рвать'),
  reiten: new IrregularVerb(
    'reiten',
    'reitet',
    'ritt',
    'geritten',
    'ездить верхом'
  ),
  rennen: new IrregularVerb('rennen', 'rennt', 'rannte', 'gerannt', 'бежать'),
  riechen: new IrregularVerb('riechen', 'riecht', 'roch', 'gerochen', 'нюхать'),
  ringen: new IrregularVerb('ringen', 'ringt', 'rang', 'gerungen', 'бороться'),
  rinnen: new IrregularVerb('rinnen', 'rinnt', 'rann', 'geronnen', 'течь'),
  rufen: new IrregularVerb(
    'rufen',
    'ruft',
    'rief',
    'gerufen',
    'кричать, звать'
  ),
  salzen: new IrregularVerb('salzen', 'salzt', 'salzte', 'gesalzt', 'солить'),
  saufen: new IrregularVerb('saufen', 'säuft', 'soff', 'gesoffen', 'лакать'),
  saugen: new IrregularVerb(
    'saugen',
    'saugt',
    'saugte',
    'gesaugt',
    'всасывать'
  ),
  schaffen: new IrregularVerb(
    'schaffen',
    'schafft',
    'schuf',
    'geschaffen',
    'справляться. создавать, творить'
  ),
  scheiden: new IrregularVerb(
    'scheiden',
    'scheidet',
    'schied',
    'geschieden',
    'разделять, отделять'
  ),
  scheinen: new IrregularVerb(
    'scheinen',
    'scheint',
    'schien',
    'geschienen',
    'светить, сиять'
  ),
  schelten: new IrregularVerb(
    'schelten',
    'schilt',
    'schalt',
    'gescholten',
    'ругать'
  ),
  scheren: new IrregularVerb(
    'scheren',
    'schiert',
    'schor',
    'geschoren',
    'резать, обрезать'
  ),
  schieben: new IrregularVerb(
    'schieben',
    'schiebt',
    'schob',
    'geschoben',
    'двигать, толкать'
  ),
  schießen: new IrregularVerb(
    'schießen',
    'schießt',
    'schoss',
    'geschossen',
    'стрелять'
  ),
  schlafen: new IrregularVerb(
    'schlafen',
    'schläft',
    'schlief',
    'geschlafen',
    'спать'
  ),
  schlagen: new IrregularVerb(
    'schlagen',
    'schlägt',
    'schlug',
    'geschlagen',
    'бить, ударять'
  ),
  schleichen: new IrregularVerb(
    'schleichen',
    'schleicht',
    'schlich',
    'geschlichen',
    'красться'
  ),
  schleifen: new IrregularVerb(
    'schleifen',
    'schleift',
    'schliff',
    'geschliffen',
    'точить'
  ),
  schließen: new IrregularVerb(
    'schließen',
    'schließt',
    'schloss',
    'geschlossen',
    'закрывать'
  ),
  schlingen: new IrregularVerb(
    'schlingen',
    'schlingt',
    'schlang',
    'geschlungen',
    'виться, обвивать(ся)'
  ),
  schmeißen: new IrregularVerb(
    'schmeißen',
    'schmeißt',
    'schmiss',
    'geschmissen',
    'кидать, бросать'
  ),
  schmelzen: new IrregularVerb(
    'schmelzen',
    'schmilzt',
    'schmolz',
    'geschmolzen',
    'таять'
  ),
  schneiden: new IrregularVerb(
    'schneiden',
    'schneidet',
    'schnitt',
    'geschnitten',
    'резать'
  ),
  schreiben: new IrregularVerb(
    'schreiben',
    'schreibt',
    'schrieb',
    'geschrieben',
    'писать'
  ),
  schreien: new IrregularVerb(
    'schreien',
    'schreit',
    'schrie',
    'geschrien',
    'кричать'
  ),
  schreiten: new IrregularVerb(
    'schreiten',
    'schreitet',
    'schritt',
    'geschritten',
    'шагать'
  ),
  schweigen: new IrregularVerb(
    'schweigen',
    'schweigt',
    'schwieg',
    'geschwiegen',
    'молчать'
  ),
  schwellen: new IrregularVerb(
    'schwellen',
    'schwillt',
    'schwoll',
    'geschwollen',
    'пухнуть'
  ),
  schwimmen: new IrregularVerb(
    'schwimmen',
    'schwimmt',
    'schwamm',
    'geschwommen',
    'плавать, плыть'
  ),
  schwinden: new IrregularVerb(
    'schwinden',
    'schwindet',
    'schwand',
    'geschwunden',
    'убывать, исчезать'
  ),
  schwingen: new IrregularVerb(
    'schwingen',
    'schwingt',
    'schwang',
    'geschwungen',
    'махать, размахивать'
  ),
  schwören: new IrregularVerb(
    'schwören',
    'schwört',
    'schwor',
    'geschworen',
    'клясться'
  ),
  sehen: new IrregularVerb('sehen', 'sieht', 'sah', 'gesehen', 'смотреть'),
  sein: new IrregularVerb('sein', 'ist', 'war', 'gewesen', 'быть'),
  senden: new IrregularVerb(
    'senden',
    'sendet',
    'sandte',
    'gesandt',
    'посылать, отправлять'
  ),
  singen: new IrregularVerb('singen', 'singt', 'sang', 'gesungen', 'петь'),
  sinken: new IrregularVerb(
    'sinken',
    'sinkt',
    'sank',
    'gesunken',
    'опуститься'
  ),
  sinnen: new IrregularVerb('sinnen', 'sinnt', 'sann', 'gesonnen', 'думать'),
  sitzen: new IrregularVerb('sitzen', 'sitzt', 'saß', 'gesesse', 'сидеть'),
  sollen: new IrregularVerb(
    'sollen',
    'soll',
    'sollte',
    'gesollt',
    'быть должным, следовало бы'
  ),
  spalten: new IrregularVerb(
    'spalten',
    'spaltet',
    'spaltete',
    'gespaltet',
    'расколоть'
  ),
  speien: new IrregularVerb(
    'speien',
    'speit',
    'spie',
    'gespien',
    'выплёвывать'
  ),
  spinnen: new IrregularVerb(
    'spinnen',
    'spinnt',
    'spann',
    'gesponnen',
    'прясть'
  ),
  sprechen: new IrregularVerb(
    'sprechen',
    'spricht',
    'sprach',
    'gesprochen',
    'говорить, разговаривать'
  ),
  sprießen: new IrregularVerb(
    'sprießen',
    'sprießt',
    'sproß',
    'gesprossen',
    'подпирать'
  ),
  springen: new IrregularVerb(
    'springen',
    'springt',
    'sprang',
    'gesprungen',
    'прыгать, скакать'
  ),
  stechen: new IrregularVerb(
    'stechen',
    'sticht',
    'stach',
    'gestochen',
    'колоть'
  ),
  stehen: new IrregularVerb(
    'stehen',
    'steht',
    'stand',
    'gestanden',
    'стоять, находиться'
  ),
  stehlen: new IrregularVerb(
    'stehlen',
    'stiehlt',
    'stahl',
    'gestohlen',
    'воровать'
  ),
  steigen: new IrregularVerb(
    'steigen',
    'steigt',
    'stieg',
    'gestiegen',
    'подниматься'
  ),
  sterben: new IrregularVerb(
    'sterben',
    'stirbt',
    'starb',
    'gestorben',
    'умирать'
  ),
  stinken: new IrregularVerb(
    'stinken',
    'stinkt',
    'stank',
    'gestunken',
    'вонять'
  ),
  stoßen: new IrregularVerb(
    'stoßen',
    'stößt',
    'stieß',
    'gestoßen',
    'толкать; ударять'
  ),
  streichen: new IrregularVerb(
    'streichen',
    'streicht',
    'strich',
    'gestrichen',
    'ходить, бродить'
  ),
  streiten: new IrregularVerb(
    'streiten',
    'streitet',
    'stritt',
    'gestritten',
    'спорить'
  ),
  tragen: new IrregularVerb(
    'tragen',
    'trägt',
    'trug',
    'getragen',
    'носить, нести'
  ),
  treffen: new IrregularVerb(
    'treffen',
    'trifft',
    'traf',
    'getroffen',
    'встречать, заставать'
  ),
  treiben: new IrregularVerb(
    'treiben',
    'treibt',
    'trieb',
    'getrieben',
    'гнать'
  ),
  treten: new IrregularVerb('treten', 'tritt', 'trat', 'getreten', 'входить'),
  trinken: new IrregularVerb('trinken', 'trinkt', 'trank', 'getrunken', 'пить'),
  trügen: new IrregularVerb(
    'trügen',
    'trügt',
    'trog',
    'getrogen',
    'обманывать'
  ),
  tun: new IrregularVerb('tun', 'tut', 'tat', 'getan', 'делать'),
  überweisen: new IrregularVerb(
    'überweisen',
    'überweist',
    'überwies',
    'überwiesen',
    'направлять, передавать, переводить'
  ),
  unterstreichen: new IrregularVerb(
    'unterstreichen',
    'unterstreicht',
    'unterstrich',
    'unterstrichen',
    'подчеркивать'
  ),
  verderben: new IrregularVerb(
    'verderben',
    'verdirbt',
    'verdarb',
    'verdorben',
    '(ис)портить'
  ),
  verdrießen: new IrregularVerb(
    'verdrießen',
    'verdrießt',
    'verdroß',
    'verdrossen',
    'сердить'
  ),
  vergessen: new IrregularVerb(
    'vergessen',
    'vergißt',
    'vergaß',
    'vergessen',
    'забывать'
  ),
  vergleichen: new IrregularVerb(
    'vergleichen',
    'vergleicht',
    'verglich',
    'verglichen',
    'сравнивать'
  ),
  verlieren: new IrregularVerb(
    'verlieren',
    'verliert',
    'verlor',
    'verloren',
    '(по)терять'
  ),
  verzeihen: new IrregularVerb(
    'verzeihen',
    'verzeiht',
    'verzieh',
    'verziehen',
    'прощать'
  ),
  wachsen: new IrregularVerb(
    'wachsen',
    'wächst',
    'wuchs',
    'gewachsen',
    'расти'
  ),
  wägen: new IrregularVerb('wägen', 'wägt', 'wog', 'gewogen', 'взвешивать'),
  waschen: new IrregularVerb('waschen', 'wäscht', 'wusch', 'gewaschen', 'мыть'),
  weichen: new IrregularVerb(
    'weichen',
    'weicht',
    'wich',
    'gewichen',
    'смягчать'
  ),
  weisen: new IrregularVerb(
    'weisen',
    'weist',
    'wies',
    'gewiesen',
    'показывать'
  ),
  wenden: new IrregularVerb(
    'wenden',
    'wendet',
    'wendete',
    'gewendet',
    'поворачивать, обращать'
  ),
  werben: new IrregularVerb(
    'werben',
    'wirbt',
    'warb',
    'geworben',
    'рекламировать'
  ),
  werden: new IrregularVerb('werden', 'wird', 'wurde', 'geworden', 'стать'),
  werfen: new IrregularVerb('werfen', 'wirft', 'warf', 'geworfen', 'кидать'),
  wiegen: new IrregularVerb(
    'wiegen',
    'wiegt',
    'wog',
    'gewogen',
    'качать, весить'
  ),
  winden: new IrregularVerb(
    'winden',
    'windet',
    'wand',
    'gewunden',
    'замотать, сплести'
  ),
  wissen: new IrregularVerb('wissen', 'weiß', 'wusste', 'gewusst', 'знать'),
  wollen: new IrregularVerb('wollen', 'will', 'wollte', 'gewollt', 'хотеть'),
  ziehen: new IrregularVerb('ziehen', 'zieht', 'zog', 'gezogen', 'тащить'),
  zwingen: new IrregularVerb(
    'zwingen',
    'zwingt',
    'zwang',
    'gezwungen',
    'принуждать'
  )
}

class Verb {
  constructor(infinitive, type) {
    this.infinitive = infinitive
    this.type = type
  }

  get prefix() {
    if (
      prefixes.detach.filter(e => this.infinitive.startsWith(e)).length !== 0
    ) {
      return prefixes.detach.filter(e => this.infinitive.startsWith(e))[0]
    } else if (
      prefixes.attach.filter(e => this.infinitive.startsWith(e)).length !== 0
    ) {
      return prefixes.attach.filter(e => this.infinitive.startsWith(e))[0]
    } else if (
      prefixes.mixed.filter(e => this.infinitive.startsWith(e)).length !== 0
    ) {
      return prefixes.mixed.filter(e => this.infinitive.startsWith(e))[0]
    } else {
      return ''
    }
  }

  get prefixType() {
    if (
      prefixes.detach.filter(e => this.infinitive.startsWith(e)).length !== 0
    ) {
      return 'detach'
    } else if (
      prefixes.attach.filter(e => this.infinitive.startsWith(e)).length !== 0
    ) {
      return 'attach'
    } else if (
      prefixes.mixed.filter(e => this.infinitive.startsWith(e)).length !== 0
    ) {
      return 'mixed'
    } else {
      return 'none'
    }
  }

  get ending() {
    if (this.infinitive.slice(-2) === 'en') {
      return 'en'
    } else if (
      this.infinitive.slice(-2) !== 'en' &&
      this.infinitive.slice(-1) === 'n'
    ) {
      return 'n'
    }
  }

  get ieren() {
    if (this.infinitive.slice(-5) === 'ieren') {
      return true
    } else {
      return false
    }
  }

  get stem() {
    if (this.prefix) {
      return this.infinitive
        .replace(this.prefix, '')
        .slice(0, -this.ending.length)
    } else {
      return this.infinitive.slice(0, -this.ending.length)
    }
  }

  get particip2() {
    if (this.type === 'irregular') {
      return irregularVerbs[this.infinitive].particip2
    } else {
      if (this.prefixType === 'detach' || this.ieren) {
        return `${this.prefix}${this.stem}t`
      } else {
        return `${this.prefix}ge${this.stem}t`
      }
    }
  }

  get preterite() {
    if (this.type === 'irregular') {
      return irregularVerbs[this.infinitive].preterite
    } else {
      if (this.stem.endsWith('d')) {
        return `${this.prefix}${this.stem}eten`
      } else {
        return `${this.prefix}${this.stem}ten`
      }
    }
  }
}

class IrVerb extends Verb {
  constructor(infinitive, type, group) {
    super(infinitive, type)
    this.group = group
  }

  get particip2() {
    // to do
    return
  }

  get preterite() {
    // to do
    return
  }
}

const irVerbs = [new IrVerb('bleiben', 'irregular', irVerbGroup.get(1))]

const irVerbGroup = new Map()
irVerbGroup.set(1, ['ei', 'ie', 'ie'])
irVerbGroup.set(2, ['ei', 'i', 'i'])
irVerbGroup.set(3, ['ie', 'o', 'o'])
irVerbGroup.set(4, ['i', 'a', 'u'])
irVerbGroup.set(5, ['i', 'a', 'o'])
irVerbGroup.set(5, ['ä', 'a', 'o'])
irVerbGroup.set(5, ['e', 'a', 'e'])
irVerbGroup.set(5, ['i', 'a', 'e'])
irVerbGroup.set(5, ['i', 'a', 'e'])
irVerbGroup.set(5, ['a', 'u', 'a'])
