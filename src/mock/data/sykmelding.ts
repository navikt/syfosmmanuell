export const oppgaveEnRegel = [
  {
    oppgaveid: 123456,
    validationResult: {
      status: 'MANUAL_PROCESSING',
      ruleHits: [
        {
          ruleName: 'TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE',
          ruleStatus: 'MANUAL_PROCESSING',
          messageForUser: 'Sykmeldingen er tilbakedatert uten at det kommer tydelig frem hvorfor dette var nødvendig.',
          messageForSender:
            'Sykmeldingen er tilbakedatert uten at det kommer tydelig nok frem hvorfor dette var nødvendig. Sykmeldingen er derfor avvist. Pasienten har fått beskjed.',
        },
      ],
    },
    receivedSykmelding: {
      sykmelding: {
        id: 'detteerensykmeldingid',
        msgId: '123124334',
        pasientAktoerId: '41234123',
        medisinskVurdering: {
          hovedDiagnose: {
            system: '2.16.578.1.12.4.1.1.7170',
            kode: 'K24',
            tekst: 'Rar sykdom',
          },
          biDiagnoser: [
            {
              system: '2.16.578.1.12.4.1.1.7170',
              kode: '-57',
              tekst: 'Rar sykdom',
            },
            {
              system: '3.16.578.1.12.4.1.1.7170',
              kode: '-59',
              tekst: 'Sykdom0',
            },
          ],
          svangerskap: true,
          yrkesskade: true,
          yrkesskadeDato: '2018-10-18',
          annenFraversArsak: {
            beskrivelse:
              'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
            grunn: ['NODVENDIG_KONTROLLUNDENRSOKELSE', 'ABORT'],
          },
        },
        skjermesForPasient: true,
        arbeidsgiver: {
          harArbeidsgiver: 'EN_ARBEIDSGIVER',
          navn: 'Selskap AS',
          yrkesbetegnelse: 'Kul jobb',
          stillingsprosent: 100,
        },
        perioder: [
          {
            fom: '2018-10-18',
            tom: '2018-11-12',
            aktivitetIkkeMulig: {
              medisinskArsak: {
                beskrivelse: 'dette er en beskrivelse m',
                arsak: ['TILSTAND_HINDRER_AKTIVITET', 'AKTIVITET_FORVERRER_TILSTAND'],
              },
              arbeidsrelatertArsak: {
                beskrivelse: 'dette er en beskrivelse',
                arsak: ['MANGLENDE_TILRETTELEGGING', 'ANNET'],
              },
            },
            avventendeInnspillTilArbeidsgiver: null,
            behandlingsdager: null,
            gradert: null,
            reisetilskudd: false,
          },
          {
            fom: '2018-10-18',
            tom: '2018-11-12',
            aktivitetIkkeMulig: null,
            avventendeInnspillTilArbeidsgiver: null,
            behandlingsdager: null,
            gradert: {
              reisetilskudd: true,
              grad: 56,
            },
            reisetilskudd: false,
          },
          {
            fom: '2018-10-18',
            tom: '2018-11-12',
            aktivitetIkkeMulig: null,
            avventendeInnspillTilArbeidsgiver: null,
            behandlingsdager: null,
            gradert: {
              reisetilskudd: true,
              grad: null,
            },
            reisetilskudd: false,
          },
          {
            fom: '2018-10-18',
            tom: '2018-11-12',
            aktivitetIkkeMulig: null,
            avventendeInnspillTilArbeidsgiver: null,
            behandlingsdager: null,
            gradert: null,
            reisetilskudd: false,
          },
          {
            fom: '2018-10-18',
            tom: '2018-11-12',
            aktivitetIkkeMulig: null,
            avventendeInnspillTilArbeidsgiver: null,
            behandlingsdager: 8,
            gradert: null,
            reisetilskudd: false,
          },
          {
            fom: '2018-10-18',
            tom: '2018-11-12',
            aktivitetIkkeMulig: null,
            avventendeInnspillTilArbeidsgiver: null,
            behandlingsdager: false,
            gradert: null,
            reisetilskudd: true,
          },
        ],
        prognose: {
          arbeidsforEtterPeriode: false,
          hensynArbeidsplassen:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
          erIArbeid: {
            egetArbeidPaSikt: true,
            annetArbeidPaSikt: true,
            arbeidFOM: '2018-11-21',
            vurderingsdato: '2018-10-30',
          },
          erIkkeIArbeid: null,
        },
        utdypendeOpplysninger: {
          '6.3': {
            '6.3.1': {
              sporsmal: 'Er pasient frisk?',
              svar:
                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
              restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
            },
            '6.3.2': {
              sporsmal: 'Er pasient klar for å jobbe?',
              svar:
                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
              restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
            },
          },
        },
        tiltakArbeidsplassen:
          'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        tiltakNAV:
          'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        andreTiltak:
          'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        meldingTilNAV: {
          bistandUmiddelbart: true,
          beskrivBistand: 'trenger hjelp',
        },
        meldingTilArbeidsgiver: 'dett er en melding til arbeidsgiver',
        kontaktMedPasient: {
          kontaktDato: '2018-10-04',
          begrunnelseIkkeKontakt:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        },
        behandletTidspunkt: '2018-10-14T14:52:35',
        behandler: {
          fornavn: 'Fornavn',
          mellomnavn: 'Mellomnavnesen',
          etternavn: 'Etternavn',
          aktoerId: '1234',
          fnr: '99999999999',
          hpr: '321',
          her: '123',
          adresse: {
            gate: 'Gateveien 4',
            postnummer: 1001,
            kommune: 'Oslo',
            postboks: '1212 Gateveien',
            land: 'NO',
          },
          tlf: '900 00 000',
        },
        avsenderSystem: {
          navn: 'NAV Test generator',
          versjon: '1.0',
        },
        syketilfelleStartDato: '2018-10-10',
        signaturDato: '2019-04-29T08:34:16',
        navnFastlege: 'Doktor Legesen',
      },
      mottattDato: '2020-02-24T15:27:54',
      personNrPasient: '12345678910',
    },
  },
];

export const oppgaveFlereRegler = [
  {
    oppgaveid: 123456,
    validationResult: {
      status: 'MANUAL_PROCESSING',
      ruleHits: [
        {
          ruleName: 'TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE',
          ruleStatus: 'MANUAL_PROCESSING',
          messageForUser: 'Sykmeldingen er tilbakedatert uten at det kommer tydelig frem hvorfor dette var nødvendig.',
          messageForSender:
            'Sykmeldingen er tilbakedatert uten at det kommer tydelig nok frem hvorfor dette var nødvendig. Sykmeldingen er derfor avvist. Pasienten har fått beskjed.',
        },
        {
          ruleName: 'TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE',
          ruleStatus: 'MANUAL_PROCESSING',
          messageForUser: 'Sykmeldingen er tilbakedatert uten at det kommer tydelig frem hvorfor dette var nødvendig.',
          messageForSender:
            'Sykmeldingen er tilbakedatert uten at det kommer tydelig nok frem hvorfor dette var nødvendig. Sykmeldingen er derfor avvist. Pasienten har fått beskjed.',
        },
      ],
    },
    receivedSykmelding: {
      sykmelding: {
        id: 'detteerensykmeldingid',
        msgId: '123124334',
        pasientAktoerId: '41234123',
        medisinskVurdering: {
          hovedDiagnose: {
            system: '2.16.578.1.12.4.1.1.7170',
            kode: 'K24',
            tekst: 'Rar sykdom',
          },
          biDiagnoser: [
            {
              system: '2.16.578.1.12.4.1.1.7170',
              kode: '-57',
              tekst: 'Rar sykdom',
            },
            {
              system: '3.16.578.1.12.4.1.1.7170',
              kode: '-59',
              tekst: 'Sykdom0',
            },
          ],
          svangerskap: true,
          yrkesskade: true,
          yrkesskadeDato: '2018-10-18',
          annenFraversArsak: {
            beskrivelse:
              'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
            grunn: ['NODVENDIG_KONTROLLUNDENRSOKELSE', 'ABORT'],
          },
        },
        skjermesForPasient: true,
        arbeidsgiver: {
          harArbeidsgiver: 'EN_ARBEIDSGIVER',
          navn: 'Selskap AS',
          yrkesbetegnelse: 'Kul jobb',
          stillingsprosent: 100,
        },
        perioder: [
          {
            fom: '2018-10-18',
            tom: '2018-11-12',
            aktivitetIkkeMulig: {
              medisinskArsak: {
                beskrivelse: 'dette er en beskrivelse',
                arsak: ['TILSTAND_HINDRER_AKTIVITET', 'AKTIVITET_FORVERRER_TILSTAND'],
              },
              arbeidsrelatertArsak: {
                beskrivelse: 'dette er en beskrivelse',
                arsak: ['MANGLENDE_TILRETTELEGGING', 'ANNET'],
              },
            },
            avventendeInnspillTilArbeidsgiver: null,
            behandlingsdager: null,
            gradert: {
              reisetilskudd: true,
              grad: 56,
            },
            reisetilskudd: false,
          },
          {
            fom: '2018-10-18',
            tom: '2018-11-12',
            aktivitetIkkeMulig: {
              medisinskArsak: {
                beskrivelse: 'dette er en beskrivelse',
                arsak: ['TILSTAND_HINDRER_AKTIVITET', 'AKTIVITET_FORVERRER_TILSTAND'],
              },
              arbeidsrelatertArsak: {
                beskrivelse: 'dette er en beskrivelse',
                arsak: ['ANNET'],
              },
            },
            avventendeInnspillTilArbeidsgiver: null,
            behandlingsdager: null,
            gradert: {
              reisetilskudd: true,
              grad: 56,
            },
            reisetilskudd: false,
          },
        ],
        prognose: {
          arbeidsforEtterPeriode: true,
          hensynArbeidsplassen: 'Pasienten må ta det rolig',
          erIArbeid: {
            egetArbeidPaSikt: true,
            annetArbeidPaSikt: true,
            arbeidFOM: '2018-11-21',
            vurderingsdato: '2018-10-30',
          },
          erIkkeIArbeid: null,
        },
        utdypendeOpplysninger: {
          '6.3': {
            '6.3.1': {
              sporsmal: 'Er pasient frisk?',
              svar:
                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
              restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
            },
            '6.3.2': {
              sporsmal: 'Er pasient klar for å jobbe?',
              svar:
                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
              restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
            },
          },
        },
        tiltakArbeidsplassen:
          'Jeg, legen, oppfortrer arbeidsplassen til å anskaffe hev-senk pult for å forhindre utvikling av pasientens ryggproblemer. Pasienten må også ta det rolig på arbeidsplassen og unngå å løfte tungt',
        tiltakNAV:
          'Jeg mener at Nav gjør en ypperlig jobb. Godt jobbet. Her kan det utdypes om ting Nav burde gjøre for å at pasienten skal kunne bedre arbeidsevnen sin. Det kan godt stå en del tekst her',
        andreTiltak: 'Pasienten burde begynne å trene på egenhånd, og endre sitt kosthold.',
        meldingTilNAV: {
          bistandUmiddelbart: true,
          beskrivBistand: 'trenger hjelp',
        },
        meldingTilArbeidsgiver: 'dett er en melding til arbeidsgiver',
        kontaktMedPasient: {
          kontaktDato: '2018-10-04',
          begrunnelseIkkeKontakt:
            'Har ikke kunnet ha kontakt med pasient siden pasient har vært hjemmeliggende med omgangssyke',
        },
        behandletTidspunkt: '2018-10-14T14:52:35',
        behandler: {
          fornavn: 'Fornavn',
          mellomnavn: 'Mellomnavnesen',
          etternavn: 'Etternavn',
          aktoerId: '1234',
          fnr: '99999999999',
          hpr: '321',
          her: '123',
          adresse: {
            gate: 'Gateveien 4',
            postnummer: 1001,
            kommune: 'Oslo',
            postboks: '1212 Gateveien',
            land: 'NO',
          },
          tlf: '900 00 000',
        },
        avsenderSystem: {
          navn: 'NAV Test generator',
          versjon: '1.0',
        },
        syketilfelleStartDato: '2018-10-10',
        signaturDato: '2019-04-29T08:34:16',
        navnFastlege: 'Doktor Legesen',
      },
      mottattDato: '2020-02-24T15:27:54',
    },
  },
];
