//ikke ferdig

enum SykmeldingStatuser {
    NY = 'NY',
    SENDT = 'SENDT',
    UTGAATT = 'UTGAATT',
    AVBRUTT = 'AVBRUTT',
    BEKREFTET = 'BEKREFTET',
    TIL_SENDING = 'TIL_SENDING'
}

enum RSArbeidssituasjon {
    NAERINGSDRIVENDE = 'NAERINGSDRIVENDE',
    FRILANSER = 'FRILANSER',
    ARBEIDSTAKER = 'ARBEIDSTAKER'
}

interface SykmeldingDiagnose {
    diagnose: string,
    diagnosekode: string,
    diagnosesystem: string,
}

interface SykmeldingPeriode {
    fom: Date,
    tom: Date,
    grad: number,
    behandlingsdager: number,
    reisetilskudd: boolean,
    avventende: string,
}

export interface Sykmelding {
    id: string,
    msgId: string,
    psientAktoerId: string,
    medisinskVurdering: {
        hovedDiagnose: {
            system: string,
            kode: string
        },
        biDiagnose: [
            {
                system: string,
                kode: string
            }
        ],
        svangerskap: boolean,
        yrkesskade: boolean,
        yrkesskadeDato: Date,
        annenFraversArsak: {
            beskrivelse: string,
            grunn: string[] // se nærmere på denne. trenger enum
        }
    },
    skjermesForPasient: boolean,
    arbeidsgiver: {
        harArbeidsgiver: string, // trenger enum
        navn: string, //enum?
        yrkesbetegnelse: string, //enum
        stillignsprosent: number
    },
    perioder: [
        {
            fom: Date,
            tom: Date,
            aktivitetIkkeMulig: null,
            avventendeInnspillTillArbeidsgiver: null,
            behandlingsdager: null,
            gradert: {
                reisetilskudd: boolean,
                grad: number
            },
            reisetilskudd: boolean
        }
    ],
    prognose: {
        arbeidsforEtterPeriode: boolean,
        hensynArbeidsplassen: string,
        erIArbeid: {
            egetArbeidPaSikt: boolean,
            annetArbeidPaSikt: boolean,
            arbeidFOM: Date,
            vurderingsdato: Date
        },
        erIkkeIArbeid: null
    },
    utdypendeOpplysninger: {
        '6.3': {
            '6.3.1': {
                sporsmal: string,
                svar: string,
                restriksjoner: string[] // trenger enum
            },
            '6.3.2': {
                sporsmal: string,
                svar: string,
                restriksjoner: string[] // trenger enum
            }
        }
    },
    tiltakArbeidsplassen: string,
    tiltakNAV: string,
    andreTiltak: string,
    medingTilNAV: {
        bistandUmiddelbart: boolean,
        beskrivBistand: null
    },
    meldingTilArbeidsgiver: null,
    kontaktMedPasient: {
        kontaktDato: Date,
        begrunnelseIkkeKontakt: string
    },
    behandletTidspunkt: Date,
    behandler: {
        fornavn: string,
        mellomnavn: string,
        etternavn: string,
        aktoerId: string,
        fnr: string,
        hpr: string,
        her: string,
        adresse: {
            gate: string,
            postnummer: number,
            kommune: string,
            postboks: string,
            land: string //enum ?
        },
        telf: string,
    },
    avsenderSystem: {
        navn: string,
        versjon: string
    },
    syketilfelleStartDato: Date,
    signaturDato: Date,
    navnFastlege: string
}

export class Sykmelding_t implements Sykmelding {
    id: string;
    msgId: string;
    psientAktoerId: string;
    medisinskVurdering: {
        hovedDiagnose: {
            system: string,
            kode: string
        },
        biDiagnose: [
            {
                system: string,
                kode: string
            }
        ],
        svangerskap: boolean,
        yrkesskade: boolean,
        yrkesskadeDato: Date,
        annenFraversArsak: {
            beskrivelse: string,
            grunn: string[] // se nærmere på denne. trenger enum
        }
    };
    skjermesForPasient: boolean;
    arbeidsgiver: {
        harArbeidsgiver: string, // trenger enum
        navn: string, //enum?
        yrkesbetegnelse: string, //enum
        stillignsprosent: number
    };
    perioder: [
        {
            fom: Date,
            tom: Date,
            aktivitetIkkeMulig: null,
            avventendeInnspillTillArbeidsgiver: null,
            behandlingsdager: null,
            gradert: {
                reisetilskudd: boolean,
                grad: number
            },
            reisetilskudd: boolean
        }
    ];
    prognose: {
        arbeidsforEtterPeriode: boolean,
        hensynArbeidsplassen: string,
        erIArbeid: {
            egetArbeidPaSikt: boolean,
            annetArbeidPaSikt: boolean,
            arbeidFOM: Date,
            vurderingsdato: Date
        },
        erIkkeIArbeid: null
    };
    utdypendeOpplysninger: {
        '6.3': {
            '6.3.1': {
                sporsmal: string,
                svar: string,
                restriksjoner: string[] // trenger enum
            },
            '6.3.2': {
                sporsmal: string,
                svar: string,
                restriksjoner: string[] // trenger enum
            }
        }
    };
    tiltakArbeidsplassen: string;
    tiltakNAV: string;
    andreTiltak: string;
    medingTilNAV: {
        bistandUmiddelbart: boolean,
        beskrivBistand: null
    };
    meldingTilArbeidsgiver: null;
    kontaktMedPasient: {
        kontaktDato: Date,
        begrunnelseIkkeKontakt: string
    };
    behandletTidspunkt: Date;
    behandler: {
        fornavn: string,
        mellomnavn: string,
        etternavn: string,
        aktoerId: string,
        fnr: string,
        hpr: string,
        her: string,
        adresse: {
            gate: string,
            postnummer: number,
            kommune: string,
            postboks: string,
            land: string //enum ?
        },
        telf: string,
    };
    avsenderSystem: {
        navn: string,
        versjon: string
    };
    syketilfelleStartDato: Date;
    signaturDato: Date;
    navnFastlege: string;


    constructor( sykmelding: Sykmelding ) {
        this.id = sykmelding.id;
        this.msgId = sykmelding.msgId;
               
    }    
}
