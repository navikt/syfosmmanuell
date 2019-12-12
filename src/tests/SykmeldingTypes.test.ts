import { Sykmelding } from '../types/SykmeldingTypes';

describe('SykmeldingTypes', () => {
    let sykmelding;
    beforeAll(() => {
        sykmelding = new Sykmelding(mockSykmelding);
    });

    //funker ikke siden tidsoffset fra UTC er annerledes på maskin som tester
    test.skip('Burde parse alle properties', () => {
        expect(JSON.stringify(sykmelding)).toBe(JSON.stringify(mockSykmeldingParset));
    });

    test('Burde returnere "null" for manglende ikke-påkrevd property', () => {
        const newMockSykmelding = JSON.parse(JSON.stringify(mockSykmelding));
        delete newMockSykmelding.meldingTilArbeidsgiver;
        sykmelding = new Sykmelding(newMockSykmelding);
        expect(sykmelding.meldingTilArbeidsgiver).toBeNull();
    });
});

const mockSykmelding = {
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
        ],
        svangerskap: true,
        yrkesskade: false,
        yrkesskadeDato: null,
        annenFraversArsak: {
            beskrivelse:
                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
            grunn: ['NODVENDIG_KONTROLLUNDENRSOKELSE'],
        },
    },
    skjermesForPasient: false,
    arbeidsgiver: {
        harArbeidsgiver: 'EN_ARBEIDSGIVER',
        navn: 'TODO',
        yrkesbetegnelse: 'TODO',
        stillingsprosent: 100,
    },
    perioder: [
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
    ],
    prognose: {
        arbeidsforEtterPeriode: false,
        hensynArbeidsplassen:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        erIArbeid: {
            egetArbeidPaSikt: false,
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
        bistandUmiddelbart: false,
        beskrivBistand: null,
    },
    meldingTilArbeidsgiver: null,
    kontaktMedPasient: {
        kontaktDato: '2018-10-04',
        begrunnelseIkkeKontakt:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
    },
    behandletTidspunkt: '2018-10-14T14:52:35',
    behandler: {
        fornavn: 'Fornavn',
        mellomnavn: null,
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
    signaturDato: '2019-04-29T08:34:16.861476',
    navnFastlege: 'Doktor Legesen',
};

const mockSykmeldingParset = {
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
        ],
        svangerskap: true,
        yrkesskade: false,
        yrkesskadeDato: null,
        annenFraversArsak: {
            beskrivelse:
                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
            grunn: [
                'Når vedkommende er til nødvendig kontrollundersøkelse som krever minst 24 timers fravær, reisetid medregnet',
            ],
        },
    },
    skjermesForPasient: false,
    arbeidsgiver: {
        harArbeidsgiver: 'Én arbeidsgiver',
        navn: 'TODO',
        yrkesbetegnelse: 'TODO',
        stillingsprosent: 100,
    },
    perioder: [
        {
            fom: '2018-10-17T22:00:00.000Z',
            tom: '2018-11-11T23:00:00.000Z',
            aktivitetIkkeMulig: null,
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
        arbeidsforEtterPeriode: false,
        hensynArbeidsplassen:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
        erIArbeid: {
            egetArbeidPaSikt: false,
            annetArbeidPaSikt: true,
            arbeidFOM: '2018-11-20T23:00:00.000Z',
            vurderingsdato: '2018-10-29T23:00:00.000Z',
        },
        erIkkeIArbeid: null,
    },
    utdypendeOpplysninger: {},
    tiltakArbeidsplassen:
        'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
    tiltakNAV:
        'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
    andreTiltak:
        'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
    meldingTilNAV: {
        bistandUmiddelbart: false,
        beskrivBistand: null,
    },
    meldingTilArbeidsgiver: null,
    kontaktMedPasient: {
        kontaktDato: '2018-10-03T22:00:00.000Z',
        begrunnelseIkkeKontakt:
            'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
    },
    behandletTidspunkt: '2018-10-14T12:52:35.000Z',
    behandler: {
        fornavn: 'Fornavn',
        mellomnavn: null,
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
    syketilfelleStartDato: '2018-10-09T22:00:00.000Z',
    signaturDato: '2019-04-29T06:34:16.861Z',
    navnFastlege: 'Doktor Legesen',
};
